"use client";

import { motion } from "motion/react";

type Props = {
  handleClick?: () => void;
  animationDuration?: number;
  zIndexClass: string;
};

export default function Backdrop({
  handleClick,
  animationDuration,
  zIndexClass,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: animationDuration || 0.3 },
      }}
      exit={{ opacity: 0 }}
      onClick={handleClick || undefined}
      className={`fixed top-0 left-0 ${zIndexClass} size-full bg-surfaceLowest/70 backdrop-blur-xs`}
    ></motion.div>
  );
}
