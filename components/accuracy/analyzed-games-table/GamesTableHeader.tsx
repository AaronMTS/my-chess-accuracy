import HeaderDesc from "../../HeaderDesc";
import SortGamesContainer from "../sort/SortGamesContainer";

export default function GamesTableHeader() {
  return (
    <header className="flex gap-6 justify-between items-start flex-nowrap p-6 bg-surfaceHigh/50 xs:items-center">
      <div>
        <h4 className="font-heading text-nowrap">Analyzed Games</h4>
        <HeaderDesc colorClass="text-onSurfaceLow">
          Full Session History
        </HeaderDesc>
      </div>
      <span className="flex flex-wrap-reverse gap-3 justify-end items-center">
        <SortGamesContainer />
      </span>
    </header>
  );
}
