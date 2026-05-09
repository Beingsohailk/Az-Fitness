// lib/MembersContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// MEMBERS CONTEXT — hydration-safe localStorage persistence
//
// THE HYDRATION PROBLEM (and why it happens):
// ─────────────────────────────────────────────
// Next.js renders your page TWICE:
//   Pass 1 — on the SERVER (Node.js): no browser, no localStorage
//   Pass 2 — on the CLIENT (browser): hydration, React "takes over" the HTML
//
// If Pass 1 and Pass 2 produce different HTML, React throws:
//   "Hydration failed because the initial UI does not match
//    what was rendered on the server"
//
// The old broken pattern:
//   useState(() => {
//     if (typeof window === "undefined") return SAMPLE_MEMBERS  ← server gets this
//     return loadFromStorage() ?? SAMPLE_MEMBERS               ← client gets this (DIFFERENT!)
//   })
//   → Server HTML ≠ Client HTML → 💥 hydration error
//
// THE FIX — Two-phase mount:
// ──────────────────────────
//   Phase 1 (server + first client render):
//     → Always start with SAMPLE_MEMBERS
//     → Server and client render IDENTICAL HTML ✓
//
//   Phase 2 (useEffect — runs only in browser, after hydration):
//     → Read localStorage
//     → If data found, replace state with saved data
//     → Set `hydrated = true` → app renders with real data
//
//   This is the official Next.js App Router pattern for browser-only APIs.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SAMPLE_MEMBERS } from "@/data/sampleData";

const STORAGE_KEY = "azaan_fitness_members";

// ─── localStorage helpers ─────────────────────────────────────────────────────

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return null; // ignore corrupted data
    return parsed;
  } catch {
    return null;
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // silently ignore (private mode, storage full, etc.)
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const MembersContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function MembersProvider({ children }) {
  // ── Phase 1: always start with SAMPLE_MEMBERS ────────────────────────────
  // Both the server AND the first browser render use this exact value.
  // This guarantees server HTML === client HTML → no hydration mismatch.
  const [members, setMembers] = useState(SAMPLE_MEMBERS);

  // `hydrated` tracks whether we've finished loading from localStorage.
  // While false, the app shows a loading screen instead of potentially
  // stale sample data flickering before real data appears.
  const [hydrated, setHydrated] = useState(false);

  // ── Phase 2: load localStorage after hydration ───────────────────────────
  // useEffect NEVER runs on the server — only in the browser, after React
  // has finished hydrating the HTML. This is the safe place to read localStorage.
  useEffect(() => {
    const saved = loadFromStorage();

    if (saved) {
      // Replace sample data with the user's real saved data
      setMembers(saved);
    }
    // If nothing in localStorage, keep SAMPLE_MEMBERS as the starting point
    // and save them so future visits load from storage too
    else {
      saveToStorage(SAMPLE_MEMBERS);
    }

    // Signal that hydration is complete — app can now render fully
    setHydrated(true);
  }, []); // [] = run once, only after the very first render

  // ── Auto-save whenever members change ────────────────────────────────────
  // We skip saving during the initial hydration phase (before localStorage
  // has been read) to avoid overwriting real data with sample data.
  useEffect(() => {
    if (!hydrated) return; // don't save during Phase 1
    saveToStorage(members);
  }, [members, hydrated]);

  // ── Actions ──────────────────────────────────────────────────────────────
  // All actions call setMembers → triggers auto-save useEffect above

  const addMember = useCallback((memberData) => {
    setMembers((prev) => [
      ...prev,
      { ...memberData, id: Date.now(), duration: parseInt(memberData.duration) },
    ]);
  }, []);

  const renewMember = useCallback((id) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id !== id
          ? m
          : { ...m, joinDate: new Date().toISOString().split("T")[0], paid: true }
      )
    );
  }, []);

  const togglePayment = useCallback((id) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, paid: !m.paid } : m))
    );
  }, []);

  const deleteMember = useCallback((id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const resetToSample = useCallback(() => {
    if (window.confirm("Reset all data to sample members? This cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      setMembers(SAMPLE_MEMBERS);
    }
  }, []);

  return (
    <MembersContext.Provider
      value={{
        members,
        hydrated,   // ← expose so Providers.jsx can show a loading screen
        addMember,
        renewMember,
        togglePayment,
        deleteMember,
        resetToSample,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

// ─── Custom hook ──────────────────────────────────────────────────────────────

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembers must be used inside <MembersProvider>");
  }
  return context;
}
