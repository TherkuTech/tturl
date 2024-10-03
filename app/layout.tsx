import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import BackgroundProvider from "@/providers/backgroundProvider";
import Navbar from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tturl",
  description: "shorten urls in one click",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <BackgroundProvider>{children}</BackgroundProvider>
      </body>
    </html>
  );
}
