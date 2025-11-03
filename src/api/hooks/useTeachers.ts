import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const fetchTeachers = async () => {
  const response = await api.get("/api/teachers/");
  return response.data;
};

export const useTeachers = () => {
  return useQuery({
    queryKey: ["Teachers"],
    queryFn: fetchTeachers,
    staleTime: 1000 * 60 * 5,
  });
};
