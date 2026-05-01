const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 animate-pulse">
    <div className="bg-stone-100 h-52 w-full" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-stone-100 rounded w-3/4" />
      <div className="h-3 bg-stone-100 rounded w-full" />
      <div className="h-3 bg-stone-100 rounded w-2/3" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-stone-100 rounded w-16" />
        <div className="h-8 bg-stone-100 rounded w-24" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;