/*
  KidsInspiring Nation — Full Website + Impact Dashboard
  ═══════════════════════════════════════════════════════
  Design Direction (Website):  Warm Editorial Gravitas
    — Cormorant Garamond × DM Sans, deep forest green × warm gold × cream
    — Ghost ★ brand symbol as structural architecture
    — Scroll-driven reveal animations, marquee, count-up stats

  Design Direction (Dashboard): Calm Intelligence (Apple / Linear / Stripe standard)
    — Plus Jakarta Sans (display) + DM Sans (UI) + DM Mono (data)
    — Single accent: KIN Forest Green (#16613E)
    — 8px grid, soft-Apple radius scale (cards 16px, buttons 10px, badges 999px)
    — KPI hero → supporting KPIs → chart → secondary chart → table
    — No colored card backgrounds, no zebra stripes, horizontal-only ghost grid
    — Staggered entrance animation, count-up on KPI values

  Views: Landing Page | Impact Dashboard (Overview · Programs · Reach · Cohorts)
*/

import { useState, useEffect, useRef, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import {
  Star, Users, MapPin, BookOpen, TrendingUp, TrendingDown,
  Award, Layers, Heart, ChevronRight, ArrowUpRight,
  LayoutDashboard, Activity, Globe, ListChecks, Home,
  Menu, X, Sun, Moon, Eye, EyeOff, Download, Bell,
  CheckCircle2, Clock, ChevronDown, MoreHorizontal
} from "lucide-react";

// ─── Font injection ───────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

// ─── CSS injection ─────────────────────────────────────────────────────────────
const style = document.createElement("style");
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body { overflow-x: hidden; }
  button { cursor: pointer; border: none; background: none; }
  a { text-decoration: none; color: inherit; }
  ul, ol { list-style: none; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes enter {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes symbolFloat {
    0%, 100% { transform: translateY(-50%) translateX(0); }
    50%       { transform: translateY(-52%) translateX(-0.4%); }
  }
  @keyframes drawLine {
    from { stroke-dashoffset: 1000; }
    to   { stroke-dashoffset: 0; }
  }
  .reveal {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.65s ease-out, transform 0.65s ease-out;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-d1 { transition-delay: 80ms; }
  .reveal-d2 { transition-delay: 160ms; }
  .reveal-d3 { transition-delay: 240ms; }

  /* Dashboard card hover lift */
  .dash-card-hover {
    transition: transform 150ms ease-out, box-shadow 150ms ease-out;
  }
  .dash-card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04) !important;
  }

  /* Table row hover */
  .table-row {
    transition: background 120ms ease-out;
    cursor: default;
  }
  .table-row:hover { background: rgba(0,0,0,0.018); }
  .table-row-dark:hover { background: rgba(255,255,255,0.04) !important; }

  /* Sidebar link */
  .nav-item {
    transition: background 120ms ease-out, color 120ms ease-out;
    cursor: pointer;
  }

  /* Website pillar card hover */
  .pillar-card-w {
    transition: transform 300ms ease-out, box-shadow 300ms ease-out;
  }
  .pillar-card-w:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(10,28,18,0.16) !important;
  }

  /* Program card hover */
  .prog-card {
    transition: transform 280ms ease-out, box-shadow 280ms ease-out;
  }
  .prog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 56px rgba(10,28,18,0.14) !important;
  }

  /* Quote card */
  .quote-card-w {
    transition: transform 280ms ease-out;
  }
  .quote-card-w:hover { transform: translateY(-3px); }

  /* CTA button hover */
  .btn-gold:hover { filter: brightness(0.92); transform: translateY(-2px); }
  .btn-outline-light:hover { background: rgba(253,247,236,0.12) !important; }
  .btn-primary-w:hover { filter: brightness(0.9); transform: translateY(-2px); }

  /* Input focus */
  input:focus, select:focus { outline: 2px solid #16613E; outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
    .reveal { opacity: 1; transform: none; transition: none; }
  }

  /* Scrollbar (dashboard) */
  .dash-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
  .dash-scroll::-webkit-scrollbar-track { background: transparent; }
  .dash-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 999px; }
  .dark .dash-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
