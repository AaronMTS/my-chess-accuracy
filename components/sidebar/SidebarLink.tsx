import Link, { LinkProps } from "next/link";

type Props = {
  isActive: boolean;
  children: React.ReactNode;
} & LinkProps;

export default function SidebarLink({ isActive, children, ...props }: Props) {
  return (
    <Link
      className={`flex items-center gap-3 px-4.5 py-3 text-sm font-bold uppercase rounded-e-lg ${isActive ? "activeSideLink" : "opacity-60"}`}
      {...props}
    >
      {children}
    </Link>
  );
}
