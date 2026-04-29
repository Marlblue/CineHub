import { useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import SEO from "../components/SEO";
import { Heart, Popcorn, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translations";

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const { language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 36;

  const totalPages = Math.ceil(watchlist.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = watchlist.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 pt-28 pb-20 animate-fade-in">
      <SEO title={t("watchlist.title", language)} />
      
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-cinema-rose/20 rounded-2xl flex items-center justify-center border border-cinema-rose/30">
            <Heart className="w-6 h-6 text-cinema-rose fill-cinema-rose" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{t("watchlist.title", language)}</h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
               {t("watchlist.subtitle", language)} — {watchlist.length} {watchlist.length === 1 ? t("watchlist.movie", language) : t("watchlist.movies", language)}
            </p>
          </div>
        </div>
        <div className="h-px bg-white/10 w-full" />
      </header>

      {watchlist.length === 0 ? (
        <div className="text-center py-32 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 rounded-3xl mb-8 border border-white/10">
            <Popcorn className="w-10 h-10 text-gray-500" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">{t("watchlist.emptyTitle", language)}</h2>
          <p className="text-gray-500 text-sm mb-10 max-w-sm mx-auto font-medium">
            {t("watchlist.emptyDescription", language)}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-10 py-4 bg-cinema-accent hover:bg-amber-500 text-black font-black rounded-2xl transition-all duration-300 text-xs uppercase tracking-widest shadow-2xl shadow-cinema-accent/20"
          >
            <Sparkles className="w-4 h-4" />
            {t("watchlist.startDiscovering", language)}
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mb-16">
            {currentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination for Watchlist if needed */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-6 py-10 border-t border-white/5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 hover:border-cinema-accent transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 px-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                        currentPage === i + 1
                          ? "bg-cinema-accent text-black"
                          : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-20 disabled:cursor-not-allowed hover:bg-white/10 hover:border-cinema-accent transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Watchlist;
