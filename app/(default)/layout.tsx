import React from "react";
import Navbar from "@/components/ui/navbar";
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
    <div className={`min-h-screen flex flex-col overflow-y-auto overflow-x-hidden`}>
        <div className=" absolute"><Navbar/></div>
        <h1 className=" text-4xl sm:text-6xl mt-[8rem] font-medium text-center w-full">
          Shorten Long Urls <br /> in <span className="text-blue-500">one</span> click
        </h1>
       <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
