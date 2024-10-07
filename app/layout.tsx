import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Navbar from "@/components/ui/navbar";
import ThemeProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

// fallback url
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tturl.netlify.app";

export const metadata: Metadata = {
  // ... (metadata remains unchanged)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* ... (head content remains unchanged) */}</head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider>
          <div className="fixed inset-0 z-0">
            <BackgroundBeamsWithCollision className="w-full h-full">
              {/* This empty fragment ensures the children prop is provided */}
              <></>
            </BackgroundBeamsWithCollision>
          </div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
