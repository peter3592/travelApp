import { useContext } from "react";

import { UIProvider, UIContext } from "./uiContext";
import { DataProvider, DataContext } from "./dataContext";

export default function ContextProvider({ children }) {
  return (
    <DataProvider>
      <UIProvider>{children}</UIProvider>
    </DataProvider>
  );
}

export function useUIContext() {
  return useContext(UIContext);
}

export function useDataContext() {
  return useContext(DataContext);
}
