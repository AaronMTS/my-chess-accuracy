"use client";

import { motion } from "motion/react";

export default function SkeletonLoaderWrapper({
  classes,
  children,
}: {
  classes?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{
        opacity: [1, 0.5, 1],
      }}
      transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
      className={classes}
    >
      {children}
    </motion.div>
  );
}
