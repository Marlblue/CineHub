import { useParams, Link } from "react-router-dom";
import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useMovieRecommendations,
} from "../hooks/useMovies";
import { useWatchlist } from "../context/WatchlistContext";
import { getImageUrl } from "../utils/image";
import { Star, Clock, Calendar, Heart, ArrowLeft, Play, X } from "lucide-react";
import { useState } from "react";
import SEO from "../components/SEO";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || "0");

  const {
    data: movie,
    isLoading: isMovieLoading,
    error: movieError,
  } = useMovieDetails(movieId);
  const { data: credits, isLoading: isCreditsLoading } =
    useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);
  const { data: recommendations } = useMovieRecommendations(movieId);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const [showTrailer, setShowTrailer] = useState(false);

  if (isMovieLoading || isCreditsLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-80 w-full bg-gray-800 rounded mb-4"></div>
          <div className="h-8 w-1/2 bg-gray-800 rounded mb-2"></div>
          <div className="h-4 w-1/3 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (movieError || !movie) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading movie details.
      </div>
    );
  }

  const isFavorite = isInWatchlist(movie.id);

  const trailer = videos?.results.find(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser"),
  );

  const handleWatchlistClick = () => {
    if (isFavorite) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="relative min-h-screen animate-fade-in">
      <SEO
        title={movie.title}
        description={movie.overview}
        image={getImageUrl(movie.poster_path)}
      />
      {/* Backdrop */}
      <div
        className="absolute inset-0 h-[50vh] bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, "w1280")})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-900/60 to-gray-900"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0 mx-auto md:mx-0">
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              srcSet={`
                ${getImageUrl(movie.poster_path, "w342")} 342w,
                ${getImageUrl(movie.poster_path, "w500")} 500w,
                ${getImageUrl(movie.poster_path, "w780")} 780w
              `}
              sizes="(max-width: 768px) 256px, 320px"
              alt={movie.title}
              className="w-64 md:w-80 rounded-lg shadow-2xl"
              loading="eager"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-gray-400 italic mb-4">{movie.tagline}</p>
            )}

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 mr-1 fill-current" />
                <span className="font-bold text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400 text-sm ml-1">
                  ({movie.vote_count} votes)
                </span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="w-5 h-5 mr-1" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 mr-1" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300 border border-gray-700"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleWatchlistClick}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isFavorite
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${isFavorite ? "fill-current" : ""}`}
                />
                {isFavorite ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>

              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Top Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {credits?.cast.slice(0, 6).map((actor) => (
              <Link
                to={`/person/${actor.id}`}
                key={actor.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group"
              >
                <div className="aspect-2/3 overflow-hidden">
                  <img
                    src={getImageUrl(actor.profile_path)}
                    alt={actor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-white truncate">
                    {actor.name}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {actor.character}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations && recommendations.results.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-white">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recommendations.results.slice(0, 5).map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="block bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  <div className="relative aspect-2/3">
                    <img
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold truncate text-white">
                      {movie.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-xs text-gray-400">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
