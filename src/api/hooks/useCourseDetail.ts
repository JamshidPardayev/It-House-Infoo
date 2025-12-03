// src/api/hooks/useCourseDetail.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// ==== Course Type ====
// Bu rasmda ko’rsatilgan struktura bilan 100% mos
export interface ICourseDetail {
  id: number;
  modules: any[];
  technologies: {
    id: number;
    icon: string;
    name_uz: string;
    name_en?: string;
    name_ru?: string;
  }[];
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

const fetchCourseDetail = async (id: number): Promise<ICourseDetail> => {
  const response = await api.get<ICourseDetail>(`/api/courses/${id}/`);
  return response.data;
};

export const useCourseDetail = (id: number) => {
  return useQuery<ICourseDetail>({
    queryKey: ["courseDetail", id],
    queryFn: () => fetchCourseDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
