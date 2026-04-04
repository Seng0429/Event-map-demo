import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",               label: "All Events",         color: "#f97316", icon: "◎",  isStatus: false },
  { id: "live",              label: "Live Now",           color: "#ff2d2d", icon: "🔴", isStatus: true  },
  { id: "upcoming",         label: "Upcoming",            color: "#6366f1", icon: "🔮", isStatus: true  },
  { id: "Wellness & Fitness",  label: "Wellness & Fitness", color: "#ef4444", icon: "🏃", isStatus: false },
  { id: "Financial Seminars",  label: "Financial Seminars", color: "#0ea5e9", icon: "💼", isStatus: false },
  { id: "Recruitment Drives",  label: "Recruitment Drives", color: "#8b5cf6", icon: "🤝", isStatus: false },
  { id: "Community Outreach",  label: "Community Outreach", color: "#22c55e", icon: "🌿", isStatus: false },
];

// ─── Event status helper ──────────────────────────────────────────────────────
function getEventStatus(ev) {
  const today = new Date("2026-04-04T00:00:00");
  const evDate = new Date(ev.date + "T00:00:00");
  const diffDays = (evDate - today) / 86400000;
  if (diffDays >= -3 && diffDays <= 0) return "live";
  if (diffDays > 0 && diffDays <= 90) return "upcoming";
  return "past";
}

// ─── All Events ───────────────────────────────────────────────────────────────
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
    description: "AIA HYROX Singapore returns for its biggest edition yet — three full days of racing at the iconic National Stadium. Take on 8 × 1 km of running plus 8 functional workout stations.",
    category: "Wellness & Fitness", color: "#ef4444",
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
    description: "AIA Singapore's inaugural AIA Ultimate FitnessFest (AUFF), presented in partnership with HYROX. Welcomes participants of all ages and fitness levels for a 'lite' HYROX experience.",
    category: "Wellness & Fitness", color: "#ef4444",
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
    description: "Celebrate National Day with AIA Vitality's iDiscover SG60 Edition (Season 8). Complete curated walking routes across Singapore's iconic waterfront landmarks and earn up to 400 Vitality coins.",
    category: "Wellness & Fitness", color: "#ef4444",
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
    description: "AIA Singapore hosts its annual community charity run to benefit the AIA Better Lives Fund. Participants raise funds for Children's Wishing Well and VIVA Foundation for Children with Cancer.",
    category: "Wellness & Fitness", color: "#ef4444",
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
    description: "AIA Vitality's flagship walking challenge across Singapore's CBD. Track daily steps through the AIA+ app and earn Vitality points redeemable for rewards.",
    category: "Wellness & Fitness", color: "#ef4444",
  },
  {
    id: 11,
    title: "AIA Vitality Corporate Run Series",
    date: "2025-07-19",
    lat: 1.3010, lng: 103.8535,
    thumbnail: "https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&q=80" },
    ],
    time: "Sat, 19 Jul 2025 · 7:30 AM",
    location: "Marina Barrage, Marina South",
    description: "AIA's corporate wellness run series invites company teams to compete in a 5 km fun run along the Marina waterfront. AIA Vitality members receive bonus points for finishing together.",
    category: "Wellness & Fitness", color: "#ef4444",
  },
  {
    id: 12,
    title: "AIA Mindful Movement Yoga Festival",
    date: "2025-06-21",
    lat: 1.2897, lng: 103.8631,
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80" },
    ],
    time: "Sat, 21 Jun 2025 · 8:00 AM",
    location: "Esplanade Park, City Hall",
    description: "Celebrate International Yoga Day with AIA Vitality. A full morning of guided flow, breathwork, and meditation led by certified AIA Vitality ambassadors.",
    category: "Wellness & Fitness", color: "#ef4444",
  },
  {
    id: 13,
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
    description: "Step into the Season of Giving with AIA's festive 2-day trail walk at Rainforest Wild ASIA, Mandai. Explore rainforest trails and raise funds for the AIA Better Lives Fund.",
    category: "Wellness & Fitness", color: "#ef4444",
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
    description: "Rally your teams for the #LiveWithVitality Corporate Challenge. AIA corporate clients complete designated activities across the season for inter-company competition.",
    category: "Wellness & Fitness", color: "#ef4444",
  },
  // ── Financial Seminars ──
  {
    id: 20,
    title: "AIA Wealth Planning Masterclass",
    date: "2025-05-17",
    lat: 1.2789, lng: 103.8536,
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80" },
    ],
    time: "Sat, 17 May 2025 · 10:00 AM",
    location: "AIA Tampines Hub, Singapore",
    description: "A deep-dive masterclass on holistic wealth planning covering investment-linked plans, retirement annuities, and estate planning strategies for Singapore residents.",
    category: "Financial Seminars", color: "#0ea5e9",
  },
  {
    id: 21,
    title: "Retirement Ready Roadshow — Jurong East",
    date: "2025-06-14",
    lat: 1.3331, lng: 103.7423,
    thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80" },
    ],
    time: "Sat, 14 Jun 2025 · 9:30 AM",
    location: "Jurong East Community Club, Jurong East",
    description: "AIA's Retirement Ready Roadshow brings certified financial planners to community clubs across Singapore, covering CPF optimisation and supplementary retirement schemes.",
    category: "Financial Seminars", color: "#0ea5e9",
  },
  {
    id: 22,
    title: "AIA SME Business Protection Seminar",
    date: "2025-08-23",
    lat: 1.2978, lng: 103.8355,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&q=80" },
    ],
    time: "Sat, 23 Aug 2025 · 10:00 AM",
    location: "AIA Customer Centre, Robinson Road, CBD",
    description: "Designed for SME owners and entrepreneurs, this seminar covers key-person insurance, business succession planning, and group employee benefit schemes.",
    category: "Financial Seminars", color: "#0ea5e9",
  },
  {
    id: 23,
    title: "Women & Wealth Forum 2025",
    date: "2025-10-11",
    lat: 1.3014, lng: 103.8394,
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=800&q=80" },
    ],
    time: "Sat, 11 Oct 2025 · 10:00 AM",
    location: "Marina Bay Sands Convention Centre, Bayfront",
    description: "An exclusive half-day forum for women at every life stage. AIA's all-female panel tackles unique financial challenges women face in Singapore.",
    category: "Financial Seminars", color: "#0ea5e9",
  },
  {
    id: 24,
    title: "AIA Digital Investment Talk — Robo-Advice & ILPs",
    date: "2025-11-08",
    lat: 1.3398, lng: 103.8561,
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80" },
    ],
    time: "Sat, 8 Nov 2025 · 2:00 PM",
    location: "Suntec City Convention Centre, Promenade",
    description: "A forward-looking seminar on digital tools and personal finance — covering AIA's robo-advisory capabilities, ILP fund selection, and AI-powered portfolio rebalancing.",
    category: "Financial Seminars", color: "#0ea5e9",
  },
  // ── Recruitment Drives ──
  {
    id: 30,
    title: "AIA Agency Career Day — North Region",
    date: "2025-04-12",
    lat: 1.4323, lng: 103.7900,
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80" },
    ],
    time: "Sat, 12 Apr 2025 · 10:00 AM",
    location: "Woodlands Civic Centre, Woodlands",
    description: "Explore a rewarding career in financial advisory with AIA. Features live presentations from top-performing agents and one-on-one mentoring sessions.",
    category: "Recruitment Drives", color: "#8b5cf6",
  },
  {
    id: 31,
    title: "AIA Graduate Talent Hunt 2025",
    date: "2025-05-24",
    lat: 1.2966, lng: 103.7764,
    thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80" },
    ],
    time: "Sat, 24 May 2025 · 10:00 AM",
    location: "one-north, Buona Vista",
    description: "AIA's Graduate Talent Hunt invites final-year students and recent graduates to discover pathways across actuarial science, data analytics, and financial advisory.",
    category: "Recruitment Drives", color: "#8b5cf6",
  },
  {
    id: 32,
    title: "AIA Women in Finance Hiring Fair",
    date: "2025-07-05",
    lat: 1.2789, lng: 103.8490,
    thumbnail: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
    ],
    time: "Sat, 5 Jul 2025 · 10:00 AM",
    location: "Tanjong Pagar Plaza Community Club",
    description: "AIA's targeted hiring fair for women returning to the workforce or pivoting into financial services. Direct interviews with hiring managers on the day.",
    category: "Recruitment Drives", color: "#8b5cf6",
  },
  {
    id: 33,
    title: "AIA Agency Express — East Region",
    date: "2025-09-06",
    lat: 1.3496, lng: 103.9401,
    thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" },
    ],
    time: "Sat, 6 Sep 2025 · 10:00 AM",
    location: "Tampines Hub, Tampines",
    description: "Compact 3-hour recruitment express event for the East region. AIA district managers host group info sessions followed by one-to-one career discovery consultations.",
    category: "Recruitment Drives", color: "#8b5cf6",
  },
  {
    id: 34,
    title: "AIA Tech Talent Hackathon Recruitment",
    date: "2025-10-25",
    lat: 1.3038, lng: 103.8318,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" },
    ],
    time: "Sat–Sun, 25–26 Oct 2025 · 9:00 AM",
    location: "AIA Fintech Innovation Hub, Shenton Way, CBD",
    description: "A 2-day hackathon-style recruitment event for engineers, data scientists, and UX designers. Top performers receive fast-tracked interview slots and sign-on offers.",
    category: "Recruitment Drives", color: "#8b5cf6",
  },
  // ── Community Outreach ──
  {
    id: 40,
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
    description: "AIA Singapore's annual Connecting Lives Volunteer Day mobilises staff and representatives to serve those in need across multiple grassroots organisations.",
    category: "Community Outreach", color: "#22c55e",
  },
  {
    id: 41,
    title: "AIA Better Lives Fund Charity Golf",
    date: "2025-04-26",
    lat: 1.3625, lng: 103.8362,
    thumbnail: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80" },
    ],
    time: "Sat, 26 Apr 2025 · 7:00 AM",
    location: "Seletar Country Club, Seletar",
    description: "AIA Singapore's annual fundraising golf tournament raising funds for the AIA Better Lives Fund — administered by the Community Chest.",
    category: "Community Outreach", color: "#22c55e",
  },
  {
    id: 42,
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
    description: "In partnership with Tottenham Hotspur FC — AIA's Global Principal Partner — professional coaching for aspiring young footballers from grassroots programmes across Singapore.",
    category: "Community Outreach", color: "#22c55e",
  },
  {
    id: 43,
    title: "AIA Seniors Health Screening Day",
    date: "2025-08-16",
    lat: 1.3524, lng: 103.8686,
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80" },
    ],
    time: "Sat, 16 Aug 2025 · 8:30 AM",
    location: "Geylang Serai Community Club, Geylang",
    description: "Free health screening for seniors aged 60+ including blood pressure, BMI, glucose, and vision checks. AIA nurses on hand to advise on coverage and shield plans.",
    category: "Community Outreach", color: "#22c55e",
  },
  {
    id: 44,
    title: "AIA Kids Financial Literacy Fair",
    date: "2025-11-22",
    lat: 1.3769, lng: 103.8457,
    thumbnail: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" },
    ],
    time: "Sat, 22 Nov 2025 · 10:00 AM",
    location: "Ang Mo Kio Hub, Ang Mo Kio",
    description: "AIA's annual children's financial literacy fair introduces kids aged 6–14 to saving, spending wisely, and protecting what matters through interactive booths and mini-games.",
    category: "Community Outreach", color: "#22c55e",
  },
  {
    id: 45,
    title: "AIA Tree Planting — Green Singapore Day",
    date: "2025-06-01",
    lat: 1.2494, lng: 103.8303,
    thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" },
      { type: "image", src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80" },
    ],
    time: "Sun, 1 Jun 2025 · 8:00 AM",
    location: "Labrador Nature Reserve, Labrador",
    description: "AIA staff and partners plant 500 native trees at Labrador Nature Reserve as part of Singapore's Green Singapore Day initiative.",
    category: "Community Outreach", color: "#22c55e",
  },
];

