export default function Opponent({ name }: { name: string }) {
  return (
    <div className="w-full flex gap-2 items-center">
      <span className="shrink-0 inline-block size-7 bg-surfaceHigh/50 rounded-lg"></span>
      <span className="text-sm font-semibold overflow-hidden text-ellipsis text-nowrap">
        vs. {name}
      </span>
    </div>
  );
}
