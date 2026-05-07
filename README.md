# 💪 Azaan Fitness — Gym Management App

A modern, mobile-first gym management app built with **Next.js 14** + **Tailwind CSS**.

Built for **Ali** — gym owner at Azaan Fitness, Hubballi-Dharwad.

---

## 📁 Project Structure (Explained Simply)

```
azaan-fitness/
│
├── app/                          ← Next.js App Router pages
│   ├── layout.jsx                ← Master template (header + nav wraps all pages)
│   ├── globals.css               ← Global styles + fonts
│   ├── page.jsx                  ← Root route "/" → redirects to /dashboard
│   │
│   ├── dashboard/
│   │   └── page.jsx              ← /dashboard → Ali's admin panel
│   ├── member/
│   │   └── page.jsx              ← /member → Member self-service login
│   ├── alerts/
│   │   └── page.jsx              ← /alerts → Expiry/payment notifications
│   ├── about/
│   │   └── page.jsx              ← /about → Ali's profile & gym photos
│   └── contact/
│       └── page.jsx              ← /contact → WhatsApp, maps, phone
│
├── components/                   ← Reusable UI building blocks
│   ├── layout/
│   │   ├── Header.jsx            ← Top sticky header (logo + alert badge)
│   │   └── BottomNav.jsx         ← Mobile bottom navigation bar
│   │
│   ├── ui/                       ← Tiny generic components
│   │   ├── Badge.jsx             ← Active / Expiring / Expired pill
│   │   ├── StatCard.jsx          ← Number cards (Active: 3, etc.)
│   │   └── OrangeButton.jsx      ← Reusable orange gradient button
│   │
│   ├── dashboard/
│   │   ├── MemberCard.jsx        ← Single member's info card
│   │   └── AddMemberModal.jsx    ← Popup form to add new member
│   │
│   ├── member/
│   │   └── MemberLoginCard.jsx   ← Phone login + membership status view
│   │
│   ├── notifications/
│   │   └── NotificationList.jsx  ← Expiring/expired/unpaid lists
│   │
│   ├── about/
│   │   └── AboutContent.jsx      ← Ali's story, achievements, gallery
│   │
│   └── contact/
│       └── ContactContent.jsx    ← Maps, WhatsApp, phone, hours
│
├── lib/                          ← Logic & utilities
│   ├── helpers.js                ← Date math, status calculation functions
│   ├── MembersContext.jsx        ← Global state (members list)
│   └── Providers.jsx             ← Wraps app with all context providers
│
├── data/
│   └── sampleData.js             ← Sample members, achievements, gym info
│
├── public/                       ← Static files (images, icons)
│   └── (add gym photos here)
│
├── package.json                  ← Project dependencies
├── tailwind.config.js            ← Tailwind CSS configuration
├── postcss.config.js             ← PostCSS (needed by Tailwind)
└── next.config.js                ← Next.js configuration
```

---

## 🚀 Step-by-Step Setup (Beginner Friendly)

### Step 1 — Install Node.js

Before anything, you need Node.js installed.

1. Go to: https://nodejs.org
2. Download the **LTS** version (recommended)
3. Install it normally (click Next → Next → Install)
4. Verify by opening terminal and typing:
   ```bash
   node --version
   # Should print something like: v20.11.0
   ```

---

### Step 2 — Create the Project Folder

Open **Terminal** (Mac/Linux) or **Command Prompt** (Windows):

```bash
# Go to where you want to save the project
cd Desktop

# Create a new folder
mkdir azaan-fitness
cd azaan-fitness
```

---

### Step 3 — Copy All Project Files

Copy all files from this ZIP/folder into your `azaan-fitness` directory.

Your folder should look like this:
```
azaan-fitness/
  app/
  components/
  lib/
  data/
  package.json
  tailwind.config.js
  ...
```

---

### Step 4 — Install Dependencies

In terminal, inside the `azaan-fitness` folder:

```bash
npm install
```

This will download all packages listed in `package.json`.
It creates a `node_modules/` folder. This takes 1-2 minutes.

---

### Step 5 — Run the Development Server

```bash
npm run dev
```

You'll see output like:
```
▲ Next.js 14.2.3
- Local: http://localhost:3000
```

---

### Step 6 — Open in Browser

Go to: **http://localhost:3000**

The app will load! 🎉

---

## 🧪 Test the App

### Test Member Login
Go to `/member` tab → Enter these phone numbers:

| Phone | Member | Status |
|-------|--------|--------|
| `9876543210` | Rahul Sharma | Active |
| `9123456789` | Priya Nair | Active |
| `9988776655` | Vikram Singh | Expired |
| `9001122334` | Anjali Desai | Active |
| `9112233445` | Mohammed Rauf | Expiring |

### Test Add Member
Go to `/dashboard` → Click **+ Add** → Fill form → Submit

### Test Renew Member
Find an "Expiring" or "Expired" member → Click orange **Renew** button

---

## 🛠️ How to Customize

### Change Gym Name / Owner Info
Edit: `data/sampleData.js` → `GYM_INFO` object

### Change WhatsApp Number
Edit: `data/sampleData.js` → `GYM_INFO.whatsapp`

### Add Real Members
Edit: `data/sampleData.js` → `SAMPLE_MEMBERS` array

### Change Colors
Edit: `tailwind.config.js` → `theme.extend.colors`

### Add Real Gym Photos
- Put photos in `/public/` folder
- Use `<Image src="/your-photo.jpg" ... />` from `next/image`
- Replace the emoji cards in `components/about/AboutContent.jsx`

---

## 📦 Dependencies Explained

| Package | What It Does |
|---------|-------------|
| `next` | The main framework — handles routing, server rendering, etc. |
| `react` | UI library — lets us build components |
| `react-dom` | Connects React to the browser |
| `tailwindcss` | Utility CSS classes (`rounded-xl`, `flex`, etc.) |
| `autoprefixer` | Makes CSS work across all browsers |
| `postcss` | CSS processing tool (required by Tailwind) |

---

## 🗺️ Next Steps (Phase 2)

When you're ready to go beyond sample data:

1. **MongoDB** — Set up a real database at https://mongodb.com/atlas (free tier)
2. **API Routes** — Create `app/api/members/route.js` to fetch/save members
3. **Authentication** — Add NextAuth.js for real admin login
4. **Vercel Deploy** — Deploy live at https://vercel.com (free, 1-click)
5. **WhatsApp API** — Auto-send renewal reminders via Twilio or Wati

---

## 🆘 Common Errors & Fixes

### "npm: command not found"
→ Node.js not installed. Go to Step 1.

### "Port 3000 is already in use"
```bash
npm run dev -- -p 3001
# Then open http://localhost:3001
```

### "Module not found"
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Tailwind classes not working
→ Make sure `tailwind.config.js` has the correct `content` paths.

---

## 👨‍💻 Built By

Azaan Fitness App — Created for **Ali Khan**, Hubballi-Dharwad 💪

Tech: Next.js 14 · Tailwind CSS · React Context API
