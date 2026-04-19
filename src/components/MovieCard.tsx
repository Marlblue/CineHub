import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, Plus } from "lucide-react";
import type { Movie, MovieDetail } from "../types/tmdb";
import { getImageUrl } from "../utils/image";
import { useGenres } from "../hooks/useMovies";
import { useWatchlist } from "../context/WatchlistContext";

interface MovieCardProps {
  movie: Movie | MovieDetail;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { data: genresData } = useGenres();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [imageError, setImageError] = useState(false);

  const isFavorite = isInWatchlist(movie.id);

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

  const genreNames = getGenreNames();

  const getRatingColor = (rating: number) => {
    if (rating >= 7) return "text-emerald-400";
    if (rating >= 5) return "text-cinema-accent";
    return "text-red-400";
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block group relative rounded-xl overflow-hidden bg-cinema-card border border-transparent hover:border-cinema-border/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/40"
      aria-label={`View details for ${movie.title}`}
    >
      {/* Poster */}
      <div className="relative aspect-2/3 bg-cinema-surface overflow-hidden">
        {!imageError ? (
          <img
            src={getImageUrl(movie.poster_path, "w500")}
            srcSet={`
              ${getImageUrl(movie.poster_path, "w342")} 342w,
              ${getImageUrl(movie.poster_path, "w500")} 500w,
              ${getImageUrl(movie.poster_path, "w780")} 780w
            `}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            alt={`Poster for ${movie.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cinema-surface p-4 text-center">
            <span className="text-gray-500 text-sm">{movie.title}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          <p className="text-xs text-gray-300 line-clamp-3 mb-2 leading-relaxed">
            {movie.overview || "No overview available."}
          </p>
          {genreNames && (
            <p className="text-[11px] text-cinema-accent font-medium">
              {genreNames}
            </p>
          )}
        </div>

        {/* Watchlist quick-add button */}
        <button
          onClick={handleWatchlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 z-10 ${
            isFavorite
              ? "bg-cinema-rose/90 text-white opacity-100 scale-100"
              : "bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 hover:bg-cinema-rose/90"
          }`}
          aria-label={
            isFavorite ? "Remove from watchlist" : "Add to watchlist"
          }
        >
          {isFavorite ? (
            <Heart className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Rating badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-cinema-accent fill-cinema-accent" />
          <span
            className={`text-xs font-bold ${getRatingColor(movie.vote_average)}`}
          >
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3
          className="text-sm font-semibold truncate text-white group-hover:text-cinema-accent transition-colors duration-300"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-gray-500">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </span>
          {genreNames && !movie.overview && (
            <span className="text-[11px] text-gray-600 truncate ml-2">
              {genreNames}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
