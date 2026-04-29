"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

import { useSidebar } from "@/store/sidebar-context";
import { MD_WIDTH } from "@/util/screen";
import { Menu } from "lucide-react";

export default function ToggleSidebarBtn() {
  const { toggle } = useSidebar();
  const toggleRef = useRef<() => void | null>(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < MD_WIDTH) {
        toggleRef.current = () => toggle(true);
      } else {
        toggleRef.current = null;
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  function handleToggleSidebar() {
    const toggleSidebar = toggleRef.current;

    if (toggleSidebar) {
      toggleSidebar();
    }
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={handleToggleSidebar}
      className="absolute top-1/2 -translate-y-1/2 left-0 z-30 text-primary cursor-pointer md:hidden"
    >
      <Menu size={28} />
    </motion.button>
  );
}
