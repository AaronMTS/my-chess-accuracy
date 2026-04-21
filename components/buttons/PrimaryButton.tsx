"use client";

import { LoaderCircle } from "lucide-react";
import { ButtonHTMLAttributes, useEffect, useState } from "react";

type Content = string | React.ReactNode;

type ResponsiveContent = {
  default: Content;
  md?: Content;
  lg?: Content;
};

type Props = {
  marginClasses?: string;
  widthClass?: string;
  paddingClasses: string;
  isUpperCase: boolean;
  responsiveContent?: ResponsiveContent;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LG_WIDTH = 1024;

export default function PrimaryButton({
  marginClasses = "",
  widthClass = "",
  paddingClasses,
  isUpperCase,
  responsiveContent,
  children,
  ...props
}: Props) {
  const [currentContent, setCurrentContent] = useState<Content | undefined>(
    <LoaderCircle size={17} className="mx-auto" />,
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= LG_WIDTH) {
        if (currentContent !== responsiveContent?.lg) {
          setCurrentContent(responsiveContent?.lg);
        }
        return;
      }

      if (currentContent !== responsiveContent?.default) {
        setCurrentContent(responsiveContent?.default);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <button
      {...props}
      className={`${marginClasses} ${widthClass} ${paddingClasses} bg-primaryContainer text-primary text-xs font-semibold tracking-wide ${
        isUpperCase ? "uppercase" : ""
      } rounded-md cursor-pointer`}
    >
      {responsiveContent && currentContent}
      {!responsiveContent && children}
    </button>
  );
}
