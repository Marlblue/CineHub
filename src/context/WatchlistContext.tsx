import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/tmdb";
import toast from "react-hot-toast";

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);

export const WatchlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      toast.success(`Added "${movie.title}" to watchlist`);
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prev) => {
      const movie = prev.find((m) => m.id === movieId);
      if (movie) {
        toast.success(`Removed "${movie.title}" from watchlist`);
      }
      return prev.filter((m) => m.id !== movieId);
    });
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
