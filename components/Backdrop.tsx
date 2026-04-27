export default function Backdrop({ handleClick }: { handleClick: () => void }) {
  return (
    <div
      onClick={handleClick}
      className="fixed top-0 left-0 z-30 size-full bg-black/80"
    ></div>
  );
}
