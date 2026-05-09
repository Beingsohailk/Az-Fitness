// components/member/MemberLoginCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// MEMBER LOGIN CARD
// Self-service portal for gym members to check their membership status.
// Member types their phone number → sees expiry date + days remaining.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import {
  getMemberExpiry,
  getMemberStatus,
  daysLeft,
  formatDate,
  getInitials,
} from "@/lib/helpers";
import { GYM_INFO } from "@/data/sampleData";

export default function MemberLoginCard({ members }) {
  const [phone, setPhone] = useState("");
  const [foundMember, setFoundMember] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleLogin = () => {
    const m = members.find((x) => x.phone === phone.trim());
    if (m) {
      setFoundMember(m);
      setNotFound(false);
    } else {
      setFoundMember(null);
      setNotFound(true);
    }
  };

  const handleBack = () => {
    setFoundMember(null);
    setPhone("");
    setNotFound(false);
  };

  // ── If member found: show their card ──────────────────────────────────────
  if (foundMember) {
    const expiry = getMemberExpiry(foundMember);
    const days = daysLeft(expiry);
    const status = getMemberStatus(foundMember);
    const initials = getInitials(foundMember.name);

    // Progress bar percentage: how much membership is left
    const totalDays = foundMember.duration * 30;
    const pct = Math.max(0, Math.min(100, (days / totalDays) * 100));

    const daysColor =
      days < 0 ? "text-red-400" : days <= 7 ? "text-orange-400" : "text-green-400";

    return (
      <div className="flex flex-col gap-5 items-center max-w-sm mx-auto">
        {/* Profile card */}
        <div
          className="w-full rounded-2xl border border-orange-500/30 p-6 text-center"
          style={{
            background: "linear-gradient(135deg,rgba(249,115,22,0.1),rgba(0,0,0,0.5))",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4"
            style={{
              background: "linear-gradient(135deg,#f97316,#ea580c)",
              fontFamily: "'Bebas Neue', cursive",
            }}
          >
            {initials}
          </div>
          <h2
            className="text-2xl font-black"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: 2 }}
          >
            {foundMember.name}
          </h2>
          <p className="text-white/40 text-sm">📞 {foundMember.phone}</p>
        </div>

        {/* Progress bar + days */}
        <div
          className="w-full rounded-2xl border border-white/5 p-5"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-white/40">Membership Progress</span>
            <Badge status={status} />
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg,#f97316,#fb923c)",
              }}
            />
          </div>
          <div
            className={`text-center mt-4 text-4xl font-black ${daysColor}`}
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            {days < 0 ? "EXPIRED" : `${days} DAYS LEFT`}
          </div>
        </div>

        {/* Date grid */}
        <div className="w-full grid grid-cols-2 gap-3">
          <div
            className="rounded-xl p-4 border border-white/5"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="text-xs text-white/40 mb-1">Joined</div>
            <div className="font-bold text-sm">{formatDate(foundMember.joinDate)}</div>
          </div>
          <div
            className="rounded-xl p-4 border border-white/5"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="text-xs text-white/40 mb-1">Expires</div>
            <div className={`font-bold text-sm ${daysColor}`}>
              {formatDate(expiry)}
            </div>
          </div>
        </div>

        {/* Renewal reminder */}
        {(status === "expiring" || status === "expired") && (
          <div
            className="w-full rounded-xl border border-orange-500/30 p-4 text-center"
            style={{ background: "rgba(249,115,22,0.08)" }}
          >
            <div className="text-orange-400 font-bold mb-1">
              {status === "expired" ? "⛔ Membership Expired!" : "⚠️ Renew Soon!"}
            </div>
            <div className="text-sm text-white/60 mb-3">
              Contact {GYM_INFO.ownerName} on WhatsApp to renew your membership
            </div>
            <a
              href={`https://wa.me/${GYM_INFO.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: "#25D366" }}
            >
              💬 WhatsApp Ali
            </a>
          </div>
        )}

        <button
          onClick={handleBack}
          className="text-sm text-white/40 hover:text-white transition-colors"
        >
          ← Back to Login
        </button>
      </div>
    );
  }

  // ── Login form ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 items-center max-w-sm mx-auto">
      <div className="text-center">
        <div className="text-6xl mb-3">🏋️</div>
        <h2
          className="text-3xl font-black"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: 3 }}
        >
          MEMBER LOGIN
        </h2>
        <p className="text-white/40 text-sm mt-1">
          Enter your registered phone number
        </p>
      </div>

      <div
        className="w-full rounded-2xl border border-white/10 p-6"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">
          Phone Number
        </label>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-orange-500 transition-colors"
          placeholder="10-digit number"
          maxLength={10}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {notFound && (
          <p className="text-red-400 text-sm mt-2">
            ❌ No member found with this number. Contact Ali.
          </p>
        )}

        <button
          onClick={handleLogin}
          className="mt-4 w-full py-3 rounded-xl font-black text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            fontFamily: "'Bebas Neue', cursive",
            letterSpacing: 2,
            fontSize: 16,
          }}
        >
          CHECK MY MEMBERSHIP
        </button>
      </div>

      {/* Hint for demo */}
      <div
        className="w-full rounded-xl p-3 text-xs text-center text-white/30 border border-white/5"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        💡 Try: 9876543210 · 9123456789 · 9988776655
      </div>
    </div>
  );
}
