// hooks/useLocalStorage.ts
"use client"
import { useState, useEffect } from 'react';

interface StoredUrl {
  longUrl: string;
  shortenedUrl: string;
}

const useLocalStorage = (key: string) => {
  const [storedUrls, setStoredUrls] = useState<StoredUrl[]>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading local storage:", error);
      return [];
    }
  });

  const saveUrls = (newUrl: StoredUrl) => {
    const updatedUrls = [...storedUrls, newUrl];
    setStoredUrls(updatedUrls);
    window.localStorage.setItem(key, JSON.stringify(updatedUrls));
  };

  const updateUrl = (shortenedUrl: string, longUrl: string) => {
    const updatedUrls = storedUrls.map(url =>
      url.shortenedUrl === shortenedUrl ? { longUrl, shortenedUrl } : url
    );
    setStoredUrls(updatedUrls);
    window.localStorage.setItem(key, JSON.stringify(updatedUrls));
  };

  const removeUrl = (shortenedUrl: string) => {
    const updatedUrls = storedUrls.filter(url => url.shortenedUrl !== shortenedUrl);
    setStoredUrls(updatedUrls);
    window.localStorage.setItem(key, JSON.stringify(updatedUrls));
  };

  const clearUrls = () => {
    setStoredUrls([]);
    window.localStorage.removeItem(key);
  };

  return { storedUrls, saveUrls, updateUrl, removeUrl, clearUrls };
};

export default useLocalStorage;
