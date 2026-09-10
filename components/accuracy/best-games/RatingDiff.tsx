export default function RatingDiff({
  titleStyling,
  diff,
}: {
  titleStyling: string;
  diff: number;
}) {
  let content: string | number = diff;
  let textColorClass = "";

  if (diff > 0) {
    content = `+${content}`;
    textColorClass = "*:text-primary!";
  }

  return (
    <p className={textColorClass}>
      <span className={titleStyling}>Rating Diff.</span>
      <br />
      <span className="flex text-sm font-bold">{content}</span>
    </p>
  );
}
