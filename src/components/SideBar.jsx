import { Home, Beer, Settings, Users, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/home", icon: Home },
  { title: "Inventory", url: "/inventory", icon: Beer },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* <SidebarHeader className="flex items-center justify-center py-4">
        <div className="h-8 w-8 rounded bg-purple-600 flex items-center justify-center text-white font-bold">
          R
        </div>
      </SidebarHeader> */}

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-500">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
