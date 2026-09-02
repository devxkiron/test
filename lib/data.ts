export const siteConfig = {
  name: "Goodspeed",
  tagline: "We build AI agents to future-proof your business.",
  description:
    "AI development agency. We turn AI from talked about to rolled out. Custom software, automations, AI products, internal tools. 200+ live. 5.0 Clutch.",
  email: "hello@goodspeed.studio",
  calendly: "https://calendly.com/goodspeed-studio/discovery",
  clutchRating: "5.0",
  clutchReviewsCount: "24",
  stats: [
    { label: "Hours Saved", value: "14,750+", suffix: "" },
    { label: "Client ROI", value: "2.4x", suffix: "" },
    { label: "Avg Response Time", value: "15 min", suffix: "" },
    { label: "Clutch Rating", value: "5.0", suffix: "" },
  ],
  socials: {
    github: "https://github.com",
    twitter: "https://x.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
};

export const clientLogos = [
  { name: "SizzleKick", label: "SIZZLEKICK" },
  { name: "MyAskAI", label: "MYASK.AI" },
  { name: "Sydecar", label: "SYDECAR" },
  { name: "ProMagic", label: "PROMAGIC" },
  { name: "Zen Educate", label: "ZEN EDUCATE" },
  { name: "Apex Capital", label: "APEX CAPITAL" },
  { name: "Dwellr", label: "DWELLR" },
  { name: "Bellmade", label: "BELLMADE" },
];

export interface CaseStudy {
  id: string;
  category: string;
  tag: string;
  title: string;
  client: string;
  summary: string;
  stat: string;
  statLabel: string;
  accentBg: string;
  badgeColor: string;
  previewType: "airplane" | "person" | "dashboard-green" | "quote-pink" | "terminal-dark" | "analytics-purple";
}

export const caseStudies: CaseStudy[] = [
  {
    id: "flywise-ops",
    category: "AI Agent",
    tag: "Autonomous Ops",
    title: "Autonomous aviation dispatch reducing manual coordination by 82%",
    client: "FlyWise Global",
    summary: "Integrated live weather telemetry with autonomous pilot scheduling agents to eliminate flight turnaround bottlenecks.",
    stat: "-82% Latency",
    statLabel: "Dispatch Lag",
    accentBg: "bg-amber-100 dark:bg-amber-950/40",
    badgeColor: "bg-amber-600/40",
    previewType: "airplane",
  },
  {
    id: "myaskai-support",
    category: "Customer AI",
    tag: "RAG Knowledge Bot",
    title: "AI customer support copilot answering 100k+ enterprise queries monthly",
    client: "MyAskAI",
    summary: "Trained multi-source RAG models with sub-second citations across Zendesk, Notion, and Jira knowledge bases.",
    stat: "94.8%",
    statLabel: "Resolution Rate",
    accentBg: "bg-emerald-100 dark:bg-emerald-950/40",
    badgeColor: "bg-emerald-600/40",
    previewType: "person",
  },
  {
    id: "apex-ledger",
    category: "Automation",
    tag: "Fintech Reconciliation",
    title: "Real-time Stripe & multi-bank ledger sync with automated audit",
    client: "Apex Capital",
    summary: "Zero-touch reconciliation engine auditing $18M in monthly transactions across Stripe, Plaid, and QuickBooks.",
    stat: "3 Hours",
    statLabel: "Month-End Close",
    accentBg: "bg-teal-100 dark:bg-teal-950/40",
    badgeColor: "bg-teal-600/40",
    previewType: "dashboard-green",
  },
  {
    id: "sizzlekick-creative",
    category: "Creative AI",
    tag: "Ad Generator",
    title: "Autonomous creative engine generating 600 + ad variations in minutes",
    client: "SizzleKick",
    summary: "Built high-converting multi-modal generative video and banner pipelines for DTC e-commerce brands.",
    stat: "+64%",
    statLabel: "ROAS Gain",
    accentBg: "bg-pink-100 dark:bg-pink-950/40",
    badgeColor: "bg-pink-600/40",
    previewType: "quote-pink",
  },
  {
    id: "lexiguard-compliance",
    category: "Internal Tools",
    tag: "Legal Copilot",
    title: "Enterprise NDA & contract review workspace with zero data retention",
    client: "LexiGuard",
    summary: "Custom LLM analysis tool redlining 60-page supplier agreements in under 45 seconds.",
    stat: "45 sec",
    statLabel: "Review Speed",
    accentBg: "bg-[#E8EDF4] dark:bg-[#1C2533]",
    badgeColor: "bg-blue-600/40",
    previewType: "terminal-dark",
  },
  {
    id: "edge-storefront",
    category: "SaaS Dev",
    tag: "Edge Commerce",
    title: "Sub-50ms global commerce storefront with optimistic single-tap checkout",
    client: "Bellmade Goods",
    summary: "Engineered headless edge architecture slashing bounce rates by 68% on mobile devices.",
    stat: "38ms",
    statLabel: "Edge Latency",
    accentBg: "bg-[#EDE8F8] dark:bg-[#251B38]",
    badgeColor: "bg-purple-600/40",
    previewType: "analytics-purple",
  },
];

export const clientStories = [
  {
    quote:
      "Goodspeed's ability to think about how to do things in a better and more intelligent way is impressive. They have a new approach to development and design that transformed our product speed.",
    author: "Andrew Heath",
    role: "Founder & CEO",
    company: "SizzleKick",
    avatarBg: "bg-orange-500",
    initials: "AH",
    rating: 5,
  },
  {
    quote:
      "It was the best project management service I've experienced working with third-party developers or agencies. They shipped in weeks what others quoted six months for.",
    author: "Alex Rainey",
    role: "CEO",
    company: "MyAskAI",
    avatarBg: "bg-emerald-600",
    initials: "AR",
    rating: 5,
  },
  {
    quote:
      "They've helped us bring our vision to life and go live in an extremely compressed time schedule. We couldn't have achieved this speed without their engineering discipline.",
    author: "Diane Stember",
    role: "Creative Director",
    company: "Wisk",
    avatarBg: "bg-amber-600",
    initials: "DS",
    rating: 5,
  },
  {
    quote:
      "Their automated ledger sync wiped out 15 hours of weekly manual bookkeeping and eliminated reconciliation errors completely.",
    author: "Marcus Vance",
    role: "Head of Operations",
    company: "Apex Capital",
    avatarBg: "bg-blue-600",
    initials: "MV",
    rating: 5,
  },
  {
    quote:
      "The custom LLM contract workspace transformed our supplier review pipeline from 48 hours to under 45 seconds per document.",
    author: "Sophia Chen",
    role: "General Counsel",
    company: "LexiGuard",
    avatarBg: "bg-purple-600",
    initials: "SC",
    rating: 5,
  },
];

export const processStages = [
  {
    number: "01",
    name: "Discovery",
    subtitle: "2-Week Strategy & Architecture",
    description: "Deep dive into your domain, map user flows, and build clickable interactive wireframes with fixed-price scope.",
    deliverables: ["Clickable Figma Prototype", "Database Schema", "API Contracts"],
  },
  {
    number: "02",
    name: "Design",
    subtitle: "High-Fidelity UI & Tokens",
    description: "Crafting modern, conversion-focused design systems, typography hierarchy, and interactive states.",
    deliverables: ["Design System Tokens", "Component Library", "Motion Specs"],
  },
  {
    number: "03",
    name: "Develop",
    subtitle: "Rapid Iterative Sprints",
    description: "Full-stack engineering with Next.js, AI integrations, automated tests, and live continuous staging URLs.",
    deliverables: ["Weekly Staging Releases", "Slack Direct Access", "Loom Video Demos"],
  },
  {
    number: "04",
    name: "Scale",
    subtitle: "Production Rollout & Retainers",
    description: "Zero-downtime deployment, 100% IP handover, telemetry observability, and ongoing monthly iteration.",
    deliverables: ["100% Code Handover", "24/7 Monitoring", "Monthly Retainers"],
  },
];

export const specializations = [
  {
    title: "AI Agents & Copilots",
    description: "Autonomous reasoning agents, multi-modal LLM integrations, and custom RAG pipelines.",
  },
  {
    title: "Intelligent Automations",
    description: "Self-healing n8n and webhook pipelines replacing hours of manual spreadsheet work.",
  },
  {
    title: "SaaS & Web Applications",
    description: "High-performance full-stack Next.js App Router platforms with sub-second responses.",
  },
  {
    title: "Internal Tools & Portals",
    description: "Custom operations hubs, ERP dashboards, and role-based staff workflows.",
  },
];

export const impactStats = [
  {
    value: "200+",
    label: "Live in Production",
    desc: "Shipped products and automations generating real client value.",
  },
  {
    value: "10x",
    label: "Faster Deployment",
    desc: "From initial concept to production release in 4 to 8 weeks.",
  },
  {
    value: "90%",
    label: "Manual Effort Cut",
    desc: "Reclaimed engineering and operational hours through automation.",
  },
];

export const teamMembers = [
  { name: "Alex R.", role: "Lead Architect", photoTag: "Architecture" },
  { name: "Sarah K.", role: "AI & ML Engineer", photoTag: "Intelligence" },
  { name: "Jordan M.", role: "Product Designer", photoTag: "UX Systems" },
  { name: "David C.", role: "Backend Systems", photoTag: "Infrastructure" },
  { name: "Elena V.", role: "Automation Lead", photoTag: "Orchestration" },
  { name: "Marcus T.", role: "Frontend Engineer", photoTag: "Performance" },
];

export const faqs = [
  {
    question: "What makes Goodspeed different from other agencies?",
    answer:
      "We don't just write code or make slide decks. We learn your domain first, then build the AI product around what you know. Most agencies build what you spec. We help you figure out what to build, and ship it in weeks.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Most AI products go from idea to live in 4 to 8 weeks. We start with a 2-week discovery sprint so you see tangible progress and a clickable prototype immediately.",
  },
  {
    question: "I've already built something. Can you improve or rebuild it?",
    answer:
      "Yes. About half our clients come to us with an existing product that needs AI features, performance tuning, or a full rebuild. We'll audit what you have and recommend the fastest path.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Every client gets 30 days of post-launch warranty included. Most stay on a monthly retainer because AI products need iteration; the first version is just the start.",
  },
  {
    question: "Do we own 100% of the code & IP?",
    answer:
      "Yes, 100%. Upon completion, all source code, Figma design files, database architectures, and deployment configurations are fully transferred to you.",
  },
];

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];
