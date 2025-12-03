import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface IStatistics {
  id: number;
  created_at: string;
  updated_at: string;
  total_students: number;
  total_graduates: number;
  total_employed: number;
  avg_duration: number;
  avg_start_salary: number;
  partners: number;
}

const fetchStatistics = async (): Promise<IStatistics> => {
  const response = await api.get<IStatistics[]>("/api/statistics/");
  return response.data[0];
};

export const useStatistics = () => {
  return useQuery<IStatistics>({
    queryKey: ["topStatistics"],
    queryFn: fetchStatistics,
    staleTime: 1000 * 60 * 5,
  });
};
