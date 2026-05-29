"use client";

import { motion, animate } from "motion/react";
import { useEffect, useState } from "react";

export default function OverallAccuracy({
  accuracyPercentage,
}: {
  accuracyPercentage: number;
}) {
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    animate(0, accuracyPercentage, {
      duration: 1.5,
      ease: "circOut",
      onUpdate(latest) {
        setAccuracy(latest);
      },
    });
  }, [accuracyPercentage]);

  return (
    <motion.h1
      className={`absolute top-1/2 left-1/2 -translate-1/2 text-5xl font-heading tracking-normal`}
    >
      {accuracy.toFixed(1)}%
    </motion.h1>
  );
}
