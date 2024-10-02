"use client";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import copy_svg from "../../public/copy-svgrepo-com.svg";
import axios from "axios";
import Spinner from "@/components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import "../globals.css";

export default function Home() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [Loading, setLoading] = useState<boolean>(false);
  const [isLongUrlEmpty, setIsLongUrlEmpty] = useState<boolean>(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState<boolean>(false);

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!longUrl) {
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
      setShortenedUrl(response.data.data);
      toast.success("Your URL has been shortened successfully.");
    } catch (err) {
      toast.error("Couldnt generate now. Please try again later");
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

  return (
    <form
      onSubmit={(e) => {
        handleGenerate(e);
      }}
    >
      <div className="text-xl text-center">Url Shortener</div>
      <div className=" font-thin">Shorten your long URLs with one click</div>
      <div className="mt-4 flex gap-2 flex-col">
        <input
          className={`border border-[#c0c0c0] p-2 w-full h-[40px] rounded-lg ${
            isLongUrlEmpty ? "shake" : "outline-none"
          }`}
          onChange={(e) => {
            setLongUrl(e.target.value);
            setCopiedToClipboard(false);
            setIsLongUrlEmpty(false);
          }}
        />
        <button
          className="bg-black text-[#f3f4f5] h-[40px] w-full rounded-lg"
          type="submit"
        >
          {Loading ? <Spinner /> : "Generate"}
        </button>
      </div>
      <div className="p-1 flex flex-col gap-2">
        <div className="text-gray-500 mt-4">Your shortened URL:</div>
        <div
          className={`w-full h-[40px] rounded-lg p-2 flex justify-center items-center bg-gray-100 
            ${
              shortenedUrl
                ? "border border-blue-400"
                : "border border-transparent"
            }  ${
            copiedToClipboard
              ? "border border-green-400"
              : "border border-transparent"
          }`}
        >
          <div className="w-[240px] truncate">
            {shortenedUrl ? (
              `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${shortenedUrl}`
            ) : (
              <span className="text-[#c0c0c0]">
                https://example.com/aadfasdfasdfasdfasdf
              </span>
            )}
          </div>
          <button
            className="w-[10%] m-2 flex justify-end"
            onClick={() => copyToClipboard()}
            type="button"
          >
            <Image src={copy_svg} alt="copy" className="h-[20px] w-[20px]" />
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
    </form>
  );
}
