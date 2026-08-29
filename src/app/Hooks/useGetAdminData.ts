"use server";

import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseGetDataArgs<T extends Record<string, any>> = {
  key: [...(string | number)[]];
  path: string;
  params?: object;
  initialData?: T;
  enabled?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAdminData<T extends Record<string, any>>({
  key,
  params,
  path,
  enabled = true,
}: UseGetDataArgs<T>) {
  const response = await axios.get<T>(
    `${process.env.NEXT_PUBLIC_BLOG_ADMIN_API_URL}/api/${path}`,
    {
      headers: {
        "MATCHPLUG-API-KEY": process.env.NEXT_PUBLIC_BLOG_ADMIN_API_KEY,
      },
      params,
    },
  );

  return response?.data;
}
