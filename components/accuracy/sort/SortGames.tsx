import { FileChartColumnIncreasing, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import SortGamesBtn from "./SortGamesBtn";

export default function SortGames({
  hideSortGames,
}: {
  hideSortGames: () => void;
}) {
  return (
    <>
      <div
        onClick={hideSortGames}
        className="fixed top-0 right-0 z-40 size-full"
      ></div>
      <motion.div
        initial={{ y: -15, height: 15, opacity: 0 }}
        animate={{ y: 0, height: "auto", opacity: 1 }}
        exit={{ height: 10, opacity: 0 }}
        className="space-y-3 absolute right-0 z-40 mt-2 w-54 bg-surfaceHighest p-3 rounded-lg overflow-hidden"
      >
        <p className="text-onSurfaceLow text-[10px] font-black tracking-widest opacity-50">
          SORT BY
        </p>
        <hr className="border-onSurfaceLow opacity-20" />
        <SortGamesBtn Icon={FileChartColumnIncreasing} sortBy="ACCURACY" />
        <SortGamesBtn Icon={TrendingUp} sortBy="RATING" />
      </motion.div>
    </>
  );
}
