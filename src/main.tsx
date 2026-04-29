import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import { WatchlistProvider } from "./context/WatchlistContext";
import { SearchProvider } from "./context/SearchContext";
import { LanguageProvider } from "./context/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

// Disable browser scroll restoration to force "scroll to top" on refresh
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <WatchlistProvider>
            <SearchProvider>
              <LanguageProvider>
                <App />
              </LanguageProvider>
            </SearchProvider>
          </WatchlistProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
);
