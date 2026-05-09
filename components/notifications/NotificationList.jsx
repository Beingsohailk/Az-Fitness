// components/notifications/NotificationList.jsx
// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATION LIST
// Shows Ali three lists: expiring soon, already expired, unpaid.
// Each list has a member row with name, phone, and days info.
// ─────────────────────────────────────────────────────────────────────────────

import { getMemberStatus, getMemberExpiry, daysLeft, getInitials } from "@/lib/helpers";

// ── A single member row inside a notification group ──────────────────────────
function MemberRow({ member }) {
  const expiry = getMemberExpiry(member);
  const days = daysLeft(expiry);

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
      {/* Mini avatar */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
        style={{
          background: "linear-gradient(135deg,#f97316,#ea580c)",
          fontFamily: "'Bebas Neue', cursive",
        }}
      >
        {getInitials(member.name)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{member.name}</div>
        <div className="text-xs text-white/40">📞 {member.phone}</div>
      </div>

      {/* Days label */}
      <div
        className={`text-xs font-bold ${
          days < 0 ? "text-red-400" : "text-orange-400"
        }`}
      >
        {days < 0 ? `${Math.abs(days)}d ago` : `${days}d left`}
      </div>
    </div>
  );
}

// ── A section / group card ────────────────────────────────────────────────────
function NotifGroup({ icon, title, members, textColor }) {
  return (
    <div
      className="rounded-2xl border border-white/5 p-5"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      {/* Group header */}
      <div className={`flex items-center gap-2 mb-4 ${textColor}`}>
        <span className="text-xl">{icon}</span>
        <span
          className="font-black text-sm uppercase tracking-wider"
          style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 16 }}
        >
          {title}
        </span>
        {/* Count badge */}
        <span
          className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${textColor} bg-white/5`}
        >
          {members.length}
        </span>
      </div>

      {/* Members or empty state */}
      {members.length === 0 ? (
        <div className="text-center py-4 text-white/30 text-sm">All clear ✓</div>
      ) : (
        members.map((m) => <MemberRow key={m.id} member={m} />)
      )}
    </div>
  );
}

// ── Main exported component ────────────────────────────────────────────────────
export default function NotificationList({ members }) {
  const expiring = members.filter((m) => getMemberStatus(m) === "expiring");
  const expired  = members.filter((m) => getMemberStatus(m) === "expired");
  const unpaid   = members.filter((m) => !m.paid);

  return (
    <div className="flex flex-col gap-4">
      {/* Info banner */}
      <div
        className="rounded-2xl p-4 border border-orange-500/20"
        style={{ background: "rgba(249,115,22,0.08)" }}
      >
        <p className="text-sm text-orange-300 font-semibold">
          💡 Ali&apos;s Alert Center — In production, these will trigger WhatsApp/SMS messages automatically.
        </p>
      </div>

      <NotifGroup
        icon="⚠️"
        title="Expiring in 7 Days"
        members={expiring}
        textColor="text-orange-400"
      />
      <NotifGroup
        icon="🔴"
        title="Memberships Expired"
        members={expired}
        textColor="text-red-400"
      />
      <NotifGroup
        icon="💰"
        title="Pending Payments"
        members={unpaid}
        textColor="text-yellow-400"
      />
    </div>
  );
}
