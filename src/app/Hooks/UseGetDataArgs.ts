// import { API_URL } from "@/components/utils/constant";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export type UseGetDataArgs<T extends Record<string, any>> = {
//   key: [...(string | number)[]];
//   path: string;
//   params?: object;
//   initialData?: T;
//   enabled?: boolean;
// };

// export function useGetData<T extends Record<string, any>>({
//   key,
//   params,
//   path,
//   enabled = true,
// }: UseGetDataArgs<T>) {
//   return useQuery<T>({
//     queryKey: key,

//     queryFn: async () => {
//       const { data } = await axios.get<T>(`${API_URL}/${path}`, {
//         params,
     
//       });

//       return data;
//     },

//     enabled,
//   });
// }
import { API_URL } from "@/components/utils/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type UseGetDataArgs<T extends Record<string, any>> = {
  key: [...(string | number)[]];
  path: string;
  params?: object;
  initialData?: T;
  enabled?: boolean;
};

export function useGetData<T extends Record<string, any>>({
  key,
  params,
  path,
  enabled = true,
}: UseGetDataArgs<T>) {
  return useQuery({
    queryKey: key,

    queryFn: async () => {
      const response = await axios.get<T>(`${API_URL}/wp-json/wp/v2/${path}`, {
        params,
      });

      return {
        data: response.data,
        total: Number(response.headers["x-wp-total"] || 0),
        totalPages: Number(response.headers["x-wp-totalpages"] || 0),
      };
    },

    enabled,
  });
}