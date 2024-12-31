"use client";

import { ModeToggle } from "@/components/ThemeModeToggle";
import React from "react";
import NavMenu from "./_components/NavMenu";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col flex-1">
      <header className="container h-[65px] mx-auto  flex gap-6 items-center justify-end bg-muted">
        <NavMenu />
        <ModeToggle />
      </header>

      <main className="overflow-auto container bg-muted">
        <div className="flex-1 py-4">{children}</div>
      </main>
    </div>
  );
}

export default layout;
