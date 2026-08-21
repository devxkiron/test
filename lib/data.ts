export const siteConfig = {
  name: "Veloce Studio",
  tagline: "Lifting the Heavy Work Off Your Business.",
  description:
    "A specialized technical agency delivering intelligent workflow automation and high-performance custom software to ambitious businesses.",
  email: "hello@veloce.studio",
  calendly: "https://calendly.com/veloce-studio/audit",
  founded: "2021",
  location: "Remote-first · Global Delivery",
  responseTime: "< 4 hours",
};

export const stats = [
  { label: "Hours Automated", value: "47,200+", suffix: "" },
  { label: "P99 API Latency", value: "<120", suffix: "ms" },
  { label: "Core Web Vitals", value: "100", suffix: "%" },
  { label: "Client NPS Score", value: "94", suffix: "/100" },
];

export const team = [
  {
    id: "frontend" as const,
    role: "Frontend Architect",
    name: "Alex Rivera",
    headline: "Pixel-Perfect Performance at Scale",
    bio: "Obsessed with Core Web Vitals, design systems, and React architecture. I bridge the gap between design intent and production reality.",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Figma", "Tailwind CSS"],
    metrics: [
      { label: "LCP", value: "< 1.2s" },
      { label: "CLS", value: "0.00" },
      { label: "INP", value: "< 40ms" },
    ],
    accent: "accent" as const,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "backend" as const,
    role: "Backend Engineer",
    name: "Jordan Kim",
    headline: "Scalable Systems, Zero Compromise",
    bio: "Architect of low-latency APIs, event-driven microservices, and resilient data pipelines. If it needs to handle 100× traffic spikes, I design for it.",
    stack: ["Node.js", "PostgreSQL", "Redis", "Docker", "Kafka", "Terraform"],
    metrics: [
      { label: "Uptime", value: "99.99%" },
      { label: "Throughput", value: "40k req/s" },
      { label: "P99 Latency", value: "< 12ms" },
    ],
    accent: "success" as const,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "automation" as const,
    role: "Automation Specialist",
    name: "Sam Chen",
    headline: "Workflows That Run While You Sleep",
    bio: "I eliminate repetitive work through intelligent automation pipelines, integrating CRMs, payment processors, and internal tools into unified flows.",
    stack: ["n8n", "Make.com", "Zapier", "Python", "REST APIs", "Webhooks"],
    metrics: [
      { label: "Hrs Saved/Week", value: "120+" },
      { label: "Integrations Built", value: "340+" },
      { label: "Error Rate", value: "< 0.1%" },
    ],
    accent: "gold" as const,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
];

export const services = [
  {
    id: "automation",
    icon: "Zap" as const,
    title: "Intelligent Automation",
    subtitle: "Manual → Automated in days, not months.",
    description:
      "We map your most time-consuming workflows and replace them with self-healing automation pipelines. CRM syncs, invoice processing, client onboarding, reporting — fully automated.",
    features: [
      "Webhook & API orchestration",
      "Multi-platform integrations (Stripe, HubSpot, Notion)",
      "Error-handling & retry logic built-in",
      "Real-time Slack/email notifications",
    ],
    metrics: { label: "Avg. weekly hours reclaimed", value: "23 hrs" },
    accent: "gold" as const,
  },
  {
    id: "frontend",
    icon: "Monitor" as const,
    title: "High-Performance Web",
    subtitle: "Interfaces that convert and perform.",
    description:
      "Modern web applications built with Next.js App Router, achieving perfect Core Web Vitals scores. Every pixel intentional, every millisecond optimized.",
    features: [
      "Next.js 16, React 19, TypeScript",
      "Perfect Lighthouse scores guaranteed",
      "Accessible & SEO-optimized by default",
      "GSAP motion & micro-interaction design",
    ],
    metrics: { label: "Average Lighthouse score", value: "99/100" },
    accent: "accent" as const,
  },
  {
    id: "backend",
    icon: "Server" as const,
    title: "Scalable Backend",
    subtitle: "Infrastructure that grows with you.",
    description:
      "Resilient REST & GraphQL APIs, event-driven microservices, and cloud infrastructure designed to handle your next 100× growth without re-architecture.",
    features: [
      "PostgreSQL, Redis, Kafka data layers",
      "Containerized with Docker & K8s",
      "CI/CD with automated testing",
      "Observability: Logs, traces, alerts",
    ],
    metrics: { label: "System uptime guarantee", value: "99.99%" },
    accent: "success" as const,
  },
];

export interface CaseStudyItem {
  id: string;
  category: "Custom Projects" | "Automation Projects";
  tag: string;
  title: string;
  client: string;
  description?: string;
  painPoint: string;
  solution: string;
  metrics: { label: string; value: string; delta: string }[];
  stack: string[];
  accent: "accent" | "success" | "gold" | "warm" | "rose";
}

export const caseStudies: CaseStudyItem[] = [
  {
    id: "logistics-dispatch",
    category: "Automation Projects",
    tag: "Autonomous Dispatch",
    title: "Regional Freight Broker: 40 hrs/week manual ops reduced to 2 hrs",
    client: "NorthStar Logistics",
    painPoint: "Dispatchers spent 8 hours/day re-typing shipment details between email PDFs, Google Sheets, and carrier portals.",
    solution: "Self-healing n8n webhook orchestration parsing incoming BOL docs, enriching shipment metrics, and auto-dispatching to drivers.",
    metrics: [
      { label: "Hours Saved / Wk", value: "38 hrs", delta: "+95% efficiency" },
      { label: "Processing Speed", value: "820 ms", delta: "-94% latency" },
      { label: "Human Error Rate", value: "0.02%", delta: "99.8% reduction" },
    ],
    stack: ["n8n", "Node.js", "PostgreSQL", "Webhooks", "Redis"],
    accent: "gold",
  },
  {
    id: "fintech-reconciliation",
    category: "Automation Projects",
    tag: "Financial Ledger Sync",
    title: "Multi-Bank Invoicing & Automatic Stripe Reconciliation",
    client: "Apex Capital Partners",
    painPoint: "Finance managers manually matched 3,000+ monthly wire transfers and Stripe charges in Excel, causing 4-day closing delays.",
    solution: "Autonomous idempotency ledger syncing Stripe, Plaid, and QuickBooks every 60 seconds with automated discrepancy flagging.",
    metrics: [
      { label: "Month-End Close", value: "3 hours", delta: "Down from 4 days" },
      { label: "Auto Match Rate", value: "99.94%", delta: "100% audited" },
      { label: "Annual Labor Saved", value: "$48.5k", delta: "Direct ROI" },
    ],
    stack: ["TypeScript", "Stripe API", "Plaid", "PostgreSQL", "Make.com"],
    accent: "success",
  },
  {
    id: "patient-intake",
    category: "Automation Projects",
    tag: "HIPAA Intake Pipeline",
    title: "Medical Practice: Zero-Touch Patient Intake & Insurance Verification",
    client: "Solace Health Clinics",
    painPoint: "Front desk staff spent 25 minutes per new patient verifying insurance eligibility via phone and scanning paperwork.",
    solution: "Encrypted patient portal with instant OCR extraction and automated insurance payer clearinghouse verification in under 3 seconds.",
    metrics: [
      { label: "Check-in Time", value: "45 sec", delta: "-88% wait time" },
      { label: "Verification Latency", value: "2.1s", delta: "Instant" },
      { label: "Weekly Admin Time", value: "26 hrs", delta: "Reclaimed" },
    ],
    stack: ["Next.js", "HIPAA Vault", "n8n", "PostgreSQL", "Twilio SMS"],
    accent: "accent",
  },
  {
    id: "b2b-analytics-platform",
    category: "Custom Projects",
    tag: "Real-Time Web Platform",
    title: "High-Frequency B2B Portfolio Analytics Platform",
    client: "VentureScale Global",
    painPoint: "Legacy reporting dashboard crashed under 500 concurrent users with 12-second page load times.",
    solution: "Sub-second Next.js 16 App Router platform with WebSocket streaming backend and distributed Redis caching.",
    metrics: [
      { label: "Page Load Time", value: "0.42s", delta: "-96% latency" },
      { label: "Concurrent Users", value: "10,000+", delta: "10x scale" },
      { label: "Core Web Vitals", value: "100/100", delta: "Perfect score" },
    ],
    stack: ["Next.js 16", "React 19", "Kafka", "WebSockets", "Tailwind CSS"],
    accent: "accent",
  },
  {
    id: "custom-erp-hub",
    category: "Custom Projects",
    tag: "Internal Operations Hub",
    title: "Custom Manufacturing Operations & Inventory Hub",
    client: "IronClad Machinery",
    painPoint: "Shop floor relied on paper job tickets and 10-year-old on-prem software with no remote access.",
    solution: "Tailored responsive web application integrating barcode scanning, live assembly line tracking, and automatic parts ordering.",
    metrics: [
      { label: "Production Throughput", value: "+34%", delta: "Measured gain" },
      { label: "Inventory Shrinkage", value: "< 0.1%", delta: "-91% loss" },
      { label: "Onboarding Time", value: "1 day", delta: "Down from 2 wks" },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "GSAP"],
    accent: "warm",
  },
  {
    id: "edge-commerce",
    category: "Custom Projects",
    tag: "High-Velocity Commerce",
    title: "Sub-Second Global Commerce Platform with Optimistic UI",
    client: "Krypton Retail",
    painPoint: "High bounce rates on mobile checkout costing an estimated $60,000 in monthly lost cart checkouts.",
    solution: "Zero-bundle-bloat edge storefront with optimistic UI mutations and sub-50ms global API response times.",
    metrics: [
      { label: "Checkout Conversion", value: "+41.2%", delta: "Validated" },
      { label: "Global Edge P99", value: "38 ms", delta: "Sub-50ms" },
      { label: "Bounce Rate", value: "9.4%", delta: "-64% drop" },
    ],
    stack: ["Next.js 16", "Server Components", "Tailwind CSS", "Stripe Checkout"],
    accent: "success",
  },
];

export type AccentName = "accent" | "success" | "gold" | "rose" | "warm";

export const accentStyles: Record<
  AccentName,
  {
    text: string;
    bg: string;
    bgSubtle: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
  }
> = {
  accent: {
    text: "text-accent",
    bg: "bg-accent",
    bgSubtle: "bg-accent-bg",
    border: "border-accent/30",
    badgeBg: "bg-accent-bg",
    badgeText: "text-accent-dark",
    badgeBorder: "border-accent-light",
  },
  success: {
    text: "text-success",
    bg: "bg-success",
    bgSubtle: "bg-success-bg",
    border: "border-success/30",
    badgeBg: "bg-success-bg",
    badgeText: "text-success-dark",
    badgeBorder: "border-success-light",
  },
  gold: {
    text: "text-gold",
    bg: "bg-gold",
    bgSubtle: "bg-gold-bg",
    border: "border-gold/30",
    badgeBg: "bg-gold-bg",
    badgeText: "text-gold-dark",
    badgeBorder: "border-gold-light",
  },
  rose: {
    text: "text-rose",
    bg: "bg-rose",
    bgSubtle: "bg-rose-bg",
    border: "border-rose/30",
    badgeBg: "bg-rose-bg",
    badgeText: "text-rose-dark",
    badgeBorder: "border-rose-light",
  },
  warm: {
    text: "text-warm",
    bg: "bg-warm",
    bgSubtle: "bg-warm-bg",
    border: "border-warm/30",
    badgeBg: "bg-warm-bg",
    badgeText: "text-warm-dark",
    badgeBorder: "border-warm-light",
  },
};

export const floatingNodes: { label: string; color: "accent" | "success" | "gold" }[] = [
  { label: "CRM", color: "accent" },
  { label: "Webhooks", color: "gold" },
  { label: "APIs", color: "success" },
  { label: "Stripe", color: "accent" },
  { label: "Postgres", color: "success" },
  { label: "AI Agent", color: "gold" },
  { label: "Slack", color: "accent" },
  { label: "Notion", color: "gold" },
  { label: "n8n", color: "success" },
  { label: "Redis", color: "accent" },
];

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Calculator", href: "#calculator" },
];

