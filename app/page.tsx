import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { HorizontalShowcase } from "@/components/sections/HorizontalShowcase";
import { WorkflowPipeline } from "@/components/sections/WorkflowPipeline";
import { InteractiveSvgTimeline } from "@/components/sections/InteractiveSvgTimeline";
import { PhysicsSandbox } from "@/components/sections/PhysicsSandbox";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { RoiCalculatorSection } from "@/components/sections/RoiCalculatorSection";
import { ContactFooter } from "@/components/sections/ContactFooter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-canvas text-ink selection:bg-accent/20">
      <Navbar />
      <HeroSection />
      <HorizontalShowcase />
      <WorkflowPipeline />
      <InteractiveSvgTimeline />
      <PhysicsSandbox />
      <ServicesGrid />
      <ComparisonSection />
      <TeamSection />
      <CaseStudiesSection />
      <RoiCalculatorSection />
      <ContactFooter />
    </main>
  );
}
