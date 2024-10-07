import { useEffect, useState } from 'react';

const languages = ["Hello", "வணக்கம்", "नमस्ते", "Hola", "Bonjour", "Hallo", "Ciao", "こんにちは", "안녕하세요", "你好", "Olá", "Здравствуйте"];

const Filler = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='w-full flex flex-col justify-center items-center gap-4'>
      <div className=' text-4xl '>
          {languages[currentIndex]}
      </div>
      <div className='text-md text-[#828282]'>Loading...</div>
    </div>
  );
};

export default Filler;
