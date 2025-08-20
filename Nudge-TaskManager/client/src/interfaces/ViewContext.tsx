// src/context/ViewContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";

type ViewContextType = {
  showDashboard: boolean;
  setShowDashboard: (v: boolean) => void;
  toggleDashboard: () => void;

  // (optional) if you also swap to a “full task” view
  showFullTask: boolean;
  setShowFullTask: (v: boolean) => void;
  toggleFullTask: () => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showFullTask, setShowFullTask] = useState(false);

  const value = useMemo(
    () => ({
      showDashboard,
      setShowDashboard,
      toggleDashboard: () => setShowDashboard((v) => !v),

      showFullTask,
      setShowFullTask,
      toggleFullTask: () => setShowFullTask((v) => !v),
    }),
    [showDashboard, showFullTask]
  );

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

export const useView = () => {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error("useView must be used within a ViewProvider");
  return ctx;
};
