import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// 🔹 Barcha kurslarni olish
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get("/api/courses/");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// 🔹 Bitta kursni ID orqali olish
export const useCourseDetail = (courseId: number) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const res = await api.get(`/api/courses/${courseId}/`);
      return res.data;
    },
    enabled: !!courseId, // courseId mavjud bo‘lsa, so‘rov yuboriladi
  });
};
