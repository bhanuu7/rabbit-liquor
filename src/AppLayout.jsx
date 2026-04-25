import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

function HamburgerTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      aria-label="Toggle menu"
      className="flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 mx-1 shrink-0 group"
    >
      <span className="block w-[22px] h-[2px] bg-[#666] rounded-sm transition-all duration-300 group-hover:bg-gold" />
      <span className="block w-[22px] h-[2px] bg-[#666] rounded-sm transition-all duration-300 group-hover:bg-gold" />
      <span className="block w-[22px] h-[2px] bg-[#666] rounded-sm transition-all duration-300 group-hover:bg-gold" />
    </button>
  );
}

function SidebarBackdrop() {
  const { open, setOpen } = useSidebar();
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/50"
      onClick={() => setOpen(false)}
      aria-hidden="true"
    />
  );
}

const AppLayout = () => {
  return (
    <SidebarProvider className="bg-bg-base text-text-main min-h-svh font-sans-app [&_[data-slot=sidebar]]:!bg-[#0a0a0a] [&_[data-slot=sidebar]]:!border-r [&_[data-slot=sidebar]]:!border-[rgba(201,168,76,0.18)] [&_[data-slot=sidebar-menu-button]]:!text-[#777] [&_[data-slot=sidebar-menu-button]]:rounded-md [&_[data-slot=sidebar-menu-button]]:transition-all [&_[data-slot=sidebar-menu-button]]:duration-[280ms] [&_[data-slot=sidebar-menu-button]:hover]:!bg-[rgba(201,168,76,0.07)] [&_[data-slot=sidebar-menu-button]:hover]:!text-gold [&_[data-slot=sidebar-menu-button][data-active=true]]:!bg-[rgba(201,168,76,0.12)] [&_[data-slot=sidebar-menu-button][data-active=true]]:!text-gold [&_[data-slot=sidebar-menu-button]_svg]:!text-[inherit] [&_[data-slot=sidebar-footer]]:!border-t [&_[data-slot=sidebar-footer]]:!border-[rgba(201,168,76,0.12)] [&_[data-slot=sidebar-trigger]]:!text-[#666] [&_[data-slot=sidebar-trigger]]:!bg-transparent [&_[data-slot=sidebar-trigger]:hover]:!text-gold [&_[data-slot=sidebar-trigger]:hover]:!bg-[rgba(201,168,76,0.07)]" defaultOpen={false}>
      <SidebarBackdrop />
      <div className="flex min-h-screen w-full">
        <SideBar />
        <div className="w-full flex flex-col">
          <header className="bg-[rgba(6,6,6,0.96)] !border-b !border-[rgba(201,168,76,0.18)] backdrop-blur-[24px] h-16 flex items-center sticky top-0 z-[1000]">
            <HamburgerTrigger />
            <Header />
          </header>
          <main className="bg-bg-base text-text-main flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
