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
    <div className={`h-screen w-screen flex justify-center items-center px-10 lg:px-0 relative overflow-y-auto overflow-x-hidden`}>
      <div className=" absolute top-0 left-0 z-10"><Navbar/></div>
       <div className="rounded-lg mt-[10%]">{children}</div>
    </div>
  </BackgroundProvider>
  );
};

export default layout;
