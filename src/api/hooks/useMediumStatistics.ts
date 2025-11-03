import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const fetchMediumStatistics = async () => {
  const response = await api.get("/api/medium-statistics/");
  return response.data?.[0];
};

export const useMediumStatistics = () => {
  return useQuery({
    queryKey: ["mediumStatistics"],
    queryFn: fetchMediumStatistics,
    staleTime: 1000 * 60 * 5,
  });
};
