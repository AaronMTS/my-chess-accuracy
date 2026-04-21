import { DummyGames, DummyGamesOptionalId } from "@/types/games";
import GameAccuracy from "./GameAccuracy";
import { getCellPadding } from "@/util/table";
import Opponent from "./Opponent";
import GameColor from "./GameColor";
import GameMode from "./GameMode";
import { spaceGrotesk } from "@/app/fonts";
import GameMoves from "./GameMoves";

export default function GamesTableBody({ games }: { games: DummyGames[] }) {
  return (
    <tbody>
      {games.map((game) => {
        const updatedGame: DummyGamesOptionalId = { ...game };
        const gameId = updatedGame.id;
        delete updatedGame.id;
        const updatedGameArr = Object.entries(updatedGame);

        return (
          <tr key={gameId}>
            {updatedGameArr.map((value, index) => {
              let content: string | number | React.ReactNode;
              const pxClasses = getCellPadding(index, updatedGameArr.length);
              const additionalClasses =
                value[0] === "date"
                  ? "text-xs text-onSurfaceLow"
                  : value[0] === "rating"
                    ? `${spaceGrotesk.className} text-xs font-bold`
                    : "";

              if (value[0] === "accuracy" && typeof value[1] === "number") {
                content = <GameAccuracy accuracy={value[1]} />;
              }
              if (value[0] === "opponent" && typeof value[1] === "string") {
                content = <Opponent name={value[1]} />;
              }
              if (
                (value[0] === "color" && value[1] === "white") ||
                value[1] === "black"
              ) {
                content = <GameColor color={value[1]} />;
              }
              if (value[0] === "mode" && typeof value[1] === "string") {
                content = <GameMode mode={value[1]} />;
              }
              if (value[0] === "moves" && typeof value[1] === "number") {
                content = <GameMoves moves={value[1]} />;
              }

              return (
                <td
                  key={value[1]}
                  className={`py-4.5 ${pxClasses} ${additionalClasses}`}
                >
                  {content && content}
                  {!content && value[1]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
