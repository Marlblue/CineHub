import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

const Layout = () => {
  return (
    <div className="min-h-screen bg-cinema-dark text-white relative">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cinema-accent/[0.03] rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cinema-rose/[0.03] rounded-full blur-[128px]" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
