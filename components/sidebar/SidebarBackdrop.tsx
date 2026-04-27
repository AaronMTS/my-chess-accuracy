import { useSidebar } from "@/store/sidebar-context";
import Backdrop from "../Backdrop";

export default function SidebarBackdrop() {
  const { isShown, toggle } = useSidebar();

  function closeSidebar() {
    toggle(false);
  }

  return isShown && <Backdrop handleClick={closeSidebar} />;
}
