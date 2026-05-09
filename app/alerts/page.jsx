// app/alerts/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ALERTS PAGE (/alerts)
// Shows Ali which memberships are expiring, expired, or unpaid.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useMembers } from "@/lib/MembersContext";
import NotificationList from "@/components/notifications/NotificationList";

export default function AlertsPage() {
  const { members } = useMembers();

  return <NotificationList members={members} />;
}
