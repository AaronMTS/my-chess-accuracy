import { useSidebar } from "@/store/sidebar-context";
import Backdrop from "../Backdrop";
import { AnimatePresence } from "motion/react";

export default function SidebarBackdrop() {
  const { isShown, toggle } = useSidebar();

  function closeSidebar() {
    toggle(false);
  }

  return (
    <AnimatePresence>
      {isShown && <Backdrop handleClick={closeSidebar} zIndexClass="z-30" />}
    </AnimatePresence>
  );
}
