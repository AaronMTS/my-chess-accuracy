type Props = {
  colorClass: string;
  children: React.ReactNode;
};

export default function HeaderDesc({ colorClass, children }: Props) {
  return (
    <small
      className={`${colorClass} text-xs font-semibold tracking-wide uppercase`}
    >
      {children}
    </small>
  );
}
