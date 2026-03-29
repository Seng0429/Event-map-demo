import { useState, useRef, useEffect, useCallback } from "react";

// ─── Breakpoint hook ──────────────────────────────────────────────────────────
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALL_EVENTS = [
  {
    id: 1,
    title: "AIA HYROX Singapore 2026",
    date: "2026-04-03",
    lat: 1.3044, lng: 103.8743,
    thumbnail: "https://images.unsplash.com/photo-1651862964688-6da5571e1c5f?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1651862964688-6da5571e1c5f?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80" },
      { type: "video", src: "https://www.youtube.com/embed/WlwVhTuHBxQ" },
    ],
    time: "Fri–Sun, 3–5 Apr 2026 · 8:00 AM",
    location: "National Stadium, Singapore Sports Hub, Kallang",
    description: "AIA HYROX Singapore returns for its biggest edition yet — three full days of racing at the iconic National Stadium. Take on 8 × 1 km of running plus 8 functional workout stations. Choose from Singles (Open/Pro), Doubles, or Relay formats. All participants and spectators can opt in for complimentary AIA Protect 360 (III) personal accident coverage.",
    category: "Fitness Race", color: "#ef4444",
  },
  {
    id: 2,
    title: "AIA Vitality Corporate Challenge 2025",
    date: "2025-05-01",
    lat: 1.3644, lng: 103.8573,
    thumbnail: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80" },
    ],
    time: "May–Sep 2025 · Ongoing",
    location: "Bishan–Ang Mo Kio Park, Singapore",
    description: "Rally your teams and get ready to Show It, Sweat It, and Live It — with Vitality! The #LiveWithVitality Corporate Challenge invites AIA corporate clients to complete designated activities across the season. Companies that finish all activities earn onboarding to the Corporate AIA Vitality programme, empowering every employee to be rewarded for living healthier.",
    category: "AIA Vitality", color: "#8b5cf6",
  },
  {
    id: 3,
    title: "AIA Better Lives Fund Charity Golf 2025",
    date: "2025-04-26",
    lat: 1.3625, lng: 103.8362,
    thumbnail: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80" },
    ],
    time: "Sat, 26 Apr 2025 · 7:00 AM",
    location: "Seletar Country Club, Seletar",
    description: "AIA Singapore's annual fundraising golf tournament, calling upon all business partners, staff and representatives to raise funds for the AIA Better Lives Fund — administered by the Community Chest. Every dollar raised benefits Children's Wishing Well and VIVA Foundation for Children with Cancer.",
    category: "Charity", color: "#22c55e",
  },
  {
    id: 4,
    title: "AIA Ultimate FitnessFest — Open Edition",
    date: "2025-09-27",
    lat: 1.2966, lng: 103.7764,
    thumbnail: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80" },
      { type: "video", src: "https://www.youtube.com/embed/p_OBTgL0Uc4" },
    ],
    time: "Sat, 27 Sep 2025 · 9:00 AM",
    location: "one-north, Buona Vista",
    description: "AIA Singapore's inaugural AIA Ultimate FitnessFest (AUFF), presented in partnership with HYROX. The Open Edition welcomes participants of all ages and fitness levels for a 'lite' HYROX experience — accessible, fun, and inclusive. Designed around AIA's 'Rethink Healthy' campaign.",
    category: "Fitness", color: "#f97316",
  },
  {
    id: 5,
    title: "AIA Vitality iDiscover SG60 Edition",
    date: "2025-08-09",
    lat: 1.2840, lng: 103.8600,
    thumbnail: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=80" },
    ],
    time: "Sat, 9 Aug 2025 · All Day (Season: Aug–Sep 2025)",
    location: "Marina Bay & Gardens by the Bay, Singapore",
    description: "Celebrate National Day with AIA Vitality's iDiscover SG60 Edition (Season 8). Complete both curated walking routes across Singapore's iconic waterfront landmarks and earn up to 400 Vitality coins — double the usual reward for SG60!",
    category: "AIA Vitality", color: "#8b5cf6",
  },
  {
    id: 6,
    title: "AIA Christmas Merry-thon",
    date: "2025-12-20",
    lat: 1.4043, lng: 103.7930,
    thumbnail: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" },
      { type: "video", src: "https://www.youtube.com/embed/6_3tZumMwS4" },
    ],
    time: "Sat–Sun, 20–21 Dec 2025 · 8:00 AM",
    location: "Rainforest Wild ASIA, Mandai Wildlife Reserve",
    description: "Step into the Season of Giving with AIA's festive 2-day trail walk at Rainforest Wild ASIA, Mandai. Explore lush rainforest trails, encounter exotic wildlife, and raise funds for the AIA Better Lives Fund. Special edition tapir plushies available for purchase.",
    category: "Charity Walk", color: "#10b981",
  },
  {
    id: 7,
    title: "AIA Better Lives Fund Charity Run",
    date: "2025-03-30",
    lat: 1.3521, lng: 103.8198,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1504383633899-f1e5f49e8521?w=800&q=80" },
      { type: "video", src: "https://www.youtube.com/embed/s7DCZbfAMwA" },
    ],
    time: "Sun, 30 Mar 2025 · 7:00 AM",
    location: "Gardens by the Bay, Marina Bay",
    description: "AIA Singapore hosts its annual community charity run to benefit the AIA Better Lives Fund. Participants get active while raising funds for Children's Wishing Well and VIVA Foundation for Children with Cancer. Every kilometre clocked and every dollar raised makes a real difference.",
    category: "Charity Run", color: "#22c55e",
  },
  {
    id: 8,
    title: "#LiveWithVitality Step Challenge",
    date: "2025-05-01",
    lat: 1.2800, lng: 103.8450,
    thumbnail: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80" },
    ],
    time: "Thu, 1 May 2025 · All Day (May–Sep 2025)",
    location: "CBD & City Fringe, Singapore",
    description: "AIA Vitality's flagship walking challenge across Singapore's CBD. Track your daily steps through the AIA+ app, complete weekly milestones, and earn Vitality points redeemable for rewards. All AIA Vitality members eligible — the more you move, the more you earn.",
    category: "AIA Vitality", color: "#8b5cf6",
  },
  {
    id: 9,
    title: "AIA Connecting Lives Volunteer Day",
    date: "2025-07-12",
    lat: 1.3190, lng: 103.8480,
    thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" },
    ],
    time: "Sat, 12 Jul 2025 · 9:00 AM",
    location: "Community Centres islandwide, Singapore",
    description: "AIA Singapore's annual Connecting Lives Volunteer Day mobilises AIA staff, insurance representatives, and the wider AIA community to serve those in need. Volunteers are recognised for their dedication to building a more inclusive Singapore.",
    category: "Community", color: "#06b6d4",
  },
  {
    id: 10,
    title: "AIA Spurs Football Clinic — SG60 Edition",
    date: "2025-06-07",
    lat: 1.3035, lng: 103.8766,
    thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80" },
      { type: "video", src: "https://www.youtube.com/embed/9P_BHkAQjHI" },
    ],
    time: "Sat, 7 Jun 2025 · 9:00 AM",
    location: "Kallang Practice Track, Kallang",
    description: "In partnership with Tottenham Hotspur FC — AIA's Global Principal Partner — the AIA Spurs Football Clinic SG60 Edition brings professional coaching to aspiring young footballers. Open to youth aged 8–18, this free community clinic uses sport to promote active, healthy lifestyles.",
    category: "Community Sport", color: "#0ea5e9",
  },
];

