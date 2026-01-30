import { useParams, Link } from "react-router-dom";
import { usePersonDetails, usePersonMovieCredits } from "../hooks/usePerson";
import { getImageUrl } from "../utils/image";
import MovieCard from "../components/MovieCard";
import { ArrowLeft, Calendar, MapPin, Loader } from "lucide-react";
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

  if (isPersonLoading || isCreditsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (personError || !person) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading person details.
      </div>
    );
  }

  // Filter out movies without poster and sort by popularity (descending)
  // Note: API doesn't return popularity in credits usually, but we can sort by release date or just take them as is.
  // Let's filter out ones without posters to keep UI clean.
  const knownForMovies =
    credits?.cast
      .filter((movie) => movie.poster_path)
      .sort((a, b) => {
        // Sort by popularity if available, otherwise release date
        // Since the lightweight movie object in credits might not have popularity,
        // we can rely on the API's default order or sort by vote_count
        return (b.vote_average || 0) - (a.vote_average || 0);
      })
      .slice(0, 20) || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20 animate-fade-in">
      <SEO
        title={person.name}
        description={person.biography}
        image={getImageUrl(person.profile_path)}
      />
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="shrink-0 mx-auto md:mx-0">
            <img
              src={getImageUrl(person.profile_path, "w500")}
              srcSet={`
                ${getImageUrl(person.profile_path, "w342")} 342w,
                ${getImageUrl(person.profile_path, "w500")} 500w,
                ${getImageUrl(person.profile_path, "h632")} 632w
              `}
              sizes="(max-width: 768px) 256px, 320px"
              alt={person.name}
              className="w-64 md:w-80 rounded-lg shadow-2xl object-cover"
              loading="eager"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{person.name}</h1>

            <div className="flex flex-wrap gap-6 mb-6 text-gray-300">
              {person.birthday && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    Born: {new Date(person.birthday).toLocaleDateString()}
                  </span>
                </div>
              )}
              {person.place_of_birth && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{person.place_of_birth}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Biography</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {person.biography || "No biography available."}
              </p>
            </div>
          </div>
        </div>

        {/* Known For */}
        {knownForMovies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Known For</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {knownForMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetail;
