import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const useEducationAbout = () => {
  return useQuery({
    queryKey: ["education-about"],
    queryFn: async () => {
      const res = await api.get("/api/education-about/");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
