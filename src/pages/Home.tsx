import { useState } from "react";
import {
  useTrendingMovies,
  useSearchMovies,
  useGenres,
  useDiscoverMovies,
} from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import SearchBar from "../components/SearchBar";
import { Loader2 } from "lucide-react";
import SEO from "../components/SEO";

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

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <SEO title="Home" />
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">
          CineHub
        </h1>
        <p className="text-gray-400 mb-6">Discover trending movies and more</p>
        <SearchBar onSearch={handleSearch} />

        {/* Genre Filter */}
        {!isSearching && genresData && (
          <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedGenre(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === null
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All
            </button>
            {genresData.genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedGenre === genre.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {error && (
        <div className="text-center text-red-500 py-8">
          Something went wrong:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">
            {isSearching
              ? `Search Results for "${searchQuery}"`
              : isFiltering
                ? `${genresData?.genres.find((g) => g.id === selectedGenre)?.name} Movies`
                : "Trending This Week"}
          </h2>

          {movies?.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No movies found.
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
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
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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
  );
};

export default Home;
