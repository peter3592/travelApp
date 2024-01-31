import React from "react";
import { useState } from "react";

export const DataContext = React.createContext();

export function DataProvider({ children }) {
  const [place, setPlace] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [wallPages, setWallPages] = useState(1);

  const value = {
    place,
    setPlace,
    autoRefresh,
    setAutoRefresh,
    wallPages,
    setWallPages,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
