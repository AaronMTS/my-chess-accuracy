import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonProps = {
  isLink?: false;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProps = {
  isLink: true;
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type SharedProps = {
  sizeClass?: string;
  paddingClasses: string;
  customColor?: string;
  textSizeClass?: string;
  icon?: { Element: React.ReactNode; position: "right" | "left" };
  children: React.ReactNode;
};

type Props = SharedProps & (ButtonProps | LinkProps);

export default function SecondaryButton({
  sizeClass = "",
  paddingClasses,
  customColor = "",
  textSizeClass = "",
  icon,
  isLink = false,
  children,
  ...props
}: Props) {
  const classes = `${icon ? "flex gap-2.5 items-center justify-center" : ""} bg-surfaceHighest ${sizeClass} ${paddingClasses} ${
    customColor || "text-onSurface"
  } ${textSizeClass} font-semibold whitespace-nowrap rounded-md cursor-pointer hover:bg-surfaceBright`;
  const content = (
    <>
      {icon && icon.position === "left" && icon.Element}
      {children}
      {icon && icon.position === "right" && icon.Element}
    </>
  );

  if (isLink) {
    const { href, isLink: _, ...linkProps } = props as LinkProps;
    if (href) {
      return (
        <Link href={href} className={classes} {...linkProps}>
          {content}
        </Link>
      );
    }
  }

  const { ...buttonProps } = props as ButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
