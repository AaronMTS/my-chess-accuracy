import { spaceGrotesk } from "../fonts";

export default function AnalyzePage() {
  return (
    <section className="space-y-6 p-8 mx-auto max-w-lg text-center">
      <div className="space-y-3">
        <h2 className={spaceGrotesk.className}>Initialize Analysis</h2>
        <p className="text-slate-400 text-sm">
          Enter a chess.com handle to a deep-dive <br />
          tactical breakdown of recent performance.
        </p>
      </div>
      <form
        action=""
        className="bg-surfaceLow p-6 flex flex-col items-start gap-3 rounded-xl"
      >
        <label
          htmlFor="username"
          className="text-[8px] text-primary tracking-widest font-bold uppercase"
        >
          Chess Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="e.g. hikaru"
          className={`w-full px-5 py-2.5 bg-surfaceLowest ${spaceGrotesk.className} rounded-md placeholder:text-slate-700`}
        />
        <button
          className={`w-full px-5 py-2.5 bg-linear-135 from-primary to-onPrimaryContainer ${spaceGrotesk.className} text-onPrimary font-bold rounded-md cursor-pointer`}
        >
          Start Analysis
        </button>
      </form>
    </section>
  );
}
