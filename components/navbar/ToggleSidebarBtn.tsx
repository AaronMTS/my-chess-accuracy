"use client";

import { useSidebar } from "@/store/sidebar-context";
import { MD_WIDTH } from "@/util/screen";
import { Menu } from "lucide-react";
import { useEffect, useRef } from "react";

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

  return (
    <button
      onClick={() => toggleRef.current?.()}
      className="absolute top-1/2 -translate-y-1/2 left-0 text-primary cursor-pointer"
    >
      <Menu />
    </button>
  );
}
