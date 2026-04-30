import React, { useState, memo } from "react";
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
    if ("genres" in movie && movie.genres) {
      return movie.genres.slice(0, 1).map((g) => g.name).join("");
    }
    if (movie.genre_ids && genresData) {
      return movie.genre_ids.slice(0, 1).map((id) => genresData.genres.find((g) => g.id === id)?.name).filter(Boolean).join("");
    }
    return "";
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block group relative rounded-xl overflow-hidden bg-cinema-card transition-all duration-200"
    >
      <div className="relative aspect-[2/3] bg-cinema-surface overflow-hidden">
        {!imageError ? (
          <img
            src={getImageUrl(movie.poster_path, "w342")}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cinema-surface p-4">
            <span className="text-gray-600 text-[10px] font-black uppercase text-center">{movie.title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-md px-1.5 py-0.5">
            <Star className="w-2.5 h-2.5 text-cinema-accent fill-cinema-accent" />
            <span className="text-[10px] font-black text-white">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>

        {/* Watchlist Toggle - Always visible on hover, no 3D transform */}
        <button
          onClick={handleWatchlistClick}
          className={`absolute top-2 right-2 p-2 rounded-lg transition-all duration-200 z-10 ${
            isFavorite
              ? "bg-cinema-rose text-white shadow-lg"
              : "bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100"
          }`}
        >
          {isFavorite ? <Heart className="w-3.5 h-3.5 fill-current" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="p-3 bg-cinema-card border-t border-white/5">
        <h3 className="text-[11px] font-black text-white group-hover:text-cinema-accent transition-colors duration-200 truncate uppercase tracking-tight">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
          </span>
          <span className="text-[9px] font-bold text-cinema-accent uppercase">
             {getGenreNames()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default memo(MovieCard);
