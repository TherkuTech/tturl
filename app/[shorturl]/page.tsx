<<<<<<< HEAD
"use client";
import Spinner from "@/components/Spinner";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Filler from "@/components/Filler";
=======
'use client'
import Spinner from '@/components/Spinner';
import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Filler from '@/components/Filler';

>>>>>>> 49b7be252d469e8e5a7af0d29d9e50d21c02a155

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

<<<<<<< HEAD
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
=======
    const [longUrl, setLongUrl] = React.useState<LongUrlState>({isValid: false, needToLoad: true});
    const router = useRouter();

    const fetchUrl = useCallback(async () => {
        try {
          const response = await axios.get(`api/urlshortener?shortUrl=${params.shorturl}`);
          console.log(response.data.data);
          const url = response.data.data;
          if (url.startsWith('http://') || url.startsWith('https://')) {
            window.location.href = url;
            setLongUrl({ isValid: true, needToLoad: false });
          } else {
            window.location.href = `https://www.${url}`;
            setLongUrl({ isValid: true, needToLoad: false });
          }
        } catch (err: any) {
          console.log(err.message);
          setLongUrl({ isValid: false, needToLoad: false });
        }
      }, [params.shorturl]);

      useEffect(()=>{
        fetchUrl()
    },[fetchUrl]);
>>>>>>> 49b7be252d469e8e5a7af0d29d9e50d21c02a155

  return (
    <div>
      {!longUrl.needToLoad && !longUrl.isValid ? "Oops 404" : <Filler />}
    </div>
  );
};

export default Page;
