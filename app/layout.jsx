// app/layout.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ROOT LAYOUT
// This file wraps EVERY page in the app.
// Think of it like a master template — header + bottom nav appear on all pages.
// ─────────────────────────────────────────────────────────────────────────────

import "./globals.css";
import Providers from "@/lib/Providers";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

// This metadata shows in the browser tab
export const metadata = {
  title: "Azaan Fitness",
  description: "Gym Management App by Ali — Hubballi-Dharwad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div
            className="min-h-screen flex flex-col mx-auto"
            style={{ maxWidth: 480, background: "#0a0a0a" }}
          >
            <Header />
            <main className="flex-1 overflow-y-auto px-4 py-5">
              {children}
            </main>
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
