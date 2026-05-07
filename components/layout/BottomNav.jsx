// components/layout/BottomNav.jsx
// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM NAVIGATION BAR
// Mobile-style nav shown at the bottom of every page.
// Uses Next.js usePathname to highlight the active route.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMembers } from "@/lib/MembersContext";
import { getMemberStatus } from "@/lib/helpers";

// Define all nav tabs here — easy to add more later
const TABS = [
  { href: "/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/member",    icon: "🏋️", label: "My Card" },
  { href: "/alerts",    icon: "🔔", label: "Alerts" },
  { href: "/about",     icon: "👤", label: "About" },
  { href: "/contact",   icon: "📍", label: "Contact" },
];

export default function BottomNav() {
  const pathname = usePathname(); // current URL path
  const { members } = useMembers();

  const alertCount = members.filter(
    (m) => getMemberStatus(m) !== "active"
  ).length;

  return (
    <nav
      className="sticky bottom-0 z-40 flex justify-around items-center px-2 py-2 border-t border-white/5"
      style={{
        background: "rgba(10,10,10,0.97)",
        backdropFilter: "blur(20px)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <div key={tab.href} className="relative">
            <Link
              href={tab.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive ? "text-orange-400" : "text-white/30 hover:text-white/60"
              }`}
              style={
                isActive ? { background: "rgba(249,115,22,0.12)" } : {}
              }
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wide">
                {tab.label}
              </span>
            </Link>

            {/* Red dot badge on Alerts tab when there are issues */}
            {tab.href === "/alerts" && alertCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-black"
                style={{ background: "#ef4444" }}
              >
                {alertCount}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
