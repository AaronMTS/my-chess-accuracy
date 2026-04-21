export function getCellPadding(index: number, columns: number): string {
  if (index === 0) {
    return "pl-6 pr-3";
  }
  if (index === columns - 1) {
    return "pl-3 pr-6";
  }
  return "px-3";
}
