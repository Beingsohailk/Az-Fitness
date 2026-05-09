// data/sampleData.js
// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE DATA
// This is your mock database. In the future you'll replace this with
// real MongoDB data fetched from an API route.
// ─────────────────────────────────────────────────────────────────────────────

// ── Gym Members ──────────────────────────────────────────────────────────────
// Each member has:
//   id        → unique identifier
//   name      → full name
//   phone     → 10-digit number (used as login for member portal)
//   joinDate  → YYYY-MM-DD format
//   duration  → membership length in months (1, 3, 6, or 12)
//   paid      → boolean — has this month been paid?

export const SAMPLE_MEMBERS = [
  {
    id: 1,
    name: "Rahul Sharma",
    phone: "9876543210",
    joinDate: "2025-01-15",
    duration: 3,
    paid: true,
  },
  {
    id: 2,
    name: "Priya Nair",
    phone: "9123456789",
    joinDate: "2025-03-01",
    duration: 1,
    paid: true,
  },
  {
    id: 3,
    name: "Vikram Singh",
    phone: "9988776655",
    joinDate: "2024-12-10",
    duration: 6,
    paid: false,
  },
  {
    id: 4,
    name: "Anjali Desai",
    phone: "9001122334",
    joinDate: "2025-04-20",
    duration: 1,
    paid: true,
  },
  {
    id: 5,
    name: "Mohammed Rauf",
    phone: "9112233445",
    joinDate: "2025-02-01",
    duration: 3,
    paid: true,
  },
];

// ── Ali's Achievements ────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    icon: "🥇",
    title: "State Champion",
    year: "2018",
    desc: "Karnataka Bodybuilding Championship",
  },
  {
    icon: "🏆",
    title: "Best Coach Award",
    year: "2021",
    desc: "Hubballi Fitness Federation",
  },
  {
    icon: "💪",
    title: "500+ Members Trained",
    year: "2023",
    desc: "Milestone Achievement",
  },
  {
    icon: "🥈",
    title: "Regional Runner-up",
    year: "2019",
    desc: "South India Fitness Expo",
  },
];

// ── Gym Photos (placeholder — replace with real next/image paths later) ───────
export const GYM_PHOTOS = [
  { label: "Main Floor",   emoji: "🏋️", bg: "from-orange-900 to-black" },
  { label: "Cardio Zone",  emoji: "🚴", bg: "from-gray-900 to-orange-950" },
  { label: "Free Weights", emoji: "💪", bg: "from-zinc-900 to-gray-950" },
  { label: "Boxing Ring",  emoji: "🥊", bg: "from-orange-950 to-zinc-900" },
];

// ── Gym Contact Info ──────────────────────────────────────────────────────────
export const GYM_INFO = {
  name: "Azaan Fitness",
  ownerName: "Ali Khan",
  phone: "+91 8310526243",
  whatsapp: "918310526243",
  email: "ali@azaanfitness.in",
  address: "Anand nagar, Hubballi-580031, Karnataka",
  timings: {
    weekdays: "5AM – 10PM",
    sunday: "6AM – 8PM",
  },
};
