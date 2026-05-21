import { ButtonHTMLAttributes } from "react";

type Props = {
  sizeClass?: string;
  paddingClasses: string;
  customColor?: string;
  textSizeClass?: string;
  icon?: { Element: React.ReactNode; position: "right" | "left" };
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SecondaryButton({
  sizeClass = "",
  paddingClasses,
  customColor = "",
  textSizeClass = "",
  icon,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${icon ? "flex gap-2.5 items-center justify-center" : ""} bg-surfaceHighest ${sizeClass} ${paddingClasses} ${
        customColor || "text-onSurface"
      } ${textSizeClass} font-semibold whitespace-nowrap rounded-md cursor-pointer hover:bg-surfaceBright`}
    >
      {icon && icon.position === "left" && icon.Element}
      {children}
      {icon && icon.position === "right" && icon.Element}
    </button>
  );
}
