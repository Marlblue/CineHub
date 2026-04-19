import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full gap-4">
      {/* Cinema-themed spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-2 border-cinema-border" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cinema-accent animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-cinema-rose animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
      </div>
      <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
