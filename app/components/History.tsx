"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const History = () => {
  const [storedUrls, setStoredUrls] = useState([]); // Initialize as empty array
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "dark" ? systemTheme : theme;

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (currentTheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [currentTheme]);

  // Fetch URLs from localStorage when the component mounts
  useEffect(() => {
    getUrls();
  }, [storedUrls]);

  const getUrls = () => {
    const storedUrlsJSON = localStorage.getItem("urlList");
    if (storedUrlsJSON) {
      setStoredUrls(JSON.parse(storedUrlsJSON));
    }
  };

  const handlePreview = (url) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${url}`;
    window.open(fullUrl, "_blank");
  };

  // Utility function to truncate long URLs
  const truncateUrl = (url, maxLength = 30) => {
    if (url.length > maxLength) {
      return url.substring(0, maxLength) + "...";
    }
    return url;
  };

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-4 overflow-hidden">
        History ;)
      </h1>

      <AnimatePresence>
        {storedUrls.length > 0 ? (
          storedUrls
            .slice() // Create a copy of the array to avoid mutating the original state
            .reverse() // Reverse the array order
            .map((urlObj, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className={`w-full mb-4 pl-6 pr-3 py-2 flex items-center justify-between ${
                  darkMode
                    ? "text-white bg-gray-800"
                    : "text-black bg-neutral-400/45 "
                } rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 
             `}
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    <span className="font-bold text-base text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-8 pb-4">
                      Shortened URL:
                    </span>{" "}
                    {process.env.NEXT_PUBLIC_FRONTEND_URL}/{urlObj.shortenedUrl}
                  </p>
                  <p className="text-sm font-medium text-white">
                    <span className="font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-8 pb-4">
                      Orignal URL:
                    </span>{" "}
                    {truncateUrl(urlObj.longUrl)}
                  </p>
                </div>
                <button
                  className="my-1 px-6 py-2 bg-blue-600 dark:bg-blue-700 rounded-full text-white hover:bg-blue-500 dark:hover:bg-blue-600"
                  type="submit"
                  onClick={() => handlePreview(urlObj.shortenedUrl)}
                >
                  Preview
                </button>{" "}
              </motion.div>
            ))
        ) : (
          <p className="text-gray-500">No URLs found in history.</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;
