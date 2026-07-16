import { ChartNoAxesCombined, Trophy } from "lucide-react";

export default function NoRivalsFallback() {
  return (
    <div className="relative space-y-5 bg-surfaceHigher p-10 rounded-2xl text-center outline-1 outline-surfaceBright overflow-hidden *:mx-auto">
      <div className="size-fit bg-primary/20 text-primary p-6 rounded-xl">
        <ChartNoAxesCombined size={48} />
      </div>
      <h3 className="font-heading font-bold tracking-[-0.35px]">
        Incomplete Landscape
      </h3>
      <p className="relative z-10 mb-0 text-onSurfaceLow leading-relaxed max-w-lg">
        Play at least{" "}
        <span className="text-primary font-semibold">15 games</span> against the
        same opponent to see who you beat most often and who gives you the most
        trouble.
      </p>
      <Trophy
        size={172}
        className="absolute -bottom-6 -right-6 stroke-onSurface rotate-15 opacity-10"
      />
    </div>
  );
}
