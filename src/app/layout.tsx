import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMW M3 — Life Begins at 6000 RPM",
  description:
    "Experience the legacy of the BMW M3 E30. Born from motorsport, built without compromise. The most successful touring car in history — from the track to the street.",
  keywords: [
    "BMW M3",
    "E30 M3",
    "BMW M Division",
    "Motorsport",
    "Touring Car",
    "Classic Cars",
    "Racing Heritage",
  ],
  authors: [{ name: "Classic Autos GmbH" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "BMW M3 — Life Begins at 6000 RPM",
    description:
      "Born from motorsport, built without compromise. Experience the legend of the BMW M3 E30.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMW M3 — Life Begins at 6000 RPM",
    description:
      "Born from motorsport, built without compromise. Experience the legend of the BMW M3 E30.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        style={{ backgroundColor: '#F5F3F0' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
