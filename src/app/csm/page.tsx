"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarCheck, Mail, Phone, MessageSquare } from "lucide-react";

export default function CSMPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Meet Your Account Manager
        </h1>
        <p className="text-muted-foreground mt-1">
          Book a call, ask questions, or review your campaign strategy
        </p>
      </div>

      <div className="grid gap-6">
        {/* CSM Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                    GD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">Gabe Dickens</h2>
                  <p className="text-muted-foreground text-sm">Account Manager</p>
                  <Badge variant="outline" className="mt-1 gap-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Available
                  </Badge>
                </div>
              </div>

              <div className="space-y-2.5 border-l pl-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">gabe@dickensmedia.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Direct line available after booking</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Avg. reply time: &lt;2 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CalendarCheck className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">20-min strategy calls</span>
                </div>
              </div>

              <div className="border-l pl-6">
                <p className="text-sm font-medium mb-2">What to discuss:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Campaign performance review</li>
                  <li>Lead quality adjustments</li>
                  <li>Scaling your outreach</li>
                  <li>New campaign launches</li>
                  <li>Billing &amp; plan changes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cal.com Embed */}
        <Card>
          <CardContent className="p-0 overflow-hidden rounded-lg">
            <iframe
              src="https://cal.com/dickensmedia/20min?layout=month_view"
              className="w-full border-0"
              style={{ height: "660px" }}
              title="Book a call with your Account Manager"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
