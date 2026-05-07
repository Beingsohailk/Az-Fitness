// lib/MembersContext.jsx
// ─────────────────────────────────────────────────────────────────────────────
// MEMBERS CONTEXT (Global State)
// React Context lets us share member data across all pages without
// passing props through every component. Think of it as a global store.
//
// How to use in any component:
//   import { useMembers } from "@/lib/MembersContext";
//   const { members, addMember, renewMember } = useMembers();
// ─────────────────────────────────────────────────────────────────────────────

"use client"; // Context needs to run in the browser, not on the server

import { createContext, useContext, useState } from "react";
import { SAMPLE_MEMBERS } from "@/data/sampleData";

// Step 1: Create the context object
const MembersContext = createContext(null);

// Step 2: Create the Provider component
// Wrap your app with this so all children can access member data
export function MembersProvider({ children }) {
  // Members list — starts with sample data
  const [members, setMembers] = useState(SAMPLE_MEMBERS);

  // ── Actions ──────────────────────────────────────────────────────────────

  /** Add a new member to the list */
  function addMember(memberData) {
    const newMember = {
      ...memberData,
      id: Date.now(), // temporary ID — replace with MongoDB _id later
      duration: parseInt(memberData.duration),
    };
    setMembers((prev) => [...prev, newMember]);
  }

  /** Renew a member: reset join date to today and mark as paid */
  function renewMember(id) {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        return {
          ...m,
          joinDate: new Date().toISOString().split("T")[0],
          paid: true,
        };
      })
    );
  }

  /** Toggle payment status for a member */
  function togglePayment(id) {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, paid: !m.paid } : m))
    );
  }

  // Step 3: Provide values to all children
  return (
    <MembersContext.Provider
      value={{ members, addMember, renewMember, togglePayment }}
    >
      {children}
    </MembersContext.Provider>
  );
}

// Step 4: Custom hook — easier to use than useContext(MembersContext)
export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error("useMembers must be used inside <MembersProvider>");
  }
  return context;
}
