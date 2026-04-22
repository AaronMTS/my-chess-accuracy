type Props = {
  widthClass: string;
  paddingClasses: string;
  fontStyleClass: string;
  withIcon: boolean;
  children: React.ReactNode;
};

export default function CtaButton({
  widthClass,
  paddingClasses,
  fontStyleClass,
  withIcon,
  children,
}: Readonly<Props>) {
  return (
    <button
      className={`flex${withIcon ? " gap-2.5 " : " "}justify-center items-center ${widthClass} ${paddingClasses} bg-linear-135 from-primary to-onPrimaryContainer ${fontStyleClass} text-onPrimary font-bold rounded-md cursor-pointer`}
    >
      {children}
    </button>
  );
}
