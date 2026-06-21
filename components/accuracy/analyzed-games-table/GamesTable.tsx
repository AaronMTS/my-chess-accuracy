"use client";

import { useMemo, useState } from "react";

import { Games } from "@/types/games";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  PaginationState,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCellPadding } from "@/util/table";

import GameAccuracy from "./GameAccuracy";
import Opponent from "./Opponent";
import GameColor from "./GameColor";
import GameMode from "./GameMode";
import GameMoves from "./GameMoves";
import GameRating from "./GameRating";
import TableNavButton from "../../buttons/TableNavButton";
import GamesTableHeader from "./GamesTableHeader";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getArchiveQueryOptions } from "@/util/query-options";
import { useSortingStore } from "@/store/table-sort";

const DATE_ADDITIONAL_CLASSES = "text-xs text-onSurfaceLow font-semibold";

export default function GamesTable({ username }: { username: string }) {
  "use no memo";
  const { data, isError, error } = useSuspenseQuery(
    getArchiveQueryOptions(username),
  );

  const { games } = data;

  const columns = useMemo<ColumnDef<Games>[]>(
    () => [
      {
        accessorKey: "accuracy",
        header: "Accuracy",
        cell: (info) => <GameAccuracy accuracy={info.getValue<number>()} />,
        enableSorting: true,
      },
      {
        accessorKey: "opponent",
        header: "Opponent",
        cell: (info) => <Opponent name={info.getValue<string>()} />,
      },
      {
        accessorKey: "color",
        header: "Color",
        cell: (info) => (
          <GameColor color={info.getValue<"white" | "black">()} />
        ),
      },
      {
        accessorKey: "mode",
        header: "Mode",
        cell: (info) => <GameMode mode={info.getValue<string>()} />,
      },
      { accessorKey: "date", header: "Date", cell: (info) => info.getValue() },
      {
        accessorKey: "moves",
        header: "Moves",
        cell: (info) => <GameMoves moves={info.getValue<number>()} />,
        enableSorting: true,
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: (info) => (
          <GameRating
            rating={info.getValue<number>()}
            result={info.row.original.result}
          />
        ),
        enableSorting: true,
      },
    ],
    [],
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const sorting = useSortingStore((state) => state.sortBy);
  const setSorting = useSortingStore((state) => state.updateSorting);

  const gamesTable = useReactTable({
    data: games,
    columns,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: () => setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isError) {
    return (
      <p className="text-center">
        {error.message || "Something went wrong. Please try again later."}
      </p>
    );
  }

  const totalColumns = gamesTable.getAllLeafColumns().length;
  const totalRows = gamesTable.getPrePaginationRowModel().rows.length;
  const currentPage = gamesTable.getState().pagination.pageIndex + 1;
  const currentRows = `${pagination.pageIndex * pagination.pageSize + 1}-${Math.min(pagination.pageSize * currentPage, totalRows)}`;
  const totalPages = gamesTable.getPageCount();

  function handleChangePage(destination: "previous" | "next" | number) {
    if (destination === "previous" && gamesTable.getCanPreviousPage()) {
      gamesTable.previousPage();
      return;
    }
    if (destination === "next" && gamesTable.getCanNextPage()) {
      gamesTable.nextPage();
      return;
    }
  }

  // function handleSortTable({
  //   id,
  //   desc,
  // }: {
  //   id: "accuracy" | "rating";
  //   desc: boolean;
  // }) {
  //   gamesTable.setSorting([{ id, desc }]);
  // }

  return (
    <>
      <GamesTableHeader />
      <div className="relative overflow-x-auto overflow-y-hidden">
        <table className="w-full min-w-175 table-fixed mb-2.5 border-collapse text-left">
          <thead>
            {gamesTable.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={`font-heading text-[10px] text-onSurfaceLow tracking-widest`}
              >
                {headerGroup.headers.map((header) => {
                  const pxClasses = getCellPadding(header.index, totalColumns);

                  return (
                    <th
                      key={header.id}
                      className={`${header.id === "accuracy" ? "sticky left-0 bg-surface" : ""} ${header.id === "opponent" ? "w-1/5" : header.id === "date" ? "w-1/7" : "w-auto"} ${pxClasses} pt-5 pb-2.5 uppercase`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {gamesTable.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, index) => {
                    const pxClasses = getCellPadding(index, totalColumns);

                    return (
                      <td
                        key={cell.id}
                        className={`${cell.column.id === "accuracy" ? "sticky left-0 bg-surface" : ""} py-5 ${pxClasses} ${cell.column.id === "date" ? DATE_ADDITIONAL_CLASSES : ""}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav className="flex justify-between items-center bg-surfaceHigh/50 p-6">
        <span className="space-y-1">
          <div className="text-xs font-bold">
            Page {currentPage} of {totalPages}
          </div>
          <div className="text-[10px] text-onSurfaceLow font-medium uppercase tracking-wide">
            Showing {currentRows} of {totalRows} games
          </div>
        </span>
        <span className="space-x-2">
          <TableNavButton
            onClick={() => handleChangePage("previous")}
            disabled={!gamesTable.getCanPreviousPage()}
          >
            <ChevronLeft size={20} />
          </TableNavButton>
          <TableNavButton
            onClick={() => handleChangePage("next")}
            disabled={!gamesTable.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </TableNavButton>
        </span>
      </nav>
    </>
  );
}
