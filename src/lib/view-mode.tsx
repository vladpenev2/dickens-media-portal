"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type ViewMode = "admin" | "client";

interface ViewModeContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextValue>({
  viewMode: "admin",
  setViewMode: () => {},
});

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>("admin");

  useEffect(() => {
    const stored = localStorage.getItem("viewMode");
    if (stored === "admin" || stored === "client") {
      setViewModeState(stored);
    }
  }, []);

  function setViewMode(mode: ViewMode) {
    setViewModeState(mode);
    localStorage.setItem("viewMode", mode);
  }

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
