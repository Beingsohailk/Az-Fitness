// lib/Providers.jsx
// ─────────────────────────────────────────────────────────────────────────────
// PROVIDERS WRAPPER
// This wraps the entire app with all context providers.
// We need this because layout.jsx is a Server Component but Context
// requires "use client". This thin wrapper solves that.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { MembersProvider } from "./MembersContext";

export default function Providers({ children }) {
  return (
    <MembersProvider>
      {children}
    </MembersProvider>
  );
}
