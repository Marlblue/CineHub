import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import SEO from "../components/SEO";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in">
      <SEO title="404 Not Found" />
      <div className="bg-gray-800 p-8 rounded-full mb-6 bg-opacity-50">
        <AlertTriangle className="w-16 h-16 text-yellow-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        Page Not Found
      </h1>
      <p className="text-gray-400 text-lg mb-8 max-w-md">
        Oops! The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
