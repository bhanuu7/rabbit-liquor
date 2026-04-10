import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "./AppLayout.css";

const AppLayout = () => {
  return (
    <SidebarProvider className="rl-layout" defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <SideBar />
        <div className="w-full flex flex-col">
          <header className="rl-app-header flex items-center sticky top-0 z-10">
            <SidebarTrigger />
            <Header />
          </header>
          <main className="rl-app-main container mx-auto px-4 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
