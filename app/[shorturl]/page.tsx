"use client";
import Spinner from "@/components/Spinner";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Filler from "@/components/Filler";
import Link from "next/link";

interface LongUrlState {
  isValid: boolean;
  needToLoad: boolean;
}

const Page = ({ params }: { params: { shorturl: string } }) => {
  const [longUrl, setLongUrl] = React.useState<LongUrlState>({
    isValid: false,
    needToLoad: true,
  });
  const router = useRouter();

  const fetchUrl = async () => {
    try {
      const response = await axios.get(
        `api/urlshortener?shortUrl=${params.shorturl}`
      );
      console.log(response.data.data);
      const url = response.data.data;
      if (url.startsWith("http://") || url.startsWith("https://")) {
        window.location.href = url;
        setLongUrl({ isValid: true, needToLoad: false });
        return;
      } else {
        window.location.href = `https://www.${url}`;
        setLongUrl({ isValid: true, needToLoad: false });
      }
    } catch (err: any) {
      console.log(err.message);
      setLongUrl({ isValid: false, needToLoad: false });
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center text-black bg-[#f4f5f6] relative">
      {!longUrl.needToLoad && !longUrl.isValid ? (
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">Oops! Page Not Found</h1>
          <p className="mb-6">The short URL you're trying to access doesn't exist or has expired. Don't worry, it happens to the best of us!</p>
          <div className="flex justify-center space-x-4">
            <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Go to Homepage
            </Link>
            <button
              onClick={fetchUrl}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <Filler />
      )}
      <div className="absolute bottom-2 flex gap-2">
        <div className=" opacity-50">
          TTurl is an open-source project of
        </div>
        <Link href="https://github.com/TherkuTech/tturl" className=" text-blue-700">Therku Tech</Link>
      </div>
    </div>
  );
};

export default Page;
