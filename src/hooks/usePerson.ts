import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdbClient";

export const usePersonDetails = (id: number) => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["personDetails", id, language],
    queryFn: () => getPersonDetails(id, language),
    enabled: !!id,
  });
};

export const usePersonMovieCredits = (id: number) => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["personMovieCredits", id, language],
    queryFn: () => getPersonMovieCredits(id, language),
    enabled: !!id,
  });
};
