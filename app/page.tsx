import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ClientStoriesSection } from "@/components/sections/ClientStoriesSection";
import { AutomationProcessSection } from "@/components/sections/AutomationProcessSection";
import { SpecializationSection } from "@/components/sections/SpecializationSection";
import { ImpactStatsSection } from "@/components/sections/ImpactStatsSection";
import { TeamCultureSection } from "@/components/sections/TeamCultureSection";
import { BookingCalendarSection } from "@/components/sections/BookingCalendarSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-canvas text-ink selection:bg-[#D4FF00] selection:text-black">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section & Client Logo Ticker */}
      <HeroSection />

      {/* 3. Featured Case Studies & Stats */}
      <WorkSection />

      {/* 4. Client Stories (Forest Green Testimonials) */}
      <ClientStoriesSection />

      {/* 5. Automation Framework (4-Step Live Interactive Cards) */}
      <AutomationProcessSection />

      {/* 6. Specializations & Architecture Canvas */}
      <SpecializationSection />

      {/* 7. Impact Philosophy & Large Stat Cards */}
      <ImpactStatsSection />

      {/* 8. Team & Culture */}
      <TeamCultureSection />

      {/* 9. Interactive Strategy Call Booking Calendar */}
      <BookingCalendarSection />

      {/* 10. Split FAQ Accordion */}
      <FaqSection />

      {/* 11. Forest Green Multi-Column Footer */}
      <FooterSection />
    </main>
  );
}
