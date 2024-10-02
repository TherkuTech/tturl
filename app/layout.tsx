import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tturl",

  description: "Shorten URLs in one click",
  keywords: "URL shortener, shorten URLs, free URL shortener",
  icons: "/assests/logo.png", 
  openGraph: {
    title: "tturl",
    description: "Shorten URLs in one click",
    url: "https://tturl.netlify.app",
    type: "website",
    siteName: "tturl",
    images: [
      {
        url: "https://tturl.netlify.app/og-image.jpg", 
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
        <meta property="og:url" content="https://tturl.netlify.app" />
        <meta property="og:image" content="https://tturl.netlify.app/og-image.jpg" />
        <meta name="description" content="TTURL - One Click URL Shortener." />
        <meta name="keywords" content="URL shortener, shorten URLs, free URL shortener" />
        <title>tturl</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
