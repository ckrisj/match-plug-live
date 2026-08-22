export const handleClick = (id: number | undefined) => {
  localStorage.setItem("blogId", JSON.stringify(id));
};

export function formatParagraphToHTML(text: string): string {
  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const linkify = (s: string) => {
    return s.replace(
      /((?:https?:\/\/|www\.)[\w-]+(?:\.[\w-]+)+(?:\/[^\s]*)?)/gi,
      (m) => {
        const url = m.startsWith("http") ? m : "https://" + m;
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${m}</a>`;
      }
    );
  };

  const highlight = (s: string) => {
    s = s.replace(
      /\bBoth Teams To Score \(BTTS\)\b/gi,
      (m) => `<strong>${m}</strong>`
    );
    s = s.replace(/\bBTTS\b/gi, (m) => `<strong>${m}</strong>`);
    return s;
  };

  type Block = { type: "p" | "ol"; content: string[] };

  const lines: string[] = escapeHtml(text).split(/\r?\n/);
  const blocks: Block[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] | null = null;

  const flushParagraph = () => {
    if (currentParagraph.length) {
      blocks.push({ type: "p", content: [currentParagraph.join(" ").trim()] });
      currentParagraph = [];
    }
  };
  const flushList = () => {
    if (currentList && currentList.length) {
      blocks.push({ type: "ol", content: [...currentList] });
      currentList = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const listMatch = line.match(/^(\d+[\.\)]\s+.*)/); // keep full line including number

    if (listMatch) {
      flushParagraph(); // make sure list starts after paragraph
      if (!currentList) currentList = [];
      currentList.push(listMatch[1].trim()); // keep number in <li>
      continue;
    }

    if (!line) {
      flushList();
      flushParagraph();
      continue;
    }

    if (currentList) {
      const lastIdx = currentList.length - 1;
      currentList[lastIdx] += " " + line; // append to last <li> if multi-line
    } else {
      currentParagraph.push(line);
    }
  }

  flushList();
  flushParagraph();

  return blocks
    .map((blk) => {
      if (blk.type === "p")
        return `<p style="margin-bottom:1em;">${highlight(
          linkify(blk.content[0])
        )}</p>`;
      if (blk.type === "ol")
        return `<ol style="margin-bottom:1em;">${blk.content
          .map((it) => `<li>${highlight(linkify(it))}</li>`)
          .join("")}</ol>`;
      return "";
    })
    .join("\n\n");
}
