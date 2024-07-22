import { useEffect, useState } from 'react';

const languages = ["Hello", "வணக்கம்", "नमस्ते", "Hola", "Bonjour", "Hallo", "Ciao", "こんにちは", "안녕하세요", "你好", "Olá", "Здравствуйте"];

const Filler = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=' text-4xl'>
        {languages[currentIndex]}
    </div>
  );
};

export default Filler;
