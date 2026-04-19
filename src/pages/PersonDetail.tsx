import { useParams, Link } from "react-router-dom";
import { usePersonDetails, usePersonMovieCredits } from "../hooks/usePerson";
import { getImageUrl } from "../utils/image";
import MovieCard from "../components/MovieCard";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useState } from "react";
import SEO from "../components/SEO";

const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const personId = parseInt(id || "0");

  const {
    data: person,
    isLoading: isPersonLoading,
    error: personError,
  } = usePersonDetails(personId);
  const { data: credits, isLoading: isCreditsLoading } =
    usePersonMovieCredits(personId);

  const [showFullBio, setShowFullBio] = useState(false);
  const filmographyRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (filmographyRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      filmographyRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isPersonLoading || isCreditsLoading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4 md:px-6 animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-64 h-96 bg-cinema-surface rounded-2xl shrink-0 mx-auto md:mx-0" />
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-cinema-surface rounded-lg w-1/2" />
              <div className="h-5 bg-cinema-surface rounded-lg w-1/4" />
              <div className="h-32 bg-cinema-surface rounded-lg w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (personError || !person) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-cinema-card border border-cinema-border rounded-2xl p-12">
          <p className="text-red-400 text-lg font-medium mb-4">
            Error loading person details.
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

  // Filter out movies without poster and sort by rating
  const knownForMovies =
    credits?.cast
      .filter((movie) => movie.poster_path)
      .sort((a, b) => {
        return (b.vote_average || 0) - (a.vote_average || 0);
      })
      .slice(0, 20) || [];

  const biography = person.biography || "No biography available.";
  const shouldTruncateBio = biography.length > 500;

  return (
    <div className="min-h-screen text-white pb-20 animate-fade-in">
      <SEO
        title={person.name}
        description={person.biography}
        image={getImageUrl(person.profile_path)}
      />
      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
          {/* Profile Image */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative">
              <img
                src={getImageUrl(person.profile_path, "w500")}
                srcSet={`
                  ${getImageUrl(person.profile_path, "w342")} 342w,
                  ${getImageUrl(person.profile_path, "w500")} 500w,
                  ${getImageUrl(person.profile_path, "h632")} 632w
                `}
                sizes="(max-width: 768px) 256px, 288px"
                alt={person.name}
                className="w-56 md:w-72 rounded-2xl shadow-2xl shadow-black/50 object-cover border border-white/5"
                loading="eager"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-cinema-accent/5 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight">
              {person.name}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              {person.birthday && (
                <div className="flex items-center gap-2 text-gray-400 text-sm bg-cinema-card border border-cinema-border rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 text-cinema-accent" />
                  <span>
                    Born: {new Date(person.birthday).toLocaleDateString()}
                  </span>
                </div>
              )}
              {person.place_of_birth && (
                <div className="flex items-center gap-2 text-gray-400 text-sm bg-cinema-card border border-cinema-border rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 text-cinema-rose" />
                  <span>{person.place_of_birth}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-200">
                Biography
              </h2>
              <div className="relative">
                <p
                  className={`text-gray-400 leading-relaxed text-sm whitespace-pre-line ${
                    shouldTruncateBio && !showFullBio ? "line-clamp-6" : ""
                  }`}
                >
                  {biography}
                </p>
                {shouldTruncateBio && (
                  <button
                    onClick={() => setShowFullBio(!showFullBio)}
                    className="mt-2 text-cinema-accent hover:text-amber-400 text-sm font-medium transition-colors"
                  >
                    {showFullBio ? "Show less" : "Read more..."}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Known For — Filmography Grid */}
        {knownForMovies.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">Known For</h2>
                <span className="text-xs text-gray-500 bg-cinema-card border border-cinema-border rounded-full px-3 py-1">
                  {knownForMovies.length} films
                </span>
                <div className="flex-1 h-px bg-linear-to-r from-cinema-border to-transparent ml-2" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="p-2 rounded-full bg-cinema-card border border-cinema-border hover:border-cinema-accent/30 text-gray-400 hover:text-white transition-all"
                  aria-label="Scroll filmography left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="p-2 rounded-full bg-cinema-card border border-cinema-border hover:border-cinema-accent/30 text-gray-400 hover:text-white transition-all"
                  aria-label="Scroll filmography right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              ref={filmographyRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x"
            >
              {knownForMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="shrink-0 snap-start w-[180px] md:w-[200px]"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetail;
