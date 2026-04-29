import React from "react";

const TopLoader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1">
      <div className="h-full bg-linear-to-r from-cinema-accent to-cinema-rose animate-[shimmer_2s_infinite_linear] bg-[length:200%_100%]" />
    </div>
  );
};

export default TopLoader;
