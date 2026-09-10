export function formatDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).formatToParts(date);

  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  return `${month}. ${day}, ${year}`;
}
