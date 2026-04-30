import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, X, Search, Shuffle } from "lucide-react";
import { useWatchlist } from "../context/WatchlistContext";
import { useSearch } from "../context/SearchContext";
import { useLanguage } from "../context/LanguageContext";
import { getTrendingMovies } from "../api/tmdbClient";
import { t } from "../utils/translations";

const Navbar = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const { searchQuery, setSearchQuery } = useSearch();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If user is not on Home page and types, redirect to Home
    if (value && location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSearchQuery(""); // Clear search when clicking logo
    } else {
      setSearchQuery(""); // Also clear search when navigating home via logo
    }
  };

  const handleSurpriseMe = async () => {
    try {
      const data = await getTrendingMovies(Math.floor(Math.random() * 5) + 1);
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      setSearchQuery("");
      navigate(`/movie/${randomMovie.id}`);
    } catch (error) {
      console.error("Failed to pick a random movie", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div
        className={`container mx-auto transition-all duration-300 rounded-2xl ${
          scrolled || isSearchOpen
            ? "glass-dark shadow-2xl py-2.5 px-6"
            : "bg-black/20 backdrop-blur-md border border-white/5 py-2.5 px-6"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className={`flex items-center group shrink-0 ${isSearchOpen ? "hidden md:flex" : "flex"}`}
          >
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
              CINE<span className="text-cinema-accent">HUB</span>
            </span>
          </Link>

          {/* Search Area */}
          <div className={`flex-1 flex items-center transition-all duration-300 ${isSearchOpen ? "max-w-2xl" : "max-w-0 md:max-w-xs"} relative`}>
             <div className={`w-full flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 transition-all ${isSearchOpen ? "opacity-100" : "opacity-0 md:opacity-100"}`}>
                <Search className="w-4 h-4 text-gray-500 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={t("search.placeholder", language)}
                  value={searchQuery}
                  onChange={onSearchChange}
                  className="w-full bg-transparent border-none outline-none text-sm text-white px-3 py-0.5 placeholder:text-gray-600 font-bold"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
             </div>
          </div>

          {/* Nav Links */}
          <div className={`items-center gap-1 ${isSearchOpen ? "hidden lg:flex" : "hidden md:flex"}`}>
            <button
              onClick={handleSurpriseMe}
              title={t("nav.surpriseMe", language)}
              className="p-2 rounded-lg text-gray-400 hover:text-cinema-accent hover:bg-white/5 transition-all"
            >
              <Shuffle className="w-5 h-5" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-2" />
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                location.pathname === "/" && !searchQuery
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setSearchQuery("")}
            >
              {t("nav.home", language)}
            </Link>
            <Link
              to="/watchlist"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                location.pathname === "/watchlist"
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  location.pathname === "/watchlist" ? "fill-cinema-rose text-cinema-rose" : ""
                }`}
              />
              <span className="hidden xl:inline">{t("nav.watchlist", language)}</span>
              {watchlist.length > 0 && (
                <span className="flex items-center justify-center bg-cinema-rose text-white text-[10px] font-black rounded-full w-4 h-4">
                  {watchlist.length}
                </span>
              )}
            </Link>
          </div>

          {/* Search Toggle (Mobile) */}
          <div className="flex items-center gap-1 md:hidden">
            <button 
              onClick={handleSurpriseMe}
              className="p-2 text-gray-400 hover:text-white"
            >
              <Shuffle className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSearchToggle}
              className="p-2 text-gray-400 hover:text-white"
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          {!isSearchOpen && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white ml-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden mt-2 transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-dark rounded-xl p-4 space-y-4">
          <div className="space-y-1">
            <Link
              to="/"
              className={`block px-4 py-3 rounded-xl text-sm font-bold ${
                location.pathname === "/" && !searchQuery ? "bg-white/10 text-white" : "text-gray-400"
              }`}
              onClick={() => setSearchQuery("")}
            >
              {t("nav.home", language)}
            </Link>
            <Link
              to="/watchlist"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${
                location.pathname === "/watchlist" ? "bg-white/10 text-white" : "text-gray-400"
              }`}
            >
              <Heart className={`w-5 h-5 ${location.pathname === "/watchlist" ? "fill-cinema-rose text-cinema-rose" : ""}`} />
              {t("nav.watchlist", language)}
              {watchlist.length > 0 && (
                <span className="ml-auto bg-cinema-rose text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
