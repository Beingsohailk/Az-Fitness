// components/contact/ContactContent.jsx
// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE CONTENT
// WhatsApp button, phone, Google Maps embed, and timing info.
// ─────────────────────────────────────────────────────────────────────────────

import { GYM_INFO } from "@/data/sampleData";

export default function ContactContent() {
  return (
    <div className="flex flex-col gap-5">
      {/* ── Location header ── */}
      <div
        className="rounded-2xl border border-white/5 p-5 text-center"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <div className="text-5xl mb-3">📍</div>
        <h2
          className="text-2xl font-black"
          style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: 3 }}
        >
          FIND US
        </h2>
        <p className="text-white/50 text-sm mt-1">{GYM_INFO.address}</p>
      </div>

      {/* ── WhatsApp CTA ── */}
      <a
        href={`https://wa.me/${GYM_INFO.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="w-full py-4 rounded-xl font-black text-white text-center transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
        style={{
          background: "#25D366",
          fontFamily: "'Bebas Neue', cursive",
          letterSpacing: 2,
          fontSize: 18,
        }}
      >
        <span className="text-2xl">💬</span> WHATSAPP ALI
      </a>

      {/* ── Call button ── */}
      <a
        href={`tel:${GYM_INFO.phone.replace(/\s/g, "")}`}
        className="w-full py-4 rounded-xl font-black text-center transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 border border-orange-500"
        style={{
          fontFamily: "'Bebas Neue', cursive",
          letterSpacing: 2,
          fontSize: 18,
          color: "#f97316",
        }}
      >
        <span className="text-2xl">📞</span> CALL: {GYM_INFO.phone}
      </a>

      {/* ── Google Maps embed ── */}
      {/* 
        To get a real embed:
        1. Go to maps.google.com
        2. Search your gym location
        3. Click Share → Embed a map → Copy the iframe src URL
        4. Paste it in the src below
      */}
      <div className="rounded-2xl overflow-hidden border border-white/5">
        <iframe
          title="Azaan Fitness Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3847.697100271252!2d75.1087206!3d15.3386876!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d7003d756927%3A0xb3569aa786f70f62!2sAzaan%20fitness%20gym!5e0!3m2!1sen!2sin!4v1778335541508!5m2!1sen!2sin"
          width="100%"
          height="220"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* ── Hours + Email grid ── */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div
          className="rounded-xl border border-white/5 p-3"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="text-xl mb-1">🕐</div>
          <div className="text-xs text-white/40">Mon–Sat</div>
          <div className="text-xs font-bold">{GYM_INFO.timings.weekdays}</div>
        </div>
        <div
          className="rounded-xl border border-white/5 p-3"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="text-xl mb-1">🕐</div>
          <div className="text-xs text-white/40">Sunday</div>
          <div className="text-xs font-bold">{GYM_INFO.timings.sunday}</div>
        </div>
        <div
          className="rounded-xl border border-white/5 p-3"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="text-xl mb-1">📧</div>
          <div className="text-xs text-white/40">Email</div>
          <div className="text-xs font-bold truncate">{GYM_INFO.email}</div>
        </div>
      </div>
    </div>
  );
}
