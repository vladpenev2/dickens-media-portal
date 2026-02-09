"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Mail,
  MoreHorizontal,
  Send,
  Phone,
  Trash2,
  Edit,
  ChevronDown,
  RefreshCw,
  AlertTriangle,
  Linkedin,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const leadLists = [
  {
    id: 1,
    name: "Architecture Firms - Bay Area",
    icp: "Architects",
    source: "Clay",
    totalLeads: 1250,
    enriched: 1180,
    remaining: 360,
    lastSync: "2 mins ago",
    campaigns: [
      { name: "Q1 Architecture Firms - Bay Area", type: "coldCalling" },
      { name: "Bay Area Architects Email", type: "coldEmail" },
    ],
  },
  {
    id: 2,
    name: "Construction CEOs - Southwest",
    icp: "Construction",
    source: "Clay",
    totalLeads: 800,
    enriched: 800,
    remaining: 350,
    lastSync: "15 mins ago",
    campaigns: [
      { name: "Construction CEOs - Southwest", type: "coldCalling" },
    ],
  },
  {
    id: 3,
    name: "Retail Directors - National",
    icp: "Retail",
    source: "Clay",
    totalLeads: 2000,
    enriched: 1650,
    remaining: 1800,
    lastSync: "1 hour ago",
    campaigns: [
      { name: "Retail Directors - National", type: "coldCalling" },
      { name: "National Retail Outreach", type: "coldEmail" },
    ],
  },
  {
    id: 4,
    name: "Tech Startups - Series A",
    icp: "Tech",
    source: "Clay",
    totalLeads: 500,
    enriched: 485,
    remaining: 420,
    lastSync: "30 mins ago",
    campaigns: [
      { name: "Tech Founders Email Sequence", type: "coldEmail" },
    ],
  },
];

const leads = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechFlow Solutions",
    title: "VP of Marketing",
    email: "sarah.j@techflow.com",
    phone: "+1 (415) 555-0123",
    status: "Meeting Booked",
    listId: 1,
    listName: "Architecture Firms - Bay Area",
    icp: "Architects",
    source: "Clay",
    enrichmentStatus: "Complete",
    submittedDate: "Feb 4, 2026",
    usedIn: ["Cold Calling", "Cold Email"],
    appointmentBooked: "Yes",

  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Growth Dynamics",
    title: "CEO",
    email: "mchen@growthdynamics.io",
    phone: "+1 (512) 555-0456",
    status: "Warm Lead",
    listId: 2,
    listName: "Construction CEOs - Southwest",
    icp: "Construction",
    source: "Clay",
    enrichmentStatus: "Complete",
    submittedDate: "Feb 3, 2026",
    usedIn: ["Cold Calling"],
    appointmentBooked: "Yes",
  },
  {
    id: 3,
    name: "Emily Roberts",
    company: "BuildRight Construction",
    title: "Operations Director",
    email: "eroberts@buildright.com",
    phone: "+1 (602) 555-0789",
    status: "Contacted",
    listId: 2,
    listName: "Construction CEOs - Southwest",
    icp: "Construction",
    source: "Clay",
    enrichmentStatus: "Complete",
    submittedDate: "Feb 2, 2026",
    usedIn: ["Cold Calling"],
    appointmentBooked: "No",
  },
  {
    id: 4,
    name: "David Martinez",
    company: "Pacific Retail Group",
    title: "Head of Procurement",
    email: "dmartinez@pacificretail.com",
    phone: "+1 (213) 555-0321",
    status: "Meeting Booked",
    listId: 3,
    listName: "Retail Directors - National",
    icp: "Retail",
    source: "Clay",
    enrichmentStatus: "Complete",
    submittedDate: "Feb 1, 2026",
    usedIn: ["Cold Calling", "Cold Email"],
    appointmentBooked: "Yes",

  },
  {
    id: 5,
    name: "Jennifer Lee",
    company: "Innovate Labs",
    title: "CTO",
    email: "jlee@innovatelabs.co",
    phone: "+1 (650) 555-0654",
    status: "Warm Lead",
    listId: 4,
    listName: "Tech Startups - Series A",
    icp: "Tech",
    source: "Clay",
    enrichmentStatus: "Pending",
    submittedDate: "Jan 31, 2026",
    usedIn: ["Cold Email"],
    appointmentBooked: "Yes",
  },
  {
    id: 6,
    name: "Robert Thompson",
    company: "Summit Financial",
    title: "Managing Director",
    email: "rthompson@summitfin.com",
    phone: "+1 (312) 555-0987",
    status: "Meeting Booked",
    listId: 1,
    listName: "Architecture Firms - Bay Area",
    icp: "Architects",
    source: "Clay",
    enrichmentStatus: "Complete",
    submittedDate: "Jan 30, 2026",
    usedIn: ["Cold Calling", "Cold Email"],
    appointmentBooked: "Yes",

  },
];

