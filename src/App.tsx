import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const PersonDetail = lazy(() => import("./pages/PersonDetail"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
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
