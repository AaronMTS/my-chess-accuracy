import { ButtonHTMLAttributes } from "react";

type Props = {
  sizeClass?: string;
  paddingClasses: string;
  customColor?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SecondaryButton({
  sizeClass = "",
  paddingClasses,
  customColor = "",
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`bg-surfaceHighest ${sizeClass} ${paddingClasses} ${
        customColor ? "" : "text-onSurface"
      } text-xs font-semibold rounded-md cursor-pointer`}
    >
      {children}
    </button>
  );
}
