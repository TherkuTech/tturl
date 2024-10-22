"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import copy from "@/assets/copy.svg"
import axios from "axios";
import Spinner from "@/components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import "../globals.css";
import { useTheme } from "next-themes";
import useLocalStorage from "../../hooks/useLocalStorage"; // Import the custom hook
import History from "@/components/History";
import SessionWrapper from "@/components/SessionWrapper";
import {useSession} from "next-auth/react"
import Cookies from 'js-cookie';
import QRCode from 'qrcode';

export default function Page () {
  return (
    <SessionWrapper><Home/></SessionWrapper>
  )
}

function Home() {

  const [longUrl, setLongUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLongUrlEmpty, setIsLongUrlEmpty] = useState<boolean>(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [isLogged, setIsLogged] = useState(false);
  const [qr, setQr] = useState('');

  useEffect(()=>{
    if(session === null){
      return;
    }
    if(session === undefined){
      IsValidUser();
      return;
    }
    else {
      setIsLogged(true);
      return;
    }
  },[session])

  const IsValidUser = async() =>{
    try{
      const response = await axios.post("api/user",{session: Cookies.get("session")});
      if(response?.data.error === true){
        setIsLogged(false)
        return;
      }
      setIsLogged(true);
      return;
    }
    catch(err){
      // toast.error("something went wrong ! please try again later");
      console.log(err);
    }
  }

  useEffect(()=>{
    console.log(isLogged)
  },[isLogged])

  // Use the custom hook
  const { saveUrls } = useLocalStorage("urlList");

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setQr("");

    if (!longUrl || !isValidUrl(longUrl)) {
      setIsLongUrlEmpty(true);
      setLoading(false);
      toast.error("Please enter a valid URL");
      return;
    }

    try {
      const response = await axios.post(
        "api/urlshortener",
        { longUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newShortenedUrl = response.data.data; // Get the shortened URL from response
      setShortenedUrl(newShortenedUrl);
      toast.success("Your URL has been shortened successfully.");
      QRCode.toDataURL(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${newShortenedUrl}`,{ scale: 20 }, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        setQr(url);  // Set the base64 image URL
      });
      // Store the generated short URL with the original long URL using the custom hook
      saveUrls({ longUrl, shortenedUrl: newShortenedUrl });
    } catch (err) {
      toast.error("Couldn't generate now. Please try again later");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!shortenedUrl) return;
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${shortenedUrl}`
    );
    toast.success("Copied to clipboard");
    setCopiedToClipboard(true);
  };

  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Function to validate URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      <form onSubmit={handleGenerate} className="w-full p-8">
        <div className="flex flex-col gap-3 mt-6">
          <div className={` pl-1 text-${"black/70"} text-lg sm:text-2xl w-full`}>
            Enter the URL to be shortened :
          </div>
          <div className="flex w-full h-12 text-lg rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-black bg-gray-800 placeholder-gray-400 ">
            <input
              type="url"
              placeholder="Enter the link here"
              className={`p-2 px-4 bg-transparent rounded-xl w-full outline-none text-white/70 placeholder-gray-400`}
              onChange={(e) => {
                const url = e.target.value;
                setLongUrl(url);
                setCopiedToClipboard(false);
                setIsLongUrlEmpty(false);

                if (isValidUrl(url)) {
                  console.log("Valid URL:", url);
                } else {
                  console.log("Invalid URL");
                }
              }}
            />
            <button
              className="relative h-10 w-[12rem] flex justify-center items-center right-0 text-sm top-0 my-1 mr-1 px-6 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition duration-150"
              type="submit"
            >
              {loading ? <Spinner /> : "Shorten Now!"}
            </button>
          </div>
        </div>


        <div className="flex flex-col gap-3 mt-6">
          <div className={`pl-1 text-${"black/70"} text-lg sm:text-2xl w-full`}>
            Your shortened URL :
          </div>
          <div
            className={`flex w-full h-12 rounded-xl items-center px-4 transition duration-150 ${darkMode ? "bg-gray-800" : "bg-neutral-400/45"
              } ${copiedToClipboard
                ? "border border-green-500"
                : "border border-gray-700"
              }`}
          >
            <div
              className={`w-[240px] truncate text-${darkMode ? "white/70" : "black/70"
                }`}
            >
              {shortenedUrl ? (
                `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${shortenedUrl}`
              ) : (
                <span className="text-gray-500">
                  https://example.com/aadfasdfasdfasdfasdf
                </span>
              )}
            </div>
            <button
              className="ml-auto flex justify-end"
              onClick={copyToClipboard}
              type="button"
            >
              <Image
                src={copy}
                alt="copy"
                className="h-5 w-5 dark:invert"
              />
            </button>
          </div>
        </div>
        { qr !=="" && <div className="flex flex-col gap-3 mt-6">
            <div className={`pl-1 text-${"black/70"} text-lg sm:text-2xl w-full`}>
              Your QR Code :
            </div>
            <Image src={qr} alt="qr code" width={100} height={100} className="w-full h-full"/>
          </div>
        }
        <Toaster position="top-right" />
      </form>
      <History isLogged = {isLogged}/>
    </>
  );
}
