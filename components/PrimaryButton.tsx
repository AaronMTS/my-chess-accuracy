import { ButtonHTMLAttributes } from "react";

type Props = {
  marginClasses?: string;
  widthClass?: string;
  paddingClasses: string;
  isUpperCase: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
  marginClasses = "",
  widthClass = "",
  paddingClasses,
  isUpperCase,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${marginClasses} ${widthClass} ${paddingClasses} bg-primaryContainer text-primary text-xs font-semibold tracking-wide ${
        isUpperCase ? "uppercase" : ""
      } rounded-md cursor-pointer`}
    >
      {children}
    </button>
  );
}
