"use client";

import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { VintageVideoPlayer } from "@/components/ui/VintageVideoPlayer";
import { HorizontalTextReveal } from "@/components/motion/HorizontalTextReveal";

export function VideoDemoSection() {
  return (
    <section className="py-24 bg-canvas border-b border-line select-none">
      <Container>
        {/* Kinetic Horizontal Text Reveal (Skiper UI 72nd) */}
        <div className="mb-16 max-w-4xl mx-auto text-center">
          <Badge variant="accent" size="md" className="mb-4">
            Skiper UI 72nd · Kinetic Reveal
          </Badge>
          <HorizontalTextReveal text="We eliminate repetitive spreadsheets, fragmented tools, and slow human copy-pasting by engineering reliable autonomous pipelines that scale your business effortlessly." />
        </div>

        {/* Vintage Video Player (Skiper UI 67th) */}
        <div className="max-w-4xl mx-auto">
          <VintageVideoPlayer
            title="Live Runtime: Ingesting 40k Events & Auto-Reconciling Ledgers"
            videoDuration="03:12"
          />
        </div>
      </Container>
    </section>
  );
}
