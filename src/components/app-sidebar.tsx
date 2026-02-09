"use client";

import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  HelpCircle,
  UserCircle,
  AlertTriangle,
  Clock,
  Building2,
  ChevronDown,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const mainNav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Building2, label: "All Clients", href: "/clients" },
  { icon: Calendar, label: "Live Campaigns", href: "/campaigns" },
  { icon: Users, label: "Lead Tracker", href: "/leads" },
  { icon: Clock, label: "Pending Replies", href: "/pending-replies" },
];

const adminNav = [
  { icon: AlertTriangle, label: "Client Health", href: "/client-health" },
];

const settingsNav = [
  { icon: HelpCircle, label: "Help Center", href: "#" },
  { icon: UserCircle, label: "Meet Your AM", href: "/csm" },
];

const clients = [
  { name: "Acme Corp", avatar: "AC", status: "healthy" },
  { name: "TechStart Inc", avatar: "TS", status: "critical" },
  { name: "BuildRight LLC", avatar: "BR", status: "warning" },
  { name: "Global Retail Co", avatar: "GR", status: "healthy" },
  { name: "Metro Services", avatar: "MS", status: "warning" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4">
        <div className="flex items-center mb-2 h-16">
          <Image
            src="/dickens-logo.png"
            alt="Dickens Media"
            width={240}
            height={240}
            className="w-1/2 brightness-0 invert"
          />
        </div>

        {/* Client Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">AD</AvatarFallback>
                </Avatar>
                <span className="text-sm text-sidebar-foreground">All Clients</span>
              </div>
              <ChevronDown className="w-4 h-4 text-sidebar-foreground/60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Switch Client</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {clients.map((client) => (
              <DropdownMenuItem key={client.name} className="cursor-pointer">
                <Avatar className="h-5 w-5 mr-2">
                  <AvatarFallback className={`text-[10px] text-white ${
                    client.status === "healthy" ? "bg-emerald-500" :
                    client.status === "warning" ? "bg-amber-500" : "bg-red-500"
                  }`}>
                    {client.avatar}
                  </AvatarFallback>
                </Avatar>
                {client.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Building2 className="w-4 h-4 mr-2" />
              View All Clients
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNav.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">GD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Gabe Dickens</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Agency Owner</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
