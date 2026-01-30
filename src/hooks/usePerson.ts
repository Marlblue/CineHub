import { useQuery } from "@tanstack/react-query";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdbClient";

export const usePersonDetails = (id: number) => {
  return useQuery({
    queryKey: ["personDetails", id],
    queryFn: () => getPersonDetails(id),
    enabled: !!id,
  });
};

export const usePersonMovieCredits = (id: number) => {
  return useQuery({
    queryKey: ["personMovieCredits", id],
    queryFn: () => getPersonMovieCredits(id),
    enabled: !!id,
  });
};
