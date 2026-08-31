import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | AI & Custom Software Development Studio`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI development agency",
    "custom software development",
    "workflow automation",
    "Next.js web apps",
    "n8n enterprise automations",
    "internal tools",
    "AI SaaS",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFB" },
    { media: "(prefers-color-scheme: dark)", color: "#090A0C" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-canvas text-ink">
        <ThemeProvider>
          <GSAPProvider>
            <SmoothScroll />
            {children}
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
