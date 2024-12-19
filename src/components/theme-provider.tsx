"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useSelector } from "react-redux";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useSelector((state: any) => state.theme);

  return (
    <NextThemesProvider
      attribute="class" 
      value={{ light:"light", dark:"dark"}}
      forcedTheme={theme} // Override theme based on Redux state
    >
      {children}
    </NextThemesProvider>
  );
}