// ---------------------------------------------------------------------------
// ICP colour map
// ---------------------------------------------------------------------------

const icpColors: Record<string, string> = {
  Architects: "bg-muted text-muted-foreground border-border",
  Construction: "bg-muted text-muted-foreground border-border",
  Retail: "bg-muted text-muted-foreground border-border",
  Tech: "bg-muted text-muted-foreground border-border",
};

const statusColors: Record<string, string> = {
  "Meeting Booked": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Warm Lead": "bg-amber-100 text-amber-700 border-amber-200",
  Contacted: "bg-blue-100 text-blue-700 border-blue-200",
};

// ---------------------------------------------------------------------------
// Small helper components
// ---------------------------------------------------------------------------

function ICPBadge({ icp }: { icp: string }) {
  return (
    <Badge
      variant="outline"
      className={icpColors[icp] ?? "bg-muted text-muted-foreground border-border"}
    >
      {icp}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={statusColors[status] ?? "bg-muted text-muted-foreground border-border"}
    >
      {status}
    </Badge>
  );
}

function ChannelBadge({ type }: { type: string }) {
  if (type === "coldCalling") {
    return (
      <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
        Cold Calling
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
      Cold Email
    </Badge>
  );
}

function UsedInBadge({ channel }: { channel: string }) {
  if (channel === "Cold Calling") {
    return (
      <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
        {channel}
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
      {channel}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Lead List Card
// ---------------------------------------------------------------------------

function LeadListCard({
  list,
  onSelect,
}: {
  list: (typeof leadLists)[0];
  onSelect: () => void;
}) {
  const enrichmentPct = Math.round((list.enriched / list.totalLeads) * 100);
  const isLow = list.remaining < 400;

  return (
    <Card
      className="border border-border hover:border-foreground/20 transition-colors cursor-pointer"
      onClick={onSelect}
    >
      <CardContent className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div>
              <h3 className="font-semibold text-foreground leading-tight">
                {list.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <ICPBadge icp={list.icp} />
                <span className="text-xs text-muted-foreground">
                  Source: {list.source}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground shrink-0">
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="text-xs">{list.lastSync}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Leads</p>
            <p className="text-lg font-bold text-foreground">
              {list.totalLeads.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Enrichment</p>
            <p className="text-lg font-bold text-foreground">
              {enrichmentPct}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Remaining</p>
            <p
              className={`text-lg font-bold ${
                isLow ? "text-red-600" : "text-foreground"
              }`}
            >
              {list.remaining.toLocaleString()}
              {isLow && (
                <AlertTriangle className="inline h-4 w-4 ml-1 align-text-bottom" />
              )}
            </p>
          </div>
        </div>

        {/* Campaigns */}
        <div className="border-t border-border pt-3">
          <p className="text-xs text-muted-foreground mb-2">Used in campaigns:</p>
          <div className="flex flex-wrap gap-2">
            {list.campaigns.map((c, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <ChannelBadge type={c.type} />
                <span className="text-xs text-muted-foreground max-w-[160px] truncate">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page export
// ---------------------------------------------------------------------------

export default function LeadsPage() {
  const [activeView, setActiveView] = useState<"lists" | "leads">("lists");
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Derived data
  const filteredLeads = leads.filter((lead) => {
    const matchesList = selectedList ? lead.listId === selectedList : true;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q);
    return matchesList && matchesSearch;
  });

  const selectedListData = selectedList
    ? leadLists.find((l) => l.id === selectedList) ?? null
    : null;

  const totalLeads = leadLists.reduce((sum, l) => sum + l.totalLeads, 0);
  const meetingsBooked = leads.filter(
    (l) => l.status === "Meeting Booked"
  ).length;
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Lead Tracker</h1>
        <p className="text-muted-foreground mt-1">
          Manage lead lists from Clay and track leads across campaigns
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Lead Lists</p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {leadLists.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {totalLeads.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              Meetings Booked
            </p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {meetingsBooked}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">Source</p>
            <p className="text-xl font-bold text-foreground mt-1">
              Clay Webhooks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: Lead Lists / All Leads */}
      <Tabs
        value={activeView}
        onValueChange={(v) => {
          setActiveView(v as "lists" | "leads");
          if (v === "lists") setSelectedList(null);
        }}
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="lists">
              Lead Lists ({leadLists.length})
            </TabsTrigger>
            <TabsTrigger value="leads">
              All Leads ({leads.length})
            </TabsTrigger>
          </TabsList>

          {/* Controls shown only on the leads tab */}
          {activeView === "leads" && (
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name, company, email..."
                  className="pl-9 w-72"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter by list */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1.5">
                    <Filter className="h-4 w-4" />
                    {selectedListData ? selectedListData.name : "All Lists"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Filter by Lead List</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setSelectedList(null)}
                    className="cursor-pointer"
                  >
                    All Lists
                  </DropdownMenuItem>
                  {leadLists.map((list) => (
                    <DropdownMenuItem
                      key={list.id}
                      onClick={() => setSelectedList(list.id)}
                      className="cursor-pointer gap-2"
                    >
                      <ICPBadge icp={list.icp} />
                      <span>{list.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Export */}
              <Button className="gap-1.5">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          )}
        </div>

        {/* ---- Lead Lists tab ---- */}
        <TabsContent value="lists">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leadLists.map((list) => (
              <LeadListCard
                key={list.id}
                list={list}
                onSelect={() => {
                  setSelectedList(list.id);
                  setActiveView("leads");
                }}
              />
            ))}
          </div>
        </TabsContent>

        {/* ---- All Leads tab ---- */}
        <TabsContent value="leads">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[220px]">Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>List / ICP</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Used In</TableHead>
                  <TableHead>Enriched</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    {/* Contact */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="text-xs font-semibold bg-muted text-muted-foreground">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-none">
                            {lead.name}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {lead.title}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Company */}
                    <TableCell>
                      <span className="font-medium">{lead.company}</span>
                    </TableCell>

                    {/* List / ICP */}
                    <TableCell>
                      <div className="space-y-1">
                        <ICPBadge icp={lead.icp} />
                        <p className="text-xs text-muted-foreground">
                          {lead.listName}
                        </p>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusBadge status={lead.status} />
                    </TableCell>

                    {/* Used In */}
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {lead.usedIn.map((ch) => (
                          <UsedInBadge key={ch} channel={ch} />
                        ))}
                      </div>
                    </TableCell>

                    {/* Enriched */}
                    <TableCell>
                      {lead.enrichmentStatus === "Complete" ? (
                        <span className="text-foreground text-sm">
                          Complete
                        </span>
                      ) : (
                        <span className="text-amber-600 text-sm">
                          Pending
                        </span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer gap-2">
                            <Send className="h-4 w-4" />
                            Send to Instantly
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer gap-2">
                            <Phone className="h-4 w-4" />
                            Add to Call Queue
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer gap-2">
                            <Linkedin className="h-4 w-4" />
                            Add to LinkedIn
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Lead
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Delete Lead
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Footer / result count */}
            <div className="px-4 py-3 border-t text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredLeads.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {leads.length}
              </span>{" "}
              leads
              {selectedListData && (
                <span className="text-muted-foreground">
                  {" "}
                  in {selectedListData.name}
                </span>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
