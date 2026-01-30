import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-[calc(100vh-64px)]">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
