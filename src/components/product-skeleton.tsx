export default function ProductSkeleton() {
  return (
    <div className="border overflow-hidden shadow-md space-y-4 rounded-md mb-2">
      <div className="w-full bg-accent animate-pulse aspect-square rounded-md"></div>
      <div className="w-full h-6 bg-accent animate-pulse rounded-md"></div>
      <div className="w-full h-6 bg-accent animate-pulse rounded-md"></div>
    </div>
  );
}