`;
document.head.appendChild(style);

// ─── TOKENS ────────────────────────────────────────────────────────────────────
const T = {
  // Brand
  green:      "#16613E",
  greenDeep:  "#0D3D26",
  greenMid:   "#2C4A35",
  gold:       "#C4882C",
  goldLight:  "#E8B954",
  coral:      "#D94F30",
  cream:      "#FDF7EC",
  bgWarm:     "#F5EFE3",

  // Dashboard light
  bgPage:     "#F5F5F7",
  bgSurface:  "#FFFFFF",
  border:     "rgba(0,0,0,0.06)",
  textPri:    "#1D1D1F",
  textSec:    "#6E6E73",
  textTer:    "#AEAEB2",

  // Dashboard dark
  bgPageDark:    "#000000",
  bgSurfDark:    "#1C1C1E",
  borderDark:    "rgba(255,255,255,0.08)",
  textPriDark:   "#F5F5F7",
  textSecDark:   "#98989D",
  textTerDark:   "#636366",

  // Semantic
  success:  "#34C759",
  warning:  "#FF9F0A",
  danger:   "#FF3B30",
  info:     "#0071E3",
};

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const enrollmentData = [
  { month: "Jan", enrolled: 480, graduated: 310, target: 500 },
  { month: "Feb", enrolled: 620, graduated: 410, target: 600 },
  { month: "Mar", enrolled: 790, graduated: 580, target: 750 },
  { month: "Apr", enrolled: 940, graduated: 710, target: 900 },
  { month: "May", enrolled: 1180, graduated: 890, target: 1100 },
  { month: "Jun", enrolled: 1350, graduated: 1020, target: 1300 },
  { month: "Jul", enrolled: 1100, graduated: 870, target: 1100 },
  { month: "Aug", enrolled: 1470, graduated: 1120, target: 1400 },
  { month: "Sep", enrolled: 1680, graduated: 1290, target: 1600 },
  { month: "Oct", enrolled: 1920, graduated: 1480, target: 1800 },
  { month: "Nov", enrolled: 2140, graduated: 1670, target: 2000 },
  { month: "Dec", enrolled: 2310, graduated: 1830, target: 2200 },
];

const pillarData = [
  { pillar: "Spirit",  enrolled: 4820, completed: 4480, rate: 93, fill: T.gold },
  { pillar: "Skills",  enrolled: 5240, completed: 4960, rate: 95, fill: T.green },
  { pillar: "Service", enrolled: 3180, completed: 2940, rate: 92, fill: T.coral },
];

const stateData = [
  { state: "Lagos",    schools: 68, children: 3840, completion: 96, pillar: "Spirit + Skills",  status: "active" },
  { state: "Abuja",    schools: 42, children: 2210, completion: 94, pillar: "All Three",         status: "active" },
  { state: "Enugu",    schools: 38, children: 1980, completion: 93, pillar: "Spirit + Service", status: "active" },
  { state: "Kano",     schools: 34, children: 1650, completion: 91, pillar: "Skills + Service", status: "active" },
  { state: "Port Harcourt", schools: 31, children: 1540, completion: 94, pillar: "All Three",   status: "active" },
  { state: "Ibadan",   schools: 27, children: 1390, completion: 90, pillar: "Spirit",           status: "growing" },
];

const programCohorts = [
  { name: "Seeds of Greatness — Enugu Q4", pillar: "Spirit",  enrolled: 380, completed: 352, status: "active",    endDate: "Feb 2025" },
  { name: "KIN Innovation Hub — Lagos",    pillar: "Skills",  enrolled: 220, completed: 196, status: "active",    endDate: "Mar 2025" },
  { name: "Young Nation Builders — Abuja", pillar: "Service", enrolled: 165, completed: 165, status: "completed", endDate: "Dec 2024" },
  { name: "Voice of a Nation — Kano",      pillar: "Skills",  enrolled: 190, completed: 178, status: "active",    endDate: "Feb 2025" },
  { name: "Leadership Camp 2024",          pillar: "Service", enrolled: 312, completed: 308, status: "completed", endDate: "Aug 2024" },
  { name: "Seeds of Greatness — P/H Q3",  pillar: "Spirit",  enrolled: 290, completed: 270, status: "completed", endDate: "Nov 2024" },
];

const recentActivity = [
  { text: "Kano cohort reached 91% completion milestone", time: "2h ago",  type: "success" },
  { text: "New school partnership: Ibadan Grammar School", time: "5h ago",  type: "info" },
  { text: "Leadership Camp 2025 registrations open",       time: "1d ago",  type: "info" },
  { text: "Lagos Q4 enrollment target exceeded by 8%",     time: "2d ago",  type: "success" },
];

const radarData = [
  { subject: "Spirit", A: 94, B: 78, fullMark: 100 },
  { subject: "Skills", A: 89, B: 71, fullMark: 100 },
  { subject: "Service",A: 92, B: 68, fullMark: 100 },
  { subject: "Reach",  A: 82, B: 60, fullMark: 100 },
  { subject: "Retention", A: 96, B: 82, fullMark: 100 },
];

// ─── UTILITIES ──────────────────────────────────────────────────────────────────
function useCountUp(target, duration = 700, active = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(target); return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "k" : n.toString();

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, dark }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: dark ? "#1C1C1E" : "#1D1D1F",
      border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.08)"}`,
      borderRadius: 10, padding: "10px 14px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      backdropFilter: "blur(12px)", minWidth: 140,
    }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < payload.length - 1 ? 4 : 0 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color || T.green, flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#fff", fontWeight: 500 }}>
            {p.value?.toLocaleString()}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{p.name}</span>
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
//  WEBSITE SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function WebsiteView({ onDashboard }) {
  useReveal();

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: T.greenDeep, background: "#FAFAF5", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <SiteNav onDashboard={onDashboard} />

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100svh", background: T.greenDeep, position: "relative",
        display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "5rem"
      }}>
        {/* gradient */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 75% 60% at 15% 50%, ${T.green}55 0%, transparent 60%),
                       radial-gradient(ellipse 50% 70% at 85% 15%, ${T.gold}22 0%, transparent 55%),
                       linear-gradient(135deg, #0A1C12 0%, #0D3D26 60%, #16613E 100%)`
        }} />
        {/* ghost star */}
        <div aria-hidden style={{
          position: "absolute", right: "-0.05em", top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(16rem, 44vw, 64rem)", lineHeight: 1,
          color: "transparent", WebkitTextStroke: `1px rgba(196,136,44,0.07)`,
          userSelect: "none", pointerEvents: "none", fontFamily: "serif",
          animation: "symbolFloat 8s ease-in-out infinite",
        }}>★</div>

        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "52rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.goldLight, marginBottom: "1.5rem", opacity: 0, animation: "fadeUp 0.8s 0.3s ease-out forwards" }}>
              <span style={{ display: "block", width: "2rem", height: "1.5px", background: T.gold }} />
              A Nation-Building Mandate
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.2rem, 9vw, 6.5rem)", fontWeight: 700, color: T.cream, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "1.5rem", opacity: 0, animation: "fadeUp 0.9s 0.5s ease-out forwards" }}>
              Raising the<br /><em style={{ fontStyle: "italic", color: T.goldLight }}>Builders</em><br />of Tomorrow
            </h1>
            <p style={{ fontSize: "clamp(1rem,2.5vw,1.22rem)", color: "rgba(253,247,236,0.75)", lineHeight: 1.65, marginBottom: "2rem", maxWidth: "44ch", opacity: 0, animation: "fadeUp 0.9s 0.7s ease-out forwards" }}>
              KidsInspiring Nation cultivates extraordinary young Nigerians — rooted in Spirit, equipped with Skills, and compelled toward Service.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", opacity: 0, animation: "fadeUp 0.9s 0.9s ease-out forwards" }}>
              <a href="#programs" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85em 2.25em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 600, fontSize: "1rem", transition: "transform 200ms ease-out, filter 200ms ease-out" }}>
                Explore Programs
              </a>
              <button onClick={onDashboard} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85em 2.25em", borderRadius: 999, background: "rgba(253,247,236,0.08)", color: T.cream, fontWeight: 500, fontSize: "1rem", border: "1.5px solid rgba(253,247,236,0.25)", cursor: "pointer", transition: "background 200ms ease-out" }} className="btn-outline-light">
                <LayoutDashboard size={16} strokeWidth={1.5} /> Impact Dashboard
              </button>
            </div>

            {/* Pillars strip */}
            <div style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(196,136,44,0.2)", flexWrap: "wrap", opacity: 0, animation: "fadeUp 0.9s 1.1s ease-out forwards" }}>
              {[
                { icon: "🕊️", label: "Spirit",  bg: "rgba(196,136,44,0.22)" },
                { icon: "⚡", label: "Skills",  bg: "rgba(22,97,62,0.35)" },
                { icon: "🤝", label: "Service", bg: "rgba(217,79,48,0.28)" },
              ].map(p => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(253,247,236,0.75)", fontSize: "0.85rem", fontWeight: 500 }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", display: "grid", placeItems: "center", fontSize: "1rem", background: p.bg }}>{p.icon}</div>
                  {p.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: T.gold, padding: "0.75rem 0", overflow: "hidden" }} aria-hidden>
        <div style={{ display: "flex", gap: "3rem", animation: "marqueeScroll 28s linear infinite", width: "max-content" }}>
          {Array(2).fill(null).map((_, i) =>
            ["Spirit","Skills","Service","Nation Building","Character Formation","Leadership","Community","Excellence"].map(w => (
              <span key={`${i}-${w}`} style={{ display: "flex", alignItems: "center", gap: "1.5rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}>
                {w}<span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.45)", display: "block" }} />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: T.cream, padding: "clamp(4rem,10vw,8rem) 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,24rem),1fr))", gap: "clamp(2rem,6vw,4rem)", alignItems: "center" }}>
            <div>
              <div className="reveal" style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                Who We Are<span style={{ flex: 1, maxWidth: "3rem", height: "1.5px", background: T.gold, display: "block" }} />
              </div>
              <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1, color: T.greenDeep, marginBottom: "1.5rem", maxWidth: "16ch" }}>
                A Movement, Not Just an Organisation
              </h2>
              <p className="reveal reveal-d2" style={{ fontSize: "clamp(1rem,2vw,1.15rem)", color: T.greenMid, lineHeight: 1.75, marginBottom: "1rem", maxWidth: "60ch" }}>
                KidsInspiring Nation (KIN) was founded on the conviction that sustainable national transformation begins with the next generation. We do not merely run programs — we build architects of a better Nigeria.
              </p>
              <p className="reveal reveal-d2" style={{ fontSize: "1rem", color: "#444", lineHeight: 1.7, maxWidth: "60ch", marginBottom: "2rem" }}>
                Operating across schools, communities, and homes, KIN equips young Nigerians aged 5–18 with the inner conviction, practical competence, and service ethos that every thriving nation demands.
              </p>
              <div className="reveal reveal-d3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="#join" className="btn-primary-w" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8em 2em", borderRadius: 999, background: T.green, color: T.cream, fontWeight: 600, fontSize: "0.9rem", transition: "transform 200ms ease-out, filter 200ms ease-out" }}>Join the Movement →</a>
                <button onClick={onDashboard} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.8em 2em", borderRadius: 999, background: "transparent", color: T.green, fontWeight: 500, fontSize: "0.9rem", border: `1.5px solid ${T.green}`, cursor: "pointer", transition: "background 200ms ease-out, color 200ms ease-out" }} className="btn-outline-light">
                  <Activity size={15} strokeWidth={1.5} /> View Impact Data
                </button>
              </div>
            </div>
            <div className="reveal reveal-d2" style={{ position: "relative" }}>
              <div style={{ background: T.gold, color: "#fff", borderRadius: 16, padding: "1.25rem 1.75rem", marginBottom: "1.25rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontStyle: "italic", fontWeight: 600, lineHeight: 1.3, boxShadow: "0 8px 32px rgba(196,136,44,0.3)" }}>
                "Every child is a seed of national greatness."
              </div>
              <div style={{ background: T.green, borderRadius: 24, aspectRatio: "4/5", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: "2rem" }}>
                <div aria-hidden style={{ position: "absolute", top: "-0.15em", right: "-0.05em", fontSize: "clamp(10rem,28vw,22rem)", color: "transparent", WebkitTextStroke: "1px rgba(232,185,84,0.07)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>★</div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,61,38,0.85) 0%, transparent 50%)" }} />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem,8vw,4.5rem)", fontWeight: 700, color: T.goldLight, letterSpacing: "-0.04em", lineHeight: 1 }}>12,000+</div>
                  <div style={{ color: "rgba(253,247,236,0.8)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.04em", marginTop: "0.25rem" }}>Young Nigerians Impacted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section id="pillars" style={{ background: "#FAFAF5", padding: "clamp(4rem,10vw,8rem) 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "clamp(2rem,6vw,4rem)" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, marginBottom: "0.75rem" }}>Three Core Areas</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1, color: T.greenDeep, maxWidth: "18ch", margin: "0 auto" }}>
              The Architecture of Nation Building
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,18rem),1fr))", gap: "1.5rem" }}>
            {[
              { num: "01", icon: "🕊️", title: "Spirit", accent: T.gold, desc: "We cultivate the inner life — values, character, faith, and moral courage. A nation rises no higher than the character of its people.", features: ["Values Formation & Character Development","Emotional Intelligence & Resilience","Purpose Discovery Programs","Faith-Based Leadership Foundations"], symbol: "🕊️", delay: "reveal-d1" },
              { num: "02", icon: "⚡", title: "Skills", accent: T.green, desc: "We sharpen the mind and hands — STEM, critical thinking, entrepreneurship, and the art of leadership. Inspiration without competence cannot build a nation.", features: ["STEM & Digital Literacy Academies","Entrepreneurship & Innovation Labs","Public Speaking & Communication","Financial Literacy from Age 8"], symbol: "⚡", delay: "reveal-d2" },
              { num: "03", icon: "🤝", title: "Service", accent: T.coral, desc: "We ignite a passion for giving back — civic responsibility, community development, and the understanding that greatness is measured in contribution.", features: ["Community Action Projects","Youth Civic Engagement Clubs","Environmental Stewardship Initiatives","Peer Mentorship Networks"], symbol: "🤝", delay: "reveal-d3" },
            ].map(p => (
              <article key={p.title} className={`pillar-card-w reveal ${p.delay}`} style={{ background: "#fff", borderRadius: 24, padding: "2rem", border: "1px solid rgba(22,97,62,0.1)", boxShadow: "0 2px 8px rgba(10,28,18,0.05), 0 8px 32px rgba(10,28,18,0.06)", position: "relative", overflow: "hidden" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "rgba(22,97,62,0.12)", letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>{p.num}</div>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: 12, display: "grid", placeItems: "center", fontSize: "1.5rem", marginBottom: "1rem", background: `${p.accent}18` }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: T.greenDeep, marginBottom: "0.75rem" }}>{p.title}</h3>
                <p style={{ fontSize: "0.95rem", color: T.greenMid, lineHeight: 1.7, marginBottom: "1.5rem" }}>{p.desc}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.82rem", color: T.greenMid, fontWeight: 500 }}>
                      <span style={{ color: T.gold, fontWeight: 700, flexShrink: 0 }}>→</span>{f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT NUMBERS ── */}
      <section id="impact" style={{ background: T.greenDeep, padding: "clamp(4rem,10vw,8rem) 0", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10rem,38vw,50rem)", fontWeight: 700, lineHeight: 1, color: "transparent", WebkitTextStroke: `1px rgba(196,136,44,0.05)`, userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap", letterSpacing: "-0.06em" }}>KIN</div>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <div className="reveal" style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, textAlign: "center", marginBottom: "0.75rem" }}>Our Reach</div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1, color: T.cream, textAlign: "center", maxWidth: "18ch", margin: "0 auto clamp(2.5rem,6vw,4rem)" }}>Numbers That Tell the Nation's Story</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,12rem),1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
            {[
              { n: "12,000+", label: "Children & Teens\nDirectly Impacted", d: "reveal-d1" },
              { n: "6",       label: "States\nAcross Nigeria",          d: "reveal-d2" },
              { n: "240+",    label: "Schools &\nCommunity Partners",   d: "reveal-d3" },
              { n: "94%",     label: "Program Completion\nRate",        d: "reveal-d4" },
            ].map(s => (
              <div key={s.label} className={`reveal ${s.d}`} style={{ textAlign: "center", padding: "1.5rem 1rem", borderRadius: 20, background: "rgba(253,247,236,0.04)", border: "1px solid rgba(196,136,44,0.14)", transition: "background 200ms ease-out" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(253,247,236,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(253,247,236,0.04)"}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem,6vw,4rem)", fontWeight: 700, color: T.goldLight, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.5rem" }}>{s.n}</div>
                <div style={{ fontSize: "0.82rem", color: "rgba(253,247,236,0.6)", fontWeight: 500, lineHeight: 1.4 }}>{s.label.split("\n").map((line,i) => <span key={i} style={{ display: "block" }}>{line}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: "center" }}>
            <button onClick={onDashboard} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.85em 2.25em", borderRadius: 999, background: "rgba(196,136,44,0.15)", color: T.goldLight, fontWeight: 500, fontSize: "0.9rem", border: "1px solid rgba(196,136,44,0.3)", cursor: "pointer", transition: "background 200ms ease-out" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(196,136,44,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(196,136,44,0.15)"}>
              <LayoutDashboard size={16} strokeWidth={1.5} /> Explore Full Impact Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section id="programs" style={{ background: T.cream, padding: "clamp(4rem,10vw,8rem) 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div className="reveal" style={{ marginBottom: "clamp(2rem,5vw,3rem)" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              What We Do<span style={{ display: "block", width: "3rem", height: "1.5px", background: T.gold }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1, color: T.greenDeep, maxWidth: "18ch" }}>
              Flagship Programs Built for This Generation
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,18rem),1fr))", gap: "1.25rem" }}>
            {[
              { icon: "🌱", cat: "Spirit",  catC: T.gold,  title: "Seeds of Greatness",     age: "Ages 6–12",      bg: `linear-gradient(135deg,${T.green},${T.greenDeep})`,        desc: "A 12-week character formation curriculum embedding values of integrity, courage, and national pride — delivered in schools nationwide.", delay: "reveal-d1" },
              { icon: "💡", cat: "Skills",  catC: T.green, title: "KIN Innovation Hub",      age: "Ages 13–18",     bg: `linear-gradient(135deg,${T.gold},#9A6620)`,                desc: "Hands-on STEM and entrepreneurship labs where teens design solutions to real Nigerian community problems.", delay: "reveal-d2" },
              { icon: "🌍", cat: "Service", catC: T.coral, title: "Young Nation Builders",   age: "Ages 10–18",     bg: `linear-gradient(135deg,${T.coral},#A83920)`,               desc: "Youth-led community development where participants design and execute real service projects transforming their local communities.", delay: "reveal-d3" },
              { icon: "🎙️",cat: "Skills",  catC: T.green, title: "Voice of a Nation",       age: "Ages 8–16",      bg: `linear-gradient(135deg,#1A5C3A,#0D2B1F)`,                 desc: "Public speaking, debate, and advocacy training that transforms quiet children into confident communicators ready to lead.", delay: "reveal-d1" },
              { icon: "👨‍👩‍👧",cat: "Spirit", catC: T.gold,  title: "Parenting the Nation",    age: "Parents & Educators", bg: `linear-gradient(135deg,#8B6914,${T.gold})`,            desc: "Equipping parents and educators with the language and tools to raise purpose-driven children in today's complex world.", delay: "reveal-d2" },
              { icon: "🏕️", cat: "Service", catC: T.green, title: "KIN Leadership Camp",     age: "Ages 12–18 · Annual", bg: `linear-gradient(135deg,${T.greenMid},${T.green})`,    desc: "A 5-day residential camp blending outdoor challenges, leadership simulations, and structured mentoring for emerging young leaders.", delay: "reveal-d3" },
            ].map(p => (
              <article key={p.title} className={`prog-card reveal ${p.delay}`} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(22,97,62,0.09)", boxShadow: "0 2px 8px rgba(10,28,18,0.05)", display: "flex", flexDirection: "column" }}>
                <div style={{ height: "7rem", background: p.bg, display: "grid", placeItems: "center", fontSize: "2.25rem" }}>{p.icon}</div>
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, color: p.catC, marginBottom: "0.4rem" }}>{p.cat}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.55rem", fontWeight: 700, letterSpacing: "-0.02em", color: T.greenDeep, marginBottom: "0.6rem" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: T.greenMid, lineHeight: 1.65, flex: 1 }}>{p.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(22,97,62,0.1)" }}>
                    <span style={{ fontSize: "0.8rem", color: T.greenMid, fontWeight: 500 }}>{p.age}</span>
                    <a href="#join" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", fontWeight: 600, color: T.green, transition: "gap 150ms ease-out" }}>Learn more →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "#FAFAF5", padding: "clamp(4rem,10vw,8rem) 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.gold, marginBottom: "0.75rem" }}>Voices from the Movement</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1, color: T.greenDeep }}>What the Nation Is Saying</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,18rem),1fr))", gap: "1.25rem" }}>
            {[
              { q: "My daughter entered Seeds of Greatness a shy 9-year-old. She graduated reciting her values and leading her class. I saw Nigeria's future in her eyes.", name: "Adaeze Chukwuemeka", role: "Parent, Enugu", bg: T.green, init: "AC", delay: "reveal-d1" },
              { q: "KIN's Innovation Hub changed how my students think. For the first time, they see themselves not as job seekers, but as solution builders for Nigeria.", name: "Babatunde Omotunde", role: "Principal, Lagos State Model School", bg: T.coral, init: "BO", delay: "reveal-d2" },
              { q: "After Young Nation Builders, our team raised ₦800,000 to renovate our school library. If 16-year-olds can do that, imagine what they'll do at 30.", name: "Zainab Kwara-Ibrahim", role: "Alumni, KIN Class of 2022", bg: T.gold, init: "ZK", delay: "reveal-d3" },
            ].map(q => (
              <div key={q.name} className={`quote-card-w reveal ${q.delay}`} style={{ background: "#fff", borderRadius: 20, padding: "2rem", border: "1px solid rgba(22,97,62,0.09)", boxShadow: "0 2px 8px rgba(10,28,18,0.05)" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", lineHeight: 0.8, color: T.gold, opacity: 0.22, display: "block", marginBottom: "0.75rem", fontWeight: 700 }}>"</span>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontStyle: "italic", color: T.greenDeep, lineHeight: 1.5, marginBottom: "1.5rem" }}>{q.q}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", background: q.bg, display: "grid", placeItems: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{q.init}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{q.name}</div>
                    <div style={{ fontSize: "0.8rem", color: T.greenMid }}>{q.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="join" style={{ background: T.greenDeep, padding: "clamp(4rem,10vw,8rem) 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", bottom: "-0.1em", left: "50%", transform: "translateX(-50%)", fontSize: "clamp(12rem,40vw,55rem)", color: "transparent", WebkitTextStroke: "1px rgba(196,136,44,0.05)", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>★</div>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <div className="reveal" style={{ display: "inline-block", background: "rgba(196,136,44,0.15)", border: "1px solid rgba(196,136,44,0.3)", color: T.goldLight, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.4em 1.2em", borderRadius: 999, fontWeight: 500, marginBottom: "1.5rem" }}>Join the Movement</div>
          <h2 className="reveal reveal-d1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: T.cream, maxWidth: "14ch", margin: "0 auto 1.25rem", lineHeight: 0.95 }}>
            Nigeria's Future Begins <em style={{ fontStyle: "italic", color: T.goldLight }}>With You</em>
          </h2>
          <p className="reveal reveal-d2" style={{ fontSize: "clamp(1rem,2.5vw,1.15rem)", color: "rgba(253,247,236,0.7)", maxWidth: "44ch", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
            Whether you are a parent, educator, sponsor, or volunteer — there is a role for you in building the next generation.
          </p>
          <div className="reveal reveal-d3" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <a href="mailto:hello@kidsinspiring.ng" className="btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9em 2.5em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 600, fontSize: "1rem", transition: "transform 200ms ease-out, filter 200ms ease-out" }}>Enrol a Child</a>
            <a href="mailto:partner@kidsinspiring.ng" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.9em 2.5em", borderRadius: 999, background: "rgba(253,247,236,0.09)", color: T.cream, fontWeight: 500, fontSize: "1rem", border: "1.5px solid rgba(253,247,236,0.22)" }}>Partner With Us</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0A1C12", padding: "clamp(2.5rem,6vw,4rem) 0" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,12rem),1fr))", gap: "2rem 3rem", marginBottom: "2.5rem" }}>
            <div style={{ gridColumn: "span 2", maxWidth: "24rem" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: T.cream, letterSpacing: "-0.02em", marginBottom: "0.6rem" }}>KidsInspiring Nation</div>
              <p style={{ fontSize: "0.82rem", color: "rgba(253,247,236,0.45)", lineHeight: 1.65, maxWidth: "30ch" }}>A nation-building organisation developing Nigeria's next generation through Spirit, Skills & Service — one child at a time.</p>
            </div>
            {[
              { title: "Our Pillars", links: ["Spirit","Skills","Service"] },
              { title: "Programs", links: ["Seeds of Greatness","KIN Innovation Hub","Young Nation Builders","Voice of a Nation"] },
              { title: "Get Involved", links: ["Enrol a Child","Become a Partner","Volunteer","Donate / Sponsor"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.gold, marginBottom: "1rem" }}>{col.title}</div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: "0.82rem", color: "rgba(253,247,236,0.5)", transition: "color 150ms ease-out" }} onMouseEnter={e => e.target.style.color = T.goldLight} onMouseLeave={e => e.target.style.color = "rgba(253,247,236,0.5)"}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1.5rem", borderTop: "1px solid rgba(253,247,236,0.08)", flexWrap: "wrap", gap: "0.75rem" }}>
            <p style={{ fontSize: "0.78rem", color: "rgba(253,247,236,0.3)" }}>© 2025 KidsInspiring Nation. All rights reserved.</p>
            <p style={{ fontSize: "0.78rem", color: "rgba(253,247,236,0.3)" }}>Made with purpose in Nigeria 🇳🇬</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── SITE NAV ─────────────────────────────────────────────────────────────────
function SiteNav({ onDashboard }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0.75rem 0", transition: "background 350ms ease-out, box-shadow 350ms ease-out", background: scrolled ? "rgba(250,250,245,0.9)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", WebkitBackdropFilter: scrolled ? "blur(16px)" : "none", boxShadow: scrolled ? "0 1px 0 rgba(22,97,62,0.1)" : "none" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.02em", color: scrolled ? T.green : T.cream }}>
          <div style={{ width: 36, height: 36, background: T.green, borderRadius: 8, display: "grid", placeItems: "center", color: T.goldLight, fontSize: "1rem", fontWeight: 700, flexShrink: 0 }}>★</div>
          KidsInspiring Nation
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {["About","Pillars","Programs"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: scrolled ? T.greenMid : "rgba(253,247,236,0.8)", transition: "color 200ms ease-out" }}>{l}</a>
          ))}
          <button onClick={onDashboard} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: scrolled ? T.green : T.goldLight, transition: "color 200ms ease-out", cursor: "pointer" }}>
            <LayoutDashboard size={14} strokeWidth={1.5} /> Dashboard
          </button>
          <a href="#join" style={{ display: "inline-flex", alignItems: "center", padding: "0.5em 1.3em", borderRadius: 999, background: T.green, color: T.cream, fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.03em" }}>Get Involved</a>
        </div>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

const DASH_VIEWS = ["Overview", "Programs", "Reach", "Cohorts"];

function DashboardView({ onBack, dark, toggleDark }) {
  const [view, setView]       = useState("Overview");
  const [hidden, setHidden]   = useState(false);
  const [sideOpen, setSide]   = useState(true);
  const [entered, setEntered] = useState(false);

  useEffect(() => { const t = setTimeout(() => setEntered(true), 80); return () => clearTimeout(t); }, []);

  const bg   = dark ? T.bgPageDark    : T.bgPage;
  const surf = dark ? T.bgSurfDark    : T.bgSurface;
  const bord = dark ? T.borderDark    : T.border;
  const pri  = dark ? T.textPriDark   : T.textPri;
  const sec  = dark ? T.textSecDark   : T.textSec;
  const ter  = dark ? T.textTerDark   : T.textTer;

  const ctx = { bg, surf, bord, pri, sec, ter, dark, hidden, entered };

  return (
    <div style={{ display: "flex", height: "100vh", background: bg, fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: sideOpen ? 224 : 64, flexShrink: 0, transition: "width 200ms ease-out",
        background: surf, borderRight: `1px solid ${bord}`, display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${bord}`, display: "flex", alignItems: "center", gap: 10, minHeight: 64 }}>
          <div style={{ width: 32, height: 32, background: T.green, borderRadius: 8, display: "grid", placeItems: "center", color: T.goldLight, fontSize: "1rem", fontWeight: 700, flexShrink: 0 }}>★</div>
          {sideOpen && <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: pri, whiteSpace: "nowrap", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>KIN</div>
            <div style={{ fontSize: 11, color: ter, whiteSpace: "nowrap" }}>Impact Dashboard</div>
          </div>}
        </div>

        {/* Nav items */}
        <nav style={{ padding: "12px 8px", flex: 1 }}>
          {[
            { label: "Overview",  icon: LayoutDashboard },
            { label: "Programs",  icon: BookOpen },
            { label: "Reach",     icon: Globe },
            { label: "Cohorts",   icon: ListChecks },
          ].map(({ label, icon: Icon }, i) => {
            const active = view === label;
            return (
              <button key={label} className="nav-item" onClick={() => setView(label)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px",
                  borderRadius: 8, marginBottom: 2, transition: "background 150ms ease-out",
                  background: active ? (dark ? "rgba(22,97,62,0.2)" : "rgba(22,97,62,0.1)") : "transparent",
                  border: active ? `1px solid ${dark ? "rgba(22,97,62,0.35)" : "rgba(22,97,62,0.18)"}` : "1px solid transparent",
                  color: active ? T.green : sec,
                  animation: entered ? `enter 250ms ${i * 40}ms ease-out both` : "none",
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <Icon size={16} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                {sideOpen && <span style={{ fontSize: 13, fontWeight: active ? 500 : 400, whiteSpace: "nowrap" }}>{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: "12px 8px", borderTop: `1px solid ${bord}` }}>
          <button className="nav-item" onClick={onBack}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px", borderRadius: 8, color: sec, background: "transparent", border: "1px solid transparent" }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <Home size={16} strokeWidth={1.5} />
            {sideOpen && <span style={{ fontSize: 13, whiteSpace: "nowrap" }}>Back to Site</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <header style={{ height: 64, background: surf, borderBottom: `1px solid ${bord}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSide(v => !v)} style={{ width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: 8, color: sec, transition: "background 150ms ease-out", border: "none", background: "none", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Menu size={16} strokeWidth={1.5} />
            </button>
            <div>
              <h1 style={{ fontSize: 15, fontWeight: 600, color: pri, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}>{view}</h1>
              <p style={{ fontSize: 11, color: ter }}>KidsInspiring Nation · FY 2024</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setHidden(h => !h)} style={{ width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: 8, color: sec, transition: "background 150ms ease-out", border: "none", background: "none", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {hidden ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
            </button>
            <button onClick={toggleDark} style={{ width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: 8, color: sec, transition: "background 150ms ease-out", border: "none", background: "none", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {dark ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
            </button>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.green, display: "grid", placeItems: "center", color: T.goldLight, fontSize: "0.8rem", fontWeight: 700, flexShrink: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>KA</div>
          </div>
        </header>

        {/* Content */}
        <main className="dash-scroll" style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {view === "Overview" && <OverviewView ctx={ctx} />}
          {view === "Programs" && <ProgramsView ctx={ctx} />}
          {view === "Reach"    && <ReachView ctx={ctx} />}
          {view === "Cohorts"  && <CohortsView ctx={ctx} />}
        </main>
      </div>
    </div>
  );
}

// ── KPI CARD ──────────────────────────────────────────────────────────────────
function KpiCard({ label, value, delta, suffix = "", prefix = "", positive = true, ctx, delay = 0, sparkData }) {
  const num = useCountUp(value, 700, ctx.entered);
  const up = delta >= 0;
  return (
    <div className="dash-card-hover" style={{
      background: ctx.surf, borderRadius: 16, padding: 24,
      border: `1px solid ${ctx.bord}`,
      boxShadow: ctx.dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
      animation: ctx.entered ? `enter 250ms ${delay}ms ease-out both` : "none",
    }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: ctx.ter, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 44, fontWeight: 300, letterSpacing: "-0.04em", color: ctx.pri, lineHeight: 1, fontVariantNumeric: "tabular-nums", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 8 }}>
        {ctx.hidden ? "••••" : `${prefix}${num.toLocaleString()}${suffix}`}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontFamily: "'DM Mono', monospace", color: up ? T.success : T.danger, fontWeight: 500 }}>
        {up ? <TrendingUp size={12} strokeWidth={2} /> : <TrendingDown size={12} strokeWidth={2} />}
        {ctx.hidden ? "••%" : `${up ? "+" : ""}${delta}% vs last year`}
      </div>
      {sparkData && !ctx.hidden && (
        <div style={{ marginTop: 12 }}>
          <ResponsiveContainer width="100%" height={40}>
            <AreaChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`sg${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.green} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={T.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="enrolled" stroke={T.green} strokeWidth={1.5} fill={`url(#sg${label})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ── OVERVIEW VIEW ─────────────────────────────────────────────────────────────
function OverviewView({ ctx }) {
  const { bg, surf, bord, pri, sec, ter, dark } = ctx;

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>

      {/* Hero metric */}
      <div style={{ marginBottom: 24 }}>
        <div className="dash-card-hover" style={{ background: surf, borderRadius: 16, padding: "32px 32px 28px", border: `1px solid ${bord}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center", animation: ctx.entered ? "enter 250ms 0ms ease-out both" : "none" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: ter, marginBottom: 8 }}>Total Children Impacted — FY 2024</div>
            <div style={{ fontSize: "clamp(48px,6vw,72px)", fontWeight: 300, letterSpacing: "-0.04em", color: pri, lineHeight: 1, fontVariantNumeric: "tabular-nums", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {ctx.hidden ? "••,•••" : <>
                <HeroCount target={12847} entered={ctx.entered} />
              </>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 13, color: T.success, fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>
              <TrendingUp size={13} strokeWidth={2} /> +18.4% vs FY 2023
            </div>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={90}>
              <AreaChart data={enrollmentData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={T.green} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={T.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: ter, fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip dark={dark} />} />
                <Area type="monotone" dataKey="enrolled" name="Enrolled" stroke={T.green} strokeWidth={2} fill="url(#heroGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))", gap: 16, marginBottom: 24 }}>
        <KpiCard label="Active Programs"    value={6}   delta={20.0}  positive ctx={ctx} delay={40} />
        <KpiCard label="States Covered"     value={6}   delta={50.0}  positive ctx={ctx} delay={80} />
        <KpiCard label="School Partners"    value={240} delta={12.3}  suffix="+" positive ctx={ctx} delay={120} sparkData={enrollmentData} />
        <KpiCard label="Completion Rate"    value={94}  delta={1.8}   suffix="%" positive ctx={ctx} delay={160} />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Enrollment trend */}
        <div className="dash-card-hover" style={{ background: surf, borderRadius: 16, padding: 24, border: `1px solid ${bord}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", animation: ctx.entered ? "enter 250ms 200ms ease-out both" : "none" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: pri, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Enrollment & Graduation</div>
              <div style={{ fontSize: 12, color: sec, marginTop: 2 }}>Monthly totals · FY 2024</div>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {[{ c: T.green, l: "Enrolled" }, { c: T.gold, l: "Graduated" }].map(s => (
                <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: ter }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} />{s.l}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={enrollmentData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.green} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={T.green} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.gold} stopOpacity={0.12} />
                  <stop offset="95%" stopColor={T.gold} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: ter, fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: ter, fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Area type="monotone" dataKey="enrolled"  name="Enrolled"  stroke={T.green} strokeWidth={1.5} fill="url(#g1)" dot={false} />
              <Area type="monotone" dataKey="graduated" name="Graduated" stroke={T.gold}  strokeWidth={1.5} fill="url(#g2)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pillar radar */}
        <div className="dash-card-hover" style={{ background: surf, borderRadius: 16, padding: 24, border: `1px solid ${bord}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", animation: ctx.entered ? "enter 250ms 240ms ease-out both" : "none" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: pri, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>Pillar Health</div>
          <div style={{ fontSize: 12, color: sec, marginBottom: 16 }}>KIN vs. Sector Benchmark</div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"} />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: ter, fontFamily: "'DM Mono', monospace" }} />
              <Radar name="KIN" dataKey="A" stroke={T.green} fill={T.green} fillOpacity={0.15} strokeWidth={1.5} />
              <Radar name="Benchmark" dataKey="B" stroke={T.gold} fill={T.gold} fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 3" />
              <Tooltip content={<CustomTooltip dark={dark} />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity feed + Pillar bar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Recent Activity */}
        <div className="dash-card-hover" style={{ background: surf, borderRadius: 16, padding: 24, border: `1px solid ${bord}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", animation: ctx.entered ? "enter 250ms 280ms ease-out both" : "none" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: pri, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 16 }}>Recent Activity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < recentActivity.length - 1 ? `1px solid ${bord}` : "none", alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.type === "success" ? T.success : T.info, flexShrink: 0, marginTop: 5 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: pri, lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: ter, marginTop: 2, fontFamily: "'DM Mono', monospace" }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar breakdown bar */}
        <div className="dash-card-hover" style={{ background: surf, borderRadius: 16, padding: 24, border: `1px solid ${bord}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", animation: ctx.entered ? "enter 250ms 320ms ease-out both" : "none" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: pri, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>Enrollment by Pillar</div>
          <div style={{ fontSize: 12, color: sec, marginBottom: 16 }}>Total vs. completed</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pillarData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barGap={6}>
              <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} vertical={false} />
              <XAxis dataKey="pillar" tick={{ fontSize: 11, fill: ter, fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: ter, fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Bar dataKey="enrolled"  name="Enrolled"  radius={[4,4,0,0]}>
                {pillarData.map((e,i) => <Cell key={i} fill={e.fill} fillOpacity={0.25} />)}
              </Bar>
              <Bar dataKey="completed" name="Completed" radius={[4,4,0,0]}>
                {pillarData.map((e,i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function HeroCount({ target, entered }) {
  const val = useCountUp(target, 900, entered);
  return <span>{val.toLocaleString()}</span>;
}

// ── PROGRAMS VIEW ─────────────────────────────────────────────────────────────
function ProgramsView({ ctx }) {
  const { surf, bord, pri, sec, ter, dark } = ctx;
  const programs = [
    { name: "Seeds of Greatness",   pillar: "Spirit",  enrolled: 4820, completed: 4480, rate: 93, states: 6, cohorts: 12, fill: T.gold },
    { name: "KIN Innovation Hub",   pillar: "Skills",  enrolled: 2640, completed: 2490, rate: 94, states: 4, cohorts: 6,  fill: T.green },
    { name: "Young Nation Builders",pillar: "Service", enrolled: 1980, completed: 1820, rate: 92, states: 5, cohorts: 8,  fill: T.coral },
    { name: "Voice of a Nation",    pillar: "Skills",  enrolled: 1480, completed: 1410, rate: 95, states: 3, cohorts: 5,  fill: T.green },
    { name: "Parenting the Nation", pillar: "Spirit",  enrolled: 890,  completed: 820,  rate: 92, states: 4, cohorts: 4,  fill: T.gold },
    { name: "KIN Leadership Camp",  pillar: "Service", enrolled: 312,  completed: 308,  rate: 99, states: 6, cohorts: 1,  fill: T.coral },
  ];

  const pillarColors = { Spirit: T.gold, Skills: T.green, Service: T.coral };
  const pillarBgs = { Spirit: "rgba(196,136,44,0.12)", Skills: "rgba(22,97,62,0.1)", Service: "rgba(217,79,48,0.1)" };

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 16 }}>
        {programs.map((p, i) => (
          <div key={p.name} className="dash-card-hover" style={{ background: surf, borderRadius: 16, padding: 24, border: `1px solid ${bord}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", animation: ctx.entered ? `enter 250ms ${i * 50}ms ease-out both` : "none" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: pri, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>{p.name}</div>
                <span style={{ display: "inline-block", fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", padding: "2px 10px", borderRadius: 999, background: pillarBgs[p.pillar], color: pillarColors[p.pillar] }}>{p.pillar}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 300, color: pri, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{ctx.hidden ? "••%" : `${p.rate}%`}</div>
            </div>

            {/* Completion bar */}
            <div style={{ height: 4, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", borderRadius: 999, marginBottom: 16, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${p.rate}%`, background: p.fill, borderRadius: 999, transition: "width 700ms ease-out" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { label: "Enrolled",  value: p.enrolled.toLocaleString() },
                { label: "Completed", value: p.completed.toLocaleString() },
                { label: "States",    value: p.states },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ fontSize: 11, color: ter, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 500, color: pri, letterSpacing: "-0.02em", fontFamily: "'DM Mono', monospace" }}>{ctx.hidden ? "•••" : m.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── REACH VIEW ────────────────────────────────────────────────────────────────
function ReachView({ ctx }) {
  const { surf, bord, pri, sec, ter, dark } = ctx;

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      {/* State cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 16, marginBottom: 24 }}>
        {stateData.map((s, i) => (
          <div key={s.state} className="dash-card-hover" style={{ background: surf, borderRadius: 16, padding: 24, border: `1px solid ${bord}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", animation: ctx.entered ? `enter 250ms ${i * 50}ms ease-out both` : "none" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: pri, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.state}</div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 999, background: s.status === "active" ? "rgba(52,199,89,0.1)" : "rgba(255,159,10,0.1)", color: s.status === "active" ? T.success : T.warning }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                {s.status === "active" ? "Active" : "Growing"}
              </span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 300, color: pri, letterSpacing: "-0.03em", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 2 }}>
              {ctx.hidden ? "•,•••" : s.children.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: ter, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12 }}>Children reached</div>

            <div style={{ height: 3, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", borderRadius: 999, marginBottom: 12, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${s.completion}%`, background: T.green, borderRadius: 999 }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: ter, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>Schools</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: pri, fontFamily: "'DM Mono', monospace" }}>{ctx.hidden ? "••" : s.schools}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: ter, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>Completion</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: pri, fontFamily: "'DM Mono', monospace" }}>{ctx.hidden ? "••%" : `${s.completion}%`}</div>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: sec }}>{s.pillar}</div>
          </div>
        ))}
      </div>

      {/* State bar chart */}
      <div className="dash-card-hover" style={{ background: surf, borderRadius: 16, padding: 24, border: `1px solid ${bord}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", animation: ctx.entered ? "enter 250ms 300ms ease-out both" : "none" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: pri, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>Children Reached by State</div>
        <div style={{ fontSize: 12, color: sec, marginBottom: 20 }}>Cumulative FY 2024</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={stateData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }} barSize={32}>
            <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} vertical={false} />
            <XAxis dataKey="state" tick={{ fontSize: 11, fill: ter, fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: ter, fontFamily: "'DM Mono', monospace" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip dark={dark} />} />
            <Bar dataKey="children" name="Children" radius={[4,4,0,0]} fill={T.green} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── COHORTS VIEW ──────────────────────────────────────────────────────────────
function CohortsView({ ctx }) {
  const { surf, bord, pri, sec, ter, dark } = ctx;
  const pillarColors = { Spirit: T.gold, Skills: T.green, Service: T.coral };
  const pillarBgs = { Spirit: "rgba(196,136,44,0.12)", Skills: "rgba(22,97,62,0.1)", Service: "rgba(217,79,48,0.1)" };

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <div className="dash-card-hover" style={{ background: surf, borderRadius: 16, border: `1px solid ${bord}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)", overflow: "hidden", animation: ctx.entered ? "enter 250ms 0ms ease-out both" : "none" }}>
        {/* Table header */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${bord}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: pri, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Program Cohorts</div>
            <div style={{ fontSize: 12, color: sec, marginTop: 2 }}>All cohorts · FY 2024</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: ter, fontFamily: "'DM Mono', monospace" }}>{programCohorts.length} cohorts</span>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Program", "Pillar", "Enrolled", "Completed", "Rate", "End Date", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: h === "Enrolled" || h === "Completed" || h === "Rate" ? "right" : "left", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: ter, borderBottom: `1px solid ${bord}`, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {programCohorts.map((c, i) => {
                const rate = Math.round((c.completed / c.enrolled) * 100);
                return (
                  <tr key={i} className={`table-row ${dark ? "table-row-dark" : ""}`} style={{ borderBottom: i < programCohorts.length - 1 ? `1px solid ${bord}` : "none" }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: pri, fontWeight: 500, maxWidth: 260 }}>{c.name}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ display: "inline-block", fontSize: 11, fontWeight: 500, padding: "2px 10px", borderRadius: 999, background: pillarBgs[c.pillar], color: pillarColors[c.pillar], whiteSpace: "nowrap" }}>{c.pillar}</span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: pri, textAlign: "right", fontFamily: "'DM Mono', monospace" }}>{ctx.hidden ? "•••" : c.enrolled.toLocaleString()}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: pri, textAlign: "right", fontFamily: "'DM Mono', monospace" }}>{ctx.hidden ? "•••" : c.completed.toLocaleString()}</td>
                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                        <div style={{ width: 40, height: 3, borderRadius: 999, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${rate}%`, background: rate >= 95 ? T.success : rate >= 90 ? T.green : T.warning, borderRadius: 999 }} />
                        </div>
                        <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: pri }}>{ctx.hidden ? "••%" : `${rate}%`}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 12, color: sec, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>{c.endDate}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 500, padding: "2px 10px", borderRadius: 999, background: c.status === "completed" ? (dark ? "rgba(52,199,89,0.12)" : "rgba(52,199,89,0.1)") : (dark ? "rgba(0,113,227,0.15)" : "rgba(0,113,227,0.08)"), color: c.status === "completed" ? T.success : T.info, whiteSpace: "nowrap" }}>
                        {c.status === "completed" ? <CheckCircle2 size={10} strokeWidth={2} /> : <Clock size={10} strokeWidth={2} />}
                        {c.status === "completed" ? "Completed" : "Active"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [mode, setMode] = useState("website"); // "website" | "dashboard"
  const [dark, setDark]  = useState(false);

  return mode === "website"
    ? <WebsiteView   onDashboard={() => setMode("dashboard")} />
    : <DashboardView onBack={() => setMode("website")} dark={dark} toggleDark={() => setDark(d => !d)} />;
}
