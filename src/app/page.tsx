"use client";

import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  UserPlus,
  CalendarCheck,
  PhoneCall,
  Mail,
  Zap,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const metrics = [
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

const campaigns = [
  {
    name: "SaaS Decision-Makers - Q1",
    status: "Active",
    leadsGenerated: 1240,
    target: 1500,
    channel: "LinkedIn + Email",
  },
  {
    name: "E-commerce Founders Outreach",
    status: "Active",
    leadsGenerated: 870,
    target: 1000,
    channel: "Cold Email",
  },
  {
    name: "Series A Startups - Tech",
    status: "Active",
    leadsGenerated: 415,
    target: 800,
    channel: "Multi-channel",
  },
];

const recentActivity = [
  {
    type: "lead",
    message: "New lead captured: Sarah Chen, VP of Growth at Nuvio",
    time: "12 min ago",
    icon: UserPlus,
    color: "bg-muted text-muted-foreground",
  },
  {
    type: "meeting",
    message: "Meeting booked with James Park, CTO at DataFlow",
    time: "1 hour ago",
    icon: CalendarCheck,
    color: "bg-muted text-muted-foreground",
  },
  {
    type: "call",
    message: "Discovery call completed: Marcus Lee, Founder at Reka AI",
    time: "2 hours ago",
    icon: PhoneCall,
    color: "bg-muted text-muted-foreground",
  },
  {
    type: "email",
    message: "Email sequence delivered to 320 prospects (SaaS Q1 campaign)",
    time: "3 hours ago",
    icon: Mail,
    color: "bg-muted text-muted-foreground",
  },
  {
    type: "meeting",
    message: "Meeting confirmed: Lisa Wang, COO at Apex Solutions",
    time: "5 hours ago",
    icon: CalendarCheck,
    color: "bg-muted text-muted-foreground",
  },
  {
    type: "lead",
    message: "12 new leads added from LinkedIn campaign",
    time: "Yesterday",
    icon: Zap,
    color: "bg-muted text-muted-foreground",
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* ---- Welcome header ---- */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, Acme Corp
        </h1>
        <p className="text-muted-foreground mt-1">{formatDate()}</p>
      </div>

      {/* ---- Metric cards ---- */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
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
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.description}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 flex items-center gap-1 text-xs ${
                      isPositive
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {isPositive ? "+" : ""}
                    {metric.trend}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ---- Two-column layout: Campaigns + Activity ---- */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Active campaigns */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Active Campaigns</CardTitle>
                <CardDescription>
                  {campaigns.length} campaigns currently running
                </CardDescription>
              </div>
              <Badge variant="outline">
                {campaigns.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {campaigns.map((campaign, idx) => {
              const progress = Math.round(
                (campaign.leadsGenerated / campaign.target) * 100
              );

              return (
                <div key={campaign.name}>
                  {idx > 0 && <Separator className="mb-6" />}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {campaign.channel}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {campaign.leadsGenerated.toLocaleString()} /{" "}
                          {campaign.target.toLocaleString()} leads
                        </span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  </div>
                </div>
              );
            })}

            <Separator />
            <Button variant="outline" className="w-full" size="sm">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              View All Campaigns
            </Button>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest updates from your pipeline</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => {
                const Icon = activity.icon;

                return (
                  <div key={idx} className="flex gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className={activity.color}>
                        <Icon className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator className="my-4" />
            <Button variant="outline" className="w-full" size="sm">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              View Full Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
