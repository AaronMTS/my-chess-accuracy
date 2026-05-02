import { Gauge, Timer, Zap } from "lucide-react";

const MODE_ICONS: Record<string, React.ReactNode> = {
  rapid: <Timer className="shrink-0" size={10.5} />,
  blitz: <Zap className="shrink-0" size={10.5} />,
  bullet: <Gauge className="shrink-0" size={10.5} />,
};

export default function GameMode({ mode }: { mode: string }) {
  return (
    <div className="flex gap-1.5 items-center text-onSurfaceLow">
      {Object.hasOwn(MODE_ICONS, mode) && MODE_ICONS[mode]}
      <span className="text-[10px] font-bold uppercase tracking-wide">
        {mode}
      </span>
    </div>
  );
}
