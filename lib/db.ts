import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || "";

const globalForDb = globalThis as unknown as {
  sql: postgres.Sql | undefined;
};

export const sql =
  globalForDb.sql ||
  postgres(connectionString, {
    ssl:
      connectionString.includes("sslmode=require") ||
      connectionString.includes("supabase.co")
        ? "require"
        : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.sql = sql;
}
