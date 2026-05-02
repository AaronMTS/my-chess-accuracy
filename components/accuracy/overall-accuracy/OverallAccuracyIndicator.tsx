"use client";

import { motion } from "motion/react";

export default function OverallAccuracyIndicator({
  accuracy,
}: {
  accuracy: number;
}) {
  const strokeCircumference = 2 * Math.PI * 222;
  const strokeOffset = 2 * Math.PI * 222 * (1 - accuracy / 100);

  return (
    <>
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
        <motion.circle
          cx="240"
          cy="240"
          r="222"
          className="stroke-primary"
          strokeWidth="28"
          strokeDasharray={strokeCircumference}
          initial={{ strokeDashoffset: strokeCircumference - 1 }}
          animate={{
            strokeDashoffset: [strokeCircumference - 1, strokeOffset],
          }}
          transition={{ strokeDashoffset: { duration: 1.5 } }}
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}
