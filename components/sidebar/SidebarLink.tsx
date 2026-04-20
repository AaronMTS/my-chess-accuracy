import Link, { LinkProps } from "next/link";

type Props = {
  isActive: boolean;
  children: React.ReactNode;
} & LinkProps;

export default function SidebarLink({ isActive, children, ...props }: Props) {
  return (
    <Link
      className={`flex items-center justify-center px-4.5 py-3 text-sm font-bold uppercase rounded-lg lg:justify-start lg:gap-3 lg:rounded-s-none ${isActive ? "activeSideLink" : "opacity-60"}`}
      {...props}
    >
      {children}
    </Link>
  );
}
