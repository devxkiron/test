import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Workflow Automation & Web Applications`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "workflow automation",
    "web development agency",
    "Next.js",
    "n8n automation",
    "small business automation",
    "SMB web applications",
    "technical agency",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${siteConfig.name} — Lifting the Heavy Work Off Your Business`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Lifting the Heavy Work Off Your Business`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="min-h-full antialiased bg-canvas text-ink transition-colors duration-250">
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
