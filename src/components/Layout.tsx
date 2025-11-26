import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} />

      <Header toggleSidebar={toggleSidebar} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <main className="pt-16 transition-all duration-300 lg:ml-64">
        <div className="mx-auto max-w-7xl p-4">
          <Outlet />

          {/* Footer */}
          <div className="mt-12 border-t pt-6 pb-6 text-center text-sm text-gray-500">
            © 2025 SimpleKYC. All rights reserved.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
