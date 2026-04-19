import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      {/* Glow effect on focus */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-cinema-accent/20 to-cinema-rose/20 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-center">
        <div className="absolute left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500 group-focus-within:text-cinema-accent transition-colors duration-300" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-12 py-3.5 border border-cinema-border rounded-xl bg-cinema-card/80 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:border-cinema-accent/50 focus:bg-cinema-card transition-all duration-300 text-sm"
          placeholder="Search for movies..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="search-movies"
        />
        {value && (
          <button
            onClick={() => setValue("")}
            className="absolute right-4 p-1 text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
