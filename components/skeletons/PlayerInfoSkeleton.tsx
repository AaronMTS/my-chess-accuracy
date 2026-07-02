import SkeletonLoaderWrapper from "../loaders/SkeletonLoaderWrapper";

export default function PlayerInfoSkeleton() {
  return (
    <SkeletonLoaderWrapper>
      <div className="flex justify-start gap-2.5 items-center px-4.5 md:max-lg:justify-center md:max-lg:gap-0">
        <div className="shrink-0 bg-surfaceHigh size-7 rounded-sm outline outline-surfaceHighest"></div>
        <span className="space-y-1 md:max-lg:hidden overflow-hidden *:bg-surfaceHigh">
          <div className="h-4.5 w-27 rounded-sm"></div>
          <div className="h-3.5 w-13"></div>
        </span>
      </div>
    </SkeletonLoaderWrapper>
  );
}
