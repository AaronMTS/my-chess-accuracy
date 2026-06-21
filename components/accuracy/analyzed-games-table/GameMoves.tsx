export default function GameMoves({ moves }: { moves: number }) {
  return (
    <span className="px-2.5 py-1 bg-surfaceHighest text-onSurfaceLow text-xs text-nowrap font-bold rounded-full">
      {moves} move{moves === 1 ? "" : "s"}
    </span>
  );
}
