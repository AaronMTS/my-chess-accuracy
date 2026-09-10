import { Gauge, Sun, Timer, Zap, type LucideIcon } from "lucide-react";

const MODE_ICONS: Record<string, LucideIcon> = {
  rapid: Timer,
  blitz: Zap,
  bullet: Gauge,
  daily: Sun,
};

export default function GameMode({
  mode,
  isHighlight = false,
}: {
  mode: string;
  isHighlight?: boolean;
}) {
  const formattedMode = mode.toLowerCase();

  let Icon;
  if (Object.hasOwn(MODE_ICONS, formattedMode)) {
    Icon = MODE_ICONS[formattedMode];
  }

  let iconSize = 10.5;
  let iconStyling = "shrink-0";
  let labelStyling = "text-[10px] uppercase";

  if (isHighlight) {
    iconSize = 13.5;
    iconStyling = `${iconStyling} text-primary`;
    labelStyling = "text-sm capitalize";
  }

  return (
    <span className="flex gap-1.5 items-center text-onSurfaceLow">
      {Icon && <Icon className={iconStyling} size={iconSize} />}
      <span className={`${labelStyling} font-bold tracking-wide`}>{mode}</span>
    </span>
  );
}
