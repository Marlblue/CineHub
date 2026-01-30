const MovieCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
      <div className="w-full aspect-2/3 bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded mb-2 w-3/4"></div>
        <div className="flex justify-between mb-2">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
