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
      <body className={`${inter.className} flex flex-col min-h-screen bg-cover bg-[url('../assets/bg.svg')]`}>
          <div className="">
            <main className="max-w-[600px] w-full mx-auto">{children}</main>
          </div>
      </body>
    </html>
  );
}
