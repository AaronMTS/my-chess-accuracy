"use client";

import { motion } from "motion/react";

export default function AccuracyPageSkeleton() {
  return (
    <motion.div
      animate={{
        opacity: [1, 0.5, 1],
      }}
      transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
      className="size-full flex flex-col gap-8"
    >
      <div className="shrink-0 h-[35%] bg-surfaceLow rounded-lg"></div>
      <div className="grow bg-surfaceLow rounded-lg"></div>
    </motion.div>
  );
}
