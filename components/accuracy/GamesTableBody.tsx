import { DummyGames, DummyGamesOptionalId } from "@/types/games";
import GameAccuracy from "./GameAccuracy";
import { getCellPadding } from "@/util/table";
import Opponent from "./Opponent";
import GameColor from "./GameColor";
import GameMode from "./GameMode";
import GameMoves from "./GameMoves";
import GameRating from "./GameRating";

export default function GamesTableBody({ games }: { games: DummyGames[] }) {
  return (
    <tbody>
      {games.map((game, gameIndex) => {
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
                value[0] === "date" ? "text-sm text-onSurfaceLow" : "";

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
              if (value[0] === "rating" && typeof value[1] === "number") {
                content = <GameRating rating={value[1]} />;
              }

              return (
                <td
                  key={value[1]}
                  className={`${gameIndex < games.length - 1 ? "py-5" : "pt-5 pb-7.5"} ${pxClasses} ${additionalClasses}`}
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
