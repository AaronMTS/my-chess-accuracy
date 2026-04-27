"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";

import { useSidebar } from "@/store/sidebar-context";
import { MD_WIDTH } from "@/util/screen";

type Props = {
  children: React.ReactNode;
} & LinkProps;

export default function SidebarLink({ children, ...props }: Props) {
  const onClickRef = useRef<() => void | null>(null);
  const { toggle } = useSidebar();
  const pathName = usePathname();

  const isActive = pathName.endsWith(props.href.toString());

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < MD_WIDTH) {
        onClickRef.current = () => toggle(false);
      } else {
        onClickRef.current = null;
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  return (
    <Link
      onClick={() => onClickRef.current?.()}
      className={`flex items-center justify-start gap-3 px-4.5 py-3 text-sm font-bold uppercase rounded-s-none rounded-e-lg md:max-lg:justify-center md:max-lg:gap-0 md:max-lg:rounded-s-lg ${isActive ? "activeSideLink" : "opacity-60"}`}
      {...props}
    >
      {children}
    </Link>
  );
}
