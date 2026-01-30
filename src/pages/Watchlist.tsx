import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import SEO from "../components/SEO";
import { Heart } from "lucide-react";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <SEO title="My Watchlist" />
      <header className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
          <h1 className="text-3xl font-bold">My Watchlist</h1>
        </div>
        <p className="text-gray-400">
          Your personal collection of movies to watch.
        </p>
      </header>

      {watchlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 rounded-lg border border-gray-700">
          <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-300 mb-2">
            Your watchlist is empty
          </h2>
          <p className="text-gray-500">
            Start adding movies you want to watch!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