// ─── Marathon Routes ───────────────────────────────────────────────────────────
const MARATHON_ROUTES = {
  7: {
    color: "#22c55e", name: "Charity Run Route",
    waypoints: [
      [1.3521, 103.8198],[1.3490, 103.8225],[1.3462, 103.8268],[1.3440, 103.8310],
      [1.3418, 103.8350],[1.3395, 103.8390],[1.3370, 103.8420],[1.3350, 103.8450],
      [1.2978, 103.8540],[1.2943, 103.8607],[1.2860, 103.8545],[1.2900, 103.8490],
      [1.2940, 103.8420],[1.3060, 103.8360],[1.3150, 103.8290],[1.3250, 103.8230],
      [1.3380, 103.8210],[1.3521, 103.8198],
    ],
  },
  1: {
    color: "#ef4444", name: "HYROX Race Route",
    waypoints: [
      [1.3044, 103.8743],[1.3030, 103.8780],[1.3010, 103.8815],[1.2990, 103.8850],
      [1.2970, 103.8870],[1.2952, 103.8845],[1.2945, 103.8808],[1.2950, 103.8770],
      [1.2965, 103.8735],[1.2990, 103.8715],[1.3020, 103.8718],[1.3044, 103.8743],
    ],
  },
  6: {
    color: "#10b981", name: "Merry-thon Trail",
    waypoints: [
      [1.4043, 103.7930],[1.4020, 103.7908],[1.3995, 103.7885],[1.3970, 103.7863],
      [1.3945, 103.7845],[1.3918, 103.7835],[1.3892, 103.7845],[1.3872, 103.7868],
      [1.3875, 103.7900],[1.3895, 103.7925],[1.3925, 103.7942],[1.3960, 103.7952],
      [1.3992, 103.7955],[1.4020, 103.7945],[1.4043, 103.7930],
    ],
  },
  5: {
    color: "#8b5cf6", name: "iDiscover Walking Route",
    waypoints: [
      [1.2840, 103.8600],[1.2858, 103.8568],[1.2878, 103.8535],[1.2900, 103.8505],
      [1.2918, 103.8472],[1.2935, 103.8440],[1.2950, 103.8405],[1.2938, 103.8368],
      [1.2912, 103.8340],[1.2882, 103.8358],[1.2860, 103.8385],[1.2842, 103.8415],
      [1.2835, 103.8452],[1.2838, 103.8490],[1.2840, 103.8545],[1.2840, 103.8600],
    ],
  },
  8: {
    color: "#8b5cf6", name: "Step Challenge Route",
    waypoints: [
      [1.2800, 103.8450],[1.2822, 103.8418],[1.2848, 103.8390],[1.2875, 103.8365],
      [1.2900, 103.8342],[1.2928, 103.8318],[1.2952, 103.8325],[1.2940, 103.8362],
      [1.2915, 103.8388],[1.2888, 103.8408],[1.2860, 103.8428],[1.2832, 103.8448],
      [1.2800, 103.8450],
    ],
  },
};
const ROUTE_EVENT_IDS = new Set(Object.keys(MARATHON_ROUTES).map(Number));

