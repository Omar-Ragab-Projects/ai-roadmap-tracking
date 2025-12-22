import type { Metadata } from "next";
import { Google_Sans_Code } from "next/font/google";
import "./globals.css";
import ASide from "@/components/global/aside/ASide";
import Providers from "./Providers";
import FocusPortal from "./_components/FocusPortal";
import MobileHeader from "./_components/MobileHeader";

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
          <main className="flex-1 overflow-auto">
            <MobileHeader />
            <div className="p-4 lg:p-8 max-lg:pb-[calc(2rem+57px)] max-lg:pt-14">
              {children}
            </div>
          </main>
          <FocusPortal />
        </Providers>
      </body>
    </html>
  );
}
