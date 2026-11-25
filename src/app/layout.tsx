import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Oni Abiodun Ebenezer — Keyboardist · Producer · Composer",
  description:
    "Official portfolio of Oni Abiodun Ebenezer — Nigerian keyboardist, music producer and official keyboardist of the Odunayo Akintomide Band. Afrobeats, Gospel, Highlife & Fuji. UK Tour January – July 2027.",
  keywords: [
    "Oni Abiodun Ebenezer",
    "Nigerian keyboardist",
    "music producer Nigeria",
    "Afrobeats producer",
    "Gospel keyboardist",
    "Odunayo Akintomide Band",
    "UK tour 2027",
    "Highlife",
    "Fuji music",
  ],
  authors: [{ name: "Oni Abiodun Ebenezer" }],
  openGraph: {
    title: "Oni Abiodun Ebenezer — Keyboardist · Producer · Composer",
    description:
      "Nigerian keyboardist & music producer. Official keyboardist of the Odunayo Akintomide Band. UK Tour Jan – Jul 2027.",
    siteName: "Oni Abiodun Ebenezer",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oni Abiodun Ebenezer — Keyboardist · Producer",
    description:
      "Nigerian keyboardist & music producer. UK Tour January – July 2027.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
