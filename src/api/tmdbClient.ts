import axios from "axios";
import type {
  MovieResponse,
  GenreResponse,
  MovieDetail,
  CreditsResponse,
  VideoResponse,
  Person,
  PersonMovieCredits,
  Movie,
} from "../types/tmdb";

const tmdbClient = axios.create({
  baseURL: "/api/tmdb",
});

/**
 * Helper: for non-EN languages, fetch EN version in parallel and
 * fill in any missing overview/title fields from the EN data.
 */
const fetchMovieListWithFallback = async (
  endpoint: string,
  params: Record<string, any>,
  language: string
): Promise<MovieResponse> => {
  if (language === "en-US") {
    const response = await tmdbClient.get<MovieResponse>(endpoint, { params });
    return response.data;
  }

  // Fetch both languages in parallel
  const [localRes, enRes] = await Promise.all([
    tmdbClient.get<MovieResponse>(endpoint, { params }),
    tmdbClient.get<MovieResponse>(endpoint, { params: { ...params, language: "en-US" } }),
  ]);

  const localData = localRes.data;
  const enResults = enRes.data.results;

  // Build a lookup map from EN results by movie id
  const enMap = new Map<number, Movie>();
  for (const movie of enResults) {
    enMap.set(movie.id, movie);
  }

  // Fill missing overview from EN fallback
  localData.results = localData.results.map((movie) => {
    const enMovie = enMap.get(movie.id);
    if (enMovie) {
      if (!movie.overview) movie.overview = enMovie.overview;
      if (!movie.title) movie.title = enMovie.title;
    }
    return movie;
  });

  return localData;
};

export const getTrendingMovies = async (page: number = 1, language: string = "en-US") => {
  return fetchMovieListWithFallback("/trending/movie/week", { page, language }, language);
};

export const getTopRatedMovies = async (page: number = 1, language: string = "en-US") => {
  return fetchMovieListWithFallback("/movie/top_rated", { page, language }, language);
};

export const getGenres = async (language: string = "en-US") => {
  const response = await tmdbClient.get<GenreResponse>("/genre/movie/list", {
    params: { language },
  });
  return response.data;
};

export const getDiscoverMovies = async (
  genreId: number | null,
  page: number = 1,
  language: string = "en-US"
) => {
  return fetchMovieListWithFallback("/discover/movie", {
    with_genres: genreId,
    page,
    language,
    sort_by: "popularity.desc",
  }, language);
};

export const searchMovies = async (query: string, page: number = 1, language: string = "en-US") => {
  return fetchMovieListWithFallback("/search/movie", { query, page, language }, language);
};

export const getMovieDetails = async (id: number, language: string = "en-US") => {
  if (language === "en-US") {
    const response = await tmdbClient.get<MovieDetail>(`/movie/${id}`, {
      params: { language },
    });
    return response.data;
  }

  // Fetch both languages in parallel for non-EN
  const [localRes, enRes] = await Promise.all([
    tmdbClient.get<MovieDetail>(`/movie/${id}`, { params: { language } }),
    tmdbClient.get<MovieDetail>(`/movie/${id}`, { params: { language: "en-US" } }),
  ]);

  const data = localRes.data;
  const enData = enRes.data;
  if (!data.overview) data.overview = enData.overview;
  if (!data.tagline) data.tagline = enData.tagline;

  return data;
};

export const getMovieCredits = async (id: number, language: string = "en-US") => {
  const response = await tmdbClient.get<CreditsResponse>(
    `/movie/${id}/credits`, {
      params: { language }
    }
  );
  return response.data;
};

export const getMovieVideos = async (id: number, language: string = "en-US") => {
  if (language === "en-US") {
    const response = await tmdbClient.get<VideoResponse>(`/movie/${id}/videos`, {
      params: { language }
    });
    return response.data;
  }

  // Fetch both in parallel for non-EN
  const [localRes, enRes] = await Promise.all([
    tmdbClient.get<VideoResponse>(`/movie/${id}/videos`, { params: { language } }),
    tmdbClient.get<VideoResponse>(`/movie/${id}/videos`, { params: { language: "en-US" } }),
  ]);

  // Use local if available, otherwise fallback to EN
  if (localRes.data.results && localRes.data.results.length > 0) {
    return localRes.data;
  }
  return enRes.data;
};

export const getMovieRecommendations = async (id: number, language: string = "en-US") => {
  return fetchMovieListWithFallback(`/movie/${id}/recommendations`, { language }, language);
};

export const getPersonDetails = async (id: number, language: string = "en-US") => {
  if (language === "en-US") {
    const response = await tmdbClient.get<Person>(`/person/${id}`, {
      params: { language }
    });
    return response.data;
  }

  // Fetch both in parallel for non-EN
  const [localRes, enRes] = await Promise.all([
    tmdbClient.get<Person>(`/person/${id}`, { params: { language } }),
    tmdbClient.get<Person>(`/person/${id}`, { params: { language: "en-US" } }),
  ]);

  const data = localRes.data;
  if (!data.biography) data.biography = enRes.data.biography;

  return data;
};

export const getPersonMovieCredits = async (id: number, language: string = "en-US") => {
  const response = await tmdbClient.get<PersonMovieCredits>(
    `/person/${id}/movie_credits`, {
      params: { language }
    }
  );
  return response.data;
};
