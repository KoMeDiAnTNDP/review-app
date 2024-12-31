"use client";

import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="#3b82f6" showSpinner={false} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
