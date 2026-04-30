import { useParams, Link } from "react-router-dom";
import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useMovieRecommendations,
} from "../hooks/useMovies";
import { useWatchlist } from "../context/WatchlistContext";
import { useLanguage } from "../context/LanguageContext";
import { getImageUrl } from "../utils/image";
import MovieCard from "../components/MovieCard";
import {
  Star,
  Clock,
  Calendar,
  X,
  Loader2,
} from "lucide-react";
import { useState, useRef } from "react";
import SEO from "../components/SEO";
import { t } from "../utils/translations";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || "0");
  const { language } = useLanguage();

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

  if (isMovieLoading || isCreditsLoading) {
    return (
      <div className="min-h-screen bg-cinema-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cinema-accent" />
      </div>
    );
  }

  if (movieError || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cinema-dark">
        <div className="text-center p-8">
          <p className="text-red-400 font-black uppercase mb-4">{t("movie.errorLoading", language)}</p>
          <Link to="/" className="text-white underline text-xs uppercase">{t("movie.backHome", language)}</Link>
        </div>
      </div>
    );
  }

  const isFavorite = isInWatchlist(movie.id);
  const trailer = videos?.results.find(
    (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
  );

  const handleWatchlistClick = () => {
    if (isFavorite) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  };

  return (
    <div className="relative min-h-screen bg-cinema-dark">
      <SEO title={movie.title} description={movie.overview} image={getImageUrl(movie.poster_path)} />

      <div className="animate-fade-in">
        {/* Simplified Backdrop */}
        <div className="absolute inset-0 h-[60vh] -z-10">
          <img
            src={getImageUrl(movie.backdrop_path, "w1280")}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-cinema-dark" />
        </div>

        <div className="container mx-auto px-4 md:px-8 pt-28 pb-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Poster */}
            <div className="lg:w-1/4 shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5 aspect-[2/3]">
                <img
                  src={getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details - Clean Layout */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map(g => (
                  <span key={g.id} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-cinema-accent uppercase tracking-widest">
                    {g.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
                {movie.title}
              </h1>

              <p className="text-lg text-gray-400 font-medium mb-6 italic">{movie.tagline}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-cinema-accent fill-cinema-accent" /> {movie.vote_average.toFixed(1)}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {movie.runtime} {t("movie.mins", language)}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(movie.release_date).getFullYear()}</span>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl mb-8">
                <p className="text-gray-300 leading-relaxed font-medium">
                  {movie.overview}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleWatchlistClick}
                  className={`px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-200 ${isFavorite ? "bg-cinema-rose text-white" : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                >
                  {isFavorite ? t("movie.inWatchlist", language) : t("movie.addToWatchlist", language)}
                </button>
                {trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="px-8 py-3.5 bg-cinema-accent hover:bg-amber-500 text-black rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-200"
                  >
                    {t("movie.playTrailer", language)}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Simplified Grid Sections */}
          <div className="mt-24">
            <h2 className="text-xl font-black text-white uppercase mb-8 tracking-tight">{t("movie.theCast", language)}</h2>
            <div ref={castScrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
              {credits?.cast.slice(0, 10).map((actor) => (
                <Link to={`/person/${actor.id}`} key={actor.id} className="shrink-0 w-32 group">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-cinema-surface mb-3 border border-white/5">
                    <img src={getImageUrl(actor.profile_path)} alt={actor.name} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" loading="lazy" />
                  </div>
                  <p className="font-black text-white text-[10px] uppercase truncate">{actor.name}</p>
                  <p className="text-[9px] font-bold text-gray-500 uppercase truncate mt-0.5">{actor.character}</p>
                </Link>
              ))}
            </div>
          </div>

          {recommendations && recommendations.results.length > 0 && (
            <div className="mt-20">
              <h2 className="text-xl font-black text-white uppercase mb-8 tracking-tight">{t("movie.similarMovies", language)}</h2>
              <div ref={recsScrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
                {recommendations.results.slice(0, 10).map((recMovie) => (
                  <div key={recMovie.id} className="shrink-0 w-44 md:w-52">
                    <MovieCard movie={recMovie} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setShowTrailer(false)}>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/10 scale-in" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 text-white z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;