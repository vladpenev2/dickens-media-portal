# Dickens Media - Client Portal Platform Overview

Here's a walkthrough of the prototype so far. Please review everything and let me know if anything is missing, needs to change, or if you have questions. We need to go through one final feedback loop on this before I put together the proposal.

---

## What This Platform Does

This is your **operational command center** - a single place where you (and your clients) can see exactly how campaigns are performing across both cold calling and cold email, without needing to jump between Instantly, Koncert, Clay, and spreadsheets.

The core philosophy is **observability first**: see all the data, make informed decisions, and only automate once you've identified repeatable patterns in how you manage the business.

---

## Admin View vs. Client View

The prototype now has a **view mode toggle** at the top of the sidebar. You can switch between:

- **Admin View** — What you (Gabe) see. Full access to everything: all clients, client health dashboard, all campaigns across all clients, and the client switcher dropdown.
- **Client View** — What your clients see when they log in. They only see their own data: their dashboard with cold calling and cold email funnels, their campaigns, their leads, pending replies, inbox, and support pages.

This lets you demo the platform to clients and see exactly what they'll experience, without needing a separate account.

### Page Access by Role

| Page | Client Sees It? | Admin Sees It? |
|------|:---:|:---:|
| Dashboard | Yes | Yes |
| Live Campaigns | Yes | Yes |
| Lead Tracker | Yes | Yes |
| Pending Replies | Yes | Yes |
| Inbox (MasterInbox) | Yes | Yes |
| Help Center | Yes | Yes |
| Talk with Us | Yes | Yes |
| All Clients | No | Yes |
| Client Health | No | Yes |

---

## Pages in the Prototype

### 1. Dashboard
The first thing you see when you log in. Shows:
- **Total Leads** generated across all campaigns
- **Meetings Booked** this month
- **Reply Rate** across all campaigns
- **Cold Calling Performance** — full conversion funnel: dials → connects (%) → conversations (%) → meetings (%), plus avg dials/day, connect rate, and total talk time
- **Cold Email Performance** — full conversion funnel: sent → replies (%) → positive replies (%) → meetings (%), plus reply rate, positive rate, and meeting count
- A list of **active campaigns** with progress bars toward their lead targets
- A **recent activity feed** showing meetings booked, leads captured, emails sent, etc.

This is what your clients will see when they log in. Cold calling and cold email funnels are kept completely separate so the metrics are meaningful.

### 2. All Clients (Admin Only)
A table view of every client you manage. At a glance you can see:
- Health status (healthy / warning / critical)
- Number of cold calling and cold email campaigns running
- Meetings booked vs. target
- Reply time performance

This is your bird's-eye view across the entire business. Clients never see this.

### 3. Live Campaigns
Where you monitor individual campaigns in detail. Separated into two tabs: **Cold Calling** and **Cold Email** (kept completely separate, as we discussed - different volumes, different metrics).

Each campaign card shows:
- **Pacing indicator** - are you ahead, on track, or behind schedule?
- **Meetings target** with progress bar
- **Leads contacted** with remaining inventory and a low-inventory warning
- **Assigned team members** - "SDRs" for cold calling and "Inbox Managers" for cold email

### 4. Lead Tracker
Manages your lead lists coming in from Clay. Two views:
- **Lead Lists** - each list shows the ICP, source (Clay), enrichment status, total leads, and which channels the list is being used for
- **All Leads** - a searchable/filterable table of every individual lead with their status

A single lead list can be used across both cold calling and cold email campaigns simultaneously.

### 5. Pending Replies
Leads that have replied and are waiting for a response from the team. Each reply card shows:
- Who replied, from which company
- The actual reply text
- How long they've been waiting
- Priority level (high / medium / low)
- Which campaign and client it belongs to

### 6. Inbox (MasterInbox)
**MasterInbox is embedded directly into the platform** — no need to switch to a separate tool. This is where all campaign replies are managed:
- **Unified inbox** — all replies from all campaigns in one place
- **AI-powered labeling** — replies are automatically classified (positive, not interested, meeting request, unsubscribe, etc.)
- **Thread access** — click into any reply to see the full conversation
- **Response actions** — reply directly from within the portal
- **Stats** — unread count, awaiting reply, replied today, average response time

Both you and your clients see this page, so clients can track reply activity and see that their leads are being handled promptly.

### 7. Client Health (Admin Only)
Your internal health dashboard. Clients don't see it. Shows:
- **Health score** (0-100) per client
- **Reply time performance**
- **Channel breakdowns** with full funnel data
- **Pacing data** and diagnostic alerts
- **Active alerts** for low lead pools, slow replies, behind targets

