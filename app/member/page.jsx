// app/member/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// MEMBER PAGE (/member)
// Self-service portal for gym members to check their own membership.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useMembers } from "@/lib/MembersContext";
import MemberLoginCard from "@/components/member/MemberLoginCard";

export default function MemberPage() {
  const { members } = useMembers();

  return <MemberLoginCard members={members} />;
}
