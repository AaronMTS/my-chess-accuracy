import { type LucideIcon } from "lucide-react";

export default function TertiaryHeaderEyebrow({
  icon: Icon,
  children,
}: {
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${Icon ? "flex gap-1.5 items-center w-fit" : ""} px-3 py-1 bg-tertiaryContainer text-[10px] text-tertiary font-bold tracking-widest uppercase rounded-full`}
    >
      {Icon && (
        <Icon className="fill-tertiary stroke-tertiaryContainer" size={14} />
      )}
      <span>{children}</span>
    </div>
  );
}
