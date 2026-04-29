const MovieCardSkeleton = () => {
  return (
    <div className="rounded-2xl overflow-hidden bg-cinema-card border border-white/5">
      {/* Poster skeleton */}
      <div className="relative aspect-[2/3] bg-cinema-surface overflow-hidden">
        <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%]" />
      </div>
      {/* Info skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-cinema-surface rounded-lg w-5/6 overflow-hidden relative">
           <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%]" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-cinema-surface rounded-lg w-1/4 overflow-hidden relative">
            <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%]" />
          </div>
          <div className="h-3 bg-cinema-surface rounded-lg w-1/3 overflow-hidden relative">
            <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
