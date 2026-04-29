import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";
import {
  getTrendingMovies,
  getTopRatedMovies,
  getGenres,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getDiscoverMovies,
  getMovieRecommendations,
} from "../api/tmdbClient";

export const useTrendingMovies = () => {
  const { language } = useLanguage();
  return useInfiniteQuery({
    queryKey: ["trendingMovies", language],
    queryFn: ({ pageParam = 1 }) => getTrendingMovies(pageParam, language),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTrendingMoviesPaged = (page: number) => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["trendingMoviesPaged", page, language],
    queryFn: () => getTrendingMovies(page, language),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTopRatedMovies = () => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["topRatedMovies", language],
    queryFn: () => getTopRatedMovies(1, language),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useDiscoverMovies = (genreId: number | null) => {
  const { language } = useLanguage();
  return useInfiniteQuery({
    queryKey: ["discoverMovies", genreId, language],
    queryFn: ({ pageParam = 1 }) => getDiscoverMovies(genreId, pageParam, language),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled: !!genreId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGenres = () => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["genres", language],
    queryFn: () => getGenres(language),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useSearchMovies = (query: string) => {
  const { language } = useLanguage();
  return useInfiniteQuery({
    queryKey: ["searchMovies", query, language],
    queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam, language),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    enabled: !!query,
    staleTime: 1000 * 60, // 1 minute
  });
};

export const useSearchMoviesPaged = (query: string, page: number) => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["searchMoviesPaged", query, page, language],
    queryFn: () => searchMovies(query, page, language),
    enabled: !!query,
    staleTime: 1000 * 60,
  });
};

export const useMovieDetails = (id: number) => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["movieDetails", id, language],
    queryFn: () => getMovieDetails(id, language),
    enabled: !!id,
  });
};

export const useMovieCredits = (id: number) => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["movieCredits", id, language],
    queryFn: () => getMovieCredits(id, language),
    enabled: !!id,
  });
};

export const useMovieVideos = (id: number) => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["movieVideos", id, language],
    queryFn: () => getMovieVideos(id, language),
    enabled: !!id,
  });
};

export const useMovieRecommendations = (id: number) => {
  const { language } = useLanguage();
  return useQuery({
    queryKey: ["movieRecommendations", id, language],
    queryFn: () => getMovieRecommendations(id, language),
    enabled: !!id,
  });
};
