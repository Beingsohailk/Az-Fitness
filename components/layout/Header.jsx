// components/layout/Header.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HEADER COMPONENT
// Sticky top bar shown on every page.
// Shows gym name/logo + alert count badge.
// ─────────────────────────────────────────────────────────────────────────────

"use client"; // needs client for useMembers hook

import { useMembers } from "@/lib/MembersContext";
import { getMemberStatus } from "@/lib/helpers";

export default function Header() {
  const { members } = useMembers();

  // Count members who are NOT active (expiring or expired)
  const alertCount = members.filter(
    (m) => getMemberStatus(m) !== "active"
  ).length;

  return (
    <header
      className="sticky top-0 z-40 px-4 pt-4 pb-3 border-b border-white/5"
      style={{
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center justify-between">
        {/* ── Logo + Gym Name ── */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}
          >
            💪
          </div>
          <div>
            <div
              className="font-black leading-none"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 20,
                letterSpacing: 2,
              }}
            >
              AZAAN FITNESS
            </div>
            <div className="text-[10px] text-white/30 tracking-wider uppercase">
              Hubballi–Dharwad
            </div>
          </div>
        </div>

        {/* ── Alert pill — only shown when there are alerts ── */}
        {alertCount > 0 && (
          <div
            className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold text-orange-400"
            style={{
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.2)",
            }}
          >
            🔔 {alertCount} alert{alertCount > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </header>
  );
}
