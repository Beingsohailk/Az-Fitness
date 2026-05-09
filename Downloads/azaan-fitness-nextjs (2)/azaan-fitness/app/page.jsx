// app/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ROOT PAGE (/)
// When someone visits the homepage, redirect them to /dashboard
// ─────────────────────────────────────────────────────────────────────────────

import { redirect } from "next/navigation";

export default function Home() {
  // Immediately redirect to dashboard page
  redirect("/dashboard");
}
