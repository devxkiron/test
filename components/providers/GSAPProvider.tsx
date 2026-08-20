"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

// Register GSAP plugins once at the client level
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Props {
  children: ReactNode;
}

export function GSAPProvider({ children }: Props) {
  return <>{children}</>;
}

// Re-export for convenience
export { gsap, ScrollTrigger, useGSAP };
