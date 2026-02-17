"use client";

import {
  LayoutDashboard,
  Calendar,
  Users,
  HelpCircle,
  UserCircle,
  AlertTriangle,
  Clock,
  Building2,
  ChevronDown,
  Inbox,
  Shield,
  Eye,
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
import { useViewMode } from "@/lib/view-mode";

const clientNav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Calendar, label: "Live Campaigns", href: "/campaigns" },
  { icon: Users, label: "Lead Tracker", href: "/leads" },
  { icon: Clock, label: "Pending Replies", href: "/pending-replies" },
  { icon: Inbox, label: "Inbox", href: "/inbox" },
];

const adminNav = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Calendar, label: "Live Campaigns", href: "/campaigns" },
  { icon: Users, label: "Lead Tracker", href: "/leads" },
  { icon: Clock, label: "Pending Replies", href: "/pending-replies" },
  { icon: Inbox, label: "Inbox", href: "/inbox" },
];

const adminOnlyNav = [
  { icon: AlertTriangle, label: "Client Health", href: "/client-health" },
];

const settingsNav = [
  { icon: HelpCircle, label: "Help Center", href: "#" },
  { icon: UserCircle, label: "Talk with Us", href: "/csm" },
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
  const { viewMode, setViewMode } = useViewMode();
  const isAdmin = viewMode === "admin";
  const navItems = isAdmin ? adminNav : clientNav;

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

        {/* View Mode Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-sidebar-accent hover:bg-sidebar-accent/80 transition-colors mb-2">
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <Shield className="w-4 h-4 text-sidebar-foreground/80" />
                ) : (
                  <Eye className="w-4 h-4 text-sidebar-foreground/80" />
                )}
                <span className="text-sm font-medium text-sidebar-foreground">
                  {isAdmin ? "Admin View" : "Client View"}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-sidebar-foreground/60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Switch View</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setViewMode("admin")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin View
              {isAdmin && <span className="ml-auto text-xs text-muted-foreground">Active</span>}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setViewMode("client")}
            >
              <Eye className="w-4 h-4 mr-2" />
              Client View
              {!isAdmin && <span className="ml-auto text-xs text-muted-foreground">Active</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Client Switcher (admin only) */}
        {isAdmin && (
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
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href + item.label}>
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

        {isAdmin && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminOnlyNav.map((item) => (
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
          </>
        )}

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
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {isAdmin ? "GD" : "AC"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {isAdmin ? "Gabe Dickens" : "Acme Corp"}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {isAdmin ? "Agency Owner" : "Client"}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