export const customStack = [
  { name: "Next.js 16", category: "Framework", tag: "App Router" },
  { name: "React 19", category: "Frontend", tag: "UI Library" },
  { name: "TypeScript", category: "Language", tag: "Type Safety" },
  { name: "Node.js", category: "Runtime", tag: "Async Backend" },
  { name: "Python", category: "Backend/AI", tag: "Microservices" },
  { name: "PostgreSQL", category: "Database", tag: "ACID Relational" },
  { name: "Redis", category: "Cache", tag: "In-Memory Hit" },
  { name: "Tailwind CSS", category: "Styling", tag: "Design Tokens" },
  { name: "Docker", category: "DevOps", tag: "Containers" },
  { name: "GraphQL", category: "API", tag: "Schema Query" },
  { name: "REST APIs", category: "API", tag: "High Throughput" },
  { name: "Supabase", category: "BaaS", tag: "Realtime Data" },
  { name: "GSAP", category: "Motion", tag: "Hardware Accel" },
];

export const automationStack = [
  { name: "n8n", category: "Orchestrator", tag: "Self-Hosted Mesh" },
  { name: "Zapier", category: "Integration", tag: "App Connector" },
  { name: "Make.com", category: "Visual Automation", tag: "Multi-Route Logic" },
  { name: "GoHighLevel (GHL)", category: "CRM & Funnels", tag: "Client Automation" },
  { name: "Airtable", category: "Database/Ops", tag: "Relational Ops" },
  { name: "Stripe API", category: "Payments", tag: "Billing Automation" },
  { name: "HubSpot", category: "CRM", tag: "Sales & Marketing" },
  { name: "OpenAI / AI Agents", category: "Intelligence", tag: "Autonomous Routing" },
  { name: "Webhooks", category: "Event Pipeline", tag: "Zero-Latency Trigger" },
  { name: "Slack API", category: "Notifications", tag: "Ops Alerts" },
  { name: "Google Workspace", category: "Cloud Sync", tag: "Docs & Sheets API" },
  { name: "Appwrite", category: "Backend Ops", tag: "Auth & Events" },
];

export const techMarquee = [
  "Next.js 16", "n8n", "React 19", "Zapier", "TypeScript", "Make.com",
  "Node.js", "GoHighLevel", "PostgreSQL", "Airtable", "Redis", "Stripe API",
  "HubSpot", "Docker", "Webhooks", "OpenAI Agents", "GraphQL", "Slack API",
];