// ─── Dates ────────────────────────────────────────────────────────────────────
const UNIQUE_DATES = [...new Set(ALL_EVENTS.map((e) => e.date))].sort();
function formatDateLabel(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-SG", { weekday: "short", day: "numeric", month: "short" });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function loadScript(src) {
  return new Promise((res) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement("script");
    s.src = src; s.onload = res;
    document.head.appendChild(s);
  });
}
function loadStyle(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet"; l.href = href;
  document.head.appendChild(l);
}

if (typeof document !== "undefined" && !document.getElementById("aia-route-styles")) {
  const s = document.createElement("style");
  s.id = "aia-route-styles";
  s.textContent = `
    @keyframes footAppear {
      0%   { opacity:0; transform:scale(0.3) rotate(var(--rot)); }
      40%  { opacity:1; transform:scale(1.15) rotate(var(--rot)); }
      70%  { opacity:1; transform:scale(1) rotate(var(--rot)); }
      100% { opacity:0.18; transform:scale(1) rotate(var(--rot)); }
    }
    .aia-footprint {
      position:absolute; width:18px; height:22px;
      opacity:0; animation:footAppear 2.4s ease-out forwards;
      pointer-events:none;
    }
    /* Hide scrollbar on date strip */
    .aia-datebar::-webkit-scrollbar { display:none; }
    .aia-datebar { -ms-overflow-style:none; scrollbar-width:none; }
    /* Bottom sheet drag handle */
    .aia-sheet-handle {
      width:36px; height:4px; border-radius:2px;
      background:rgba(0,0,0,0.15); margin:0 auto 10px;
    }
    @media (max-width:639px) {
      .aia-route-legend { display:none !important; }
    }
  `;
  document.head.appendChild(s);
}

