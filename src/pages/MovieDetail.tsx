import { useParams, Link } from "react-router-dom";
import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useMovieRecommendations,
} from "../hooks/useMovies";
import { useWatchlist } from "../context/WatchlistContext";
import { getImageUrl } from "../utils/image";
import MovieCard from "../components/MovieCard";
import {
  Star,
  Clock,
  Calendar,
  Heart,
  ArrowLeft,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef } from "react";
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
  const castScrollRef = useRef<HTMLDivElement>(null);
  const recsScrollRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right",
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (isMovieLoading || isCreditsLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 md:px-6 animate-pulse">
          <div className="h-[50vh] w-full bg-cinema-surface rounded-2xl mb-8" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-64 h-96 bg-cinema-surface rounded-xl shrink-0" />
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-cinema-surface rounded-lg w-2/3" />
              <div className="h-5 bg-cinema-surface rounded-lg w-1/3" />
              <div className="h-24 bg-cinema-surface rounded-lg w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (movieError || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-cinema-card border border-cinema-border rounded-2xl p-12">
          <p className="text-red-400 text-lg font-medium mb-4">
            Error loading movie details.
          </p>
          <Link
            to="/"
            className="text-cinema-accent hover:underline text-sm"
          >
            ← Back to Home
          </Link>
        </div>
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

  const getRatingColor = (rating: number) => {
    if (rating >= 7) return "text-emerald-400 border-emerald-400/30";
    if (rating >= 5) return "text-cinema-accent border-cinema-accent/30";
    return "text-red-400 border-red-400/30";
  };

  return (
    <div className="relative min-h-screen animate-fade-in">
      <SEO
        title={movie.title}
        description={movie.overview}
        image={getImageUrl(movie.poster_path)}
      />

      {/* Cinematic backdrop */}
      <div className="absolute inset-0 h-[70vh] overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path, "w1280")}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-cinema-dark via-cinema-dark/70 to-cinema-dark/30" />
        <div className="absolute inset-0 bg-linear-to-r from-cinema-dark/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-28 relative z-10">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Poster */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative group">
              <img
                src={getImageUrl(movie.poster_path, "w500")}
                srcSet={`
                  ${getImageUrl(movie.poster_path, "w342")} 342w,
                  ${getImageUrl(movie.poster_path, "w500")} 500w,
                  ${getImageUrl(movie.poster_path, "w780")} 780w
                `}
                sizes="(max-width: 768px) 256px, 320px"
                alt={movie.title}
                className="w-56 md:w-72 rounded-2xl shadow-2xl shadow-black/50 border border-white/5"
                loading="eager"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 tracking-tight leading-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-gray-400 italic mb-5 text-sm md:text-base">
                "{movie.tagline}"
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Rating ring */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getRatingColor(movie.vote_average)}`}
              >
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-sm">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-500 text-xs">
                  ({movie.vote_count.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>

            {/* Genre tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10 font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2 text-gray-200">
                Overview
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {movie.overview}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWatchlistClick}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm ${
                  isFavorite
                    ? "bg-cinema-rose/20 border border-cinema-rose/40 text-cinema-rose hover:bg-cinema-rose/30"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                }`}
                id="watchlist-toggle"
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                />
                {isFavorite ? "In Watchlist" : "Add to Watchlist"}
              </button>

              {trailer && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-cinema-accent hover:bg-amber-500 text-black transition-all duration-300 text-sm hover:shadow-lg hover:shadow-cinema-accent/25"
                  id="watch-trailer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cast Section — Horizontal Carousel */}
        {credits && credits.cast.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Top Cast</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel(castScrollRef, "left")}
                  className="p-2 rounded-full bg-cinema-card border border-cinema-border hover:border-cinema-accent/30 text-gray-400 hover:text-white transition-all"
                  aria-label="Scroll cast left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel(castScrollRef, "right")}
                  className="p-2 rounded-full bg-cinema-card border border-cinema-border hover:border-cinema-accent/30 text-gray-400 hover:text-white transition-all"
                  aria-label="Scroll cast right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              ref={castScrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x"
            >
              {credits.cast.slice(0, 12).map((actor) => (
                <Link
                  to={`/person/${actor.id}`}
                  key={actor.id}
                  className="shrink-0 snap-start w-[130px] group"
                >
                  <div className="aspect-2/3 rounded-xl overflow-hidden bg-cinema-surface mb-2.5">
                    <img
                      src={getImageUrl(actor.profile_path)}
                      alt={actor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-semibold text-white text-xs truncate group-hover:text-cinema-accent transition-colors">
                    {actor.name}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {actor.character}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations — Horizontal Carousel */}
        {recommendations && recommendations.results.length > 0 && (
          <div className="mt-16 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                You Might Also Like
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel(recsScrollRef, "left")}
                  className="p-2 rounded-full bg-cinema-card border border-cinema-border hover:border-cinema-accent/30 text-gray-400 hover:text-white transition-all"
                  aria-label="Scroll recommendations left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel(recsScrollRef, "right")}
                  className="p-2 rounded-full bg-cinema-card border border-cinema-border hover:border-cinema-accent/30 text-gray-400 hover:text-white transition-all"
                  aria-label="Scroll recommendations right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              ref={recsScrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x"
            >
              {recommendations.results.slice(0, 10).map((recMovie) => (
                <div
                  key={recMovie.id}
                  className="shrink-0 snap-start w-[180px] md:w-[200px]"
                >
                  <MovieCard movie={recMovie} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 bg-black/50 backdrop-blur-sm rounded-full p-2.5 transition-colors"
              aria-label="Close trailer"
            >
              <X className="w-5 h-5" />
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
