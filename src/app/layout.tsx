import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import ASide from "@/components/global/aside/ASide";
import Providers from "./Providers";

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Roadmap Tracking",
  description: "Generate and custom your future learning roadmap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${googleSansCode.variable} antialiased flex`}>
        <Providers>
          <ASide />
          <main className="p-8 bg-background flex-1 overflow-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
