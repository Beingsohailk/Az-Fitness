// components/ui/StatCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// STAT CARD COMPONENT
// Shows a single metric (e.g. "Active: 3") with an icon and border color.
// Used in the dashboard header section.
// ─────────────────────────────────────────────────────────────────────────────

export default function StatCard({ label, value, icon, borderColor }) {
  // borderColor examples: "border-green-500/20", "border-orange-500/20"
  return (
    <div
      className={`rounded-2xl p-4 flex items-center gap-3 border ${borderColor}`}
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <div className="text-2xl">{icon}</div>
      <div>
        <div
          className="text-2xl font-black tracking-tight"
          style={{ fontFamily: "'Bebas Neue', cursive" }}
        >
          {value}
        </div>
        <div className="text-xs font-semibold uppercase tracking-widest opacity-60">
          {label}
        </div>
      </div>
    </div>
  );
}
