export default function HeaderEyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <small className="px-3 py-1 bg-primary/10 text-[10px] text-primary font-bold tracking-widest uppercase rounded-full">
        {children}
      </small>
    </div>
  );
}