// ─── Event Modal ──────────────────────────────────────────────────────────────
function EventModal({ event, onClose, isMobile }) {
  const [mediaIdx, setMediaIdx] = useState(0);
  const total = event.media?.length || 0;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setMediaIdx((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setMediaIdx((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, onClose, setMediaIdx]);

  const cur = event.media?.[mediaIdx];
  const mediaH = isMobile ? 220 : 300;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(6,6,14,0.72)", backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: isMobile ? "20px 20px 0 0" : 24,
          width: "100%",
          maxWidth: isMobile ? "100%" : 560,
          maxHeight: isMobile ? "92vh" : "92vh",
          overflowY: "auto",
          boxShadow: "0 40px 120px rgba(0,0,0,0.45)",
          position: "relative",
        }}
      >
        {/* Drag handle on mobile */}
        {isMobile && <div style={{ padding: "12px 0 0" }}><div className="aia-sheet-handle" /></div>}

        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: isMobile ? 10 : 14, right: 14, zIndex: 10,
          width: 36, height: 36, borderRadius: "50%", border: "none",
          background: "rgba(0,0,0,0.08)", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#333",
        }}>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div style={{ padding: isMobile ? "8px 16px 12px" : "24px 24px 14px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase",
              padding: "3px 11px", borderRadius: 20, background: event.color + "1a", color: event.color,
            }}>{event.category}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: "3px 11px", borderRadius: 20,
              background: "#f3f4f6", color: "#555",
            }}>📅 {formatDateLabel(event.date)}</span>
          </div>
          <h2 style={{
            fontSize: isMobile ? 18 : 22, fontWeight: 800, color: "#111",
            margin: "0 0 10px", lineHeight: 1.25, letterSpacing: "-0.4px",
            paddingRight: 32,
          }}>
            {event.title}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 8 : 14 }}>
            {[{ icon: "🕐", text: event.time }, { icon: "📍", text: event.location }].map(({ icon, text }) => (
              <span key={text} style={{ display: "flex", alignItems: "flex-start", fontSize: isMobile ? 12 : 13, color: "#555", fontWeight: 500, gap: 4 }}>
                <span style={{ flexShrink: 0 }}>{icon}</span><span>{text}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Media */}
        <div style={{ position: "relative", width: "100%", height: mediaH, background: "#0a0a0f", overflow: "hidden" }}>
          {cur.type === "image"
            ? <img key={cur.src} src={cur.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            : <iframe key={cur.src} src={cur.src} style={{ width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen title="event video" />
          }
          {total > 1 && (
            <>
              {[-1, 1].map((dir) => (
                <button key={dir}
                  onClick={() => setMediaIdx((i) => (i + dir + total) % total)}
                  style={{
                    position: "absolute", top: "50%", transform: "translateY(-50%)",
                    [dir === -1 ? "left" : "right"]: 10,
                    width: isMobile ? 32 : 38, height: isMobile ? 32 : 38, borderRadius: "50%",
                    background: "rgba(255,255,255,0.88)", border: "none",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#111", boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                  }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <polyline points={dir === -1 ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
                  </svg>
                </button>
              ))}
              <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
                {event.media?.map((_, i) => (
                  <button key={i} onClick={() => setMediaIdx(i)} style={{
                    width: 8, height: 8, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
                    background: i === mediaIdx ? event.color : "rgba(255,255,255,0.45)",
                    transform: i === mediaIdx ? "scale(1.3)" : "scale(1)", transition: "all 0.2s",
                  }} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Description */}
        <div style={{ padding: isMobile ? "16px 16px 24px" : "20px 24px 28px" }}>
          <p style={{ fontSize: isMobile ? 14 : 15, color: "#444", lineHeight: 1.75, margin: "0 0 16px" }}>{event.description}</p>
          <button style={{
            display: "block", width: "100%", padding: "14px 0",
            borderRadius: 14, border: "none", color: "#fff",
            fontSize: 14, fontWeight: 700, letterSpacing: "0.7px",
            cursor: "pointer", background: event.color,
          }}>RSVP for This Event</button>
        </div>
      </div>
    </div>
  );
}

// ─── Date Bar ─────────────────────────────────────────────────────────────────
function DateBar({ selectedDate, onChange, isMobile }) {
  const isAll = selectedDate === "all";
  const top = isMobile ? 68 : 76;

  return (
    <div style={{
      position: "absolute", top, left: "50%", transform: "translateX(-50%)",
      zIndex: 900,
      background: "rgba(255,255,255,0.94)", backdropFilter: "blur(16px)",
      borderRadius: 40, padding: "5px 7px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.11)",
      border: "1px solid rgba(255,255,255,0.7)",
      maxWidth: isMobile ? "calc(100vw - 16px)" : "calc(100vw - 32px)",
    }}>
      <div className="aia-datebar" style={{ display: "flex", gap: 3, overflowX: "auto" }}>
        {/* ALL preset */}
        <button onClick={() => onChange("all")} style={{
          flexShrink: 0, padding: isMobile ? "5px 10px" : "6px 14px",
          borderRadius: 30, border: "none", cursor: "pointer",
          fontSize: isMobile ? 11 : 12, fontWeight: 700, letterSpacing: "0.3px",
          transition: "all 0.2s",
          background: isAll ? "linear-gradient(135deg,#f97316,#ef4444)" : "transparent",
          color: isAll ? "#fff" : "#666",
          boxShadow: isAll ? "0 2px 10px rgba(249,115,22,0.4)" : "none",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
            <circle cx="8" cy="8" r="3"/>
          </svg>
          {isMobile ? "All" : "All Events"}
        </button>

        <div style={{ width: 1, background: "#e5e7eb", margin: "4px 2px" }} />

        {UNIQUE_DATES.map((date) => {
          const eventsOnDay = ALL_EVENTS.filter((e) => e.date === date);
          const isActive = selectedDate === date;
          const d = new Date(date + "T00:00:00");
          const day = d.toLocaleDateString("en-SG", { day: "numeric" });
          const mon = d.toLocaleDateString("en-SG", { month: "short" });
          const wday = d.toLocaleDateString("en-SG", { weekday: "short" });

          return (
            <button key={date} onClick={() => onChange(date)} style={{
              flexShrink: 0, padding: isMobile ? "3px 8px" : "4px 12px",
              borderRadius: 30, border: "none", cursor: "pointer", transition: "all 0.2s",
              background: isActive ? "#111" : "transparent",
              color: isActive ? "#fff" : "#555",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
            }}>
              <span style={{ fontSize: isMobile ? 8 : 9, fontWeight: 600, opacity: 0.7, letterSpacing: "0.4px", textTransform: "uppercase" }}>{wday}</span>
              <span style={{ fontSize: isMobile ? 13 : 15, fontWeight: 800, lineHeight: 1.1 }}>{day}</span>
              <span style={{ fontSize: isMobile ? 9 : 10, fontWeight: 600, opacity: 0.8 }}>{mon}</span>
              <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                {eventsOnDay.map((e) => (
                  <span key={e.id} style={{ width: isMobile ? 4 : 5, height: isMobile ? 4 : 5, borderRadius: "50%", background: isActive ? "#fff" : e.color }} />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
function AllEventsSidebar({ events, onSelect }) {
  const byDate = UNIQUE_DATES.reduce((acc, d) => {
    const evs = events.filter((e) => e.date === d);
    if (evs.length) acc[d] = evs;
    return acc;
  }, {});

  return (
    <div style={{
      position: "absolute", top: 140, left: 16, bottom: 24, zIndex: 900,
      width: 280, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(16px)",
      borderRadius: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
      border: "1px solid rgba(255,255,255,0.7)",
      overflowY: "auto", display: "flex", flexDirection: "column",
    }}>
      <div style={{ padding: "14px 14px 8px", borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg,#f97316,#ef4444)", flexShrink: 0,
          }}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="white">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
              <circle cx="8" cy="8" r="3"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>All Events</div>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>{events.length} events · {UNIQUE_DATES.length} dates</div>
          </div>
        </div>
      </div>
      <div style={{ overflowY: "auto", flex: 1 }}>
        {Object.entries(byDate).map(([date, evs]) => (
          <div key={date}>
            <div style={{
              padding: "10px 14px 4px", fontSize: 10, fontWeight: 700,
              color: "#aaa", letterSpacing: "0.8px", textTransform: "uppercase",
              position: "sticky", top: 0, background: "rgba(255,255,255,0.97)",
            }}>
              {formatDateLabel(date)}
            </div>
            {evs.map((ev) => (
              <button key={ev.id} onClick={() => onSelect(ev)} style={{
                width: "100%", textAlign: "left", background: "none", border: "none",
                cursor: "pointer", padding: "8px 14px", display: "flex", gap: 10, alignItems: "center",
                borderBottom: "1px solid #f5f5f5", transition: "background 0.15s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10, overflow: "hidden", flexShrink: 0,
                  border: `2.5px solid ${ev.color}`,
                }}>
                  <img src={ev.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#111", lineHeight: 1.3, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {ev.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: ev.color, background: ev.color + "15", padding: "1px 7px", borderRadius: 10 }}>
                      {ev.category}
                    </span>
                    <span style={{ fontSize: 10, color: "#999" }}>{ev.time.split("·")[1]?.trim() || ""}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mobile Bottom Sheet ──────────────────────────────────────────────────────
function MobileBottomSheet({ events, onSelect, isOpen, onToggle }) {
  const byDate = UNIQUE_DATES.reduce((acc, d) => {
    const evs = events.filter((e) => e.date === d);
    if (evs.length) acc[d] = evs;
    return acc;
  }, {});

  return (
    <>
      {/* Toggle tab */}
      <button
        onClick={onToggle}
        style={{
          position: "absolute", bottom: isOpen ? "52vh" : 24, left: "50%",
          transform: "translateX(-50%)",
          zIndex: 901, border: "none", cursor: "pointer",
          background: "linear-gradient(135deg,#f97316,#ef4444)",
          color: "#fff", borderRadius: 30,
          padding: "8px 18px",
          fontSize: 12, fontWeight: 700, letterSpacing: "0.3px",
          boxShadow: "0 4px 20px rgba(249,115,22,0.45)",
          display: "flex", alignItems: "center", gap: 6,
          transition: "bottom 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="white">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
          <circle cx="8" cy="8" r="3"/>
        </svg>
        {isOpen ? "Hide Events" : `All Events (${events.length})`}
        <svg viewBox="0 0 24 24" width="12" height="12" stroke="white" strokeWidth="2.5" fill="none"
          style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* Sheet panel */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: "52vh",
        background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.14)",
        zIndex: 900,
        transform: isOpen ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "10px 16px 8px", borderBottom: "1px solid #f0f0f0", flexShrink: 0 }}>
          <div className="aia-sheet-handle" />
          <div style={{ fontSize: 13, fontWeight: 800, color: "#111" }}>
            All Events — {events.length} across {UNIQUE_DATES.length} dates
          </div>
        </div>
        <div style={{ overflowY: "auto", flex: 1, WebkitOverflowScrolling: "touch" }}>
          {Object.entries(byDate).map(([date, evs]) => (
            <div key={date}>
              <div style={{
                padding: "8px 16px 4px", fontSize: 10, fontWeight: 700,
                color: "#aaa", letterSpacing: "0.8px", textTransform: "uppercase",
                position: "sticky", top: 0, background: "rgba(255,255,255,0.97)",
              }}>
                {formatDateLabel(date)}
              </div>
              {evs.map((ev) => (
                <button key={ev.id} onClick={() => { onSelect(ev); onToggle(); }} style={{
                  width: "100%", textAlign: "left", background: "none", border: "none",
                  cursor: "pointer", padding: "10px 16px", display: "flex", gap: 12, alignItems: "center",
                  borderBottom: "1px solid #f5f5f5",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, overflow: "hidden", flexShrink: 0,
                    border: `2.5px solid ${ev.color}`,
                  }}>
                    <img src={ev.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111", lineHeight: 1.3, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {ev.title}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: ev.color, background: ev.color + "15", padding: "2px 8px", borderRadius: 10 }}>
                        {ev.category}
                      </span>
                      <span style={{ fontSize: 10, color: "#999" }}>{ev.time.split("·")[1]?.trim() || ""}</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="#ccc" strokeWidth="2" fill="none" style={{ flexShrink: 0 }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const layerGroupRef = useRef(null);
  const routeLayerRef = useRef(null);
  const footTimersRef = useRef([]);
  const [ready, setReady] = useState(false);
  const [selectedDate, setSelectedDate] = useState("all");
  const [activeEvent, setActiveEvent] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const visibleEvents = selectedDate === "all"
    ? ALL_EVENTS
    : ALL_EVENTS.filter((e) => e.date === selectedDate);

  useEffect(() => {
    loadStyle("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js").then(() => setReady(true));
    loadStyle("https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap");
  }, []);

  // 1. INITIALIZATION: Only runs once when the script is ready
  useEffect(() => {
    // Guard clause: Ensure Leaflet exists and we haven't built the map yet
    if (!ready || !mapRef.current || leafletRef.current || !window.L) return;

    const L = window.L;


    const map = L.map(mapRef.current, {
      center: [1.3521, 103.8198],
      zoom: isMobile ? 11 : 12, // Set initial zoom based on current state
      minZoom: 11,
      maxZoom: 16,
      zoomControl: false,
    });

    // Set constraints
    map.setMaxBounds(L.latLngBounds(L.latLng(1.1, 103.55), L.latLng(1.5, 104.1)));

    // Add Layers
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap © CARTO",
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Initialize Layer Groups for pins and routes
    layerGroupRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);

    // Save map instance to ref to prevent re-initialization
    leafletRef.current = map;

    // NOTE: We exclude isMobile from this array so the map isn't destroyed/rebuilt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // 2. RESPONSIVE UPDATE: Updates zoom smoothly without breaking the map
  useEffect(() => {
    if (leafletRef.current) {
      leafletRef.current.setZoom(isMobile ? 11 : 12);
    }
  }, [isMobile]);

  const setActiveEventCb = useCallback((ev) => setActiveEvent(ev), []);

  useEffect(() => {
    if (!ready || !leafletRef.current || !layerGroupRef.current) return;
    const L = window.L;
    layerGroupRef.current.clearLayers();
    routeLayerRef.current.clearLayers();
    footTimersRef.current.forEach(clearTimeout);
    footTimersRef.current = [];

    // Routes + footprints
    const routeEvents = visibleEvents.filter((ev) => ROUTE_EVENT_IDS.has(ev.id));
    routeEvents.forEach((ev) => {
      const route = MARATHON_ROUTES[ev.id];
      const pts = route.waypoints;
      L.polyline(pts, { color: route.color, weight: 3, opacity: 0.25, dashArray: "6 8", lineCap: "round" })
        .addTo(routeLayerRef.current);

      const totalSteps = 28;
      const segLengths = [];
      let totalLen = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const dlat = pts[i+1][0]-pts[i][0], dlng = pts[i+1][1]-pts[i][1];
        const len = Math.sqrt(dlat*dlat + dlng*dlng);
        segLengths.push(len); totalLen += len;
      }

      const interpolated = [];
      for (let s = 0; s < totalSteps; s++) {
        const t = (s / (totalSteps - 1)) * totalLen;
        let acc = 0;
        for (let i = 0; i < segLengths.length; i++) {
          if (acc + segLengths[i] >= t || i === segLengths.length - 1) {
            const frac = segLengths[i] > 0 ? (t - acc) / segLengths[i] : 0;
            const lat = pts[i][0] + frac * (pts[i+1][0] - pts[i][0]);
            const lng = pts[i][1] + frac * (pts[i+1][1] - pts[i][1]);
            const dLat = pts[i+1][0]-pts[i][0], dLng = pts[i+1][1]-pts[i][1];
            const bearing = Math.atan2(dLng, dLat) * (180 / Math.PI);
            const side = s % 2 === 0 ? 1 : -1;
            const perpRad = (bearing + 90) * (Math.PI / 180);
            const offset = 0.00018 * side;
            interpolated.push({ lat: lat + offset*Math.sin(perpRad)*0.4, lng: lng + offset*Math.cos(perpRad)*0.4, bearing, idx: s });
            break;
          }
          acc += segLengths[i];
        }
      }

      const footSVG = (color) =>
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 26" width="18" height="26">
          <ellipse cx="9" cy="19" rx="7" ry="7" fill="${color}" opacity="0.85"/>
          <ellipse cx="9" cy="10" rx="5" ry="6" fill="${color}" opacity="0.85"/>
          <ellipse cx="5.5" cy="4.5" rx="2.8" ry="3" fill="${color}" opacity="0.75"/>
          <ellipse cx="12.5" cy="4.5" rx="2.8" ry="3" fill="${color}" opacity="0.75"/>
          <ellipse cx="3" cy="8" rx="2" ry="2.2" fill="${color}" opacity="0.6"/>
          <ellipse cx="15" cy="8" rx="2" ry="2.2" fill="${color}" opacity="0.6"/>
        </svg>`;

      interpolated.forEach(({ lat, lng, bearing, idx }) => {
        const delay = idx * 120;
        const timer = setTimeout(() => {
          const rot = Math.round(bearing);
          const el = document.createElement("div");
          el.className = "aia-footprint";
          el.style.setProperty("--rot", `${rot}deg`);
          el.style.transform = `rotate(${rot}deg)`;
          el.style.animationDelay = "0ms";
          el.style.animationDuration = "2.4s";
          el.innerHTML = footSVG(route.color);
          const icon = L.divIcon({ html: el, className: "", iconSize: [18, 26], iconAnchor: [9, 13] });
          L.marker([lat, lng], { icon, interactive: false, zIndexOffset: -100 }).addTo(routeLayerRef.current);
          const loopInterval = totalSteps * 120 + 2400;
          const intervalId = setInterval(() => {
            el.style.animation = "none";
            void el.offsetWidth;
            el.style.animation = "footAppear 2.4s ease-out forwards";
          }, loopInterval);
          footTimersRef.current.push(intervalId);
        }, delay);
        footTimersRef.current.push(timer);
      });
    });

    // Event markers
    const markerSize = isMobile ? 42 : 54;
    const markerHoverSize = isMobile ? 66 : 84;
    const markerOffset = isMobile ? -12 : -15;

    visibleEvents.forEach((ev) => {
      const container = document.createElement("div");
      container.style.cssText = `
        width:${markerSize}px;height:${markerSize}px;border-radius:50%;overflow:hidden;
        cursor:pointer;border:3px solid ${ev.color};
        box-shadow:0 4px 16px rgba(0,0,0,0.22);
        transition:all 0.28s cubic-bezier(.34,1.56,.64,1);
        background:#eee;position:relative;
      `;
      const img = document.createElement("img");
      img.src = ev.thumbnail;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;";
      container.appendChild(img);

      if (selectedDate === "all") {
        const badge = document.createElement("div");
        const d = new Date(ev.date + "T00:00:00");
        badge.textContent = d.toLocaleDateString("en-SG", { day: "numeric", month: "short" });
        badge.style.cssText = `
          position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);
          background:${ev.color};color:#fff;font-size:8px;font-weight:700;
          padding:1px 4px;border-radius:7px;white-space:nowrap;pointer-events:none;
        `;
        container.appendChild(badge);
      }

      container.addEventListener("mouseenter", () => {
        container.style.width = markerHoverSize+"px"; container.style.height = markerHoverSize+"px";
        container.style.marginLeft = markerOffset+"px"; container.style.marginTop = markerOffset+"px";
        container.style.boxShadow = `0 8px 36px ${ev.color}77`;
        container.style.borderWidth = "4px"; container.style.zIndex = "999";
      });
      container.addEventListener("mouseleave", () => {
        container.style.width = markerSize+"px"; container.style.height = markerSize+"px";
        container.style.marginLeft = "0"; container.style.marginTop = "0";
        container.style.boxShadow = "0 4px 16px rgba(0,0,0,0.22)";
        container.style.borderWidth = "3px"; container.style.zIndex = "1";
      });
      container.addEventListener("click", (e) => { e.stopPropagation(); setActiveEventCb(ev); });

      const half = markerSize / 2;
      const icon = L.divIcon({ html: container, className: "", iconSize: [markerSize, markerSize], iconAnchor: [half, half] });
      L.marker([ev.lat, ev.lng], { icon }).addTo(layerGroupRef.current);
    });
  }, [ready, visibleEvents, selectedDate, setActiveEventCb, isMobile]);

  const routeEventsVisible = visibleEvents.filter((ev) => ROUTE_EVENT_IDS.has(ev.id));

  return (
    <div style={{ width: "100vw", height: "100vh", fontFamily: "'Sora', sans-serif", position: "relative", overflow: "hidden" }}>

      {/* ── Header ── */}
      <div style={{
        position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
        zIndex: 900, display: "flex", alignItems: "center", gap: 8,
        background: "rgba(255,255,255,0.94)", backdropFilter: "blur(16px)",
        borderRadius: 40, padding: isMobile ? "8px 14px" : "10px 22px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        border: "1px solid rgba(255,255,255,0.7)", whiteSpace: "nowrap",
        maxWidth: isMobile ? "calc(100vw - 100px)" : "auto",
      }}>
        <svg viewBox="0 0 28 28" width={isMobile ? 20 : 26} height={isMobile ? 20 : 26} fill="none">
          <circle cx="14" cy="14" r="13" stroke="#f97316" strokeWidth="2" />
          <path d="M14 6 C14 6 8 12 8 16.5 A6 6 0 0 0 20 16.5 C20 12 14 6 14 6Z" fill="#f97316" opacity="0.85" />
          <circle cx="14" cy="16.5" r="2.5" fill="white" />
        </svg>
        <span style={{ fontSize: isMobile ? 15 : 19, fontWeight: 800, color: "#111", letterSpacing: "-0.4px" }}>
          SG<span style={{ color: "#f97316" }}>Events</span>
        </span>
        {!isMobile && (
          <span style={{ fontSize: 11, color: "#999", paddingLeft: 10, borderLeft: "1px solid #e5e5e5", fontWeight: 500 }}>
            Community Events · Singapore
          </span>
        )}
      </div>

      {/* ── Event count (top right) ── */}
      <div style={{
        position: "absolute", top: 10, right: 12, zIndex: 900,
        background: "rgba(255,255,255,0.94)", backdropFilter: "blur(16px)",
        borderRadius: 20, padding: isMobile ? "6px 10px" : "8px 14px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        border: "1px solid rgba(255,255,255,0.7)",
        fontSize: isMobile ? 11 : 13, fontWeight: 700, color: "#111",
      }}>
        {visibleEvents.length}
        <span style={{ color: "#999", fontWeight: 500 }}> {isMobile ? "ev." : `event${visibleEvents.length !== 1 ? "s" : ""}`}</span>
      </div>

      {/* ── Date Bar ── */}
      <DateBar selectedDate={selectedDate} onChange={setSelectedDate} isMobile={isMobile} />

      {/* ── Desktop sidebar / Mobile sheet ── */}
      {selectedDate === "all" && !isMobile && (
        <AllEventsSidebar events={ALL_EVENTS} onSelect={setActiveEvent} />
      )}
      {selectedDate === "all" && isMobile && (
        <MobileBottomSheet
          events={ALL_EVENTS}
          onSelect={setActiveEvent}
          isOpen={sheetOpen}
          onToggle={() => setSheetOpen((o) => !o)}
        />
      )}

      {/* ── Route legend (desktop only, top-right below count) ── */}
      {routeEventsVisible.length > 0 && !isMobile && (
        <div className="aia-route-legend" style={{
          position: "absolute", top: 60, right: 12, zIndex: 900,
          background: "rgba(255,255,255,0.94)", backdropFilter: "blur(16px)",
          borderRadius: 16, padding: "8px 12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.7)",
          display: "flex", flexDirection: "column", gap: 5,
        }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#aaa", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 2 }}>
            Race Routes
          </div>
          {routeEventsVisible?.map((ev) => (
            <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <svg width="22" height="10" viewBox="0 0 22 10">
                <line x1="0" y1="5" x2="22" y2="5" stroke={ev.color} strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 10, fontWeight: 700, color: ev.color }}>
                {MARATHON_ROUTES[ev.id].name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── No events notice ── */}
      {visibleEvents.length === 0 && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          zIndex: 800, background: "rgba(255,255,255,0.96)",
          borderRadius: 20, padding: "24px 28px", textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          width: "80%", maxWidth: 320,
        }}>
          <div style={{ fontSize: 30, marginBottom: 8 }}>📅</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>No events on this date</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Try another date or switch to All Events</div>
        </div>
      )}

      {/* ── Map ── */}
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      {/* ── Modal ── */}
      {activeEvent && (
        <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} isMobile={isMobile} />
      )}
    </div>
  );
}