const MARATHON_ROUTES = {
  7:  { color: "#ef4444", name: "Charity Run Route",     waypoints: [[1.3521,103.8198],[1.3490,103.8225],[1.3462,103.8268],[1.3440,103.8310],[1.3418,103.8350],[1.3395,103.8390],[1.3370,103.8420],[1.3350,103.8450],[1.2978,103.8540],[1.2943,103.8607],[1.2860,103.8545],[1.2900,103.8490],[1.2940,103.8420],[1.3060,103.8360],[1.3150,103.8290],[1.3250,103.8230],[1.3380,103.8210],[1.3521,103.8198]] },
  1:  { color: "#ef4444", name: "HYROX Race Route",      waypoints: [[1.3044,103.8743],[1.3030,103.8780],[1.3010,103.8815],[1.2990,103.8850],[1.2970,103.8870],[1.2952,103.8845],[1.2945,103.8808],[1.2950,103.8770],[1.2965,103.8735],[1.2990,103.8715],[1.3020,103.8718],[1.3044,103.8743]] },
  13: { color: "#ef4444", name: "Merry-thon Trail",      waypoints: [[1.4043,103.7930],[1.4020,103.7908],[1.3995,103.7885],[1.3970,103.7863],[1.3945,103.7845],[1.3918,103.7835],[1.3892,103.7845],[1.3872,103.7868],[1.3875,103.7900],[1.3895,103.7925],[1.3925,103.7942],[1.3960,103.7952],[1.3992,103.7955],[1.4020,103.7945],[1.4043,103.7930]] },
  5:  { color: "#ef4444", name: "iDiscover Walking Route", waypoints: [[1.2840,103.8600],[1.2858,103.8568],[1.2878,103.8535],[1.2900,103.8505],[1.2918,103.8472],[1.2935,103.8440],[1.2950,103.8405],[1.2938,103.8368],[1.2912,103.8340],[1.2882,103.8358],[1.2860,103.8385],[1.2842,103.8415],[1.2835,103.8452],[1.2838,103.8490],[1.2840,103.8545],[1.2840,103.8600]] },
  8:  { color: "#ef4444", name: "Step Challenge Route",  waypoints: [[1.2800,103.8450],[1.2822,103.8418],[1.2848,103.8390],[1.2875,103.8365],[1.2900,103.8342],[1.2928,103.8318],[1.2952,103.8325],[1.2940,103.8362],[1.2915,103.8388],[1.2888,103.8408],[1.2860,103.8428],[1.2832,103.8448],[1.2800,103.8450]] },
};
const ROUTE_EVENT_IDS = new Set(Object.keys(MARATHON_ROUTES).map(Number));

const UNIQUE_DATES = [...new Set(ALL_EVENTS.map((e) => e.date))].sort();

