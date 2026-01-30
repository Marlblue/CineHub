import { Link, useLocation } from "react-router-dom";
import { Film, Heart } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-600">
              CineHub
            </span>
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/watchlist"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/watchlist"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4 mr-1.5" />
              Watchlist
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
