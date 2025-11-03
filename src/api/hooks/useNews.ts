import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export type NewsType = {
  id: number;
  created_at: string;
  updated_at: string;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  banner: string;
};

// Get all news
export const useNews = () => {
  return useQuery<NewsType[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await api.get("/api/news/");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Get single news detail
export const useNewsDetail = (id: number) => {
  return useQuery<NewsType>({
    queryKey: ["newsDetail", id],
    queryFn: async () => {
      const res = await api.get(`/api/news/${id}/`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
