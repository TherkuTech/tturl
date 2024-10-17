import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import ThemeProvider from "./provider";
import bg from '../assets/bg.svg'

const inter = Inter({ subsets: ["latin"] });

// fallback url
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tturl.netlify.app";

export const metadata: Metadata = {
  // ... (metadata remains unchanged)
};
<body className={`${inter.className} flex flex-col min-h-screen overflow-hidden`}> </body>
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* ... (head content remains unchanged) */}</head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-[url('../assets/bg.svg')]`}>
          <div className="fixed inset-0 z-0">
              {/* This empty fragment ensures the children prop is provided */}
          </div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
          </div>
      </body>
    </html>
  );
}
