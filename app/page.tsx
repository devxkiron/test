import { VintageLoader } from "@/components/ui/VintageLoader";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExpandableCapabilities } from "@/components/sections/ExpandableCapabilities";
import { HorizontalShowcase } from "@/components/sections/HorizontalShowcase";
import { ParallaxTextSection } from "@/components/sections/ParallaxTextSection";
import { CrowdAutomationSection } from "@/components/sections/CrowdAutomationSection";
import { VideoDemoSection } from "@/components/sections/VideoDemoSection";
import { ShowcaseScrollManualVsAuto } from "@/components/sections/ShowcaseScrollManualVsAuto";
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
      {/* Skiper UI 9th: Page Loader */}
      <VintageLoader />

      {/* Vengence UI: Notch Navbar */}
      <Navbar />

      {/* Vengence UI: Wave Grid Hero + Skiper UI 25th: Audio Story */}
      <HeroSection />

      {/* Skiper UI 35th: Hover To Expand */}
      <ExpandableCapabilities />

      {/* Pinned Horizontal Showcase */}
      <HorizontalShowcase />

      {/* Skiper UI 32nd: Parallax Text Scroll */}
      <ParallaxTextSection />

      {/* Skiper UI 39th: Canvas Crowd Background */}
      <CrowdAutomationSection />

      {/* Skiper UI 72nd: Horizontal Text Reveal + Skiper UI 67th: Video Player */}
      <VideoDemoSection />

      {/* Skiper UI 79th: Showcase Scroll (Manual Pain vs Automation) */}
      <ShowcaseScrollManualVsAuto />

      {/* Pipeline & Telemetry */}
      <WorkflowPipeline />

      {/* Interactive SVG Sequence */}
      <InteractiveSvgTimeline />

      {/* Physics Sandbox */}
      <PhysicsSandbox />

      {/* Services Grid */}
      <ServicesGrid />

      {/* Architectural Comparison */}
      <ComparisonSection />

      {/* The Senior Trio */}
      <TeamSection />

      {/* Category-Wise Showcase (Custom vs Automation) */}
      <CaseStudiesSection />

      {/* ROI Model */}
      <RoiCalculatorSection />

      {/* Vengence UI: Animated Footer */}
      <ContactFooter />
    </main>
  );
}
