import React from "react";
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
    <div className="flex justify-center items-center bg-[#ece9e4]">
      {children}
    </div>
  );
};

export default layout;
