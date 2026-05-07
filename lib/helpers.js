// lib/helpers.js
// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// Small reusable utility functions used across the whole app.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * addMonths
 * Adds N months to a date string and returns the result as YYYY-MM-DD.
 *
 * Example:
 *   addMonths("2025-01-15", 3) → "2025-04-15"
 */
export function addMonths(dateStr, months) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0];
}

/**
 * daysLeft
 * Returns how many days remain until the expiry date.
 * Negative number = already expired.
 *
 * Example:
 *   daysLeft("2025-06-01") → 25  (if today is May 7)
 *   daysLeft("2025-04-01") → -36 (already expired)
 */
export function daysLeft(expiryStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // reset to midnight for accurate day count
  const exp = new Date(expiryStr);
  return Math.round((exp - today) / 86400000); // 86400000ms = 1 day
}

/**
 * getMemberStatus
 * Returns the status of a member based on their expiry date.
 *
 * Returns:
 *   "active"   → more than 7 days left
 *   "expiring" → 0 to 7 days left (warning zone)
 *   "expired"  → already expired
 */
export function getMemberStatus(member) {
  const expiry = addMonths(member.joinDate, member.duration);
  const d = daysLeft(expiry);
  if (d < 0) return "expired";
  if (d <= 7) return "expiring";
  return "active";
}

/**
 * getMemberExpiry
 * Calculates and returns expiry date string for a member.
 *
 * Example:
 *   getMemberExpiry({ joinDate: "2025-01-15", duration: 3 }) → "2025-04-15"
 */
export function getMemberExpiry(member) {
  return addMonths(member.joinDate, member.duration);
}

/**
 * formatDate
 * Formats a YYYY-MM-DD string into a human-readable date.
 *
 * Example:
 *   formatDate("2025-04-15") → "15 Apr 2025"
 */
export function formatDate(str) {
  return new Date(str).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * getInitials
 * Returns 2-letter initials from a full name.
 *
 * Example:
 *   getInitials("Rahul Sharma") → "RS"
 *   getInitials("Ali")         → "AL"
 */
export function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
