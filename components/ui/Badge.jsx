// components/ui/Badge.jsx
// ─────────────────────────────────────────────────────────────────────────────
// BADGE COMPONENT
// Displays colored status pills: Active / Expiring / Expired
// ─────────────────────────────────────────────────────────────────────────────

export default function Badge({ status }) {
  // Different colors for each status
  const styles = {
    active:   "bg-green-500/20 text-green-400 border-green-500/30",
    expiring: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    expired:  "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded-full border capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}
