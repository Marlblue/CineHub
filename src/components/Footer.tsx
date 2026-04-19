import { Link } from "react-router-dom";
import { Film, Heart, Home, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-cinema-dark/80 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <Film className="w-7 h-7 text-cinema-accent" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-cinema-accent to-cinema-rose">
                CineHub
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Discover trending movies, explore genres, and build your personal
              watchlist. Powered by TMDB.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-cinema-accent transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/watchlist"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-cinema-accent transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Attribution */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Data Source
            </h3>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cinema-accent transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              The Movie Database (TMDB)
            </a>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} CineHub. Built with React & TMDB API.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
