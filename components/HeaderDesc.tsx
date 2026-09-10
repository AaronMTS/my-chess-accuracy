type Props = {
  colorClass: string;
  sizeClass?: string;
  fontWeightClass?: string;
  children: React.ReactNode;
};

export default function HeaderDesc({
  colorClass,
  sizeClass = "text-xs",
  fontWeightClass = "font-semibold",
  children,
}: Props) {
  return (
    <p
      className={`${colorClass} ${sizeClass} ${fontWeightClass} tracking-wide uppercase`}
    >
      {children}
    </p>
  );
}
