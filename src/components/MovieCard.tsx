import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Movie, MovieDetail } from "../types/tmdb";
import { getImageUrl } from "../utils/image";
import { useGenres } from "../hooks/useMovies";

interface MovieCardProps {
  movie: Movie | MovieDetail;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { data: genresData } = useGenres();

  const getGenreNames = () => {
    // If movie has explicit genres array (from detail view)
    if ("genres" in movie && movie.genres) {
      return movie.genres
        .slice(0, 2)
        .map((g) => g.name)
        .join(" • ");
    }

    // If movie has genre_ids (from list view)
    if (movie.genre_ids && genresData) {
      return movie.genre_ids
        .slice(0, 2)
        .map((id) => genresData.genres.find((g) => g.id === id)?.name)
        .filter(Boolean)
        .join(" • ");
    }

    return "";
  };

  const [imageError, setImageError] = React.useState(false);
  const genreNames = getGenreNames();

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 group"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative aspect-2/3 bg-gray-700">
        {!imageError ? (
          <img
            src={getImageUrl(movie.poster_path, "w500")}
            srcSet={`
              ${getImageUrl(movie.poster_path, "w342")} 342w,
              ${getImageUrl(movie.poster_path, "w500")} 500w,
              ${getImageUrl(movie.poster_path, "w780")} 780w
            `}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            alt={`Poster for ${movie.title}`}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700 p-4 text-center">
            <span className="text-gray-400 text-sm">{movie.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-semibold truncate text-white group-hover:text-blue-400 transition-colors"
          title={movie.title}
        >
          {movie.title}
        </h3>

        <div className="flex items-center justify-between mt-2 mb-2">
          <span className="text-gray-400 text-sm">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </span>
          <div className="flex items-center bg-gray-700 px-2 py-0.5 rounded text-xs">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            <span className="text-white">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
            </span>
          </div>
        </div>

        {genreNames && (
          <div className="text-xs text-gray-500 truncate">{genreNames}</div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
