import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

// API’dan ma’lumotlarni olish funksiyasi
const fetchTopStatistics = async () => {
  const response = await api.get("/api/top-statistics/");
  return response.data?.[0];
};

// Custom Hook
export const useTopStatistics = () => {
  return useQuery({
    queryKey: ["topStatistics"],
    queryFn: fetchTopStatistics,
    staleTime: 1000 * 60 * 5,
  });
};
