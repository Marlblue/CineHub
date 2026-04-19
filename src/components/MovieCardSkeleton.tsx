const MovieCardSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-cinema-card border border-cinema-border/20">
      {/* Poster skeleton with shimmer */}
      <div className="relative aspect-2/3 bg-cinema-surface overflow-hidden">
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>
      {/* Info skeleton */}
      <div className="p-3.5 space-y-2.5">
        <div className="h-4 bg-cinema-surface rounded-md w-3/4" />
        <div className="h-3 bg-cinema-surface rounded-md w-1/3" />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
