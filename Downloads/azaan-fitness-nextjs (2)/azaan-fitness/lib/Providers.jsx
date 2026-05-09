// lib/Providers.jsx
// ─────────────────────────────────────────────────────────────────────────────
// PROVIDERS WRAPPER — hydration-safe
//
// WHY THIS FILE EXISTS:
//   app/layout.jsx is a Server Component (no "use client").
//   React Context requires "use client" to work.
//   So we put all providers here, then import this one file into layout.jsx.
//
// WHY THE LOADING SCREEN:
//   MembersContext starts with SAMPLE_MEMBERS on both server and client
//   (so HTML matches — no hydration error). Then useEffect loads localStorage.
//   During that brief window between first render and localStorage load,
//   we show a loading screen instead of flashing sample data that immediately
//   gets replaced. Looks professional, prevents any visible flicker.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { MembersProvider, useMembers } from "./MembersContext";

// ─── Inner wrapper: reads hydrated flag from context ─────────────────────────
// This must be a separate component (child of MembersProvider) so it can
// call useMembers() — you can't call a context hook in the same component
// that renders the Provider.
function HydrationGate({ children }) {
  const { hydrated } = useMembers();

  // While localStorage hasn't been read yet, show a minimal loading screen.
  // This is only visible for ~1 frame on fast devices, slightly longer on slow ones.
  if (!hydrated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "#0a0a0a" }}
      >
        {/* Pulsing logo */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            animation: "pulse 1.2s ease-in-out infinite",
          }}
        >
          💪
        </div>

        {/* Gym name */}
        <div
          className="text-white/80 tracking-widest text-sm font-semibold uppercase"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: 4, fontSize: 18 }}
        >
          Azaan Fitness
        </div>

        {/* Thin orange progress bar at the bottom */}
        <div
          className="fixed bottom-0 left-0 h-0.5 w-full"
          style={{
            background: "linear-gradient(90deg,#f97316,#ea580c)",
            animation: "loadbar 0.8s ease-out forwards",
          }}
        />

        <style>{`
          @keyframes loadbar {
            from { transform: scaleX(0); transform-origin: left; }
            to   { transform: scaleX(1); transform-origin: left; }
          }
        `}</style>
      </div>
    );
  }

  // localStorage loaded — render the real app
  return <>{children}</>;
}

// ─── Default export: wraps everything ────────────────────────────────────────
export default function Providers({ children }) {
  return (
    <MembersProvider>
      <HydrationGate>
        {children}
      </HydrationGate>
    </MembersProvider>
  );
}
