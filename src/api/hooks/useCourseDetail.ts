// src/api/hooks/useCourseDetail.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const fetchCourseDetail = async (id: number) => {
  const response = await api.get(`/api/courses/${id}/`);
  return response.data;
};

export const useCourseDetail = (id: number) => {
  return useQuery({
    queryKey: ["courseDetail", id],
    queryFn: () => fetchCourseDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
