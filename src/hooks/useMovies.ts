import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getTrendingMovies,
  getGenres,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getDiscoverMovies,
  getMovieRecommendations,
} from "../api/tmdbClient";

export const useTrendingMovies = () => {
  return useInfiniteQuery({
    queryKey: ["trendingMovies"],
    queryFn: ({ pageParam = 1 }) => getTrendingMovies(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useDiscoverMovies = (genreId: number | null) => {
  return useInfiniteQuery({
    queryKey: ["discoverMovies", genreId],
    queryFn: ({ pageParam = 1 }) => getDiscoverMovies(genreId, pageParam),
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
  return useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useSearchMovies = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["searchMovies", query],
    queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam),
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

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
  });
};

export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
  });
};

export const useMovieVideos = (id: number) => {
  return useQuery({
    queryKey: ["movieVideos", id],
    queryFn: () => getMovieVideos(id),
    enabled: !!id,
  });
};

export const useMovieRecommendations = (id: number) => {
  return useQuery({
    queryKey: ["movieRecommendations", id],
    queryFn: () => getMovieRecommendations(id),
    enabled: !!id,
  });
};
