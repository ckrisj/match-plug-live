import { API_URL } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";
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
export function useGetData<T extends Record<string, any>>({
  key,
  params,
  path,
  enabled = true,
}: UseGetDataArgs<T>) {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const response = await axios.get<T>(
        `${API_URL}/wp-json/next/v1/${path}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BLOG_API_KEY}`,
          },
          params,
        },
      );

      return response?.data;
    },
    enabled,
  });
}
