import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import SEO from "../components/SEO";
import { Heart, Popcorn } from "lucide-react";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="container mx-auto px-4 md:px-6 pt-24 pb-12 animate-fade-in">
      <SEO title="My Watchlist" />
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-7 h-7 text-cinema-rose fill-current" />
          <h1 className="text-3xl font-extrabold tracking-tight">My Watchlist</h1>
          {watchlist.length > 0 && (
            <span className="text-xs font-bold bg-cinema-rose/20 text-cinema-rose border border-cinema-rose/30 rounded-full px-3 py-1">
              {watchlist.length} {watchlist.length === 1 ? "film" : "films"}
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm">Your personal collection of movies to watch.</p>
      </header>

      {watchlist.length === 0 ? (
        <div className="text-center py-24 bg-cinema-card/50 border border-cinema-border rounded-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cinema-surface rounded-2xl mb-6">
            <Popcorn className="w-10 h-10 text-gray-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-300 mb-2">Your watchlist is empty</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            Discover movies and add them to your watchlist to keep track of what you want to watch.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cinema-accent hover:bg-amber-500 text-black font-bold rounded-xl transition-all duration-300 text-sm"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
