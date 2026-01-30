export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
  genre_ids?: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  id: number;
  cast: Cast[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface VideoResponse {
  id: number;
  results: Video[];
}

export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
}

export interface Person {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
}

export interface PersonMovieCredits {
  cast: Movie[];
  crew: Movie[];
}
