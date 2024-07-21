'use client'
import Spinner from '@/components/Spinner';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'


interface LongUrlState {
    isValid: boolean;
    needToLoad: boolean;
}

const Page = ({params}: {params: {shorturl: string}}) => {

    const [longUrl, setLongUrl] = React.useState<LongUrlState>({isValid: false, needToLoad: true});
    const router = useRouter();

    const fetchUrl = async () => {
        try{
            const response = await axios.get(`api/urlshortener?shortUrl=${params.shorturl}`)
            console.log(response.data.data)
            const url = response.data.data;
            if(url.startsWith('http://www.' || url.startsWith('https://www.'))){
                window.location.href = response.data.data;
                setLongUrl({isValid: true, needToLoad: false})
                return
            }
            window.location.href = `http://www.${url}`;
            setLongUrl({isValid: true, needToLoad: false})
        }
        catch(err: any){
            console.log(err.message)
            setLongUrl({isValid: false, needToLoad: false})
        }
    }

    useEffect(()=>{
        fetchUrl()
    },[]);

  return (
    <div>
        {
            longUrl.needToLoad ? <Spinner/> : longUrl.isValid ? <p>Redirecting...</p> : <p>oops 404</p>
        }
    </div>
  )
}

export default Page