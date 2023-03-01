import { useContext } from "react";

import { AuthProvider, AuthContext } from "./authContext";
import { UIProvider, UIContext } from "./uiContext";
import { DataProvider, DataContext } from "./dataContext";
// import { UIProvider, UIContext } from "./UIContext";

export default function ContextProvider(props) {
  return (
    <AuthProvider>
      <DataProvider>
        <UIProvider>{props.children}</UIProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export function useUIContext() {
  return useContext(UIContext);
}

export function useDataContext() {
  return useContext(DataContext);
}
