import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ledgr",
  description: "Ledgr Lead Capture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${dmSans.variable} bg-brand-surface text-brand-navy antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
