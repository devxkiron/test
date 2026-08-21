"use client";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/data";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { ZenSecondaryButton } from "@/components/ui/ZenButton";

export function FooterSection() {
  return (
    <footer className="bg-[#14221A] text-white pt-20 pb-12 border-t border-[#243B2E]">
      <Container>
        {/* Top Header Row */}
        <AnimateOnScroll direction="up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-14 border-b border-[#243B2E]">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#D4FF00] text-black font-extrabold text-sm flex items-center justify-center font-heading">
                  G
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                  {siteConfig.name}
                </span>
              </div>
              <p className="text-xs text-white/70 max-w-sm leading-relaxed">
                AI development agency. We turn AI from talked about to rolled out.
              </p>
            </div>

            <div>
              <ZenSecondaryButton
                href="#book"
                variant="lime"
                className="px-6 py-3 text-xs font-bold"
              >
                Book a Strategy Call
              </ZenSecondaryButton>
            </div>
          </div>
        </AnimateOnScroll>

        {/* 5-Column Navigation Grid */}
        <AnimateOnScroll direction="up" delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 py-12 text-xs">
            {/* Col 1 */}
            <div>
              <div className="font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-4">
                Services
              </div>
              <ul className="space-y-3 text-white/85 font-medium">
                <li><a href="#services" className="hover:text-[#D4FF00] transition-colors">AI Agents & Copilots</a></li>
                <li><a href="#services" className="hover:text-[#D4FF00] transition-colors">Workflow Automation</a></li>
                <li><a href="#services" className="hover:text-[#D4FF00] transition-colors">SaaS Development</a></li>
                <li><a href="#services" className="hover:text-[#D4FF00] transition-colors">Internal Dashboards</a></li>
                <li><a href="#services" className="hover:text-[#D4FF00] transition-colors">2-Week Discovery</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <div className="font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-4">
                Case Studies
              </div>
              <ul className="space-y-3 text-white/85 font-medium">
                <li><a href="#work" className="hover:text-[#D4FF00] transition-colors">FlyWise Aviation</a></li>
                <li><a href="#work" className="hover:text-[#D4FF00] transition-colors">MyAskAI Copilot</a></li>
                <li><a href="#work" className="hover:text-[#D4FF00] transition-colors">Apex Capital Sync</a></li>
                <li><a href="#work" className="hover:text-[#D4FF00] transition-colors">SizzleKick Creative</a></li>
                <li><a href="#work" className="hover:text-[#D4FF00] transition-colors">LexiGuard Legal</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-4">
                Company
              </div>
              <ul className="space-y-3 text-white/85 font-medium">
                <li><a href="#process" className="hover:text-[#D4FF00] transition-colors">How We Ship</a></li>
                <li><a href="#stories" className="hover:text-[#D4FF00] transition-colors">Client Stories</a></li>
                <li><a href="#faq" className="hover:text-[#D4FF00] transition-colors">FAQ</a></li>
                <li><a href="#book" className="hover:text-[#D4FF00] transition-colors">Book a Call</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <div className="font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-4">
                Resources
              </div>
              <ul className="space-y-3 text-white/70 font-medium">
                <li><span>AI Architecture Guide</span></li>
                <li><span>Discovery Sprint Playbook</span></li>
                <li><span>Next.js 16 App Router</span></li>
                <li><span>n8n Automation Mesh</span></li>
              </ul>
            </div>

            {/* Col 5 */}
            <div>
              <div className="font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-4">
                Contact
              </div>
              <ul className="space-y-3 text-white/85 font-medium">
                <li className="font-mono text-white font-bold">{siteConfig.email}</li>
                <li>London, United Kingdom</li>
                <li className="flex items-center gap-1.5 text-[#D4FF00] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                  Available for Q3 Projects
                </li>
              </ul>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#243B2E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.name} Studio Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4FF00] transition-colors font-mono"
            >
              GitHub
            </a>
            <a
              href={siteConfig.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4FF00] transition-colors font-mono"
            >
              X (Twitter)
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4FF00] transition-colors font-mono"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
