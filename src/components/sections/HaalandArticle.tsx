"use client";
import React from "react";
import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
  Element,
} from "html-react-parser";
// import DOMPurify from "dompurify";
import DOMPurify from "isomorphic-dompurify";
import { API_URL, SITE_URL } from "../utils/constant";

// Props interface
interface HaalandArticleProps {
  content: string;
}

// Component to render <figure> tags
const Figure: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <figure className="mb-6">{children}</figure>;
};

// Component to render <img> tags
const Img: React.FC<{ attribs: { [key: string]: string } }> = ({ attribs }) => {
  return (
    <img
      src={attribs.src}
      alt={attribs.alt || ""}
      width={attribs.width}
      height={attribs.height}
      srcSet={attribs.srcset}
      sizes={attribs.sizes}
      loading="lazy"
      className="w-full h-auto rounded-lg shadow-md"
    />
  );
};

// Component to render <h1>–<h6> tags
const Heading: React.FC<{ level: number; children: React.ReactNode }> = ({
  level,
  children,
}) => {
  const sizes = [
    "text-3xl",
    "text-2xl",
    "text-xl",
    "text-lg",
    "text-base",
    "text-base",
  ];
  const cls = `${sizes[Math.max(0, Math.min(5, level - 1))]} font-semibold my-4`;
  return React.createElement(`h${level}`, { className: cls }, children);
};

// Main component
const HaalandArticle: React.FC<HaalandArticleProps> = ({ content }) => {
  const cleanHtml = DOMPurify.sanitize(content, {
    ADD_ATTR: ["fetchpriority"],
  });
  const updatedHtml = cleanHtml.replaceAll(API_URL, `${SITE_URL}/blog/`);
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (!domNode || domNode.type !== "tag") return;

      const node = domNode as Element;
      const { name, attribs, children } = node;

      if (name === "figure")
        return <Figure>{domToReact(children as DOMNode[], options)}</Figure>;
      if (name === "img") return <Img attribs={attribs} />;
      if (/^h[1-6]$/.test(name)) {
        const level = parseInt(name.replace("h", ""), 10);
        return (
          <Heading level={level}>
            {domToReact(children as DOMNode[], options)}
          </Heading>
        );
      }
      if (name === "p")
        return (
          <p className="text-base leading-relaxed my-3">
            {domToReact(children as DOMNode[], options)}
          </p>
        );
      if (name === "a") {
        return (
          <a
            href={attribs.href}
            target={attribs.target}
            rel={attribs.rel}
            className="text-sky-600 hover:underline break-words"
          >
            {domToReact(children as DOMNode[], options)}
          </a>
        );
      }
    },
  };

  return (
    <article className="prose lg:prose-xl max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm">
      {parse(updatedHtml, options)}
    </article>
  );
};

export default HaalandArticle;