### 8. Talk with Us
Client-facing page for contact info, booking a call, or sending a message.

---

## How the Integrations Work

### Clay → Platform (Lead Sourcing)
Clay is the **enrichment and qualification layer**. Raw data from scraping (Google Maps, Apollo, Sales Bot Scraper) goes into Clay, where it gets:
- Enriched with work emails (LeadMagic), secondary emails (FindyMail), and validated (Bounceban)
- Tiered into Tier 1, 2, 3 based on ICP fit
- Grouped by ICP / campaign

Enriched leads flow into the platform automatically via **Clay webhooks**. Each lead arrives with its tier, enrichment status, and which campaign it belongs to. You don't need to manually import CSVs — Clay pushes them directly.

### Koncert → Platform (Cold Calling Metrics)
Koncert is the dialer. The platform pulls cold calling metrics via the **Koncert API**:
- Total dials, connects, conversations, meetings booked
- Connect rate, conversation rate
- Average dials per day, talk time
- Call dispositions and recordings
- Per-SDR performance

Koncert also fires **webhooks** when call dispositions change, which we use for the cross-channel sync (see below).

### Instantly → Platform (Cold Email Metrics)
Instantly is the email sequencer. The platform syncs with **Instantly's API**:
- Emails sent, reply count, reply rate
- Positive replies vs. negative
- Meetings booked from email
- Per-campaign performance

### MasterInbox → Platform (Inbox Management)
MasterInbox handles all reply management and is **embedded directly into the Inbox page**:
- All replies from Instantly campaigns land in MasterInbox
- AI automatically labels each reply (positive, not interested, info request, etc.)
- Your team responds from within the platform
- Notifications go to Slack for high-priority replies

### Cross-Channel Sync (The Cloudflare Worker)
This is the critical automation that keeps cold calling and cold email in sync:

```
Meeting booked in Instantly (cold email)
    → Instantly webhook fires
    → Cloudflare Worker receives it
    → Updates lead status in the platform database
    → Triggers API call to Koncert to pause/remove lead from calling queue

Meeting booked in Koncert (cold call)
    → Koncert webhook fires
    → Cloudflare Worker receives it
    → Updates lead status in the platform database
    → Triggers API call to Instantly to remove lead from email sequence
```

This is **bi-directional**: no matter which channel books the meeting, the other channel stops outreach to that lead immediately. The Cloudflare Worker sits in the middle, listening for status changes from both sides and coordinating the updates.

### Cal.com → Platform (Booking)
When a meeting is booked via Cal.com, the platform gets notified and updates the activity feed and meeting counts.

---

## Key Design Decisions

- **Cold calling and cold email are never aggregated together.** Each channel has its own section everywhere.

- **No deal tracking.** Meetings booked is the primary success metric. No CRM pipeline stages.

- **No open rate tracking for email.** Open rates are unreliable. Email funnel: sent → replies → meetings.

- **No LinkedIn for Phase 1.** Can be added later.

- **SDRs vs. Inbox Managers.** Cold calling shows "Assigned SDRs", cold email shows "Inbox Managers".

- **MasterInbox is embedded, not separate.** Clients and admins access inbox management directly within the portal.

- **Admin vs. Client views are clearly separated.** Toggle in the sidebar lets you preview exactly what clients see.

---

## Phase 1 Scope

Based on our conversations, here's what Phase 1 includes:

- **Supabase** for authentication (email/Google login) and database
- **Clay webhook integration** — lead lists flow in automatically, grouped by ICP
- **Instantly integration** — two-way sync for lead status and email metrics
- **Koncert integration** — cold calling metrics (dials, connects, conversations, meetings)
- **MasterInbox integration** — embedded inbox with AI labeling for reply management
- **Cloudflare Worker** — bi-directional sync between Instantly and Koncert (meeting booked in one channel stops outreach in the other)
- **Client-facing views** — clients log in and see their dashboard with channel funnels, campaigns, leads, pending replies, and inbox
- **Admin views** — full picture across all clients with health scores and diagnostics
- **Role-based access** — SDRs can be given access to specific clients

---

## Please Review

Take a look at the live prototype and let me know:

1. **Is anything missing?** Any page or metric you expected to see but don't?
2. **Is anything wrong?** Data that doesn't make sense for how you'd actually operate?
3. **Is anything unnecessary?** Anything that adds clutter without adding value?
4. **Any new ideas?** Things that came to mind as you clicked around?

Use the **view mode toggle** in the sidebar to switch between Admin View and Client View to see the difference.

Once we're aligned on the scope, I'll put together the proposal with pricing tiers.
