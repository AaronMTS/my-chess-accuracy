import { spaceGrotesk } from "@/app/fonts";

export default function WinOrLossCard({
  result,
  amount,
}: {
  result: "win" | "loss";
  amount: number;
}) {
  return (
    <span className="space-y-3 bg-surfaceLowest p-3 rounded-lg">
      <p className="text-onSurfaceLow text-[10px] leading-2.5 font-semibold">
        {`TOTAL ${result === "win" ? "WINS" : "LOSSES"}`}
      </p>
      <h5
        className={`${spaceGrotesk.className} ${result === "win" ? "text-primary" : "text-error"} leading-4.5 sm:leading-5 tracking-normal`}
      >
        {amount}
      </h5>
    </span>
  );
}
