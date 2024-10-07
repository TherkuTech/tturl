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
<<<<<<< HEAD
    <div className={`h-[100vh] w-[100vw] flex justify-center items-center px-10 lg:px-0`}>
        <div className='rounded-lg'>
            {children}
        </div>
=======
    <div className={`h-[100vh] w-[100vw] flex justify-center items-center`}>
      <div className="rounded-lg">{children}</div>
>>>>>>> c2e7ae12bdcfb8051ee16c56cff0521f9d2ce943
    </div>
  );
};

export default layout;
