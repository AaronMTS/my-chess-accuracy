type Props = {
  colorClass: string;
  children: React.ReactNode;
};

export default function HeaderDesc({ colorClass, children }: Props) {
  return (
    <p
      className={`${colorClass} text-xs font-semibold tracking-wide uppercase`}
    >
      {children}
    </p>
  );
}
