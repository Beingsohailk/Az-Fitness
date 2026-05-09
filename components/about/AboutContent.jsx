// components/about/AboutContent.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE CONTENT
// Shows Ali's profile, bio, achievements, and gym photo gallery.
// ─────────────────────────────────────────────────────────────────────────────

import { ACHIEVEMENTS, GYM_PHOTOS } from "@/data/sampleData";

export default function AboutContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* ── Hero banner ── */}
      <div
        className="rounded-2xl overflow-hidden relative p-8 text-center"
        style={{
          background: "linear-gradient(135deg,#f97316 0%,#ea580c 50%,#9a3412 100%)",
        }}
      >
        {/* Diagonal stripe texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
        <div className="relative">
          <div className="text-7xl mb-3">💪</div>
          <h2
            className="text-4xl font-black"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: 4 }}
          >
            ALI KHAN
          </h2>
          <p className="text-white/80 font-semibold">Head Coach & Gym Owner</p>
          <p className="text-white/60 text-sm mt-1">12+ Years of Fitness Experience</p>
        </div>
      </div>

      {/* ── Bio ── */}
      <div
        className="rounded-2xl border border-white/5 p-5"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <h3
          className="font-black mb-3 text-orange-400"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: 2, fontSize: 18 }}
        >
          MY STORY
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Started from a small corner of Hubballi with just a few dumbbells and a big dream.
          Over 12 years, Azaan Fitness has grown into one of the most trusted gyms in the twin
          cities. My mission is simple — help every member become the best version of themselves,
          regardless of their starting point.
        </p>
      </div>

      {/* ── Achievements ── */}
      <div>
        <h3
          className="font-black mb-3 text-orange-400"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: 2, fontSize: 18 }}
        >
          ACHIEVEMENTS
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {ACHIEVEMENTS.map((a, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 p-4"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="text-3xl mb-2">{a.icon}</div>
              <div className="font-bold text-sm">{a.title}</div>
              <div className="text-xs text-orange-400 font-semibold">{a.year}</div>
              <div className="text-xs text-white/40 mt-1">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gallery ── */}
      <div>
        <h3
          className="font-black mb-3 text-orange-400"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: 2, fontSize: 18 }}
        >
          GYM GALLERY
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {GYM_PHOTOS.map((photo, i) => (
            <div
              key={i}
              className={`rounded-xl bg-gradient-to-br ${photo.bg} border border-white/5 p-6 flex flex-col items-center justify-center`}
            >
              <div className="text-4xl mb-2">{photo.emoji}</div>
              <div className="text-xs font-bold text-white/60">{photo.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/20 text-center mt-2">
          Replace emoji cards with real photos using next/image
        </p>
      </div>
    </div>
  );
}
