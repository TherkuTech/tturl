"use client";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import copy_svg from "../../public/copy-svgrepo-com.svg";
import axios from "axios";
import Spinner from "@/components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import "../globals.css";
import { useTheme } from "next-themes";
import History from "../components/History";
import useLocalStorage from "../hooks/useLocalStorage";
import QrCode from "qrcode";

interface StoredUrl {
    longUrl: string;
    shortenedUrl: string;
}

export default function Home() {
    const [longUrl, setLongUrl] = useState<string>("");
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
    const [Loading, setLoading] = useState<boolean>(false);
    const [isLongUrlEmpty, setIsLongUrlEmpty] = useState<boolean>(false);
    const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const SIZE: number = 380;

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

            // Store the generated short URL with the original long URL in local storage
            storeUrlInLocalStorage(longUrl, newShortenedUrl);
        } catch (err) {
            toast.error("Couldn't generate now. Please try again later");
        }
        setLoading(false);
    };

    const storeUrlInLocalStorage = (
        longUrl: string,
        shortenedUrl: string
    ): void => {
        const storedUrlsJSON = localStorage.getItem("urlList");
        let storedUrls: StoredUrl[] = [];

        if (storedUrlsJSON) {
            storedUrls = JSON.parse(storedUrlsJSON);
        }
      
        const newUrl: StoredUrl = { longUrl, shortenedUrl };

        if (!storedUrls.some((url) => url.shortenedUrl === shortenedUrl)) {
            const updatedUrls = [...storedUrls, newUrl];
            localStorage.setItem("urlList", JSON.stringify(updatedUrls));
        }
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

    // Function to validate url
    const isValidUrl = (url: string): boolean => {
        const urlPattern = new RegExp(
            "^(https?:\\/\\/)" + // Protocol
                "([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}|\\[[0-9a-fA-F:.]+\\])", // Domain
            "i"
        );
        return !!urlPattern.test(url);
    };

    const generateQR = async () => {
        if (shortenedUrl) {
            const url = shortenedUrl;
            const qrCodeDataUrl = await QrCode.toDataURL(url, {
                width: SIZE,
            });
            setQrCodeData(qrCodeDataUrl);
        }
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
                <div
                    className={`mb-3 pl-1 text-${
                        darkMode ? "white/70" : "black/70"
                    }`}
                >
                    Your shortened URL:
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
                                // Additional logic for valid URL
                            } else {
                                console.log("Invalid URL");
                                // Handle invalid URL
                            }
                        }}
                    />
                    <button
                        className="absolute h-10 w-30 flex justify-center items-center right-0  top-0 my-1 mr-1 px-6 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition duration-150"
                        type="submit"
                    >
                        {Loading ? <Spinner /> : "Shorten Now!"}
                    </button>
                </div>

                <div className="flex flex-col gap-3 mt-6">
                    <div
                        className={`pl-1 text-${
                            darkMode ? "white/70" : "black/70"
                        }`}
                    >
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
                    <button
                        className="h-10 w-30 flex justify-center items-center right-0  top-0 my-1 mr-1 px-6 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-500 transition duration-150"
                        onClick={generateQR}
                    >
                        {Loading ? <Spinner /> : "Generate QR!"}
                    </button>
                </div>
                <Toaster position="top-right" />
            </form>
            <History />
            {qrCodeData && (
                <div
                    className={`absolute top-0 left-0 w-full h-full ${
                        darkMode ? "bg-black" : "bg-white"
                    } bg-opacity-65`}
                >
                    <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max h-max ${
                            darkMode ? "bg-gray-900" : "bg-white"
                        } border-2 border-${
                            !darkMode ? "gray-900" : "white"
                        } rounded-xl flex flex-col items-center justify-between gap-4 overflow-hidden p-4 `}
                    >
                        <div
                            className={`w-full flex justify-between items-center gap-5 text-2xl font-medium text-${
                                darkMode ? "white" : "black/70"
                            }`}
                        >
                            Your QR Code
                            <img
                                width="32"
                                height="32"
                                src="https://img.icons8.com/ffffff/sf-black-filled/64/x.png"
                                alt="x"
                                className="bg-rose-500 p-1 rounded-full hover:cursor-pointer"
                                onClick={() => setQrCodeData("")}
                            />
                        </div>
                        <Image
                            src={qrCodeData}
                            alt="Generated QR Code"
                            width={SIZE}
                            height={SIZE}
                            className="rounded"
                        />

                        <div className="flex gap-5">
                            <a
                                download
                                href={qrCodeData}
                                className="bg-sky-500 px-4 py-3 rounded text-white"
                            >
                                Download QR Code
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
