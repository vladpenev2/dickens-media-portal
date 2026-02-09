"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Clock,
  Phone,
  Mail,
  Zap,
  PhoneOff,
  Shield,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ColdCallingData {
  campaigns: number;
  leadsRemaining: number;
  leadsTotal: number;
  meetingsTarget: number;
  meetingsBooked: number;
  dials: number;
  connects: number;
  conversations: number;
  status: "ahead" | "on-track" | "behind";
  currentPace: number;
  requiredPace: number;
  diagnostic?: string;
}

interface ColdEmailData {
  campaigns: number;
  leadsRemaining: number;
  leadsTotal: number;
  meetingsTarget: number;
  meetingsBooked: number;
  sent: number;
  replies: number;
  status: "ahead" | "on-track" | "behind";
  currentPace: number;
  requiredPace: number;
  diagnostic?: string;
}

interface Client {
  id: number;
  name: string;
  plan: string;
  avatar: string;
  healthScore: number;
  status: "healthy" | "warning" | "critical";
  avgReplyTime: string;
  replyTimeStatus: "good" | "slow" | "critical";
  lastActivity: string;
  alerts: string[];
  coldCalling: ColdCallingData;
  coldEmail: ColdEmailData;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const clients: Client[] = [
  {
    id: 1,
    name: "Acme Corp",
    plan: "Growth Plan",
    avatar: "AC",
    healthScore: 92,
    status: "healthy",
    avgReplyTime: "1.2 hrs",
    replyTimeStatus: "good",

    lastActivity: "2 hours ago",
    alerts: [],
    coldCalling: {
      campaigns: 3,
      leadsRemaining: 1060,
      leadsTotal: 2500,
      meetingsTarget: 25,
      meetingsBooked: 22,
      dials: 4200,
      connects: 380,
      conversations: 92,
      status: "ahead",
      currentPace: 1.1,
      requiredPace: 0.8,
    },
    coldEmail: {
      campaigns: 2,
      leadsRemaining: 500,
      leadsTotal: 1500,
      meetingsTarget: 15,
      meetingsBooked: 14,
      sent: 8500,
      replies: 145,
      status: "ahead",
      currentPace: 0.7,
      requiredPace: 0.5,
    },
  },
  {
    id: 2,
    name: "TechStart Inc",
    plan: "Starter Plan",
    avatar: "TS",
    healthScore: 45,
    status: "critical",
    avgReplyTime: "18.5 hrs",
    replyTimeStatus: "critical",
    lastActivity: "1 day ago",
    alerts: [
      "Low lead pool",
      "Behind on meetings target",
      "Very slow reply time",
    ],
    coldCalling: {
      campaigns: 2,
      leadsRemaining: 80,
      leadsTotal: 1200,
      meetingsTarget: 15,
      meetingsBooked: 5,
      dials: 2800,
      connects: 252,
      conversations: 28,
      status: "behind",
      currentPace: 0.25,
      requiredPace: 0.6,
      diagnostic:
        "High dials but low conversations - check offer or lead quality",
    },
    coldEmail: {
      campaigns: 1,
      leadsRemaining: 40,
      leadsTotal: 800,
      meetingsTarget: 10,
      meetingsBooked: 3,
      sent: 4200,
      replies: 21,
      status: "behind",
      currentPace: 0.15,
      requiredPace: 0.4,
      diagnostic:
        "Low reply rate - review messaging and targeting",
    },
  },
  {
    id: 3,
    name: "BuildRight LLC",
    plan: "Enterprise Plan",
    avatar: "BR",
    healthScore: 78,
    status: "warning",
    avgReplyTime: "4.8 hrs",
    replyTimeStatus: "slow",
    lastActivity: "5 hours ago",
    alerts: [
      "Slightly behind target",
      "Slow reply time affecting conversions",
    ],
    coldCalling: {
      campaigns: 4,
      leadsRemaining: 590,
      leadsTotal: 3000,
      meetingsTarget: 40,
      meetingsBooked: 28,
      dials: 6100,
      connects: 549,
      conversations: 165,
      status: "on-track",
      currentPace: 1.4,
      requiredPace: 1.3,
    },
    coldEmail: {
      campaigns: 3,
      leadsRemaining: 300,
      leadsTotal: 2000,
      meetingsTarget: 20,
      meetingsBooked: 14,
      sent: 12000,
      replies: 180,
      status: "behind",
      currentPace: 0.7,
      requiredPace: 0.9,
      diagnostic:
        "Good engagement but low reply-to-meeting ratio - improve follow-up sequence",
    },
  },
  {
    id: 4,
    name: "Global Retail Co",
    plan: "Growth Plan",
    avatar: "GR",
    healthScore: 88,
    status: "healthy",
    avgReplyTime: "45 min",
    replyTimeStatus: "good",
    lastActivity: "30 mins ago",
    alerts: [],
    coldCalling: {
      campaigns: 2,
      leadsRemaining: 1400,
      leadsTotal: 2000,
      meetingsTarget: 20,
      meetingsBooked: 18,
      dials: 3200,
      connects: 320,
      conversations: 96,
      status: "ahead",
      currentPace: 0.9,
      requiredPace: 0.6,
    },
    coldEmail: {
      campaigns: 2,
      leadsRemaining: 700,
      leadsTotal: 1500,
      meetingsTarget: 15,
      meetingsBooked: 13,
      sent: 6800,
      replies: 163,
      status: "ahead",
      currentPace: 0.65,
      requiredPace: 0.5,
    },
  },
  {
    id: 5,
    name: "Metro Services",
    plan: "Starter Plan",
    avatar: "MS",
    healthScore: 52,
    status: "warning",
    avgReplyTime: "6.2 hrs",
    replyTimeStatus: "slow",
    lastActivity: "3 hours ago",
    alerts: ["Low lead pool", "Slow reply time - potential upsell"],
    coldCalling: {
      campaigns: 1,
      leadsRemaining: 240,
      leadsTotal: 800,
      meetingsTarget: 12,
      meetingsBooked: 7,
      dials: 1800,
      connects: 162,
      conversations: 49,
      status: "behind",
      currentPace: 0.35,
      requiredPace: 0.5,
    },
    coldEmail: {
      campaigns: 1,
      leadsRemaining: 100,
      leadsTotal: 700,
      meetingsTarget: 8,
      meetingsBooked: 4,
      sent: 3200,
      replies: 48,
      status: "behind",
      currentPace: 0.2,
      requiredPace: 0.35,
      diagnostic: "Low lead pool - needs immediate replenishment",
    },
  },
];

// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------

function HealthScoreRing({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return "hsl(var(--primary))";
    if (s >= 60) return "hsl(var(--chart-4))";
    return "hsl(var(--destructive))";
  };

  return (
    <div className="relative w-20 h-20 shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={getColor(score)}
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold">{score}</span>
      </div>
    </div>
  );
}

function HealthBadge({ status }: { status: Client["status"] }) {
  const config = {
    healthy: { variant: "default" as const, icon: CheckCircle, label: "Healthy" },
    warning: { variant: "secondary" as const, icon: AlertCircle, label: "Warning" },
    critical: { variant: "destructive" as const, icon: AlertTriangle, label: "Critical" },
  };

  const { variant, icon: Icon, label } = config[status];

  return (
    <Badge variant={variant} className="gap-1.5">
      <Icon className="w-3.5 h-3.5" />
      {label}
    </Badge>
  );
}

function ReplyTimeBadge({
  time,
  status,
}: {
  time: string;
  status: Client["replyTimeStatus"];
}) {
  const config = {
    good: { variant: "outline" as const, icon: Zap, className: "border-primary/30 text-primary" },
    slow: { variant: "outline" as const, icon: Clock, className: "border-amber-500/30 text-amber-600" },
    critical: { variant: "outline" as const, icon: AlertTriangle, className: "border-destructive/30 text-destructive" },
  };

  const { variant, icon: Icon, className } = config[status];

  return (
    <Badge variant={variant} className={`gap-1.5 py-1 ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {time} avg reply
    </Badge>
  );
}

function ChannelStatusBadge({
  status,
}: {
  status: "ahead" | "on-track" | "behind";
}) {
  const config = {
    ahead: { variant: "default" as const, label: "Ahead" },
    "on-track": { variant: "secondary" as const, label: "On Track" },
    behind: { variant: "destructive" as const, label: "Behind" },
  };

  return (
    <Badge variant={config[status].variant}>
      {config[status].label}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Channel Card
// ---------------------------------------------------------------------------

function ChannelCard({
  type,
  data,
}: {
  type: "coldCalling" | "coldEmail";
  data: ColdCallingData | ColdEmailData;
}) {
  const isCalling = type === "coldCalling";
  const callingData = data as ColdCallingData;
  const emailData = data as ColdEmailData;

  const meetingsPercentage = Math.min(
    (data.meetingsBooked / data.meetingsTarget) * 100,
    100
  );
  const leadsLow = data.leadsRemaining < 300;
  const paceOk = data.currentPace >= data.requiredPace;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            {isCalling ? "Cold Calling" : "Cold Email"}
            <span className="text-xs text-muted-foreground font-normal">
              ({data.campaigns} campaign{data.campaigns !== 1 ? "s" : ""})
            </span>
          </CardTitle>
          <ChannelStatusBadge status={data.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Meetings progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Meetings {data.meetingsBooked}/{data.meetingsTarget}
            </span>
            <span className="font-semibold">
              {meetingsPercentage.toFixed(0)}%
            </span>
          </div>
          <Progress value={meetingsPercentage} />
        </div>

        {/* Key stats grid */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Leads Left</p>
            <p className={`text-base font-bold ${leadsLow ? "text-destructive" : ""}`}>
              {data.leadsRemaining.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground">
              of {data.leadsTotal.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Pace</p>
            <p className={`text-base font-bold ${paceOk ? "" : "text-destructive"}`}>
              {data.currentPace.toFixed(2)}/day
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Required</p>
            <p className="text-base font-bold">
              {data.requiredPace.toFixed(2)}/day
            </p>
          </div>
        </div>

        <Separator />

        {/* Funnel */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          {isCalling ? (
            <>
              <span className="font-medium text-foreground">
                {callingData.dials.toLocaleString()} dials
              </span>
              <ArrowRight className="w-3 h-3" />
              <span>
                {callingData.connects} connects (
                {((callingData.connects / callingData.dials) * 100).toFixed(1)}%)
              </span>
              <ArrowRight className="w-3 h-3" />
              <span>
                {callingData.conversations} convos (
                {((callingData.conversations / callingData.connects) * 100).toFixed(1)}%)
              </span>
              <ArrowRight className="w-3 h-3" />
              <span className="font-medium text-foreground">
                {data.meetingsBooked} meetings (
                {((data.meetingsBooked / callingData.conversations) * 100).toFixed(1)}%)
              </span>
            </>
          ) : (
            <>
              <span className="font-medium text-foreground">
                {emailData.sent.toLocaleString()} sent
              </span>
              <ArrowRight className="w-3 h-3" />
              <span>
                {emailData.replies} replies (
                {((emailData.replies / emailData.sent) * 100).toFixed(1)}%)
              </span>
              <ArrowRight className="w-3 h-3" />
              <span className="font-medium text-foreground">
                {data.meetingsBooked} meetings (
                {((data.meetingsBooked / emailData.replies) * 100).toFixed(1)}%)
              </span>
            </>
          )}
        </div>

        {/* Diagnostic Alert */}
        {data.diagnostic && (
          <div className="flex items-start gap-2 p-2.5 bg-muted rounded-lg border">
            {isCalling ? (
              <PhoneOff className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            ) : (
              <Mail className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            )}
            <p className="text-xs text-muted-foreground font-medium">
              {data.diagnostic}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Client Health Card
// ---------------------------------------------------------------------------

function ClientHealthCard({
  client,
  activeTab,
}: {
  client: Client;
  activeTab: string;
}) {
  const totalMeetingsBooked =
    client.coldCalling.meetingsBooked + client.coldEmail.meetingsBooked;
  const totalMeetingsTarget =
    client.coldCalling.meetingsTarget + client.coldEmail.meetingsTarget;

  return (
    <Card>
      <CardContent className="p-5">
        {/* Top section: score ring + client info */}
        <div className="flex items-start gap-4 mb-4">
          <HealthScoreRing score={client.healthScore} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-semibold">{client.name}</h3>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <ReplyTimeBadge
                  time={client.avgReplyTime}
                  status={client.replyTimeStatus}
                />
                <HealthBadge status={client.status} />
              </div>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Calling</p>
                <p className="text-lg font-bold">
                  {client.coldCalling.meetingsBooked}/
                  {client.coldCalling.meetingsTarget}
                </p>
                <p className="text-[10px] text-muted-foreground">meetings</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Email</p>
                <p className="text-lg font-bold">
                  {client.coldEmail.meetingsBooked}/
                  {client.coldEmail.meetingsTarget}
                </p>
                <p className="text-[10px] text-muted-foreground">meetings</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total</p>
                <p className="text-lg font-bold">
                  {totalMeetingsBooked}/{totalMeetingsTarget}
                </p>
                <p className="text-[10px] text-muted-foreground">combined</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Channel cards side by side */}
        <div
          className={`grid gap-4 ${
            activeTab === "all" ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {(activeTab === "all" || activeTab === "coldCalling") && (
            <ChannelCard type="coldCalling" data={client.coldCalling} />
          )}
          {(activeTab === "all" || activeTab === "coldEmail") && (
            <ChannelCard type="coldEmail" data={client.coldEmail} />
          )}
        </div>

        {/* Alert tags */}
        {client.alerts.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            {client.alerts.map((alert, idx) => (
              <Badge key={idx} variant="destructive" className="gap-1">
                <TrendingDown className="w-3 h-3" />
                {alert}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ClientHealthPage() {
  const [activeTab, setActiveTab] = useState("all");

  const healthyCount = clients.filter((c) => c.status === "healthy").length;
  const warningCount = clients.filter((c) => c.status === "warning").length;
  const criticalCount = clients.filter((c) => c.status === "critical").length;
  const slowResponders = clients.filter(
    (c) => c.replyTimeStatus === "slow" || c.replyTimeStatus === "critical"
  ).length;

  const callingAhead = clients.filter(
    (c) => c.coldCalling.status === "ahead"
  ).length;
  const callingBehind = clients.filter(
    (c) => c.coldCalling.status === "behind"
  ).length;
  const emailAhead = clients.filter(
    (c) => c.coldEmail.status === "ahead"
  ).length;
  const emailBehind = clients.filter(
    (c) => c.coldEmail.status === "behind"
  ).length;

  const sortedClients = [...clients].sort(
    (a, b) => a.healthScore - b.healthScore
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline" className="gap-1">
            <Shield className="w-3 h-3" />
            Admin Only
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Client Health Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor client performance across channels and identify accounts
          needing attention
        </p>
      </div>

      {/* Channel filter tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Channels</TabsTrigger>
          <TabsTrigger value="coldCalling" className="gap-2">
            <Phone className="w-3.5 h-3.5" />
            Cold Calling
            <span className="ml-1 text-[10px] opacity-70">
              {callingAhead} ahead / {callingBehind} behind
            </span>
          </TabsTrigger>
          <TabsTrigger value="coldEmail" className="gap-2">
            <Mail className="w-3.5 h-3.5" />
            Cold Email
            <span className="ml-1 text-[10px] opacity-70">
              {emailAhead} ahead / {emailBehind} behind
            </span>
          </TabsTrigger>
        </TabsList>

        {["all", "coldCalling", "coldEmail"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0" />
        ))}
      </Tabs>

      {/* Summary stat cards */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
                Total Clients
              </p>
            <p className="text-3xl font-bold">{clients.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">Healthy</p>
            <p className="text-3xl font-bold">{healthyCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">
                Needs Attention
              </p>
            <p className="text-3xl font-bold text-amber-500">{warningCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">Critical</p>
            <p className="text-3xl font-bold text-destructive">{criticalCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground mb-1">
                Slow Responders
              </p>
            <p className="text-3xl font-bold">
              {slowResponders}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Upsell opportunity</p>
          </CardContent>
        </Card>
      </div>

      {/* Client health cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            All Clients
            <span className="text-sm font-normal text-muted-foreground ml-2">
              sorted by health score (worst first)
            </span>
          </h2>
          <Button variant="outline" size="sm">
            Export Report
          </Button>
        </div>

        {sortedClients.map((client) => (
          <ClientHealthCard
            key={client.id}
            client={client}
            activeTab={activeTab}
          />
        ))}
      </div>
    </div>
  );
}
