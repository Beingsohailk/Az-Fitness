// components/dashboard/AddMemberModal.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ADD MEMBER MODAL
// A full-screen overlay form for adding a new gym member.
// Validates input and shows preview of expiry date before submitting.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import { addMonths, formatDate } from "@/lib/helpers";

// Shared input class — reused for all form fields
const INPUT_CLASS =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors";

export default function AddMemberModal({ onClose, onAdd }) {
  // Form state — all fields in one object
  const [form, setForm] = useState({
    name: "",
    phone: "",
    joinDate: new Date().toISOString().split("T")[0], // today's date
    duration: "1",
    paid: true,
  });

  const [error, setError] = useState("");

  // Helper to update a single field
  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  // Calculate preview expiry date
  const previewExpiry =
    form.joinDate && form.duration
      ? formatDate(addMonths(form.joinDate, parseInt(form.duration)))
      : null;

  // Handle form submission
  const handleSubmit = () => {
    setError("");

    // Validation
    if (!form.name.trim()) return setError("Name is required");
    if (!/^\d{10}$/.test(form.phone)) return setError("Enter a valid 10-digit phone number");
    if (!form.joinDate) return setError("Join date is required");

    // Call parent add function
    onAdd(form);
    onClose();
  };

  return (
    // Backdrop overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
    >
      {/* Modal box */}
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 p-6"
        style={{ background: "#111" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-black"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: 2 }}
          >
            Add New Member
          </h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
              Full Name
            </label>
            <input
              className={INPUT_CLASS}
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
              Phone Number
            </label>
            <input
              className={INPUT_CLASS}
              placeholder="10-digit number"
              maxLength={10}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>

          {/* Join Date */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
              Join Date
            </label>
            <input
              type="date"
              className={INPUT_CLASS}
              value={form.joinDate}
              onChange={(e) => update("joinDate", e.target.value)}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
              Membership Duration
            </label>
            <select
              className={INPUT_CLASS}
              value={form.duration}
              onChange={(e) => update("duration", e.target.value)}
            >
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months (Annual)</option>
            </select>
          </div>

          {/* Payment toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => update("paid", !form.paid)}
              className="w-12 h-6 rounded-full transition-all relative flex-shrink-0"
              style={
                form.paid
                  ? { background: "linear-gradient(135deg,#f97316,#ea580c)" }
                  : { background: "rgba(255,255,255,0.1)" }
              }
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                  form.paid ? "left-6" : "left-0.5"
                }`}
              />
            </button>
            <span className="text-sm">
              {form.paid ? "Payment Received ✓" : "Payment Pending"}
            </span>
          </div>

          {/* Expiry preview */}
          {previewExpiry && (
            <div
              className="rounded-xl p-3 text-sm border border-orange-500/20"
              style={{ background: "rgba(249,115,22,0.08)" }}
            >
              <span className="text-orange-400 font-semibold">
                Membership will expire:{" "}
              </span>
              {previewExpiry}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div
              className="text-red-400 text-sm rounded-xl p-3 border border-red-500/20"
              style={{ background: "rgba(239,68,68,0.08)" }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl font-black text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg,#f97316,#ea580c)",
              fontFamily: "'Bebas Neue', cursive",
              letterSpacing: 2,
              fontSize: 16,
            }}
          >
            ADD MEMBER
          </button>
        </div>
      </div>
    </div>
  );
}
