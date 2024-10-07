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
      // const response = await axios.get(
      //   `api/urlshortener?shortUrl=${params.shorturl}`
      // );
      // console.log(response.data.data);
      // const url = response.data.data;
      // if (url.startsWith("http://") || url.startsWith("https://")) {
      //   window.location.href = url;
      //   setLongUrl({ isValid: true, needToLoad: false });
      //   return;
      // } else {
      //   window.location.href = `https://www.${url}`;
      //   setLongUrl({ isValid: true, needToLoad: false });
      // }
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
      {!longUrl.needToLoad && !longUrl.isValid ? "Oops 404" : <Filler />}
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
