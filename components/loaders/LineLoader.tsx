"use client";

import { motion } from "motion/react";

export default function LineLoader() {
  return (
    <div className="relative h-1.5 w-full bg-surfaceLowest rounded-full overflow-hidden">
      <motion.span
        className="absolute top-0 left-0 bg-primary h-full w-1/3 rounded-full origin-left"
        initial={{
          x: "-100%",
        }}
        animate={{
          scaleX: [1, 2, 2.05, 1.2, 1],
          x: ["-100%", "50%", "40%", "300%"],
        }}
        transition={{
          scaleX: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.5, 0.6, 0.75, 1],
          },
          x: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.5, 0.6, 1],
          },
        }}
      ></motion.span>
    </div>
  );
}
