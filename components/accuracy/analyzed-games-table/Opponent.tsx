export default function Opponent({ name }: { name: string }) {
  return (
    <div className="w-full overflow-hidden text-ellipsis">
      <span className="text-sm font-semibold text-nowrap" title={name}>
        vs. {name}
      </span>
    </div>
  );
}
