import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export type StatusType = {
  id: number;
  created_at: string;
  updated_at: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
};

// Get all news
export const useStatus = () => {
  return useQuery<StatusType[]>({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await api.get("/api/status/");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
