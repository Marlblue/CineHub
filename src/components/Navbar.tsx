import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Heart, Menu, X } from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext";

const Navbar = () => {
  const location = useLocation();
  const { watchlist } = useWatchlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cinema-dark/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5"
          : "bg-linear-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Film className="w-8 h-8 text-cinema-accent transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-cinema-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cinema-accent to-cinema-rose tracking-tight">
              CineHub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                location.pathname === "/"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Home
              {location.pathname === "/" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-linear-to-r from-cinema-accent to-cinema-rose rounded-full" />
              )}
            </Link>
            <Link
              to="/watchlist"
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                location.pathname === "/watchlist"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  location.pathname === "/watchlist"
                    ? "fill-cinema-rose text-cinema-rose"
                    : ""
                }`}
              />
              Watchlist
              {watchlist.length > 0 && (
                <span className="absolute -top-0.5 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-cinema-rose text-white text-[10px] font-bold rounded-full px-1">
                  {watchlist.length}
                </span>
              )}
              {location.pathname === "/watchlist" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-linear-to-r from-cinema-accent to-cinema-rose rounded-full" />
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-48 border-t border-white/5" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-3 bg-cinema-dark/95 backdrop-blur-xl space-y-1">
          <Link
            to="/"
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "bg-white/5 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Home
          </Link>
          <Link
            to="/watchlist"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === "/watchlist"
                ? "bg-white/5 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Heart className="w-4 h-4" />
            Watchlist
            {watchlist.length > 0 && (
              <span className="min-w-[18px] h-[18px] flex items-center justify-center bg-cinema-rose text-white text-[10px] font-bold rounded-full px-1">
                {watchlist.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
