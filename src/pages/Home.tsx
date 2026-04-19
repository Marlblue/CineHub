import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useTrendingMovies,
  useSearchMovies,
  useGenres,
  useDiscoverMovies,
} from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import SearchBar from "../components/SearchBar";
import { Loader2, Star, TrendingUp, Sparkles } from "lucide-react";
import SEO from "../components/SEO";
import { getImageUrl } from "../utils/image";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const { data: genresData } = useGenres();

  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    error: trendingError,
    fetchNextPage: fetchNextTrending,
    hasNextPage: hasNextTrending,
    isFetchingNextPage: isFetchingNextTrending,
  } = useTrendingMovies();

  const {
    data: discoverData,
    isLoading: isDiscoverLoading,
    error: discoverError,
    fetchNextPage: fetchNextDiscover,
    hasNextPage: hasNextDiscover,
    isFetchingNextPage: isFetchingNextDiscover,
  } = useDiscoverMovies(selectedGenre);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
    fetchNextPage: fetchNextSearch,
    hasNextPage: hasNextSearch,
    isFetchingNextPage: isFetchingNextSearch,
  } = useSearchMovies(searchQuery);

  const isSearching = !!searchQuery;
  const isFiltering = !!selectedGenre && !isSearching;

  const getActiveContent = () => {
    if (isSearching) {
      return {
        isLoading: isSearchLoading,
        error: searchError,
        movies: searchData?.pages.flatMap((page) => page.results),
        hasNextPage: hasNextSearch,
        isFetchingNextPage: isFetchingNextSearch,
        fetchNextPage: fetchNextSearch,
      };
    }
    if (isFiltering) {
      return {
        isLoading: isDiscoverLoading,
        error: discoverError,
        movies: discoverData?.pages.flatMap((page) => page.results),
        hasNextPage: hasNextDiscover,
        isFetchingNextPage: isFetchingNextDiscover,
        fetchNextPage: fetchNextDiscover,
      };
    }
    return {
      isLoading: isTrendingLoading,
      error: trendingError,
      movies: trendingData?.pages.flatMap((page) => page.results),
      hasNextPage: hasNextTrending,
      isFetchingNextPage: isFetchingNextTrending,
      fetchNextPage: fetchNextTrending,
    };
  };

  const {
    isLoading,
    error,
    movies,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = getActiveContent();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) setSelectedGenre(null); // Reset genre filter when searching
  };

  const handleGenreClick = (id: number) => {
    setSelectedGenre((prev) => (prev === id ? null : id));
    setSearchQuery(""); // Reset search when filtering by genre
  };

  // Featured movie for hero section
  const featuredMovie = trendingData?.pages[0]?.results[0];

  return (
    <div className="animate-fade-in">
      <SEO title="Home" />

      {/* Hero Section — only shows when browsing trending (no search/filter) */}
      {!isSearching && !isFiltering && featuredMovie && (
        <section className="relative min-h-[480px] h-[75vh] md:h-[80vh] md:min-h-[600px] w-full overflow-hidden">
          {/* Backdrop image */}
          <img
            src={getImageUrl(featuredMovie.backdrop_path, "w1280")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-cinema-dark via-cinema-dark/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-cinema-dark/80 via-cinema-dark/30 to-transparent" />

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 pb-24 md:pb-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-2xl animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-cinema-accent/20 border border-cinema-accent/30 rounded-full text-cinema-accent text-xs font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    Trending #1
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    <Star className="w-3 h-3 text-cinema-accent fill-cinema-accent" />
                    {featuredMovie.vote_average.toFixed(1)}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                  {featuredMovie.title}
                </h1>

                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6 line-clamp-3">
                  {featuredMovie.overview}
                </p>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/movie/${featuredMovie.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cinema-accent hover:bg-amber-500 text-black font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cinema-accent/25 text-sm"
                    id="hero-view-details"
                  >
                    <Sparkles className="w-4 h-4" />
                    View Details
                  </Link>
                  <span className="text-sm text-gray-400">
                    {featuredMovie.release_date
                      ? new Date(featuredMovie.release_date).getFullYear()
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main content area */}
      <div
        className={`container mx-auto px-4 md:px-6 ${!isSearching && !isFiltering && featuredMovie ? "-mt-12 relative z-20" : "pt-24"
          }`}
      >
        {/* Search bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Genre Filter */}
        {!isSearching && genresData && (
          <div className="mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedGenre(null)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${selectedGenre === null
                  ? "bg-cinema-accent text-black border-cinema-accent shadow-lg shadow-cinema-accent/30 scale-105"
                  : "bg-cinema-card/60 text-gray-400 border-cinema-border hover:text-white hover:border-gray-500 hover:bg-cinema-card"
                  }`}
              >
                All
              </button>
              {genresData.genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border whitespace-nowrap ${selectedGenre === genre.id
                    ? "bg-cinema-accent text-black border-cinema-accent shadow-lg shadow-cinema-accent/30 scale-105"
                    : "bg-cinema-card/60 text-gray-400 border-cinema-border hover:text-white hover:border-gray-500 hover:bg-cinema-card"
                    }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-12 bg-red-500/5 border border-red-500/20 rounded-xl mb-8">
            <p className="text-red-400 font-medium">
              Something went wrong:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {[...Array(10)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {isSearching
                  ? `Results for "${searchQuery}"`
                  : isFiltering
                    ? `${genresData?.genres.find((g) => g.id === selectedGenre)?.name} Movies`
                    : "Trending This Week"}
              </h2>
              <div className="flex-1 h-px bg-linear-to-r from-cinema-border to-transparent" />
            </div>

            {/* Empty state */}
            {movies?.length === 0 && (
              <div className="text-center py-20 bg-cinema-card/50 border border-cinema-border rounded-xl">
                <p className="text-gray-500 text-lg">No movies found.</p>
                <p className="text-gray-600 text-sm mt-1">
                  Try a different search or genre.
                </p>
              </div>
            )}

            {/* Movie grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5 mb-8">
              {movies?.map((movie) => (
                <MovieCard
                  key={`${movie.id}-${movie.genre_ids?.join("-")}`}
                  movie={movie}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <div className="flex justify-center py-8">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="group flex items-center gap-2 px-8 py-3 bg-cinema-card hover:bg-cinema-surface text-white rounded-xl font-semibold transition-all duration-300 border border-cinema-border hover:border-cinema-accent/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:shadow-lg hover:shadow-cinema-accent/5"
                  id="load-more-movies"
                >
                  {isFetchingNextPage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading more...
                    </>
                  ) : (
                    "Load More Movies"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
