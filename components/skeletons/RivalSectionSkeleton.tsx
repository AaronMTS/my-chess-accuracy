export default function RivalSectionSkeleton() {
  return (
    <div className="space-y-4 [&>div]:not-last:bg-surfaceLow">
      <div className="w-41 h-8"></div>
      <div className="w-88 h-5"></div>
      <hr className="border-surfaceHigher" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 *:bg-surfaceLow *:rounded-2xl">
        <div className="h-63.5"></div>
        <div className="h-63.5"></div>
        <div className="h-63.5"></div>
      </div>
    </div>
  );
}
