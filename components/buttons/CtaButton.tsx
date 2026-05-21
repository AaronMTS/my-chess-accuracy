import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  isLink?: false;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProps = {
  isLink: true;
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type SharedProps = {
  widthClass?: string;
  paddingClasses: string;
  fontStyleClass?: string;
  hoverClasses?: string;
  withIcon: boolean;
  children: ReactNode;
};

type Props = SharedProps & (ButtonProps | LinkProps);

export default function CtaButton({
  widthClass = "",
  paddingClasses,
  fontStyleClass = "",
  hoverClasses = "",
  withIcon,
  isLink = false,
  children,
  ...props
}: Props) {
  const classes = `flex${withIcon ? " gap-2.5 " : " "}justify-center items-center ${widthClass} ${paddingClasses} bg-linear-135 from-primary to-onPrimaryContainer ${fontStyleClass} text-onPrimary font-bold whitespace-nowrap shadowBottom rounded-md cursor-pointer ${hoverClasses}`;

  if (isLink) {
    const { href, isLink: _, ...linkProps } = props as LinkProps;
    if (href) {
      return (
        <Link href={href} className={classes} {...linkProps}>
          {children}
        </Link>
      );
    }
  }

  const { ...buttonProps } = props as ButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
