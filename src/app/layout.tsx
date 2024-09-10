// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import MobileHeader from "@/components/mobile-header";
import StoreProvider from "./store-provider";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/sections/footer-section/Footer";
import DesktopHeader from "@/components/hero/desktop-header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Getdirectholidays",
  description:
    "An innovative brand that has built a cutting edge go-to travel application for Flights, Hotels, and Carhire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <StoreProvider>
          <div className="mt-5 hidden px-5 lg:block">
            <DesktopHeader />
          </div>
          <div className="block lg:hidden">
            <MobileHeader />
          </div>
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
