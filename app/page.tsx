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
      {/* System Initialization Loader */}
      <VintageLoader />

      {/* Notch Liquid Glass Navbar */}
      <Navbar />

      {/* Wave Grid Hero & Audio Story */}
      <HeroSection />

      {/* Modular Architecture Capabilities */}
      <ExpandableCapabilities />

      {/* Pinned Horizontal Showcase */}
      <HorizontalShowcase />

      {/* Kinetic Parallax Text Stream */}
      <ParallaxTextSection />

      {/* Live Distributed Task Mesh */}
      <CrowdAutomationSection />

      {/* Live Walkthrough & Architecture Player */}
      <VideoDemoSection />

      {/* Operational Transformation Showcase */}
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

      {/* Principal Technical Leads */}
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
