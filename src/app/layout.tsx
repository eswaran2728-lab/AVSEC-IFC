import type { Metadata, Viewport } from "next";
import "./globals.css";
import { OfflineSyncProvider } from "@/components/offline/OfflineSyncProvider";
import { OfflineStatusBadge } from "@/components/offline/OfflineStatusBadge";
import { ServiceWorkerRegister } from "@/components/offline/ServiceWorkerRegister";
import { InstallPrompt } from "@/components/offline/InstallPrompt";
import { APP_NAME, APP_DESCRIPTION, BRAND_RED, BRAND_BLACK } from "@/lib/branding";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_NAME,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND_RED },
    { media: "(prefers-color-scheme: dark)", color: BRAND_BLACK },
  ],
};

// Dark mode init: defaults to the system preference (matching AVSEC's
// previous darkMode:"media" behavior) unless the ICMS module's manual
// light/dark toggle (src/components/icms/theme-toggle.tsx) has stored an
// explicit choice. Runs before paint to avoid a flash of the wrong theme.
const themeInit = `
try {
  const stored = localStorage.getItem("cscs-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (!stored && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen antialiased">
        <OfflineSyncProvider>
          <ServiceWorkerRegister />
          <OfflineStatusBadge />
          {children}
          <InstallPrompt />
        </OfflineSyncProvider>
      </body>
    </html>
  );
}
