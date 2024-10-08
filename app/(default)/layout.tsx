import React from "react";
import Navbar from "@/components/ui/navbar";
import BackgroundProvider from "@/providers/backgroundProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "url-shortener",
  description: "shorten urls in one click",
  icons: {
    icon: "/assests/logo.png",
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BackgroundProvider>
    <div className={`h-[100vh] w-[100vw] flex justify-center items-center px-10 lg:px-0 relative`}>
      <div className="fixed top-0 left-0"><Navbar/></div>
       <div className="rounded-lg">{children}</div>
    </div>  </BackgroundProvider>
  );
};

export default layout;
