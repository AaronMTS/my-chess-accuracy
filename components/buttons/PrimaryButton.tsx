"use client";

import { LG_WIDTH, MD_WIDTH } from "@/util/screen";
import { LoaderCircle } from "lucide-react";
import { ButtonHTMLAttributes, useEffect, useState } from "react";

type Content = string | React.ReactNode;

type ResponsiveContent = {
  default: Content;
  md?: Content;
};

type Props = {
  marginClasses?: string;
  widthClass?: string;
  paddingClasses: string;
  isUpperCase: boolean;
  responsiveContent?: ResponsiveContent;
  children?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

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
      if (window.innerWidth >= MD_WIDTH && window.innerWidth < LG_WIDTH) {
        if (currentContent !== responsiveContent?.md) {
          setCurrentContent(responsiveContent?.md);
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
