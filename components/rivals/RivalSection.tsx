import { RivalDetails, RivalType } from "@/types/rivals";
import RivalCard from "./RivalCard";

type Config =
  | {
      isFallback: true;
      rivals?: never;
      type?: never;
      fallBackElement: HTMLElement;
    }
  | { isFallback?: false | undefined; rivals: RivalDetails[]; type: RivalType };

type Props = {
  title: string;
  titleColor: string;
  description?: string;
} & Config;

export default function RivalSection({
  title,
  titleColor,
  description,
  isFallback,
  rivals,
  type,
}: Props) {
  return (
    <section className="space-y-4">
      <header>
        <h4 className={`font-heading ${titleColor}`}>{title}</h4>
        {description && <p className="text-sm">{description}</p>}
      </header>
      <hr className="border-surfaceHigher" />
      {!isFallback && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {rivals.map((rival, index) => (
            <RivalCard key={rival.id} type={type} rival={rival} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
