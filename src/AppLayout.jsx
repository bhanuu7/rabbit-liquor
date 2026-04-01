import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SideBar />
        <div className="w-full flex flex-col">
          <header className="flex items-center border-b sticky top-0 z-10 bg-background">
            <SidebarTrigger />
            <Header isHeaderOnly={true} />
          </header>
          <main className="container mx-auto px-4 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
