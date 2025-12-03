import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface ICourse {
  id: number;
  modules: any[];
  technologies: any[];
  created_at: string;
  updated_at: string;
  banner: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  price: string;
  duration: number;
  students: number;
}

export const useCourses = () => {
  return useQuery<ICourse[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get<ICourse[]>("/api/courses/");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
