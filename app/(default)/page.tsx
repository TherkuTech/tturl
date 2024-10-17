"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import copy_svg from "../../public/copy-svgrepo-com.svg";
import axios from "axios";
import Spinner from "@/components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import "../globals.css";
import { useTheme } from "next-themes";
import useLocalStorage from "../../hooks/useLocalStorage"; // Import the custom hook

export default function Home() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLongUrlEmpty, setIsLongUrlEmpty] = useState<boolean>(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);

  // Use the custom hook
  const { saveUrls } = useLocalStorage("urlList");

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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

  useEffect(() => {
    // Force dark mode on initial load
    setTheme("dark");
  }, [setTheme]);

  // Function to validate URL
  const isValidUrl = (url: string): boolean => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)" + // Protocol
        "([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}|\\[[0-9a-fA-F:.]+\\])", // Domain
      "i"
    );
    return !!urlPattern.test(url);
  };

  return (
    <div
      className={`relative transition-colors duration-150 max-w-[600px] bg-${
        darkMode ? "gray-900" : "white"
      } text-${darkMode ? "white" : "black"}`}
    >
      <h1 className="text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-8 pb-4 text-center">
        Shorten Your Long Url <br /> in one click
      </h1>

      <form onSubmit={handleGenerate}>
        <div className={`mb-3 pl-1 text-${darkMode ? "white/70" : "black/70"}`}>
            Enter the URL to be shortened:
        </div>
        <div className="relative w-full max-w-xl">
          <input
            type="url"
            placeholder="Enter the link here"
            className={`w-full px-6 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ${
              darkMode
                ? "text-white/70 bg-gray-800 placeholder-gray-400"
                : "text-black bg-neutral-400/45 placeholder-gray-500"
            }`}
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
            className="relative h-10 w-22 flex justify-center items-center right-0  top-0 my-1 mr-1 px-6 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition duration-150"
            type="submit"
          >
            {loading ? <Spinner /> : "Shorten Now!"}
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <div className={`pl-1 text-${darkMode ? "white/70" : "black/70"}`}>
            Your shortened URL:
          </div>
          <div
            className={`flex w-full h-12 rounded-xl items-center px-4 transition duration-150 ${
              darkMode ? "bg-gray-800" : "bg-neutral-400/45"
            } ${
              copiedToClipboard
                ? "border border-green-500"
                : "border border-gray-700"
            }`}
          >
            <div
              className={`w-[240px] truncate text-${
                darkMode ? "white/70" : "black/70"
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
                src={copy_svg}
                alt="copy"
                className="h-5 w-5 dark:invert"
              />
            </button>
          </div>
        </div>
        <Toaster position="top-right" />
      </form>
    </div>
  );
}
