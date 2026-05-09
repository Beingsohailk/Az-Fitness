// components/dashboard/MemberCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// MEMBER CARD
// Displays a single gym member's info card in the dashboard list.
// Shows: name, phone, join date, expiry, status badge, renew button.
// ─────────────────────────────────────────────────────────────────────────────

import Badge from "@/components/ui/Badge";
import {
  getMemberExpiry,
  getMemberStatus,
  daysLeft,
  formatDate,
  getInitials,
} from "@/lib/helpers";

export default function MemberCard({ member, onRenew }) {
  const expiry = getMemberExpiry(member);
  const days = daysLeft(expiry);
  const status = getMemberStatus(member);
  const initials = getInitials(member.name);

  // Color for days-left text
  const daysColor =
    days < 0 ? "text-red-400" : days <= 7 ? "text-orange-400" : "text-green-400";

  // Human-readable days label
  const daysLabel =
    days < 0
      ? `Expired ${Math.abs(days)}d ago`
      : days === 0
      ? "Expires today!"
      : `${days} days left`;

  return (
    <div
      className="rounded-2xl border border-white/5 p-4 flex flex-col gap-3 hover:border-orange-500/40 transition-all"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      {/* ── Top row: avatar + name + badge ── */}
      <div className="flex items-center gap-3">
        {/* Avatar circle with initials */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
          style={{
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 16,
          }}
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-bold text-white truncate">{member.name}</div>
          <div className="text-xs text-white/40">📞 {member.phone}</div>
        </div>

        <Badge status={status} />
      </div>

      {/* ── Date grid ── */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-white/40 mb-0.5">Joined</div>
          <div className="font-semibold">{formatDate(member.joinDate)}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-white/40 mb-0.5">Expires</div>
          <div className="font-semibold">{formatDate(expiry)}</div>
        </div>
      </div>

      {/* ── Bottom row: days left + payment + renew ── */}
      <div className="flex items-center justify-between">
        <div className={`text-xs font-bold ${daysColor}`}>{daysLabel}</div>

        <div className="flex gap-2 items-center">
          {/* Payment status pill */}
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              member.paid
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {member.paid ? "Paid ✓" : "Unpaid"}
          </span>

          {/* Renew button — only for expiring/expired members */}
          {(status === "expiring" || status === "expired") && (
            <button
              onClick={() => onRenew(member.id)}
              className="text-xs px-3 py-1 rounded-full font-bold text-white"
              style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}
            >
              Renew
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
