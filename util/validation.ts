export function getCleanUsername(input: string): string | null {
  if (typeof input !== "string") return null;

  const normalized = input.normalize("NFKC").trim();

  if (normalized.length < 3 || normalized.length > 25) return null;

  if (!/^[a-zA-Z0-9^-_][a-zA-Z0-9_-]+[a-zA-Z0-9^-_]$/.test(normalized))
    return null;

  return normalized;
}
