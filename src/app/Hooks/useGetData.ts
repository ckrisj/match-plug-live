import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseGetDataArgs<T extends Record<string, any>> = {
  key: [...(string | number)[]];
  path: string;
  params?: object;
  initialData?: T;
  enabled?:boolean
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetData<T extends Record<string, any>>({
  key,
  params,
  path,
  enabled = true
}: UseGetDataArgs<T>) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get<T>(
        `${process.env.NEXT_PUBLIC_BLOG_API_URL}/blog/wp-json/next/v1/${path}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BLOG_API_KEY}`,
          },
          params,
        }
      );

      return data;
    },
    enabled,
  });
}
