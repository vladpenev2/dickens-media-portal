"use client";

import {
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const allClients = [
  {
    id: 1,
    name: "Acme Corp",
    plan: "Growth Plan",
    avatar: "AC",
    status: "healthy" as const,
    coldCallingCampaigns: 3,
    coldEmailCampaigns: 2,
    totalMeetingsBooked: 36,
    totalMeetingsTarget: 40,
    leadsRemaining: 1560,
    avgReplyTime: "1.2 hrs",
    replyTimeStatus: "good" as const,
    monthlyRevenue: "$4,500",
    startDate: "Oct 2025",
  },
  {
    id: 2,
    name: "TechStart Inc",
    plan: "Starter Plan",
    avatar: "TS",
    status: "critical" as const,
    coldCallingCampaigns: 2,
    coldEmailCampaigns: 1,
    totalMeetingsBooked: 8,
    totalMeetingsTarget: 25,
    leadsRemaining: 120,
    avgReplyTime: "18.5 hrs",
    replyTimeStatus: "critical" as const,
    monthlyRevenue: "$2,000",
    startDate: "Dec 2025",
  },
  {
    id: 3,
    name: "BuildRight LLC",
    plan: "Enterprise Plan",
    avatar: "BR",
    status: "warning" as const,
    coldCallingCampaigns: 4,
    coldEmailCampaigns: 3,
    totalMeetingsBooked: 42,
    totalMeetingsTarget: 60,
    leadsRemaining: 890,
    avgReplyTime: "4.8 hrs",
    replyTimeStatus: "slow" as const,
    monthlyRevenue: "$8,500",
    startDate: "Aug 2025",
  },
  {
    id: 4,
    name: "Global Retail Co",
    plan: "Growth Plan",
    avatar: "GR",
    status: "healthy" as const,
    coldCallingCampaigns: 2,
    coldEmailCampaigns: 2,
    totalMeetingsBooked: 31,
    totalMeetingsTarget: 35,
    leadsRemaining: 2100,
    avgReplyTime: "45 min",
    replyTimeStatus: "good" as const,
    monthlyRevenue: "$4,500",
    startDate: "Sep 2025",
  },
  {
    id: 5,
    name: "Metro Services",
    plan: "Starter Plan",
    avatar: "MS",
    status: "warning" as const,
    coldCallingCampaigns: 1,
    coldEmailCampaigns: 1,
    totalMeetingsBooked: 11,
    totalMeetingsTarget: 20,
    leadsRemaining: 340,
    avgReplyTime: "6.2 hrs",
    replyTimeStatus: "slow" as const,
    monthlyRevenue: "$2,000",
    startDate: "Jan 2026",
  },
  {
    id: 6,
    name: "Summit Ventures",
    plan: "Enterprise Plan",
    avatar: "SV",
    status: "healthy" as const,
    coldCallingCampaigns: 5,
    coldEmailCampaigns: 4,
    totalMeetingsBooked: 58,
    totalMeetingsTarget: 60,
    leadsRemaining: 3200,
    avgReplyTime: "35 min",
    replyTimeStatus: "good" as const,
    monthlyRevenue: "$12,000",
    startDate: "Jun 2025",
  },
];

type Client = (typeof allClients)[number];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
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
// Sub-components
// ---------------------------------------------------------------------------
function StatusBadge({ status }: { status: keyof typeof statusConfig }) {
  const cfg = statusConfig[status];
  return (
    <Badge variant="outline" className={cfg.className}>
      {cfg.label}
    </Badge>
  );
}

function ClientRow({ client }: { client: Client }) {
  const meetingPct = Math.round(
    (client.totalMeetingsBooked / client.totalMeetingsTarget) * 100
  );

  return (
    <TableRow>
      {/* Client */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback
              className={`text-xs font-bold ${avatarColors[client.status]}`}
            >
              {client.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground leading-tight">
              {client.name}
            </p>
            <p className="text-xs text-muted-foreground">{client.plan}</p>
          </div>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <StatusBadge status={client.status} />
      </TableCell>

      {/* Campaigns */}
      <TableCell>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground">
            {client.coldCallingCampaigns}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium text-foreground">
            {client.coldEmailCampaigns}
          </span>
        </div>
      </TableCell>

      {/* Meetings */}
      <TableCell>
        <div className="space-y-1">
          <p className="text-sm font-bold text-foreground">
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

      {/* Leads Left */}
      <TableCell>
        <span
          className={`text-sm font-medium ${
            client.leadsRemaining < 500 ? "text-red-600" : "text-foreground"
          }`}
        >
          {client.leadsRemaining.toLocaleString()}
          {client.leadsRemaining < 500 && (
            <AlertTriangle className="ml-1 inline h-3.5 w-3.5" />
          )}
        </span>
      </TableCell>

      {/* Reply Time */}
      <TableCell>
        <span
          className={`text-sm font-medium ${replyTimeColor(
            client.replyTimeStatus
          )}`}
        >
          {client.avgReplyTime}
        </span>
      </TableCell>

      {/* MRR */}
      <TableCell>
        <span className="text-sm font-bold text-foreground">
          {client.monthlyRevenue}
        </span>
      </TableCell>

      {/* Since */}
      <TableCell>
        <span className="text-sm text-muted-foreground">{client.startDate}</span>
      </TableCell>

      {/* Action */}
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          className=""
          asChild
        >
          <a href="/client-health">
            View <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </TableCell>
    </TableRow>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ClientsPage() {
  const totalClients = allClients.length;
  const healthyClients = allClients.filter((c) => c.status === "healthy").length;
  const warningClients = allClients.filter((c) => c.status === "warning").length;
  const criticalClients = allClients.filter(
    (c) => c.status === "critical"
  ).length;
  const totalMRR = allClients.reduce(
    (acc, c) => acc + parseInt(c.monthlyRevenue.replace(/[$,]/g, "")),
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="mb-2">
          <Badge
            variant="outline"
            className=""
          >
            Admin Only
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-foreground">All Clients</h1>
        <p className="mt-1 text-muted-foreground">
          Manage and monitor all client accounts
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Clients */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {totalClients}
            </p>
          </CardContent>
        </Card>

        {/* Healthy */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Healthy</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {healthyClients}
            </p>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Warning</p>
            <p className="mt-1 text-3xl font-bold text-amber-600">
              {warningClients}
            </p>
          </CardContent>
        </Card>

        {/* Critical */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Critical</p>
            <p className="mt-1 text-3xl font-bold text-red-600">
              {criticalClients}
            </p>
          </CardContent>
        </Card>

        {/* Total MRR */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Total MRR</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              ${totalMRR.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/80 hover:bg-muted/80">
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Client
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Campaigns
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Meetings
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Leads Left
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Reply Time
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                MRR
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Since
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allClients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
