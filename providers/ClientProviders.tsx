"use client";

import { getQueryClient } from "@/providers/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function ClientSideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
