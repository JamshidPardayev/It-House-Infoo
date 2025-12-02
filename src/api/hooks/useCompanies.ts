import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const fetchCompanies = async () => {
  const response = await api.get("/api/company/");
  return response.data;
};

export const useCompanies = () => {
  return useQuery({
    queryKey: ["Companies"],
    queryFn: fetchCompanies,
    staleTime: 1000 * 60 * 5,
  });
};
