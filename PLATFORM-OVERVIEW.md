# Dickens Media - Client Portal Platform Overview

Here's a walkthrough of the prototype so far. Please review everything and let me know if anything is missing, needs to change, or if you have questions. We need to go through one final feedback loop on this before I put together the proposal.

---

## What This Platform Does

This is your **operational command center** - a single place where you (and eventually your clients) can see exactly how campaigns are performing across both cold calling and cold email, without needing to jump between Instantly, Koncert, Clay, and spreadsheets.

The core philosophy is **observability first**: see all the data, make informed decisions, and only automate once you've identified repeatable patterns in how you manage the business.

---

## Pages in the Prototype

### 1. Dashboard
The first thing you see when you log in. Shows:
- **Total Leads** generated across all campaigns
- **Meetings Booked** this month
- **Reply Rate** across all campaigns
- A list of **active campaigns** with progress bars toward their lead targets
- A **recent activity feed** showing meetings booked, leads captured, emails sent, etc.

This is what your clients will see when they log in - a clean, high-level summary of how things are going.

### 2. All Clients
A table view of every client you manage. At a glance you can see:
- Health status (healthy / warning / critical)
- Number of cold calling and cold email campaigns running
- Meetings booked vs. target
- Reply time performance
- Monthly retainer (MRR)

This is your bird's-eye view across the entire business.

### 3. Live Campaigns
Where you monitor individual campaigns in detail. Separated into two tabs: **Cold Calling** and **Cold Email** (kept completely separate, as we discussed - different volumes, different metrics).

Each campaign card shows:
- **Pacing indicator** - are you ahead, on track, or behind schedule? Calculated from current pace vs. required pace to hit the target by the deadline
- **Meetings target** with progress bar
- **Leads contacted** with remaining inventory and a low-inventory warning
- **Assigned team members** - labeled as "SDRs" for cold calling and "Inbox Managers" for cold email, each with their individual meeting targets and progress

### 4. Lead Tracker
Manages your lead lists coming in from Clay. Two views:
- **Lead Lists** - each list shows the ICP, source (Clay), enrichment status, total leads, and which channels the list is being used for (cold calling, cold email, or both)
- **All Leads** - a searchable/filterable table of every individual lead with their status (New, Contacted, Replied, Meeting Booked, Not Interested), company, list, channels, and enrichment status

As discussed, a single lead list can be used across both cold calling and cold email campaigns simultaneously.

### 5. Pending Replies
Leads that have replied and are waiting for a response from the team. Visible to both you and your clients. Each reply card shows:
- Who replied, from which company
- The actual reply text
- How long they've been waiting
- Priority level (high / medium / low)
- Which campaign and client it belongs to
- Who it's assigned to

There are filters for high priority and overdue (24h+) replies, plus summary stats at the top.

### 6. Client Health (Admin Only)
This is your internal page - clients don't see it. A detailed health dashboard for each client showing:
- **Health score** (0-100) calculated from campaign performance
- **Reply time performance** - how fast your team is responding
- **Quick stats** - meetings booked vs. target for calling and email separately
- **Channel cards** with full funnel breakdowns:
  - Cold calling: dials > connects (%) > conversations (%) > meetings (%)
  - Cold email: sent > replies (%) > meetings (%)
- **Pacing data** - current pace vs. required pace, leads remaining, campaign count
- **Diagnostic alerts** - AI-generated suggestions when something looks off (e.g., "Low reply rate - review messaging and targeting")
- **Active alerts** for things like low lead pools, slow reply times, behind on targets

### 7. Meet Your AM
A page your clients see where they can find your contact info, book a call, or send a message. Shows your availability and preferred contact methods.

---

## Key Design Decisions

- **Cold calling and cold email are never aggregated together.** The volume difference would make calling metrics invisible inside email numbers. Each channel has its own section everywhere.

- **No deal tracking.** The platform is built around meetings booked as the primary success metric. There's no CRM and no pipeline stages after the meeting is booked.

- **No open rate tracking for email.** Open rates are unreliable and tracking them can hurt sender reputation. The email funnel goes: sent > replies > meetings.

- **No LinkedIn for Phase 1.** We can add it later when you're ready.

- **SDRs vs. Inbox Managers.** Cold calling campaigns show "Assigned SDRs", cold email campaigns show "Inbox Managers" - matching how you actually staff these channels.

- **Client switcher in the sidebar.** A dropdown at the top of the navigation lets you switch between client views quickly. Health status colors on each client avatar give you instant visibility.

---

## Tentative Phase 1 Scope

Based on our conversations, here's what Phase 1 would include when we build this for real. This is a tentative scope and may be slightly adjusted as we start building it out.

- **Supabase** for authentication (email login or Google login) and database - secure, battle-tested, no custom auth to worry about
- **Clay webhook integration** - lead lists flow in automatically, grouped by ICP
- **Instantly integration** - two-way sync so that when a meeting is booked from cold email, it updates in the platform (and the cold caller knows not to call), and vice versa
- **Koncert integration** - pull in cold calling metrics (dials, connects, conversations, meetings)
- **Client-facing views** - your clients log in and see their own dashboard, campaigns, leads, and pending replies
- **Admin views** - you see the full picture across all clients with health scores and diagnostics
- **Role-based access** - SDRs can be given access to specific clients, not all of them

---

## Please Review

Take a look at the live prototype and let me know:

1. **Is anything missing?** Any page or metric you expected to see but don't?
2. **Is anything wrong?** Data that doesn't make sense for how you'd actually operate?
3. **Is anything unnecessary?** Anything that adds clutter without adding value?
4. **Any new ideas?** Things that came to mind as you clicked around?

Once we're aligned on the scope, I'll put together the proposal with pricing tiers.
