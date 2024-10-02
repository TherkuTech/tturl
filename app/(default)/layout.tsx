import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "url-shortener",
  description: "shorten urls in one click",
  icons: {
    icon: "/assests/logo.png",
  },
};


const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center bg-[#ece9e4]'>
        <div className='p-4 bg-white rounded-lg'>
            {children}
        </div>
    </div>
  )
}

export default layout