// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

interface StoredUrl {
  longUrl: string;
  shortenedUrl: string;
}

const useLocalStorage = (key: string) => {
  const [storedUrls, setStoredUrls] = useState<StoredUrl[]>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading local storage:", error);
      return [];
    }
  });

  const saveUrls = (newUrl: StoredUrl) => {
    const updatedUrls = [...storedUrls, newUrl];
    setStoredUrls(updatedUrls);
    localStorage.setItem(key, JSON.stringify(updatedUrls));
  };

  const updateUrl = (shortenedUrl: string, longUrl: string) => {
    const updatedUrls = storedUrls.map(url =>
      url.shortenedUrl === shortenedUrl ? { longUrl, shortenedUrl } : url
    );
    setStoredUrls(updatedUrls);
    localStorage.setItem(key, JSON.stringify(updatedUrls));
  };

  const removeUrl = (shortenedUrl: string) => {
    const updatedUrls = storedUrls.filter(url => url.shortenedUrl !== shortenedUrl);
    setStoredUrls(updatedUrls);
    localStorage.setItem(key, JSON.stringify(updatedUrls));
  };

  const clearUrls = () => {
    setStoredUrls([]);
    localStorage.removeItem(key);
  };

  return { storedUrls, saveUrls, updateUrl, removeUrl, clearUrls };
};

export default useLocalStorage;
