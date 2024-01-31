import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import ContextProvider from "./store/context";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { DEFAULT_STALE_TIME } from "./utils/constants";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME, // [ms]
      // refetchInterval: 3000,
      // gcTime: 3 * 1000,
    },
  },
});

root.render(
  <BrowserRouter>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ContextProvider>
  </BrowserRouter>
);
