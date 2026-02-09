"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

interface SDR {
  name: string;
  initials: string;
  target: number;
  booked: number;
}

interface Campaign {
  id: number;
  name: string;
  channel: "cold-calling" | "cold-email";
  status: "Active" | "Paused";
  totalLeads: number;
  leadsContacted: number;
  leadsRemaining: number;
  meetingsTarget: number;
  meetingsBooked: number;
  sdrs: SDR[];
  startDate: string;
  targetDate: string;
  daysElapsed: number;
  daysRemaining: number;
  currentPace: number; // meetings per day
  requiredPace: number; // meetings per day needed to hit target
}

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Q1 Architecture Firms - Bay Area",
    channel: "cold-calling",
    status: "Active",
    totalLeads: 1250,
    leadsContacted: 890,
    leadsRemaining: 360,
    meetingsTarget: 40,
    meetingsBooked: 28,
    sdrs: [
      { name: "Ahmed K.", initials: "AK", target: 20, booked: 15 },
      { name: "Sarah M.", initials: "SM", target: 20, booked: 13 },
    ],
    startDate: "Jan 15, 2026",
    targetDate: "Feb 28, 2026",
    daysElapsed: 21,
    daysRemaining: 23,
    currentPace: 1.33,
    requiredPace: 0.52,
  },
  {
    id: 2,
    name: "Construction CEOs - Southwest",
    channel: "cold-calling",
    status: "Active",
    totalLeads: 800,
    leadsContacted: 450,
    leadsRemaining: 350,
    meetingsTarget: 30,
    meetingsBooked: 18,
    sdrs: [
      { name: "Ahmed K.", initials: "AK", target: 30, booked: 18 },
    ],
    startDate: "Jan 22, 2026",
    targetDate: "Feb 22, 2026",
    daysElapsed: 14,
    daysRemaining: 17,
    currentPace: 1.29,
    requiredPace: 0.71,
  },
  {
    id: 3,
    name: "Retail Directors - National",
    channel: "cold-email",
    status: "Paused",
    totalLeads: 2000,
    leadsContacted: 200,
    leadsRemaining: 1800,
    meetingsTarget: 50,
    meetingsBooked: 8,
    sdrs: [
      { name: "Mike R.", initials: "MR", target: 25, booked: 4 },
      { name: "Sarah M.", initials: "SM", target: 25, booked: 4 },
    ],
    startDate: "Feb 1, 2026",
    targetDate: "Mar 15, 2026",
    daysElapsed: 4,
    daysRemaining: 38,
    currentPace: 2.0,
    requiredPace: 1.11,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type PacingStatus = "ahead" | "on-track" | "behind";

function getPacingStatus(campaign: Campaign): PacingStatus {
  if (campaign.currentPace > campaign.requiredPace * 1.2) return "ahead";
  if (campaign.currentPace < campaign.requiredPace * 0.8) return "behind";
  return "on-track";
}

const pacingConfig: Record<
  PacingStatus,
  {
    bg: string;
    border: string;
    text: string;
    icon: typeof Zap;
    label: string;
    recommendation: string;
    badgeClass: string;
  }
> = {
  ahead: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    icon: Zap,
    label: "Ahead of Schedule",
    recommendation: "Consider reassigning team members to other campaigns",
    badgeClass: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  "on-track": {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: CheckCircle,
    label: "On Track",
    recommendation: "Maintain current pace",
    badgeClass: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  },
  behind: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: AlertTriangle,
    label: "Behind Schedule",
    recommendation: "Increase volume or add another team member",
    badgeClass: "bg-red-100 text-red-700 hover:bg-red-100",
  },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PacingIndicator({ campaign }: { campaign: Campaign }) {
  const status = getPacingStatus(campaign);
  const projectedMeetings = Math.round(
    campaign.currentPace * (campaign.daysElapsed + campaign.daysRemaining)
  );
  const willHitTarget = projectedMeetings >= campaign.meetingsTarget;
  const { bg, border, text, icon: Icon, label, recommendation } =
    pacingConfig[status];

  return (
    <div className={`rounded-lg p-4 ${bg} border ${border}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${text}`} />
          <span className={`font-semibold text-sm ${text}`}>{label}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">
            {campaign.daysRemaining} days left
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current Pace</p>
          <p className={`text-lg font-bold ${text}`}>
            {campaign.currentPace.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">meetings/day</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Required Pace</p>
          <p className="text-lg font-bold text-foreground">
            {campaign.requiredPace.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">meetings/day</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Projected Total</p>
          <p
            className={`text-lg font-bold ${
              willHitTarget ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {projectedMeetings}
            <span className="text-sm font-normal text-muted-foreground">
              {" "}
              / {campaign.meetingsTarget}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">meetings</p>
        </div>
      </div>

      <div className={`flex items-center gap-2 text-sm ${text}`}>
        {status === "behind" ? (
          <TrendingDown className="w-4 h-4" />
        ) : (
          <TrendingUp className="w-4 h-4" />
        )}
        <span className="font-medium">{recommendation}</span>
      </div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const meetingProgress = Math.round(
    (campaign.meetingsBooked / campaign.meetingsTarget) * 100
  );
  const leadsProgress = Math.round(
    (campaign.leadsContacted / campaign.totalLeads) * 100
  );
  const status = getPacingStatus(campaign);
  const { badgeClass } = pacingConfig[status];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-lg">
              {campaign.name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              <span>{campaign.startDate}</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <span className="font-medium text-foreground">
                {campaign.targetDate}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={
                campaign.status === "Active"
                  ? "bg-muted text-foreground hover:bg-muted"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-100"
              }
            >
              {campaign.status}
            </Badge>
            <Badge className={badgeClass}>
              {pacingConfig[status].label}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  {campaign.status === "Active" ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" /> Pause Campaign
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" /> Resume Campaign
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" /> Edit Campaign
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Pacing Indicator */}
        <PacingIndicator campaign={campaign} />

        {/* Meetings Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
                Meetings Target
            </span>
            <span className="text-sm font-bold text-foreground">
              {campaign.meetingsBooked} / {campaign.meetingsTarget}
            </span>
          </div>
          <Progress
            value={meetingProgress}
            className={`h-2 ${
              meetingProgress < 50 ? "[&>div]:bg-amber-500" : "[&>div]:bg-emerald-500"
            }`}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {meetingProgress}% complete
          </p>
        </div>

        {/* Leads Contacted Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
                Leads Contacted
            </span>
            <span className="text-sm font-bold text-foreground">
              {campaign.leadsContacted.toLocaleString()} /{" "}
              {campaign.totalLeads.toLocaleString()}
            </span>
          </div>
          <Progress
            value={leadsProgress}
            className="h-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            <span
              className={
                campaign.leadsRemaining < 400
                  ? "text-amber-600 font-medium"
                  : ""
              }
            >
              {campaign.leadsRemaining.toLocaleString()} leads remaining
            </span>
            {campaign.leadsRemaining < 400 && (
              <span className="ml-1 text-amber-600">- Low inventory</span>
            )}
          </p>
        </div>

        {/* SDR Assignments */}
        <div className="border-t border-border pt-4">
          <p className="text-sm font-medium text-foreground mb-3">
            {campaign.channel === "cold-calling" ? "Assigned SDRs" : "Inbox Managers"}
          </p>
          <div className="space-y-3">
            {campaign.sdrs.map((sdr, idx) => {
              const sdrProgress = Math.round((sdr.booked / sdr.target) * 100);
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-muted rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted text-foreground text-xs font-semibold">
                        {sdr.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-sm font-medium text-foreground">
                        {sdr.name}
                      </span>
                      <div className="w-24 mt-1">
                        <Progress
                          value={sdrProgress}
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">
                      {sdr.booked} / {sdr.target}
                    </p>
                    <p className="text-xs text-muted-foreground">meetings</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page Export
// ---------------------------------------------------------------------------

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState("cold-calling");

  // Summary calculations across ALL campaigns
  const activeCampaigns = campaigns.filter((c) => c.status === "Active").length;
  const totalMeetings = campaigns.reduce((acc, c) => acc + c.meetingsBooked, 0);
  const aheadCount = campaigns.filter(
    (c) => getPacingStatus(c) === "ahead"
  ).length;
  const onTrackCount = campaigns.filter(
    (c) => getPacingStatus(c) === "on-track"
  ).length;
  const behindCount = campaigns.filter(
    (c) => getPacingStatus(c) === "behind"
  ).length;

  // Filter by channel tab
  const coldCallingCampaigns = campaigns.filter(
    (c) => c.channel === "cold-calling"
  );
  const coldEmailCampaigns = campaigns.filter(
    (c) => c.channel === "cold-email"
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1">
          Live Campaigns
        </h1>
        <p className="text-muted-foreground">
          Monitor and manage your active lead generation campaigns
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-sm font-medium mb-1">
                Active Campaigns
            </p>
            <p className="text-3xl font-bold text-foreground">
              {activeCampaigns}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-sm font-medium mb-1">
                Total Meetings
            </p>
            <p className="text-3xl font-bold text-foreground">
              {totalMeetings}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-sm font-medium mb-1">Ahead</p>
            <p className="text-3xl font-bold text-foreground">{aheadCount}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-sm font-medium mb-1">On Track</p>
            <p className="text-3xl font-bold text-foreground">{onTrackCount}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-sm font-medium mb-1">Behind</p>
            <p className="text-3xl font-bold text-red-600">{behindCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Channel Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="cold-calling" className="gap-2">
            <Phone className="w-4 h-4" />
            Cold Calling
            <Badge
              variant="secondary"
              className="ml-1 text-xs px-1.5 py-0 h-5"
            >
              {coldCallingCampaigns.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="cold-email" className="gap-2">
            <Mail className="w-4 h-4" />
            Cold Email
            <Badge
              variant="secondary"
              className="ml-1 text-xs px-1.5 py-0 h-5"
            >
              {coldEmailCampaigns.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cold-calling">
          {coldCallingCampaigns.length === 0 ? (
            <Card className="border border-dashed border-border">
              <CardContent className="p-12 text-center">
                <Phone className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  No cold calling campaigns yet
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {coldCallingCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cold-email">
          {coldEmailCampaigns.length === 0 ? (
            <Card className="border border-dashed border-border">
              <CardContent className="p-12 text-center">
                <Mail className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  No cold email campaigns yet
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {coldEmailCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
