import HeaderDesc from "../../HeaderDesc";
import { spaceGrotesk } from "@/app/fonts";
import SortGamesContainer from "../sort/SortGamesContainer";

export default function GamesTableHeader() {
  return (
    <header className="flex justify-between items-center p-6 bg-surfaceHigh/50">
      <div>
        <h4 className={spaceGrotesk.className}>Analyzed Games</h4>
        <HeaderDesc colorClass="text-onSurfaceLow">
          Full Session History
        </HeaderDesc>
      </div>
      <SortGamesContainer />
    </header>
  );
}
