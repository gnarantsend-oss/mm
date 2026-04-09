import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NABO — Монголын Стриминг",
  description: "Монголын кино, цуврал — нэг дороос. Бүртгэлгүй үнэгүй.",
};

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, maximumScale: 1,
  userScalable: false, themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
