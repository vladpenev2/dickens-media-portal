"use client";

import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useViewMode } from "@/lib/view-mode";

// ---------------------------------------------------------------------------
// Client-view data
// ---------------------------------------------------------------------------

const clientMetrics = [
  {
    title: "Total Leads",
    value: "4,550",
    trend: +12.5,
    description: "All-time generated leads",
  },
  {
    title: "Meetings Booked",
    value: "54",
    trend: +8.2,
    description: "Scheduled this month",
  },
  {
    title: "Reply Rate",
    value: "5.2%",
    trend: -1.3,
    description: "Across all campaigns",
  },
];

// ---------------------------------------------------------------------------
// Admin-view data
// ---------------------------------------------------------------------------

const allClients = [
  {
    id: 1,
    name: "Acme Corp",
    avatar: "AC",
    status: "healthy" as const,
    coldCallingCampaigns: 3,
    coldEmailCampaigns: 2,
    totalMeetingsBooked: 36,
    totalMeetingsTarget: 40,
    leadsRemaining: 1560,
    avgReplyTime: "1.2 hrs",
    replyTimeStatus: "good" as const,
    startDate: "Oct 2025",
  },
  {
    id: 2,
    name: "TechStart Inc",
    avatar: "TS",
    status: "critical" as const,
    coldCallingCampaigns: 2,
    coldEmailCampaigns: 1,
    totalMeetingsBooked: 8,
    totalMeetingsTarget: 25,
    leadsRemaining: 120,
    avgReplyTime: "18.5 hrs",
    replyTimeStatus: "critical" as const,
    startDate: "Dec 2025",
  },
  {
    id: 3,
    name: "BuildRight LLC",
    avatar: "BR",
    status: "warning" as const,
    coldCallingCampaigns: 4,
    coldEmailCampaigns: 3,
    totalMeetingsBooked: 42,
    totalMeetingsTarget: 60,
    leadsRemaining: 890,
    avgReplyTime: "4.8 hrs",
    replyTimeStatus: "slow" as const,
    startDate: "Aug 2025",
  },
  {
    id: 4,
    name: "Global Retail Co",
    avatar: "GR",
    status: "healthy" as const,
    coldCallingCampaigns: 2,
    coldEmailCampaigns: 2,
    totalMeetingsBooked: 31,
    totalMeetingsTarget: 35,
    leadsRemaining: 2100,
    avgReplyTime: "45 min",
    replyTimeStatus: "good" as const,
    startDate: "Sep 2025",
  },
  {
    id: 5,
    name: "Metro Services",
    avatar: "MS",
    status: "warning" as const,
    coldCallingCampaigns: 1,
    coldEmailCampaigns: 1,
    totalMeetingsBooked: 11,
    totalMeetingsTarget: 20,
    leadsRemaining: 340,
    avgReplyTime: "6.2 hrs",
    replyTimeStatus: "slow" as const,
    startDate: "Jan 2026",
  },
  {
    id: 6,
    name: "Summit Ventures",
    avatar: "SV",
    status: "healthy" as const,
    coldCallingCampaigns: 5,
    coldEmailCampaigns: 4,
    totalMeetingsBooked: 58,
    totalMeetingsTarget: 60,
    leadsRemaining: 3200,
    avgReplyTime: "35 min",
    replyTimeStatus: "good" as const,
    startDate: "Jun 2025",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const statusConfig = {
  healthy: {
    label: "Healthy",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50",
  },
  warning: {
    label: "Needs Attention",
    className: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50",
  },
  critical: {
    label: "Critical",
    className: "border-red-200 bg-red-50 text-red-700 hover:bg-red-50",
  },
} as const;

const avatarColors: Record<string, string> = {
  healthy: "bg-emerald-600 text-white",
  warning: "bg-amber-500 text-white",
  critical: "bg-red-500 text-white",
};

function replyTimeColor(status: string) {
  if (status === "good") return "text-foreground";
  if (status === "slow") return "text-amber-600";
  return "text-red-600";
}

function progressColor(pct: number) {
  if (pct >= 80) return "[&>div]:bg-emerald-500";
  if (pct >= 50) return "[&>div]:bg-amber-500";
  return "[&>div]:bg-red-500";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  const { viewMode } = useViewMode();
  const isAdmin = viewMode === "admin";

  if (isAdmin) return <AdminDashboard />;
  return <ClientDashboard />;
}

// ---------------------------------------------------------------------------
// Admin Dashboard — metrics + client table
// ---------------------------------------------------------------------------

function AdminDashboard() {
  const totalClients = allClients.length;
  const healthyClients = allClients.filter((c) => c.status === "healthy").length;
  const warningClients = allClients.filter((c) => c.status === "warning").length;
  const criticalClients = allClients.filter((c) => c.status === "critical").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">{formatDate()}</p>
      </div>

      {/* Client summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
            <p className="mt-1 text-3xl font-bold">{totalClients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Healthy</p>
            <p className="mt-1 text-3xl font-bold">{healthyClients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Warning</p>
            <p className="mt-1 text-3xl font-bold text-amber-600">{warningClients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Critical</p>
            <p className="mt-1 text-3xl font-bold text-red-600">{criticalClients}</p>
          </CardContent>
        </Card>
      </div>

      {/* Top-level metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clientMetrics.map((metric) => {
          const isPositive = metric.trend >= 0;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 flex items-center gap-1 text-xs ${
                      isPositive
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {isPositive ? "+" : ""}{metric.trend}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Clients table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/80 hover:bg-muted/80">
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Client</TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Campaigns</TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Meetings</TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Leads Left</TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reply Time</TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Since</TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allClients.map((client) => {
              const meetingPct = Math.round(
                (client.totalMeetingsBooked / client.totalMeetingsTarget) * 100
              );
              return (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className={`text-xs font-bold ${avatarColors[client.status]}`}>
                          {client.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-semibold leading-tight">{client.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[client.status].className}>
                      {statusConfig[client.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">{client.coldCallingCampaigns}</span>
                      <span className="text-muted-foreground">/</span>
                      <span className="text-sm font-medium">{client.coldEmailCampaigns}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm font-bold">
                        {client.totalMeetingsBooked}{" "}
                        <span className="font-normal text-muted-foreground">/</span>{" "}
                        {client.totalMeetingsTarget}
                      </p>
                      <Progress
                        value={Math.min(meetingPct, 100)}
                        className={`h-1.5 w-24 bg-muted ${progressColor(meetingPct)}`}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${client.leadsRemaining < 500 ? "text-red-600" : ""}`}>
                      {client.leadsRemaining.toLocaleString()}
                      {client.leadsRemaining < 500 && <AlertTriangle className="ml-1 inline h-3.5 w-3.5" />}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${replyTimeColor(client.replyTimeStatus)}`}>
                      {client.avgReplyTime}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{client.startDate}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="/client-health">View <ExternalLink className="h-3.5 w-3.5" /></a>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Client Dashboard — metrics + channel funnels
// ---------------------------------------------------------------------------

function ClientDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, Acme Corp
        </h1>
        <p className="text-muted-foreground mt-1">{formatDate()}</p>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clientMetrics.map((metric) => {
          const isPositive = metric.trend >= 0;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 flex items-center gap-1 text-xs ${
                      isPositive
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {isPositive ? "+" : ""}{metric.trend}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
