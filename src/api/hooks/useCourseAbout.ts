// src/api/hooks/useCourseAbout.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export type CourseAboutType = {
  id: number;
  title_uz: string;
  description_uz: string;
  title_ru: string;
  description_ru: string;
  title_en: string;
  description_en: string;
  created_at: string;
  updated_at: string;
};

export function useCourseAbout() {
  return useQuery<CourseAboutType[]>({
    queryKey: ["course-about"],
    queryFn: async () => {
      const res = await api.get("/api/course-about/");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
