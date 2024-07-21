'use client';
import Image from "next/image";
import { useState } from "react";
import copy from '../../public/copy-svgrepo-com.svg'
import axios from 'axios';

export default function Home() {

  const [longUrl, setLongUrl] = useState<string>('');
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    try{
      const response  = await axios.post('/api/inserturl', {longUrl},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      setShortenedUrl(response.data.data);
    }
    catch(err){
      console.log(err);
    }
  }

  // psql "postgres://default:Gg2QcqSPF9Ll@ep-proud-salad-a147aj8o.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"
  return (
    <div>
      <div className="text-xl text-center">Url Shortener</div>
      <div className=" font-thin">Shorten your long URLs with one click</div>
      <div className="mt-4 flex gap-2 flex-col">
        <input className="border border-[#c0c0c0] outline-none p-2 w-full h-[40px] rounded-lg"
          onChange={(e)=>setLongUrl(e.target.value)}
        />
        <button className="bg-black text-[#f3f4f5] h-[40px] w-full rounded-lg"
          onClick={()=>handleGenerate()}
        >
          Generate
        </button>
      </div>
      <div className="p-1 flex flex-col gap-2">
          <div className="text-gray-500 mt-4">Your shortened URL:</div>
          <div className="w-full h-[40px] rounded-lg p-2 flex justify-center items-center bg-gray-100">
            <div className="w-[240px] truncate">
              {
                shortenedUrl ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${shortenedUrl}` : <span className="text-[#c0c0c0]">https://example.com/aadfasdfasdfasdfasdf</span>
              }
            </div>
            <button className="w-[10%] m-2 flex justify-end">
              <Image src={copy} alt = "copy" className="h-[20px] w-[20px]"/>
            </button>
          </div>
      </div>
    </div>
  );
}
