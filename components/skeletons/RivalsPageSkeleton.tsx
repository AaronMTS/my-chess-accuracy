"use client";

import { motion } from "motion/react";
import RivalSectionSkeleton from "./RivalSectionSkeleton";

export default function RivalsPageSkeleton() {
  return (
    <motion.div
      animate={{
        opacity: [1, 0.5, 1],
      }}
      transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
      className="space-y-8"
    >
      <div className="h-60 bg-surfaceLow rounded-2xl"></div>
      <RivalSectionSkeleton />
      <RivalSectionSkeleton />
    </motion.div>
  );
}
