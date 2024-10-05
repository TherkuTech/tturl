import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import BackgroundProvider from "@/providers/backgroundProvider";
import Navbar from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

//fallback url
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tturl.netlify.app";

export const metadata: Metadata = {
  title: "tturl",
  description: "Shorten URLs in one click",
  keywords: "URL shortener, shorten URLs, free URL shortener",
  icons: {
    icon: "/assets/logo.png",
  },
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "tturl",
    description: "Shorten URLs in one click",
    url: baseUrl,
    type: "website",
    siteName: "tturl",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "tturl - Shorten URLs",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="tturl" />
        <meta property="og:description" content="TTURL - One Click URL Shortener." />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta name="description" content="TTURL - One Click URL Shortener." />
        <meta name="keywords" content="URL shortener, shorten URLs, free URL shortener" />
        <title>tturl</title>
      </head>
      
      <body className={inter.className}>
      <Navbar />
      <BackgroundProvider>{children}
      </BackgroundProvider>
      </body>
    </html>
  );
}
