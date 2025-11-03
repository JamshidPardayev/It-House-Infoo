import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const fetchTeacherDetail = async (id: number) => {
  const response = await api.get(`/api/teachers/${id}/`);
  return response.data;
};

export const useTeacherDetail = (id: number) => {
  return useQuery({
    queryKey: ["TeachersDetail", id],
    queryFn: () => fetchTeacherDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
