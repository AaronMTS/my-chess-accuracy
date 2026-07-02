import { useSortingStore } from "@/store/table-sort";
import { X } from "lucide-react";

export default function ActiveSortIndicator({
  sortId,
  sortOrder,
}: {
  sortId: string;
  sortOrder: "ASCENDING" | "DESCENDING";
}) {
  const removeSorting = useSortingStore((state) => state.removeSorting);

  return (
    <span className="flex gap-2 items-center p-2 text-[10px] font-heading text-primary font-medium text-nowrap tracking-wider bg-primary/10 border border-primary/20 rounded-md">
      {sortId.toUpperCase()}: {sortOrder}
      <button className="cursor-pointer" onClick={() => removeSorting()}>
        <X size={13} />
      </button>
    </span>
  );
}
