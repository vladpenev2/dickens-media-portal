"use client";

import { useState } from "react";
import {
  Clock,
  Send,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// ---------------------------------------------------------------------------
// Mock data — 6 pending replies sorted high-priority first
// ---------------------------------------------------------------------------
const pendingReplies = [
  {
    id: 1,
    leadName: "John Martinez",
    company: "Apex Construction",
    email: "john.martinez@apexconstruction.com",
    campaign: "Q1 Architecture Firms - Bay Area",
    client: "Acme Corp",
    replyPreview:
      "Thanks for reaching out. I'd be interested in learning more about your services. Can we schedule a call for next week?",
    replyDate: "Feb 4, 2026 2:34 PM",
    waitingTime: "18 hours",
    priority: "high" as const,
    assignedTo: "Ahmed K.",
  },
  {
    id: 2,
    leadName: "Sarah Chen",
    company: "Pacific Retail Group",
    email: "schen@pacificretail.com",
    campaign: "Retail Directors - National",
    client: "Acme Corp",
    replyPreview:
      "What's your pricing structure? We're currently evaluating vendors.",
    replyDate: "Feb 4, 2026 11:15 AM",
    waitingTime: "21 hours",
    priority: "high" as const,
    assignedTo: "Sarah M.",
  },
  {
    id: 3,
    leadName: "Emily Rodriguez",
    company: "Metro Design Studio",
    email: "emily@metrodesign.co",
    campaign: "Q1 Architecture Firms - Bay Area",
    client: "BuildRight LLC",
    replyPreview:
      "Hi! This sounds interesting. Who would I be speaking with? And what specifically does your solution help with?",
    replyDate: "Feb 3, 2026 9:45 AM",
    waitingTime: "2 days",
    priority: "high" as const,
    assignedTo: "Mike R.",
  },
  {
    id: 4,
    leadName: "Michael Thompson",
    company: "BuildRight Industries",
    email: "mthompson@buildright.io",
    campaign: "Construction CEOs - Southwest",
    client: "TechStart Inc",
    replyPreview:
      "Not interested at this time, but check back in Q3.",
    replyDate: "Feb 3, 2026 4:22 PM",
    waitingTime: "2 days",
    priority: "medium" as const,
    assignedTo: "Ahmed K.",
  },
  {
    id: 5,
    leadName: "Jennifer Walsh",
    company: "Summit Architecture",
    email: "jwalsh@summitarch.com",
    campaign: "Q1 Architecture Firms - Bay Area",
    client: "Metro Services",
    replyPreview:
      "Forwarding this to our CEO. He handles all vendor relationships. Expect a response soon.",
    replyDate: "Feb 1, 2026 10:30 AM",
    waitingTime: "4 days",
    priority: "medium" as const,
    assignedTo: "Ahmed K.",
  },
  {
    id: 6,
    leadName: "David Park",
    company: "Evergreen Developments",
    email: "dpark@evergreen-dev.com",
    campaign: "Construction CEOs - Southwest",
    client: "Global Retail Co",
    replyPreview: "Please remove me from your list.",
    replyDate: "Feb 2, 2026 3:18 PM",
    waitingTime: "3 days",
    priority: "low" as const,
    assignedTo: "Sarah M.",
  },
];

type Priority = "high" | "medium" | "low";
type FilterType = "all" | "high" | "overdue";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const priorityOrder: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const priorityConfig: Record<
  Priority,
  { label: string; className: string }
> = {
  high: {
    label: "High Priority",
    className:
      "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  },
  medium: {
    label: "Medium",
    className:
      "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  },
  low: {
    label: "Low",
    className:
      "bg-muted text-muted-foreground border-border hover:bg-muted",
  },
};

function isOverdue(waitingTime: string): boolean {
  return waitingTime.includes("day");
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function PendingRepliesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const highPriorityCount = pendingReplies.filter(
    (r) => r.priority === "high"
  ).length;
  const overdueCount = pendingReplies.filter((r) =>
    isOverdue(r.waitingTime)
  ).length;
  const handledTodayCount = 12; // static mock

  // Apply filter
  const filteredReplies = pendingReplies
    .filter((r) => {
      if (activeFilter === "high") return r.priority === "high";
      if (activeFilter === "overdue") return isOverdue(r.waitingTime);
      return true;
    })
    .sort(
      (a, b) =>
        priorityOrder[a.priority] - priorityOrder[b.priority]
    );

  return (
    <div className="space-y-8">
      {/* ---- Header ---- */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Pending Replies
        </h1>
        <p className="text-muted-foreground mt-1">
          Leads awaiting response from the team
        </p>
      </div>

      {/* ---- Summary Stat Cards ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pending */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Total Pending
            </p>
            <p className="text-3xl font-bold mt-1">
              {pendingReplies.length}
            </p>
          </CardContent>
        </Card>

        {/* High Priority */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              High Priority
            </p>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {highPriorityCount}
            </p>
          </CardContent>
        </Card>

        {/* Overdue (24h+) */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Overdue (24h+)
            </p>
            <p className="text-3xl font-bold text-amber-600 mt-1">
              {overdueCount}
            </p>
          </CardContent>
        </Card>

        {/* Handled Today */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Handled Today
            </p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {handledTodayCount}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ---- Filter Buttons ---- */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={activeFilter === "all" ? "default" : "outline"}
          onClick={() => setActiveFilter("all")}
        >
          All Pending ({pendingReplies.length})
        </Button>
        <Button
          size="sm"
          variant={activeFilter === "high" ? "default" : "outline"}
          onClick={() => setActiveFilter("high")}
        >
          High Priority ({highPriorityCount})
        </Button>
        <Button
          size="sm"
          variant={activeFilter === "overdue" ? "default" : "outline"}
          onClick={() => setActiveFilter("overdue")}
        >
          Overdue ({overdueCount})
        </Button>
      </div>

      {/* ---- Reply Cards ---- */}
      <div className="space-y-4">
        {filteredReplies.map((reply) => {
          const overdue = isOverdue(reply.waitingTime);
          const cfg = priorityConfig[reply.priority];

          return (
            <Card
              key={reply.id}
              className={overdue ? "border-red-200" : ""}
            >
              <CardContent className="p-5">
                {/* Top row: lead info + priority / waiting time */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted text-foreground text-sm font-semibold">
                        {getInitials(reply.leadName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold leading-none">
                        {reply.leadName}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reply.company}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        {reply.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Badge className={cfg.className}>
                      {cfg.label}
                    </Badge>
                    <div
                      className={`flex items-center gap-1 ${
                        overdue
                          ? "text-red-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">
                        Waiting {reply.waitingTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reply preview (quoted block with green left border) */}
                <div className="mt-4 rounded-lg border-l-4 border-border bg-muted/50 p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Reply received {reply.replyDate}
                  </p>
                  <p className="text-sm italic text-foreground/80">
                    &ldquo;{reply.replyPreview}&rdquo;
                  </p>
                </div>

                {/* Meta row: campaign, client, assigned */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground">
                        Campaign:
                      </span>
                      <span className="font-medium">
                        {reply.campaign}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground">
                        Client:
                      </span>
                      <span className="font-medium">
                        {reply.client}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">
                      Assigned to
                    </span>
                    <span className="font-medium">
                      {reply.assignedTo}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <Separator className="my-4" />
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                    Open in Instantly
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4" />
                    Reply Now
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4" />
                    Mark as Handled
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
