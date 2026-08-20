export const siteConfig = {
  name: "Veloce Studio",
  tagline: "Lifting the Heavy Work Off Your Business.",
  description:
    "A 3-member technical agency delivering intelligent workflow automation and high-performance web applications to ambitious small and medium businesses.",
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

export const caseStudies = [
  {
    id: "logistics",
    tag: "Automation + Backend",
    title: "Logistics SaaS: From 40hrs/week manual ops to 2hrs",
    description:
      "A regional freight broker was manually reconciling shipment data across 4 platforms. We built a unified webhook ingestion layer with n8n orchestration that automated 95% of the process.",
    metrics: [
      { label: "Hours Saved / Week", value: "38 hrs", delta: "+95%" },
      { label: "Processing Time", value: "800ms", delta: "-94%" },
      { label: "Error Rate", value: "0.02%", delta: "-99.8%" },
    ],
    stack: ["n8n", "Node.js", "PostgreSQL", "Redis", "Webhooks"],
    accent: "gold" as const,
  },
  {
    id: "fintech",
    tag: "Frontend + Backend",
    title: "FinTech Dashboard: Sub-second real-time data at scale",
    description:
      "A B2B FinTech client needed a real-time portfolio analytics dashboard serving 5,000 concurrent users. We delivered a WebSocket-powered Next.js app with a Kafka streaming backend.",
    metrics: [
      { label: "Data Refresh Latency", value: "< 80ms", delta: "-97%" },
      { label: "Concurrent Users", value: "5,000+", delta: "+500%" },
      { label: "Bounce Rate", value: "12%", delta: "-68%" },
    ],
    stack: ["Next.js", "Kafka", "WebSockets", "PostgreSQL", "Redis"],
    accent: "accent" as const,
  },
  {
    id: "b2b",
    tag: "Full Stack Automation",
    title: "B2B SaaS: 0 → $180k ARR with automated client pipeline",
    description:
      "We built the entire sales automation mesh for a B2B SaaS startup — from lead capture to CRM enrichment, automated proposal generation, and contract signing workflows.",
    metrics: [
      { label: "ARR Reached", value: "$180k", delta: "from $0" },
      { label: "Sales Cycle", value: "4 days", delta: "-72%" },
      { label: "CAC Reduction", value: "61%", delta: "lower" },
    ],
    stack: ["HubSpot", "Make.com", "Stripe", "Notion", "Next.js"],
    accent: "success" as const,
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

export const techMarquee = [
  "Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis",
  "Kafka", "Docker", "n8n", "Make.com", "Stripe API", "HubSpot",
  "Terraform", "GSAP", "Tailwind CSS", "Webhooks", "GraphQL", "REST APIs",
];
