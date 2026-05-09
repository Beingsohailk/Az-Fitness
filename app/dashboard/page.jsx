// app/dashboard/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD PAGE (/dashboard)
// Ali's main admin view. Shows stats, search, filters, and all member cards.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useMemo } from "react";
import { useMembers } from "@/lib/MembersContext";
import { getMemberStatus, getMemberExpiry, daysLeft, addMonths } from "@/lib/helpers";
import StatCard from "@/components/ui/StatCard";
import MemberCard from "@/components/dashboard/MemberCard";
import AddMemberModal from "@/components/dashboard/AddMemberModal";

// Filter button options
const FILTERS = [
  { value: "all",      label: "All" },
  { value: "active",   label: "Active" },
  { value: "expiring", label: "Expiring" },
  { value: "expired",  label: "Expired" },
];

export default function DashboardPage() {
  const { members, addMember, renewMember } = useMembers();

  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [showModal, setShowModal] = useState(false);

  // ── Stats: count each status ──────────────────────────────────────────────
  const stats = useMemo(() => ({
    active:   members.filter((m) => getMemberStatus(m) === "active").length,
    expiring: members.filter((m) => getMemberStatus(m) === "expiring").length,
    expired:  members.filter((m) => getMemberStatus(m) === "expired").length,
  }), [members]);

  // ── Filtered + sorted member list ─────────────────────────────────────────
  const filteredMembers = useMemo(() => {
    return members
      .filter((m) => {
        // Search by name or phone
        const matchSearch =
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.phone.includes(search);
        // Filter by status tab
        const matchFilter =
          filter === "all" || getMemberStatus(m) === filter;
        return matchSearch && matchFilter;
      })
      // Sort by soonest expiry first (most urgent at top)
      .sort((a, b) =>
        daysLeft(getMemberExpiry(a)) - daysLeft(getMemberExpiry(b))
      );
  }, [members, search, filter]);

  return (
    <div className="flex flex-col gap-5">

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Active"   value={stats.active}   icon="✅" borderColor="border-green-500/20"  />
        <StatCard label="Expiring" value={stats.expiring} icon="⚠️" borderColor="border-orange-500/20" />
        <StatCard label="Expired"  value={stats.expired}  icon="🔴" borderColor="border-red-500/20"    />
      </div>

      {/* ── Search + Add button ── */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm pl-9 focus:outline-none focus:border-orange-500 transition-colors"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">
            🔍
          </span>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-white text-sm whitespace-nowrap"
          style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}
        >
          + Add
        </button>
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filter === value
                ? "text-white"
                : "text-white/40 hover:text-white/70"
            }`}
            style={
              filter === value
                ? { background: "linear-gradient(135deg,#f97316,#ea580c)" }
                : { background: "rgba(255,255,255,0.05)" }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Member cards list ── */}
      <div className="flex flex-col gap-3">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12 text-white/30">
            No members found
          </div>
        ) : (
          filteredMembers.map((m) => (
            <MemberCard key={m.id} member={m} onRenew={renewMember} />
          ))
        )}
      </div>

      {/* ── Add Member Modal (shown conditionally) ── */}
      {showModal && (
        <AddMemberModal
          onClose={() => setShowModal(false)}
          onAdd={addMember}
        />
      )}
    </div>
  );
}
