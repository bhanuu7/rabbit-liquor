import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const HomePage = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SideBar />
        <div className="w-full flex flex-col">
          <header className="flex items-center border-b sticky">
            <SidebarTrigger />
            <Header isHeaderOnly={true} />
          </header>
          <main className="p-6 bg-slate-50 flex-1">
            search bar categories filter
            <div> product list</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HomePage;
