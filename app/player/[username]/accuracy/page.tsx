import Navbar from "@/components/Navbar";

export default function AccuracyPage() {
  return (
    <div className="space-y-4 grow max-h-dvh bg-slate-950 overflow-auto">
      <Navbar />
      <main className="space-y-6 px-6">
        <section className="flex gap-12 justify-between items-center p-6 bg-surface rounded-lg">
          <div>
            <small className="text-onSurfaceLow text-xs font-semibold tracking-wide uppercase">
              Technical Proficiency
            </small>
            <h2>Overall Accuracy</h2>
            <small className="text-primary text-xs font-semibold tracking-wide uppercase">
              Based on 1,248 games analyzed
            </small>
          </div>
          <div className="relative size-40">
            <svg
              className="size-full -rotate-90"
              viewBox="0 0 480 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="240"
                cy="240"
                r="222"
                className="stroke-surfaceHighest"
                strokeWidth="28"
              />
              <circle
                cx="240"
                cy="240"
                r="222"
                className="stroke-primary"
                strokeWidth="28"
                strokeDasharray={2 * Math.PI * 222}
                strokeDashoffset={2 * Math.PI * 222 * (1 - 0.845)}
                strokeLinecap="round"
              />
            </svg>
            <h2 className="absolute top-1/2 left-1/2 -translate-1/2">84.5%</h2>
          </div>
        </section>
      </main>
    </div>
  );
}
