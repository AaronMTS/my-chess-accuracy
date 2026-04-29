import { motion } from "motion/react";

type Props = {
  handleClick: () => void;
  animationDuration: number;
};

export default function Backdrop({ handleClick, animationDuration }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: animationDuration } }}
      exit={{ opacity: 0 }}
      onClick={handleClick}
      className="fixed top-0 left-0 z-30 size-full bg-black/80"
    ></motion.div>
  );
}
