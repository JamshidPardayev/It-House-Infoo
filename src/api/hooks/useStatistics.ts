import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// API’dan ma’lumotlarni olish funksiyasi
const fetchTopStatistics = async () => {
  const response = await api.get("/api/statistics/");
  return response.data?.[0];
};

// Custom Hook
export const useStatistics = () => {
  return useQuery({
    queryKey: ["topStatistics"],
    queryFn: fetchTopStatistics,
    staleTime: 1000 * 60 * 5,
  });
};
