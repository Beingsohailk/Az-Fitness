// components/ui/OrangeButton.jsx
// ─────────────────────────────────────────────────────────────────────────────
// ORANGE BUTTON
// Reusable primary action button with orange gradient.
// ─────────────────────────────────────────────────────────────────────────────

export default function OrangeButton({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-black text-white transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{
        background: "linear-gradient(135deg, #f97316, #ea580c)",
        fontFamily: "'Bebas Neue', cursive",
        letterSpacing: 2,
      }}
    >
      {children}
    </button>
  );
}
