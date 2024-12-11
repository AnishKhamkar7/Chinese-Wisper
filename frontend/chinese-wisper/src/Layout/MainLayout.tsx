import { Outlet } from "@tanstack/react-router";
import NavBar from "@/components/NavBar/NavBar";
import Sidebar from "@/components/SideBar/SideBar";
import { useState, useEffect } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);

  //   // Cleanup function to remove event listener
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // useEffect(() => {
  //   // Toggle sidebar based on window width
  //   if (windowWidth >= 768) {
  //     setIsSidebarOpen(true);
  //   } else {
  //     setIsSidebarOpen(false);
  //   }
  //   console.log(isSidebarOpen);
  // }, [windowWidth]);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-full">
        <NavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
