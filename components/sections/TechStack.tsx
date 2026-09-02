"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// Official Tech Icons
import {
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiAnthropic,
  SiN8N,
  SiReact,
  SiFastapi,
  SiTailwindcss,
  SiNodedotjs,
  SiLangchain,
  SiVercel,
  SiPostgresql,
  SiDocker,
  SiRedis,
  SiTemporal,
  SiSupabase,
  SiApachekafka,
  SiMongodb,
  SiRabbitmq,
  SiClickhouse,
  SiPrisma,
  SiGraphql,
  SiKubernetes,
  SiPytorch,
  SiHuggingface,
  SiOllama,
  SiTerraform,
  SiCloudflare,
  SiGo,
  SiRust,
  SiGrafana,
  SiSentry,
  SiStripe,
  SiGithub,
} from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";
import { FaAws } from "react-icons/fa6";
import { IconType } from "react-icons";

interface TechItem {
  name: string;
  color: string;
  icon: IconType;
}

// ─── Row 1: Frontend, AI Core, Languages & Frameworks (18 Tools) ───
const row1Data: TechItem[] = [
  { name: "Next.js", color: "#000000", icon: SiNextdotjs },
  { name: "TypeScript", color: "#3178C6", icon: SiTypescript },
  { name: "Python", color: "#3776AB", icon: SiPython },
  { name: "OpenAI", color: "#10A37F", icon: TbBrandOpenai },
  { name: "Anthropic", color: "#D97757", icon: SiAnthropic },
  { name: "n8n", color: "#E04368", icon: SiN8N },
  { name: "React", color: "#149ECA", icon: SiReact },
  { name: "FastAPI", color: "#009688", icon: SiFastapi },
  { name: "Tailwind CSS", color: "#0284C7", icon: SiTailwindcss },
  { name: "Node.js", color: "#4F8A3E", icon: SiNodedotjs },
  { name: "LangChain", color: "#16A34A", icon: SiLangchain },
  { name: "Vercel", color: "#000000", icon: SiVercel },
  { name: "PyTorch", color: "#EE4C2C", icon: SiPytorch },
  { name: "Hugging Face", color: "#EAB308", icon: SiHuggingface },
  { name: "Ollama", color: "#38B2AC", icon: SiOllama },
  { name: "Go", color: "#00ADD8", icon: SiGo },
  { name: "Rust", color: "#DEA584", icon: SiRust },
  { name: "Stripe", color: "#635BFF", icon: SiStripe },
];

// ─── Row 2: Databases, DevOps, Queues & Cloud Infra (18 Tools) ───
const row2Data: TechItem[] = [
  { name: "PostgreSQL", color: "#336791", icon: SiPostgresql },
  { name: "Docker", color: "#2496ED", icon: SiDocker },
  { name: "Redis", color: "#C53030", icon: SiRedis },
  { name: "Temporal", color: "#16A34A", icon: SiTemporal },
  { name: "Supabase", color: "#10B981", icon: SiSupabase },
  { name: "Apache Kafka", color: "#BE185D", icon: SiApachekafka },
  { name: "MongoDB", color: "#47A248", icon: SiMongodb },
  { name: "RabbitMQ", color: "#EA580C", icon: SiRabbitmq },
  { name: "ClickHouse", color: "#D97706", icon: SiClickhouse },
  { name: "Prisma", color: "#5A67D8", icon: SiPrisma },
  { name: "GraphQL", color: "#C026D3", icon: SiGraphql },
  { name: "AWS", color: "#D97706", icon: FaAws },
  { name: "Kubernetes", color: "#326CE5", icon: SiKubernetes },
  { name: "Terraform", color: "#844FBA", icon: SiTerraform },
  { name: "Cloudflare", color: "#F38020", icon: SiCloudflare },
  { name: "Grafana", color: "#EA580C", icon: SiGrafana },
  { name: "Sentry", color: "#E11D48", icon: SiSentry },
  { name: "GitHub", color: "#24292E", icon: SiGithub },
];

// Reusable single icon renderer with shadcn Popover (80% soft shade default, 100% on hover)
function TechIconItem({ tech }: { tech: TechItem }) {
  const IconComponent = tech.icon;
  const [open, setOpen] = React.useState(false);
  const isMonochrome = tech.color === "#000000" || tech.color === "#24292E";
  const iconColor = isMonochrome ? "var(--ink)" : tech.color;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="group/item relative flex items-center justify-center p-3 sm:p-4 select-none cursor-pointer"
        >
          {/* ── Large Icon: 80% soft shade by default (eye-friendly), 100% on hover, scales smoothly ── */}
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 opacity-80 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:scale-125 flex items-center justify-center"
            style={{ color: iconColor }}
          >
            <IconComponent className="w-full h-full" />
          </div>
        </div>
      </PopoverTrigger>

      {/* ── shadcn Popover Content showing Tech Name on Hover ── */}
      <PopoverContent
        side="top"
        sideOffset={10}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-auto px-3 py-1.5 rounded-lg bg-ink dark:bg-[#06120A] text-canvas dark:text-lime border border-line/40 dark:border-[#D4FF00]/40 text-xs font-mono font-bold tracking-tight shadow-none pointer-events-none select-none"
      >
        {tech.name}
      </PopoverContent>
    </Popover>
  );
}

export default function TechStack() {
  // Duplicate each pool to guarantee wide sibling width (>3500px)
  const pool1 = [...row1Data, ...row1Data];
  const pool2 = [...row2Data, ...row2Data];

  return (
    <section id="stack" className="py-20 sm:py-28 bg-canvas border-t border-line relative overflow-hidden scroll-mt-12">
      <Container>
        {/* ─── Consistent Section Header ─── */}
        <AnimateOnScroll direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-4 font-heading">
              Engineered With The World&apos;s{" "}
              <span className="font-accent inline-block -rotate-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-lime to-[#B8E000]">
                Best Toolchains
              </span>
            </h2>

            <p className="text-base text-ink leading-relaxed max-w-2xl mx-auto">
              No toy frameworks or fragile scripts. We build on battle-tested, production-ready technologies that scale seamlessly from day one.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* ─── 2-Row Seamless Infinite Marquee (Always Full Color, Zero Gaps) ─── */}
      <div className="relative w-full overflow-hidden py-4 space-y-6 sm:space-y-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        
        {/* ── Row 1: Leftward Infinite Marquee ── */}
        <div className="marquee-row flex w-full overflow-hidden select-none">
          <div className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14 animate-marquee-left">
            {pool1.map((tech, idx) => (
              <TechIconItem key={`row1-a-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14 animate-marquee-left" aria-hidden="true">
            {pool1.map((tech, idx) => (
              <TechIconItem key={`row1-b-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* ── Row 2: Rightward Infinite Marquee (Reverse Scroll) ── */}
        <div className="marquee-row flex w-full overflow-hidden select-none">
          <div className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14 animate-marquee-right">
            {pool2.map((tech, idx) => (
              <TechIconItem key={`row2-a-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14 animate-marquee-right" aria-hidden="true">
            {pool2.map((tech, idx) => (
              <TechIconItem key={`row2-b-${tech.name}-${idx}`} tech={tech} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}