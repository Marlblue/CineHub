import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import { WatchlistProvider } from "./context/WatchlistContext";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <WatchlistProvider>
            <App />
          </WatchlistProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);
