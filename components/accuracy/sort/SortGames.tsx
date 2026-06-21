import {
  FileChartColumnIncreasing,
  ListOrdered,
  TrendingUp,
} from "lucide-react";
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
        className="space-y-4 absolute right-0 z-40 mt-4 w-54 bg-surfaceHighest p-4 rounded-lg overflow-hidden"
      >
        <p className="text-onSurfaceLow text-[10px] font-black tracking-widest opacity-50">
          SORT BY
        </p>
        <hr className="border-onSurfaceLow opacity-20" />
        <SortGamesBtn Icon={FileChartColumnIncreasing} sortBy="accuracy" />
        <SortGamesBtn Icon={TrendingUp} sortBy="rating" />
        <SortGamesBtn Icon={ListOrdered} sortBy="moves" />
      </motion.div>
    </>
  );
}
