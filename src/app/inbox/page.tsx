"use client";

import { Inbox } from "lucide-react";

export default function InboxPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
      <h1 className="text-xl font-semibold">MasterInbox</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        MasterInbox will be embedded here — unified inbox with AI-powered reply labeling and response management.
      </p>
    </div>
  );
}
