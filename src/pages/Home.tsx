import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useTrendingMovies,
  useTopRatedMovies,
} from "../hooks/useMovies";
import { getTrendingMovies, searchMovies } from "../api/tmdbClient";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import { Loader2, Star, TrendingUp, Play, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "../components/SEO";
import { getImageUrl } from "../utils/image";
import { useSearch } from "../context/SearchContext";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translations";

const Home = () => {
  const { searchQuery } = useSearch();
  const [activeSlide, setActiveSlide] = useState(0);
  const [displayMovies, setDisplayMovies] = useState<any[]>([]);
  const [tmdbPage, setTmdbPage] = useState(1);
  const [isBatchLoading, setIsBatchLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Still need infinite for the Hero slider (gets page 1)
  const { data: trendingInfinite } = useTrendingMovies();
  const featuredMovies = trendingInfinite?.pages[0]?.results.slice(0, 10) || [];
  const { data: topRatedData } = useTopRatedMovies();

  const { language } = useLanguage();
  const isSearching = !!searchQuery;

  // Function to fetch 36 movies (requires ~2 TMDB pages)
  const fetchBatch = async (startPage: number, query?: string) => {
    setIsBatchLoading(true);
    try {
      let p1, p2;
      if (query) {
        const res1 = await searchMovies(query, startPage, language);
        const res2 = await searchMovies(query, startPage + 1, language);
        p1 = res1.results;
        p2 = res2.results;
        setHasMore(res2.page < res2.total_pages);
      } else {
        const res1 = await getTrendingMovies(startPage, language);
        const res2 = await getTrendingMovies(startPage + 1, language);
        p1 = res1.results;
        p2 = res2.results;
        setHasMore(res2.page < res2.total_pages);
      }

      const batch = [...p1, ...p2].slice(0, 36);
      setDisplayMovies(prev => startPage === 1 ? batch : [...prev, ...batch]);
      setTmdbPage(startPage + 2);
    } catch (err) {
      console.error(err);
    } finally {
      setIsBatchLoading(false);
    }
  };

  // Initial load, search reset, and language change
  useEffect(() => {
    setDisplayMovies([]);
    setTmdbPage(1);
    fetchBatch(1, searchQuery);
  }, [searchQuery, language]);

  useEffect(() => {
    if (featuredMovies.length > 0) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % featuredMovies.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [featuredMovies.length]);

  const handleLoadMore = () => {
    fetchBatch(tmdbPage, searchQuery);
  };

  return (
    <div className="animate-fade-in">
      <SEO title={t("nav.home", language)} />

      {/* Hero Section */}
      {!isSearching && featuredMovies.length > 0 && (
        <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
          {featuredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === activeSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                }`}
            >
              <div className="absolute inset-0">
                <img
                  src={getImageUrl(movie.backdrop_path, "w1280")}
                  alt=""
                  className="w-full h-full object-cover object-[center_20%]"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-linear-to-t from-cinema-dark via-cinema-dark/40 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-cinema-dark via-transparent to-transparent" />
              </div>

              <div className="absolute inset-0 flex items-center pt-20">
                <div className="container mx-auto px-4 md:px-8">
                  <div className={`max-w-4xl transition-all duration-700 ${index === activeSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-cinema-accent text-black rounded-lg text-[10px] font-black uppercase tracking-wider">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {t("home.trending", language)} #{index + 1}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-white text-[10px] font-black uppercase tracking-wider">
                        <Star className="w-3.5 h-3.5 text-cinema-accent fill-cinema-accent" />
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-[100px] font-black text-white mb-4 md:mb-6 leading-[0.9] md:leading-[0.85] tracking-tighter uppercase drop-shadow-2xl">
                      {movie.title}
                    </h1>

                    <p className="text-sm md:text-xl text-gray-200 leading-relaxed mb-8 md:mb-10 line-clamp-3 md:line-clamp-2 max-w-2xl font-medium drop-shadow-lg">
                      {movie.overview}
                    </p>

                    <div className="flex items-center gap-4">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="inline-flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 bg-cinema-accent hover:bg-amber-500 text-black font-black rounded-2xl transition-all duration-300 text-[10px] md:text-xs uppercase tracking-widest shadow-2xl shadow-cinema-accent/30 active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                        {t("home.viewDetails", language)}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-8 md:bottom-12 right-4 md:right-12 flex items-center gap-2 z-30">
            <span className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mr-2 md:mr-4 hidden sm:block">{t("home.highlights", language)}</span>
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === activeSlide ? "w-8 md:w-10 h-1 md:h-1.5 bg-cinema-accent" : "w-1.5 md:w-2 h-1 md:h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main content area */}
      <div className={`container mx-auto px-4 md:px-8 ${!isSearching && featuredMovies.length > 0 ? "pt-10 md:pt-12 relative z-20" : "pt-28"}`}>

        {/* Spotlight Section */}
        {!isSearching && topRatedData && (
          <div className="mb-12 md:mb-24 animate-slide-up relative">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2 md:gap-3">
                  <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-cinema-accent" />
                  {t("home.criticsChoice", language)}
                </h2>
                <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{t("home.highRatedGems", language)}</p>
              </div>

              {/* Slide Assistance Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => {
                    const el = document.getElementById("critics-scroll");
                    if (el) el.scrollBy({ left: -el.offsetWidth, behavior: "smooth" });
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cinema-accent transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("critics-scroll");
                    if (el) el.scrollBy({ left: el.offsetWidth, behavior: "smooth" });
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cinema-accent transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              id="critics-scroll"
              className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x scroll-smooth"
            >
              {topRatedData.results.slice(0, 12).map((movie) => (
                <div key={movie.id} className="shrink-0 w-40 sm:w-[calc(100%/3-1rem)] md:w-[calc(100%/4-1rem)] lg:w-[calc(100%/5-1rem)] xl:w-[calc(100%/6-1.1rem)] snap-start">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section header */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            {isSearching ? `${t("home.searchResultsFor", language)} "${searchQuery}"` : t("home.globalFeed", language)}
          </h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Grid with Load More */}
        {isBatchLoading && displayMovies.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mb-20">
            {[...Array(12)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mb-10">
              {displayMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Shimmer for loading next */}
            {isBatchLoading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mb-10">
                {[...Array(6)].map((_, i) => (
                  <MovieCardSkeleton key={`loading-${i}`} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center py-12">
                <button
                  onClick={handleLoadMore}
                  disabled={isBatchLoading}
                  className="group relative inline-flex items-center gap-3 px-12 py-4 bg-white/5 border border-white/10 hover:border-cinema-accent rounded-2xl text-white font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 hover:bg-white/10 disabled:opacity-50"
                >
                  {isBatchLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cinema-accent" />
                      {t("home.loadingBatch", language)}
                    </>
                  ) : (
                    <>
                      <span>{t("home.loadMore", language)}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}

            {!hasMore && displayMovies.length > 0 && (
              <div className="text-center py-12">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">{t("home.endOfResults", language)}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
