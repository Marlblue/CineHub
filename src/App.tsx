import { useEffect } from "react";
import { lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const PersonDetail = lazy(() => import("./pages/PersonDetail"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/person/:id" element={<PersonDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
