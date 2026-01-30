import axios from "axios";
import type {
  MovieResponse,
  GenreResponse,
  MovieDetail,
  CreditsResponse,
  VideoResponse,
  Person,
  PersonMovieCredits,
} from "../types/tmdb";

const tmdbClient = axios.create({
  baseURL: "/api/tmdb",
});

export const getTrendingMovies = async (page: number = 1) => {
  const response = await tmdbClient.get<MovieResponse>("/trending/movie/week", {
    params: { page },
  });
  return response.data;
};

export const getGenres = async () => {
  const response = await tmdbClient.get<GenreResponse>("/genre/movie/list");
  return response.data;
};

export const getDiscoverMovies = async (
  genreId: number | null,
  page: number = 1,
) => {
  const response = await tmdbClient.get<MovieResponse>("/discover/movie", {
    params: {
      with_genres: genreId,
      page,
      sort_by: "popularity.desc",
    },
  });
  return response.data;
};

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await tmdbClient.get<MovieResponse>("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

export const getMovieDetails = async (id: number) => {
  const response = await tmdbClient.get<MovieDetail>(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id: number) => {
  const response = await tmdbClient.get<CreditsResponse>(
    `/movie/${id}/credits`,
  );
  return response.data;
};

export const getMovieVideos = async (id: number) => {
  const response = await tmdbClient.get<VideoResponse>(`/movie/${id}/videos`);
  return response.data;
};

export const getMovieRecommendations = async (id: number) => {
  const response = await tmdbClient.get<MovieResponse>(
    `/movie/${id}/recommendations`,
  );
  return response.data;
};

export const getPersonDetails = async (id: number) => {
  const response = await tmdbClient.get<Person>(`/person/${id}`);
  return response.data;
};

export const getPersonMovieCredits = async (id: number) => {
  const response = await tmdbClient.get<PersonMovieCredits>(
    `/person/${id}/movie_credits`,
  );
  return response.data;
};
