import { useState, useEffect } from "react";
import { Search } from "lucide-react";
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
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:border-blue-500 transition duration-150 ease-in-out"
        placeholder="Search for movies..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