function formatDateLabel(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-SG", { weekday: "short", day: "numeric", month: "short" });
}

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
    .aia-footprint { position:absolute; width:18px; height:22px; opacity:0; animation:footAppear 2.4s ease-out forwards; pointer-events:none; }
    .aia-datebar::-webkit-scrollbar { display:none; }
    .aia-datebar { -ms-overflow-style:none; scrollbar-width:none; }
    .aia-catbar::-webkit-scrollbar { display:none; }
    .aia-catbar { -ms-overflow-style:none; scrollbar-width:none; }
    .aia-sheet-handle { width:36px; height:4px; border-radius:2px; background:rgba(0,0,0,0.15); margin:0 auto 10px; }

    @keyframes portalOpen {
      0%   { opacity:0; transform:perspective(1200px) translateZ(-300px) scale(0.7); }
      100% { opacity:1; transform:perspective(1200px) translateZ(0px) scale(1); }
    }
    .gallery-page { position:fixed; inset:0; z-index:2000; background:#04040a; overflow-y:auto; overflow-x:hidden; animation:portalOpen 0.55s cubic-bezier(.16,1,.3,1); }
    .gallery-page::-webkit-scrollbar { width:3px; }
    .gallery-page::-webkit-scrollbar-track { background:transparent; }
    .gallery-page::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:4px; }
    .gallery-vignette-top { position:fixed; top:0; left:0; right:0; height:180px; z-index:30; pointer-events:none; background:linear-gradient(to bottom, #04040a 0%, #04040a 20%, transparent 100%); }
    .gallery-vignette-bottom { position:fixed; bottom:0; left:0; right:0; height:120px; z-index:30; pointer-events:none; background:linear-gradient(to top, #04040a 0%, transparent 100%); }
    .gallery-tunnel-vignette { position:fixed; inset:0; z-index:29; pointer-events:none; background:radial-gradient(ellipse 70% 70% at 50% 50%, transparent 55%, rgba(4,4,10,0.7) 100%); }
    .gallery-timeline-rail { position:fixed; right:12px; top:100px; bottom:60px; width:2px; background:rgba(255,255,255,0.06); border-radius:2px; z-index:40; pointer-events:none; }
    .photo-btn-fab { width:52px; height:52px; border-radius:50%; border:none; cursor:pointer; background:linear-gradient(135deg,#f97316,#ef4444); box-shadow:0 4px 20px rgba(249,115,22,0.5); display:flex; align-items:center; justify-content:center; transition:transform 0.2s, box-shadow 0.2s; }
    .photo-btn-fab:hover { transform:scale(1.08); box-shadow:0 6px 28px rgba(249,115,22,0.65); }
    .photo-btn-fab:active { transform:scale(0.95); }
    .cat-pill { transition: all 0.2s cubic-bezier(.34,1.56,.64,1); }
    .cat-pill:hover { transform: translateY(-1px); }

    /* ── Live Now: fire ring ── */
    @keyframes fireRotate { to { transform: rotate(360deg); } }
    @keyframes firePulse  { 0%,100%{ opacity:.9; } 50%{ opacity:.55; } }
    @keyframes livePing   { 0%{ transform:scale(1); opacity:.8; } 100%{ transform:scale(2.6); opacity:0; } }
    .marker-fire-ring { position:absolute; inset:-7px; border-radius:50%; z-index:2; pointer-events:none; background:conic-gradient(#ff4500 0deg,#ff6a00 45deg,#ffb300 90deg,#ff2200 135deg,#ff4500 180deg,#ffb300 225deg,#ff6a00 270deg,#ff2200 315deg,#ff4500 360deg); mask:radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px)); -webkit-mask:radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px)); animation:fireRotate 1.2s linear infinite, firePulse 0.7s ease-in-out infinite; filter:drop-shadow(0 0 5px #ff4500) drop-shadow(0 0 10px #ff6a00); }
    .marker-fire-outer { position:absolute; inset:-14px; border-radius:50%; z-index:1; pointer-events:none; background:conic-gradient(rgba(255,69,0,0.55) 0deg,rgba(255,106,0,0.25) 70deg,transparent 130deg,rgba(255,179,0,0.4) 190deg,rgba(255,69,0,0.55) 250deg,transparent 310deg,rgba(255,69,0,0.5) 360deg); animation:fireRotate 2s linear infinite reverse; filter:blur(4px); }
    .marker-fire-ping  { position:absolute; inset:-9px; border-radius:50%; z-index:0; pointer-events:none; border:2.5px solid rgba(255,69,0,0.75);  animation:livePing 1.1s ease-out infinite; }
    .marker-fire-ping2 { position:absolute; inset:-9px; border-radius:50%; z-index:0; pointer-events:none; border:2.5px solid rgba(255,150,0,0.55); animation:livePing 1.1s ease-out 0.55s infinite; }
    .marker-live-dot   { position:absolute; top:-1px; right:-1px; width:11px; height:11px; border-radius:50%; background:#ff2d2d; border:2px solid #fff; z-index:10; pointer-events:none; box-shadow:0 0 10px #ff2d2d, 0 0 4px #fff; animation:firePulse 0.7s ease-in-out infinite; }

    /* ── Upcoming: comet orbit ring ── */
    @keyframes cometOrbit  { to { transform: rotate(360deg); } }
    @keyframes orbitGlow   { 0%,100%{ opacity:.55; } 50%{ opacity:1; } }
    @keyframes upcomingPop { 0%,100%{ transform:scale(1); opacity:.6; } 50%{ transform:scale(1.08); opacity:1; } }
    .marker-orbit-ring  { position:absolute; inset:-8px;  border-radius:50%; z-index:2; pointer-events:none; border:1.5px solid rgba(99,102,241,0.28); box-shadow:0 0 0 1px rgba(99,102,241,0.1),inset 0 0 10px rgba(99,102,241,0.07); animation:orbitGlow 2.2s ease-in-out infinite; }
    .marker-orbit-ring2 { position:absolute; inset:-14px; border-radius:50%; z-index:1; pointer-events:none; border:1px dashed rgba(99,102,241,0.15); animation:orbitGlow 2.2s ease-in-out 1.1s infinite; }
    .marker-comet-glow  { position:absolute; inset:-10px; border-radius:50%; z-index:1; pointer-events:none; border:1.5px solid rgba(99,102,241,0.18); box-shadow:0 0 14px 2px rgba(99,102,241,0.2),inset 0 0 14px 2px rgba(99,102,241,0.08); }
    .marker-comet-wrap  { position:absolute; inset:-8px; border-radius:50%; z-index:3; pointer-events:none; animation:cometOrbit 2.6s linear infinite; }
    .marker-comet-dot   { position:absolute; top:50%; left:0; width:9px; height:9px; border-radius:50%; background:radial-gradient(circle at 35% 35%, #c7d2fe, #4f46e5); transform:translate(-50%,-50%); box-shadow:0 0 12px 4px rgba(99,102,241,0.9),10px 0 22px 6px rgba(99,102,241,0.35); }
    .marker-comet-wrap2 { position:absolute; inset:-8px; border-radius:50%; z-index:3; pointer-events:none; animation:cometOrbit 4s linear infinite reverse; }
    .marker-comet-dot2  { position:absolute; top:50%; left:0; width:5px; height:5px; border-radius:50%; background:radial-gradient(circle at 35% 35%, #e0e7ff, #818cf8); transform:translate(-50%,-50%); box-shadow:0 0 8px 3px rgba(129,140,248,0.7),6px 0 14px 3px rgba(129,140,248,0.3); }
    .marker-upcoming-badge { position:absolute; top:-3px; right:-3px; width:12px; height:12px; border-radius:50%; background:linear-gradient(135deg,#a5b4fc,#4f46e5); border:2px solid #fff; z-index:10; pointer-events:none; box-shadow:0 0 10px rgba(99,102,241,0.9); animation:upcomingPop 2s ease-in-out infinite; }
  `;
  document.head.appendChild(s);
}

const ALL_PHOTOS = ALL_EVENTS.flatMap((ev) =>
  (ev.media || [])
    .filter((m) => m.type === "image")
    .map((m, idx) => ({
      src: m.src,
      eventTitle: ev.title,
      category: ev.category,
      color: ev.color,
      date: ev.date,
      id: `${ev.id}-${idx}`,
    }))
);

// ─── Portal Card ──────────────────────────────────────────────────────────────
function PortalCard({ photo, index, scrollContainerRef, isMobile }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, container: scrollContainerRef, offset: ["start end", "end start"] });
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.5, 1, 1, 1.5]);
  const scale    = useSpring(rawScale, { stiffness: 80, damping: 22, mass: 0.6 });
  const opacity  = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.78, 1], [0, 1, 1, 1, 0]);
  const rawY     = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);
  const y        = useSpring(rawY, { stiffness: 60, damping: 20 });
  const dimOverlay = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.4, 0, 0, 0.3]);
  const d = new Date(photo.date + "T00:00:00");
  const dateLabel = d.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
  const cardW = isMobile ? "88vw" : "min(560px, 72vw)";
  const heights = [420, 520, 380, 480, 440, 500];
  const cardH = heights[index % heights.length];
  return (
    <div ref={cardRef} style={{ display:"flex", justifyContent:index%2===0?"flex-start":"flex-end", padding:isMobile?"0 6vw":"0 10vw", marginBottom:isMobile?60:80 }}>
      <motion.div style={{ scale, opacity, y, width:cardW, height:cardH, borderRadius:20, overflow:"hidden", position:"relative", willChange:"transform, opacity" }}>
        <motion.div style={{ position:"absolute", inset:0, zIndex:2, pointerEvents:"none", background:"#000", opacity: dimOverlay }} />
        <img src={photo.src} alt={photo.eventTitle} loading="lazy" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"60%", background:"linear-gradient(to top, rgba(4,4,10,0.95) 0%, transparent 100%)", zIndex:3, pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"18px 20px", zIndex:4 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.6px", textTransform:"uppercase", padding:"3px 10px", borderRadius:10, background:photo.color+"30", color:photo.color, border:`1px solid ${photo.color}60` }}>{photo.category}</span>
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.38)", fontWeight:500 }}>{dateLabel}</span>
          </div>
          <div style={{ fontSize:isMobile?14:17, fontWeight:800, color:"#fff", lineHeight:1.25, letterSpacing:"-0.3px" }}>{photo.eventTitle}</div>
        </div>
        <div style={{ position:"absolute", inset:0, borderRadius:20, zIndex:5, pointerEvents:"none", border:`1.5px solid ${photo.color}40` }} />
      </motion.div>
    </div>
  );
}

// ─── Gallery Page ─────────────────────────────────────────────────────────────
function GalleryPage({ onClose, isMobile }) {
  const scrollRef = useRef(null);
  const { scrollYProgress: pageProgress } = useScroll({ container: scrollRef });
  const railH = useTransform(pageProgress, [0, 1], ["0%", "100%"]);
  const ringScale = useSpring(useTransform(pageProgress, [0, 1], [1, 1.18]), { stiffness: 30, damping: 20 });

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div className="gallery-page" ref={scrollRef}>
      <div className="gallery-vignette-top" />
      <div className="gallery-vignette-bottom" />
      <div className="gallery-tunnel-vignette" />
      <motion.div style={{ position:"fixed", inset:0, zIndex:28, pointerEvents:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <motion.div style={{ scale:ringScale, width:"min(700px,90vw)", height:"min(700px,90vw)", borderRadius:"50%", border:"1px solid rgba(249,115,22,0.06)", boxShadow:"inset 0 0 80px rgba(249,115,22,0.03)" }} />
      </motion.div>
      <div className="gallery-timeline-rail">
        <motion.div style={{ width:"100%", background:"rgba(249,115,22,0.7)", borderRadius:2, height:railH, minHeight:4 }} />
      </div>
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, padding:isMobile?"16px 16px 0":"20px 32px 0", display:"flex", alignItems:"flex-start", justifyContent:"space-between", pointerEvents:"none" }}>
        <div style={{ pointerEvents:"auto" }}>
          <div style={{ fontSize:isMobile?18:24, fontWeight:800, color:"#fff", letterSpacing:"-0.5px", lineHeight:1 }}>SG<span style={{ color:"#f97316" }}>Events</span><span style={{ fontWeight:400, color:"rgba(255,255,255,0.35)", fontSize:isMobile?13:16, marginLeft:10 }}>Gallery</span></div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.22)", marginTop:3, fontWeight:500, letterSpacing:"0.4px" }}>SCROLL TO TRAVEL THROUGH TIME · {ALL_PHOTOS.length} MOMENTS</div>
        </div>
        <button onClick={onClose} style={{ pointerEvents:"auto", width:36, height:36, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.06)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.7)", backdropFilter:"blur(12px)", flexShrink:0 }}>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style={{ paddingTop:isMobile?90:110, paddingBottom:120 }}>
        {ALL_PHOTOS.map((photo, i) => (
          <PortalCard key={photo.id} photo={photo} index={i} scrollContainerRef={scrollRef} isMobile={isMobile} />
        ))}
      </div>
      <div style={{ textAlign:"center", padding:"0 0 80px", color:"rgba(255,255,255,0.15)", fontSize:11, fontWeight:600, letterSpacing:"2px", textTransform:"uppercase" }}>✦ End of the Journey ✦</div>
    </div>
  );
}

// ─── Event Modal ──────────────────────────────────────────────────────────────
function EventModal({ event, onClose, isMobile }) {
  const [mediaIdx, setMediaIdx] = useState(0);
  const total = event.media?.length || 0;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setMediaIdx((i) => (i + 1) % total);
      if (e.key === "ArrowLeft")  setMediaIdx((i) => (i - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, onClose]);

  const cur = event.media?.[mediaIdx];
  const mediaH = isMobile ? 220 : 300;
  const status = getEventStatus(event);

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:3000, background:"rgba(6,6,14,0.72)", backdropFilter:"blur(10px)", display:"flex", alignItems:isMobile?"flex-end":"center", justifyContent:"center", padding:isMobile?0:16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background:"#fff", borderRadius:isMobile?"20px 20px 0 0":24, width:"100%", maxWidth:isMobile?"100%":560, maxHeight:"92vh", overflowY:"auto", boxShadow:"0 40px 120px rgba(0,0,0,0.45)", position:"relative" }}>
        {isMobile && <div style={{ padding:"12px 0 0" }}><div className="aia-sheet-handle" /></div>}
        <button onClick={onClose} style={{ position:"absolute", top:isMobile?10:14, right:14, zIndex:10, width:36, height:36, borderRadius:"50%", border:"none", background:"rgba(0,0,0,0.08)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#333" }}>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div style={{ padding:isMobile?"8px 16px 12px":"24px 24px 14px" }}>
          <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap", alignItems:"center" }}>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.7px", textTransform:"uppercase", padding:"3px 11px", borderRadius:20, background:event.color+"1a", color:event.color }}>{event.category}</span>
            <span style={{ fontSize:11, fontWeight:600, padding:"3px 11px", borderRadius:20, background:"#f3f4f6", color:"#555" }}>📅 {formatDateLabel(event.date)}</span>
            {status === "live" && (
              <span style={{ fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:20, background:"linear-gradient(135deg,#ff4500,#ff2d2d)", color:"#fff", letterSpacing:"1px", textTransform:"uppercase", display:"flex", alignItems:"center", gap:5, boxShadow:"0 2px 10px rgba(255,69,0,0.4)" }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#fff", display:"inline-block" }} />
                Live Now
              </span>
            )}
            {status === "upcoming" && (
              <span style={{ fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:20, background:"linear-gradient(135deg,#4f46e5,#818cf8)", color:"#fff", letterSpacing:"0.8px", textTransform:"uppercase", boxShadow:"0 2px 10px rgba(99,102,241,0.4)" }}>
                🔮 Upcoming
              </span>
            )}
          </div>
          <h2 style={{ fontSize:isMobile?18:22, fontWeight:800, color:"#111", margin:"0 0 10px", lineHeight:1.25, letterSpacing:"-0.4px", paddingRight:32 }}>{event.title}</h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:isMobile?8:14 }}>
            {[{ icon:"🕐", text:event.time }, { icon:"📍", text:event.location }].map(({ icon, text }) => (
              <span key={text} style={{ display:"flex", alignItems:"flex-start", fontSize:isMobile?12:13, color:"#555", fontWeight:500, gap:4 }}>
                <span style={{ flexShrink:0 }}>{icon}</span><span>{text}</span>
              </span>
            ))}
          </div>
        </div>
        <div style={{ position:"relative", width:"100%", height:mediaH, background:"#0a0a0f", overflow:"hidden" }}>
          {cur && (cur.type === "image"
            ? <img key={cur.src} src={cur.src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            : <iframe key={cur.src} src={cur.src} style={{ width:"100%", height:"100%", border:"none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="event video" />
          )}
          {total > 1 && (
            <>
              {[-1, 1].map((dir) => (
                <button key={dir} onClick={() => setMediaIdx((i) => (i + dir + total) % total)} style={{ position:"absolute", top:"50%", transform:"translateY(-50%)", [dir === -1 ? "left" : "right"]:10, width:isMobile?32:38, height:isMobile?32:38, borderRadius:"50%", background:"rgba(255,255,255,0.88)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#111", boxShadow:"0 2px 12px rgba(0,0,0,0.2)" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points={dir === -1 ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} /></svg>
                </button>
              ))}
              <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6 }}>
                {event.media?.map((_, i) => (
                  <button key={i} onClick={() => setMediaIdx(i)} style={{ width:8, height:8, borderRadius:"50%", border:"none", padding:0, cursor:"pointer", background:i===mediaIdx?event.color:"rgba(255,255,255,0.45)", transform:i===mediaIdx?"scale(1.3)":"scale(1)", transition:"all 0.2s" }} />
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{ padding:isMobile?"16px 16px 24px":"20px 24px 28px" }}>
          <p style={{ fontSize:isMobile?14:15, color:"#444", lineHeight:1.75, margin:"0 0 16px" }}>{event.description}</p>
          <button style={{ display:"block", width:"100%", padding:"14px 0", borderRadius:14, border:"none", color:"#fff", fontSize:14, fontWeight:700, letterSpacing:"0.7px", cursor:"pointer", background:event.color }}>RSVP for This Event</button>
        </div>
      </div>
    </div>
  );
}

// ─── Category Filter Bar ──────────────────────────────────────────────────────
function CategoryBar({ selectedCat, onChange, isMobile }) {
  const liveCount     = ALL_EVENTS.filter((e) => getEventStatus(e) === "live").length;
  const upcomingCount = ALL_EVENTS.filter((e) => getEventStatus(e) === "upcoming").length;

  return (
    <div style={{ position:"absolute", top:isMobile?116:126, left:"50%", transform:"translateX(-50%)", zIndex:900, background:"rgba(255,255,255,0.94)", backdropFilter:"blur(16px)", borderRadius:40, padding:"5px 7px", boxShadow:"0 4px 20px rgba(0,0,0,0.11)", border:"1px solid rgba(255,255,255,0.7)", maxWidth:isMobile?"calc(100vw - 16px)":"calc(100vw - 32px)" }}>
      <div className="aia-catbar" style={{ display:"flex", gap:4, overflowX:"auto" }}>
        {CATEGORIES.map((cat) => {
          const isActive   = selectedCat === cat.id;
          const isLive     = cat.id === "live";
          const isUpcoming = cat.id === "upcoming";
          const isStatus   = isLive || isUpcoming;
          const count      = isLive ? liveCount : isUpcoming ? upcomingCount : null;

          const activeBg = isLive
            ? "linear-gradient(135deg,#ff4500,#ff2d2d)"
            : isUpcoming
              ? "linear-gradient(135deg,#4f46e5,#818cf8)"
              : cat.color;

          const activeShadow = isLive
            ? "0 2px 14px rgba(255,69,0,0.55)"
            : isUpcoming
              ? "0 2px 14px rgba(79,70,229,0.55)"
              : `0 2px 10px ${cat.color}55`;

          const idleBg = isLive
            ? "rgba(255,45,45,0.08)"
            : isUpcoming
              ? "rgba(99,102,241,0.08)"
              : "transparent";

          return (
            <button
              key={cat.id}
              className="cat-pill"
              onClick={() => onChange(cat.id)}
              style={{ flexShrink:0, padding:isMobile?"5px 10px":"6px 14px", borderRadius:30, border:isActive?"none":isStatus?`1px solid ${cat.color}40`:"none", cursor:"pointer", fontSize:isMobile?10:12, fontWeight:700, letterSpacing:"0.2px", display:"flex", alignItems:"center", gap:5, background:isActive?activeBg:idleBg, color:isActive?"#fff":isStatus?cat.color:"#666", boxShadow:isActive?activeShadow:"none" }}
            >
              {isLive && !isActive
                ? <span style={{ width:7, height:7, borderRadius:"50%", background:"#ff2d2d", display:"inline-block", flexShrink:0, boxShadow:"0 0 6px #ff2d2d" }} />
                : <span style={{ fontSize:isMobile?12:13 }}>{cat.icon}</span>
              }
              {isMobile ? cat.label.split(" ")[0] : cat.label}
              {count !== null && count > 0 && (
                <span style={{ fontSize:9, fontWeight:800, padding:"1px 5px", borderRadius:20, background:isActive?"rgba(255,255,255,0.25)":(isLive?"#ff2d2d":"#6366f1"), color:"#fff", marginLeft:1, lineHeight:1.4 }}>{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Date Bar ─────────────────────────────────────────────────────────────────
function DateBar({ selectedDate, onChange, isMobile, catFiltered }) {
  const isAll = selectedDate === "all";
  const relevantDates = [...new Set(catFiltered.map((e) => e.date))].sort();
  return (
    <div style={{ position:"absolute", top:isMobile?68:76, left:"50%", transform:"translateX(-50%)", zIndex:900, background:"rgba(255,255,255,0.94)", backdropFilter:"blur(16px)", borderRadius:40, padding:"5px 7px", boxShadow:"0 4px 20px rgba(0,0,0,0.11)", border:"1px solid rgba(255,255,255,0.7)", maxWidth:isMobile?"calc(100vw - 16px)":"calc(100vw - 32px)" }}>
      <div className="aia-datebar" style={{ display:"flex", gap:3, overflowX:"auto" }}>
        <button onClick={() => onChange("all")} style={{ flexShrink:0, padding:isMobile?"5px 10px":"6px 14px", borderRadius:30, border:"none", cursor:"pointer", fontSize:isMobile?11:12, fontWeight:700, transition:"all 0.2s", background:isAll?"linear-gradient(135deg,#f97316,#ef4444)":"transparent", color:isAll?"#fff":"#666", boxShadow:isAll?"0 2px 10px rgba(249,115,22,0.4)":"none", display:"flex", alignItems:"center", gap:4 }}>
          <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/><circle cx="8" cy="8" r="3"/></svg>
          {isMobile ? "All" : "All Dates"}
        </button>
        {relevantDates.length > 0 && <div style={{ width:1, background:"#e5e7eb", margin:"4px 2px" }} />}
        {relevantDates.map((date) => {
          const eventsOnDay = catFiltered.filter((e) => e.date === date);
          const isActive    = selectedDate === date;
          const d    = new Date(date + "T00:00:00");
          const day  = d.toLocaleDateString("en-SG", { day:"numeric" });
          const mon  = d.toLocaleDateString("en-SG", { month:"short" });
          const wday = d.toLocaleDateString("en-SG", { weekday:"short" });
          return (
            <button key={date} onClick={() => onChange(date)} style={{ flexShrink:0, padding:isMobile?"3px 8px":"4px 12px", borderRadius:30, border:"none", cursor:"pointer", transition:"all 0.2s", background:isActive?"#111":"transparent", color:isActive?"#fff":"#555", display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>
              <span style={{ fontSize:isMobile?8:9, fontWeight:600, opacity:0.7, letterSpacing:"0.4px", textTransform:"uppercase" }}>{wday}</span>
              <span style={{ fontSize:isMobile?13:15, fontWeight:800, lineHeight:1.1 }}>{day}</span>
              <span style={{ fontSize:isMobile?9:10, fontWeight:600, opacity:0.8 }}>{mon}</span>
              <div style={{ display:"flex", gap:2, marginTop:2 }}>
                {eventsOnDay.map((e) => (<span key={e.id} style={{ width:isMobile?4:5, height:isMobile?4:5, borderRadius:"50%", background:isActive?"#fff":e.color }} />))}
              </div>
            </button>
          );
        })}
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
      <button onClick={onToggle} style={{ position:"absolute", bottom:isOpen?"52vh":24, left:"50%", transform:"translateX(-50%)", zIndex:901, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#f97316,#ef4444)", color:"#fff", borderRadius:30, padding:"8px 18px", fontSize:12, fontWeight:700, boxShadow:"0 4px 20px rgba(249,115,22,0.45)", display:"flex", alignItems:"center", gap:6, transition:"bottom 0.35s cubic-bezier(.4,0,.2,1)" }}>
        <svg viewBox="0 0 16 16" width="12" height="12" fill="white"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/><circle cx="8" cy="8" r="3"/></svg>
        {isOpen ? "Hide Events" : `Events (${events.length})`}
        <svg viewBox="0 0 24 24" width="12" height="12" stroke="white" strokeWidth="2.5" fill="none" style={{ transform:isOpen?"rotate(180deg)":"none", transition:"transform 0.3s" }}><polyline points="18 15 12 9 6 15"/></svg>
      </button>
      <div style={{ position:"absolute", left:0, right:0, bottom:0, height:"52vh", background:"rgba(255,255,255,0.98)", backdropFilter:"blur(20px)", borderRadius:"20px 20px 0 0", boxShadow:"0 -8px 32px rgba(0,0,0,0.14)", zIndex:900, transform:isOpen?"translateY(0)":"translateY(100%)", transition:"transform 0.35s cubic-bezier(.4,0,.2,1)", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"10px 16px 8px", borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
          <div className="aia-sheet-handle" />
          <div style={{ fontSize:13, fontWeight:800, color:"#111" }}>Events — {events.length} total</div>
        </div>
        <div style={{ overflowY:"auto", flex:1, WebkitOverflowScrolling:"touch" }}>
          {Object.entries(byDate).map(([date, evs]) => (
            <div key={date}>
              <div style={{ padding:"8px 16px 4px", fontSize:10, fontWeight:700, color:"#aaa", letterSpacing:"0.8px", textTransform:"uppercase", position:"sticky", top:0, background:"rgba(255,255,255,0.97)" }}>{formatDateLabel(date)}</div>
              {evs.map((ev) => (
                <button key={ev.id} onClick={() => { onSelect(ev); onToggle(); }} style={{ width:"100%", textAlign:"left", background:"none", border:"none", cursor:"pointer", padding:"10px 16px", display:"flex", gap:12, alignItems:"center", borderBottom:"1px solid #f5f5f5" }}>
                  <div style={{ width:44, height:44, borderRadius:12, overflow:"hidden", flexShrink:0, border:`2.5px solid ${ev.color}` }}>
                    <img src={ev.thumbnail} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:"#111", lineHeight:1.3, marginBottom:3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{ev.title}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                      <span style={{ fontSize:10, fontWeight:600, color:ev.color, background:ev.color+"15", padding:"2px 8px", borderRadius:10 }}>{ev.category}</span>
                      <span style={{ fontSize:10, color:"#999" }}>{ev.time.split("·")[1]?.trim() || ""}</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="#ccc" strokeWidth="2" fill="none" style={{ flexShrink:0 }}><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Timeline Page ────────────────────────────────────────────────────────────
const TIMELINE_MILESTONES = [
  { year:"1931", title:"Planting Roots",  desc:"AIA officially opens its first branch in Singapore, beginning a century of trust.",      side:"left",  color:"#d31145" },
  { year:"1992", title:"AIA Tower",       desc:"The iconic AIA Tower opens in the heart of Robinson Road, anchoring the skyline.",        side:"right", color:"#f97316" },
  { year:"2006", title:"AIA Singapore",   desc:"AIA Singapore celebrates 75 years of protecting Singaporean families.",                   side:"left",  color:"#8b5cf6" },
  { year:"2016", title:"Cultural Impact", desc:"Community events and partnerships deepen AIA's roots across the island.",                 side:"right", color:"#0ea5e9" },
  { year:"2020", title:"Innovation Era",  desc:"Digital health tools and virtual events keep the community connected and well.",           side:"left",  color:"#22c55e" },
  { year:"2026", title:"95 Years Strong", desc:"Celebrating nearly a century of protecting Singaporean families — and counting.",         side:"right", color:"#ef4444" },
];

function TimelinePage({ onClose, isMobile }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleY = useSpring(scrollYProgress, { stiffness:100, damping:30, restDelta:0.001 });

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:2000, background:"#fff", overflowY:"auto", fontFamily:"'Sora',sans-serif" }} ref={containerRef}>
      <button onClick={onClose} style={{ position:"fixed", top:16, right:16, zIndex:50, width:38, height:38, borderRadius:"50%", border:"1px solid #e5e7eb", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#333", boxShadow:"0 2px 12px rgba(0,0,0,0.1)" }}>
        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div style={{ textAlign:"center", padding:isMobile?"60px 20px 40px":"80px 20px 60px" }}>
        <div style={{ fontSize:isMobile?28:42, fontWeight:800, color:"#111", letterSpacing:"-1px", lineHeight:1.1 }}>Walk With <span style={{ color:"#d31145" }}>AIA</span></div>
        <div style={{ fontSize:isMobile?13:15, color:"#888", marginTop:10, fontWeight:500 }}>A 95-Year Legacy of Impact</div>
      </div>
      <div style={{ position:"relative", maxWidth:900, margin:"0 auto", padding:isMobile?"0 16px 80px":"0 40px 120px" }}>
        <motion.div style={{ position:"absolute", left:isMobile?20:"50%", top:0, bottom:0, width:3, background:"#d31145", transformOrigin:"top", scaleY, borderRadius:4 }} />
        {TIMELINE_MILESTONES.map((m, i) => {
          const isLeft = isMobile ? false : m.side === "left";
          return (
            <div key={i} style={{ display:"flex", justifyContent:isMobile?"flex-start":(isLeft?"flex-start":"flex-end"), marginBottom:isMobile?60:100, paddingLeft:isMobile?44:0 }}>
              <div style={{ position:"absolute", left:isMobile?12:"calc(50% - 8px)", width:19, height:19, borderRadius:"50%", background:m.color, border:"3px solid #fff", boxShadow:`0 0 0 2px ${m.color}55`, marginTop:22, zIndex:2 }} />
              <motion.div
                initial={{ opacity:0, x:isMobile?30:(isLeft?-50:50) }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:false, amount:0.4, root:containerRef }}
                transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
                style={{ width:isMobile?"100%":"44%", background:"#f9fafb", borderRadius:16, padding:isMobile?"16px 18px":"22px 26px", boxShadow:"0 8px 32px rgba(0,0,0,0.06)", border:`1.5px solid ${m.color}22` }}
              >
                <div style={{ width:36, height:3, background:m.color, borderRadius:2, marginBottom:10 }} />
                <div style={{ fontSize:isMobile?22:30, fontWeight:800, color:m.color, lineHeight:1, letterSpacing:"-0.5px" }}>{m.year}</div>
                <div style={{ fontSize:isMobile?14:16, fontWeight:700, color:"#111", margin:"6px 0 8px" }}>{m.title}</div>
                <div style={{ fontSize:isMobile?12:13, color:"#666", lineHeight:1.65 }}>{m.desc}</div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Corridor Page ────────────────────────────────────────────────────────────
const CORRIDOR_MILESTONES = [
  { year:"1931", title:"Founding",      img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",  color:"#d31145" },
  { year:"1955", title:"Global Growth", img:"https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80", color:"#22c55e" },
  { year:"1975", title:"Expansion",     img:"https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80",  color:"#8b5cf6" },
  { year:"1998", title:"Digital Era",   img:"https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",    color:"#06b6d4" },
  { year:"2012", title:"Innovation",    img:"https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",  color:"#0ea5e9" },
  { year:"2026", title:"95 Years",      img:"https://images.unsplash.com/photo-1651862964688-6da5571e1c5f?w=600&q=80",  color:"#f97316" },
];

function CorridorNode({ item, index, total }) {
  const { scrollYProgress } = useScroll();
  const start  = index / total;
  const span   = 1 / total;
  const isLeft = index % 2 === 0;
  const z       = useTransform(scrollYProgress, [start, start + span * 0.6], [-4000, 1200]);
  const scale   = useTransform(scrollYProgress, [start, start + span * 0.6], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, start + span * 0.55, start + span * 0.6], [index === 0 ? 1 : 0, 1, 1, 0]);
  return (
    <motion.div style={{ position:"fixed", top:"50%", left:"50%", x:isLeft?"-150%":"50%", y:"-50%", z, scale, opacity, width:360, willChange:"transform, opacity", fontFamily:"'Sora',sans-serif" }}>
      <div style={{ background:"#fff", padding:12, boxShadow:"0 40px 100px rgba(0,0,0,0.8)", borderTop:`4px solid ${item.color}` }}>
        <img src={item.img} alt={item.year} style={{ width:"100%", height:220, objectFit:"cover", display:"block" }} />
        <div style={{ textAlign:"center", padding:"14px 0 6px" }}>
          <div style={{ fontSize:36, fontWeight:800, color:item.color, letterSpacing:"-1px", lineHeight:1 }}>{item.year}</div>
          <div style={{ fontSize:11, color:"#555", letterSpacing:"2px", textTransform:"uppercase", marginTop:4, fontWeight:600 }}>{item.title}</div>
        </div>
      </div>
    </motion.div>
  );
}

function CorridorProgress({ total }) {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActive(Math.min(total - 1, Math.floor(v * total)));
    });
  }, [scrollYProgress, total]);
  return (
    <div style={{ position:"absolute", right:24, top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:10, alignItems:"center" }}>
      {CORRIDOR_MILESTONES.map((m, i) => (
        <div key={i} style={{ width:i===active?8:5, height:i===active?8:5, borderRadius:"50%", background:i===active?m.color:"rgba(255,255,255,0.2)", transition:"all 0.3s", boxShadow:i===active?`0 0 8px ${m.color}`:"none" }} />
      ))}
      <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"1px", marginTop:6, fontWeight:600, writingMode:"vertical-rl" }}>{CORRIDOR_MILESTONES[active]?.year}</div>
    </div>
  );
}

function CorridorPage({ onClose, isMobile }) {
  const total = CORRIDOR_MILESTONES.length;
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:2000, fontFamily:"'Sora',sans-serif" }}>
      <div style={{ height:"600vh", width:"100%", position:"relative", zIndex:1 }} />
      <div style={{ position:"fixed", inset:0, zIndex:2, perspective:"1200px", background:"radial-gradient(ellipse at center, #1a1a2e 0%, #04040a 100%)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", width:"200%", height:"200%", backgroundImage:["linear-gradient(to right, rgba(211,17,69,0.07) 1px, transparent 1px)","linear-gradient(to bottom, rgba(211,17,69,0.07) 1px, transparent 1px)"].join(","), backgroundSize:"90px 90px", transform:"rotateX(60deg) translateZ(-600px)", opacity:0.6 }} />
        {CORRIDOR_MILESTONES.map((item, i) => (<CorridorNode key={i} item={item} index={i} total={total} />))}
        <CorridorProgress total={total} />
        <div style={{ position:"absolute", bottom:30, color:"rgba(255,255,255,0.25)", fontSize:10, letterSpacing:"4px", textTransform:"uppercase", fontWeight:600 }}>Scroll to travel</div>
      </div>
      <button onClick={onClose} style={{ position:"fixed", top:16, right:16, zIndex:3, width:38, height:38, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.7)", backdropFilter:"blur(12px)", pointerEvents:"auto" }}>
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", zIndex:3, textAlign:"center", pointerEvents:"none" }}>
        <div style={{ fontSize:isMobile?16:20, fontWeight:800, color:"#fff", letterSpacing:"-0.4px" }}>AIA <span style={{ color:"#d31145" }}>Corridor</span></div>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"2px", textTransform:"uppercase", marginTop:2 }}>Through Time</div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const mapRef        = useRef(null);
  const leafletRef    = useRef(null);
  const layerGroupRef = useRef(null);
  const routeLayerRef = useRef(null);
  const footTimersRef = useRef([]);

  const [ready,        setReady]        = useState(false);
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedCat,  setSelectedCat]  = useState("all");
  const [activeEvent,  setActiveEvent]  = useState(null);
  const [sheetOpen,    setSheetOpen]    = useState(false);
  const [showGallery,  setShowGallery]  = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showCorridor, setShowCorridor] = useState(false);
  const isMobile = useIsMobile();

  // Filter by category/status, then by date
  const catFiltered = selectedCat === "all"
    ? ALL_EVENTS
    : selectedCat === "live"
      ? ALL_EVENTS.filter((e) => getEventStatus(e) === "live")
      : selectedCat === "upcoming"
        ? ALL_EVENTS.filter((e) => getEventStatus(e) === "upcoming")
        : ALL_EVENTS.filter((e) => e.category === selectedCat);

  const visibleEvents = selectedDate === "all"
    ? catFiltered
    : catFiltered.filter((e) => e.date === selectedDate);

  // Reset date if it no longer exists in the current category
  useEffect(() => {
    const datesInCat = new Set(catFiltered.map((e) => e.date));
    if (selectedDate !== "all" && !datesInCat.has(selectedDate)) {
      setSelectedDate("all");
    }
  }, [selectedCat, catFiltered, selectedDate]);

  // Load Leaflet
  useEffect(() => {
    loadStyle("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
    loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js").then(() => setReady(true));
    loadStyle("https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap");
  }, []);

  // Init map (once)
  useEffect(() => {
    if (!ready || !mapRef.current || leafletRef.current || !window.L) return;
    const L = window.L;
    const map = L.map(mapRef.current, { center:[1.3521,103.8198], zoom:isMobile?11:12, minZoom:11, maxZoom:16, zoomControl:false });
    map.setMaxBounds(L.latLngBounds(L.latLng(1.1,103.55), L.latLng(1.5,104.1)));
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { attribution:"© OpenStreetMap © CARTO", subdomains:"abcd", maxZoom:19 }).addTo(map);
    L.control.zoom({ position:"bottomright" }).addTo(map);
    layerGroupRef.current = L.layerGroup().addTo(map);
    routeLayerRef.current = L.layerGroup().addTo(map);
    leafletRef.current = map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // Sync zoom on mobile change
  useEffect(() => {
    if (leafletRef.current) leafletRef.current.setZoom(isMobile ? 11 : 12);
  }, [isMobile]);

  const setActiveEventCb = useCallback((ev) => setActiveEvent(ev), []);

  // Render markers + routes whenever filters change
  useEffect(() => {
    if (!ready || !leafletRef.current || !layerGroupRef.current) return;
    const L = window.L;
    layerGroupRef.current.clearLayers();
    routeLayerRef.current.clearLayers();
    footTimersRef.current.forEach(clearTimeout);
    footTimersRef.current = [];

    // ── Animated footprint routes ─────────────────────────────────────────
    const routeEvents = visibleEvents.filter((ev) => ROUTE_EVENT_IDS.has(ev.id));
    routeEvents.forEach((ev) => {
      const route = MARATHON_ROUTES[ev.id];
      const pts   = route.waypoints;
      L.polyline(pts, { color:route.color, weight:3, opacity:0.25, dashArray:"6 8", lineCap:"round" }).addTo(routeLayerRef.current);

      const totalSteps = 28;
      const segLengths = [];
      let totalLen = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const dl = pts[i+1][0] - pts[i][0], dg = pts[i+1][1] - pts[i][1];
        const len = Math.sqrt(dl*dl + dg*dg);
        segLengths.push(len); totalLen += len;
      }

      const interpolated = [];
      for (let s = 0; s < totalSteps; s++) {
        const t = (s / (totalSteps - 1)) * totalLen;
        let acc = 0;
        for (let i = 0; i < segLengths.length; i++) {
          if (acc + segLengths[i] >= t || i === segLengths.length - 1) {
            const frac    = segLengths[i] > 0 ? (t - acc) / segLengths[i] : 0;
            const lat     = pts[i][0] + frac * (pts[i+1][0] - pts[i][0]);
            const lng     = pts[i][1] + frac * (pts[i+1][1] - pts[i][1]);
            const bearing = Math.atan2(pts[i+1][1]-pts[i][1], pts[i+1][0]-pts[i][0]) * (180 / Math.PI);
            const side    = s % 2 === 0 ? 1 : -1;
            const perpRad = (bearing + 90) * (Math.PI / 180);
            const offset  = 0.00018 * side;
            interpolated.push({ lat: lat + offset * Math.sin(perpRad) * 0.4, lng: lng + offset * Math.cos(perpRad) * 0.4, bearing, idx: s });
            break;
          }
          acc += segLengths[i];
        }
      }

      const footSVG = (color) =>
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 26" width="18" height="26">
          <ellipse cx="9"    cy="19" rx="7"   ry="7"   fill="${color}" opacity="0.85"/>
          <ellipse cx="9"    cy="10" rx="5"   ry="6"   fill="${color}" opacity="0.85"/>
          <ellipse cx="5.5"  cy="4.5" rx="2.8" ry="3"  fill="${color}" opacity="0.75"/>
          <ellipse cx="12.5" cy="4.5" rx="2.8" ry="3"  fill="${color}" opacity="0.75"/>
          <ellipse cx="3"    cy="8"  rx="2"   ry="2.2" fill="${color}" opacity="0.6"/>
          <ellipse cx="15"   cy="8"  rx="2"   ry="2.2" fill="${color}" opacity="0.6"/>
        </svg>`;

      interpolated.forEach(({ lat, lng, bearing, idx }) => {
        const timer = setTimeout(() => {
          const rot = Math.round(bearing);
          const el  = document.createElement("div");
          el.className = "aia-footprint";
          el.style.setProperty("--rot", `${rot}deg`);
          el.style.transform       = `rotate(${rot}deg)`;
          el.style.animationDelay  = "0ms";
          el.style.animationDuration = "2.4s";
          el.innerHTML = footSVG(route.color);
          const icon = L.divIcon({ html:el, className:"", iconSize:[18,26], iconAnchor:[9,13] });
          L.marker([lat, lng], { icon, interactive:false, zIndexOffset:-100 }).addTo(routeLayerRef.current);
          const loopMs = totalSteps * 120 + 2400;
          const intervalId = setInterval(() => {
            el.style.animation = "none";
            void el.offsetWidth;
            el.style.animation = "footAppear 2.4s ease-out forwards";
          }, loopMs);
          footTimersRef.current.push(intervalId);
        }, idx * 120);
        footTimersRef.current.push(timer);
      });
    });

    // ── Map markers ───────────────────────────────────────────────────────
    const markerSize      = isMobile ? 42 : 54;
    const markerHoverSize = isMobile ? 66 : 84;

    visibleEvents.forEach((ev) => {
      const status  = getEventStatus(ev);
      const ringPad = (status === "live" || status === "upcoming") ? 18 : 0;
      const wrapSize = markerSize + ringPad * 2;

      const wrapper = document.createElement("div");
      wrapper.style.cssText = `width:${wrapSize}px;height:${wrapSize}px;position:relative;cursor:pointer;display:flex;align-items:center;justify-content:center;`;

      if (status === "live") {
        ["marker-fire-ping","marker-fire-ping2","marker-fire-outer","marker-fire-ring"].forEach((cls) => {
          const el = document.createElement("div"); el.className = cls; wrapper.appendChild(el);
        });
      }

      if (status === "upcoming") {
        ["marker-comet-glow","marker-orbit-ring","marker-orbit-ring2"].forEach((cls) => {
          const el = document.createElement("div"); el.className = cls; wrapper.appendChild(el);
        });
        [["marker-comet-wrap","marker-comet-dot"],["marker-comet-wrap2","marker-comet-dot2"]].forEach(([wCls, dCls]) => {
          const wrap = document.createElement("div"); wrap.className = wCls;
          const dot  = document.createElement("div"); dot.className  = dCls;
          wrap.appendChild(dot); wrapper.appendChild(wrap);
        });
      }

      const borderColor = status === "live" ? "#ff4500" : status === "upcoming" ? "#6366f1" : ev.color;
      const boxShadow   = status === "live"
        ? "0 4px 16px rgba(0,0,0,0.25), 0 0 20px rgba(255,69,0,0.5)"
        : status === "upcoming"
          ? "0 4px 16px rgba(0,0,0,0.22), 0 0 16px rgba(99,102,241,0.4)"
          : "0 4px 16px rgba(0,0,0,0.22)";

      const container = document.createElement("div");
      container.style.cssText = `width:${markerSize}px;height:${markerSize}px;border-radius:50%;overflow:hidden;cursor:pointer;border:3px solid ${borderColor};box-shadow:${boxShadow};transition:all 0.28s cubic-bezier(.34,1.56,.64,1);background:#eee;position:relative;z-index:5;flex-shrink:0;`;

      const img = document.createElement("img");
      img.src = ev.thumbnail;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;";
      container.appendChild(img);

      if (status === "live") {
        const dot = document.createElement("div"); dot.className = "marker-live-dot"; container.appendChild(dot);
      } else if (status === "upcoming") {
        const dot = document.createElement("div"); dot.className = "marker-upcoming-badge"; container.appendChild(dot);
      }

      if (selectedDate === "all") {
        const badge = document.createElement("div");
        const d = new Date(ev.date + "T00:00:00");
        badge.textContent = d.toLocaleDateString("en-SG", { day:"numeric", month:"short" });
        badge.style.cssText = `position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);background:${borderColor};color:#fff;font-size:8px;font-weight:700;padding:1px 4px;border-radius:7px;white-space:nowrap;pointer-events:none;`;
        container.appendChild(badge);
      }

      wrapper.appendChild(container);

      wrapper.addEventListener("mouseenter", () => {
        container.style.width       = markerHoverSize + "px";
        container.style.height      = markerHoverSize + "px";
        container.style.boxShadow   = `0 8px 36px ${borderColor}99`;
        container.style.borderWidth = "4px";
        container.style.zIndex      = "999";
      });
      wrapper.addEventListener("mouseleave", () => {
        container.style.width       = markerSize + "px";
        container.style.height      = markerSize + "px";
        container.style.boxShadow   = boxShadow;
        container.style.borderWidth = "3px";
        container.style.zIndex      = "5";
      });
      wrapper.addEventListener("click", (e) => { e.stopPropagation(); setActiveEventCb(ev); });

      const half = wrapSize / 2;
      const icon = L.divIcon({ html:wrapper, className:"", iconSize:[wrapSize,wrapSize], iconAnchor:[half,half] });
      L.marker([ev.lat, ev.lng], { icon }).addTo(layerGroupRef.current);
    });
  }, [ready, visibleEvents, selectedDate, setActiveEventCb, isMobile]);

  const routeEventsVisible = visibleEvents.filter((ev) => ROUTE_EVENT_IDS.has(ev.id));
  const activeCatMeta      = CATEGORIES.find((c) => c.id === selectedCat);

  return (
    <div style={{ width:"100vw", height:"100vh", fontFamily:"'Sora',sans-serif", position:"relative", overflow:"hidden" }}>

      {/* ── Header ── */}
      <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)", zIndex:900, display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.94)", backdropFilter:"blur(16px)", borderRadius:40, padding:isMobile?"8px 14px":"10px 22px", boxShadow:"0 4px 24px rgba(0,0,0,0.12)", border:"1px solid rgba(255,255,255,0.7)", whiteSpace:"nowrap", maxWidth:isMobile?"calc(100vw - 100px)":"auto" }}>
        <svg viewBox="0 0 28 28" width={isMobile?20:26} height={isMobile?20:26} fill="none">
          <circle cx="14" cy="14" r="13" stroke="#f97316" strokeWidth="2"/>
          <path d="M14 6 C14 6 8 12 8 16.5 A6 6 0 0 0 20 16.5 C20 12 14 6 14 6Z" fill="#f97316" opacity="0.85"/>
          <circle cx="14" cy="16.5" r="2.5" fill="white"/>
        </svg>
        <span style={{ fontSize:isMobile?15:19, fontWeight:800, color:"#111", letterSpacing:"-0.4px" }}>SG<span style={{ color:"#f97316" }}>Events</span></span>
        {!isMobile && <span style={{ fontSize:11, color:"#999", paddingLeft:10, borderLeft:"1px solid #e5e5e5", fontWeight:500 }}>Community Events · Singapore</span>}
      </div>

      {/* ── Event count ── */}
      <div style={{ position:"absolute", top:10, right:12, zIndex:900, background:"rgba(255,255,255,0.94)", backdropFilter:"blur(16px)", borderRadius:20, padding:isMobile?"6px 10px":"8px 14px", boxShadow:"0 4px 16px rgba(0,0,0,0.1)", border:"1px solid rgba(255,255,255,0.7)", fontSize:isMobile?11:13, fontWeight:700, color:"#111" }}>
        <span style={{ color:activeCatMeta?.color || "#f97316" }}>{visibleEvents.length}</span>
        <span style={{ color:"#999", fontWeight:500 }}> {isMobile ? "ev." : `event${visibleEvents.length !== 1 ? "s" : ""}`}</span>
      </div>

      {/* ── Date Bar ── */}
      <DateBar selectedDate={selectedDate} onChange={setSelectedDate} isMobile={isMobile} catFiltered={catFiltered} />

      {/* ── Category Filter Bar ── */}
      <CategoryBar selectedCat={selectedCat} onChange={(cat) => { setSelectedCat(cat); setSelectedDate("all"); }} isMobile={isMobile} />

      {/* ── Mobile bottom sheet ── */}
      {isMobile && (
        <MobileBottomSheet events={visibleEvents} onSelect={setActiveEvent} isOpen={sheetOpen} onToggle={() => setSheetOpen((o) => !o)} />
      )}

      {/* ── Route legend (desktop) ── */}
      {routeEventsVisible.length > 0 && !isMobile && (
        <div style={{ position:"absolute", top:60, right:12, zIndex:900, background:"rgba(255,255,255,0.94)", backdropFilter:"blur(16px)", borderRadius:16, padding:"8px 12px", boxShadow:"0 4px 16px rgba(0,0,0,0.1)", border:"1px solid rgba(255,255,255,0.7)", display:"flex", flexDirection:"column", gap:5 }}>
          <div style={{ fontSize:9, fontWeight:700, color:"#aaa", letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:2 }}>Race Routes</div>
          {routeEventsVisible.map((ev) => (
            <div key={ev.id} style={{ display:"flex", alignItems:"center", gap:7 }}>
              <svg width="22" height="10" viewBox="0 0 22 10"><line x1="0" y1="5" x2="22" y2="5" stroke={ev.color} strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round"/></svg>
              <span style={{ fontSize:10, fontWeight:700, color:ev.color }}>{MARATHON_ROUTES[ev.id].name}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {visibleEvents.length === 0 && (
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:800, background:"rgba(255,255,255,0.96)", borderRadius:20, padding:"24px 28px", textAlign:"center", boxShadow:"0 8px 32px rgba(0,0,0,0.12)", width:"80%", maxWidth:320 }}>
          <div style={{ fontSize:30, marginBottom:8 }}>{selectedCat==="live"?"🔥":selectedCat==="upcoming"?"🔮":"📅"}</div>
          <div style={{ fontSize:14, fontWeight:700, color:"#111" }}>
            {selectedCat==="live" ? "No live events right now" : selectedCat==="upcoming" ? "No upcoming events in range" : "No events found"}
          </div>
          <div style={{ fontSize:12, color:"#888", marginTop:4 }}>
            {selectedCat==="live" ? "Check back soon — events go live on their start date" : selectedCat==="upcoming" ? "Events within the next 90 days appear here" : "Try a different category or date"}
          </div>
        </div>
      )}

      {/* ── Map ── */}
      <div ref={mapRef} style={{ width:"100%", height:"100%" }} />

      {/* ── FAB stack ── */}
      <div style={{ position:"fixed", bottom:isMobile?90:28, right:16, zIndex:1800, display:"flex", flexDirection:"column", gap:10, alignItems:"center" }}>
        <button onClick={() => setShowCorridor(true)} title="AIA Corridor" style={{ width:48, height:48, borderRadius:"50%", border:"none", cursor:"pointer", background:"linear-gradient(135deg,#d31145,#7c0828)", boxShadow:"0 4px 18px rgba(211,17,69,0.55)", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.2s,box-shadow 0.2s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.1)";e.currentTarget.style.boxShadow="0 6px 24px rgba(211,17,69,0.7)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";  e.currentTarget.style.boxShadow="0 4px 18px rgba(211,17,69,0.55)";}}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="6"/><ellipse cx="12" cy="12" rx="5" ry="3"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="18" x2="12" y2="22"/></svg>
        </button>
        <button onClick={() => setShowTimeline(true)} title="Walk With AIA — timeline" style={{ width:48, height:48, borderRadius:"50%", border:"none", cursor:"pointer", background:"linear-gradient(135deg,#111827,#374151)", boxShadow:"0 4px 18px rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.2s,box-shadow 0.2s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.1)";e.currentTarget.style.boxShadow="0 6px 24px rgba(0,0,0,0.55)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";  e.currentTarget.style.boxShadow="0 4px 18px rgba(0,0,0,0.4)";}}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><circle cx="12" cy="6"  r="2.5" fill="white" stroke="none"/><circle cx="12" cy="12" r="2.5" fill="white" stroke="none"/><circle cx="12" cy="18" r="2.5" fill="white" stroke="none"/><line x1="12" y1="6"  x2="18" y2="6"/><line x1="12" y1="12" x2="6"  y2="12"/><line x1="12" y1="18" x2="18" y2="18"/></svg>
        </button>
        <button className="photo-btn-fab" onClick={() => setShowGallery(true)} title="View photo gallery">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </button>
      </div>

      {/* ── Overlays ── */}
      {showGallery  && <GalleryPage  onClose={() => setShowGallery(false)}  isMobile={isMobile} />}
      {showTimeline && <TimelinePage onClose={() => setShowTimeline(false)} isMobile={isMobile} />}
      {showCorridor && <CorridorPage onClose={() => setShowCorridor(false)} isMobile={isMobile} />}

      {activeEvent && <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} isMobile={isMobile} />}
    </div>
  );
}
