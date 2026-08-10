import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Nested layout for the ICMS module (catering security checkpoints). The
// root layout (src/app/layout.tsx) already provides <html>/<body>, the PWA
// shell, and the dark-mode init script shared with AVSEC Reports — this
// layout only adds ICMS's own fonts and design-token background/foreground,
// scoped to a wrapping div (nested layouts can't declare <html>/<body>).

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ICMS — Inflight Catering Management System",
    template: "%s | ICMS",
  },
  description:
    "Digital IFCSF workflow for airport catering security: Part A–D checkpoints, incidents, audit trail.",
};

export default function IcmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${heading.variable} ${body.variable} min-h-screen bg-background font-sans text-foreground`}>
      {children}
    </div>
  );
}
