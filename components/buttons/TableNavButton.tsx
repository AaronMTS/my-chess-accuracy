import { ButtonHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function TableNavButton({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="p-2 bg-surfaceLowest rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
