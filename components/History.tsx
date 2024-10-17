"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { MdDelete } from "react-icons/md";
import { Modal, Box, Button, Typography } from "@mui/material";
import useLocalStorage from "../hooks/useLocalStorage"; // Import the custom hook

interface UrlObject {
  shortenedUrl: string;
  longUrl: string;
}

const History = () => {
  const { storedUrls, removeUrl } = useLocalStorage("urlList"); // Use the custom hook
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "dark" ? systemTheme : theme;

  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null); // Store URL to delete

  useEffect(() => {
    setDarkMode(currentTheme === "dark");
  }, [currentTheme]);

  const handlePreview = (url: string) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${url}`;
    window.open(fullUrl, "_blank");
  };

  // Utility function to truncate long URLs
  const truncateUrl = (url: string, maxLength = 30) => {
    if (url.length > maxLength) {
      return url.substring(0, maxLength) + "...";
    }
    return url;
  };

  // function to remove from localStorage and update field on backend
  const handleDeleteUrl = async (shortUrl: string) => {
    try {
      const response = await fetch("/api/deleteurl", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shortUrl }),
      });

      const result = await response.json();
      if (!result.error) {
        removeUrl(shortUrl); // Use the custom hook to update stored URLs
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to delete URL:", error);
    }
  };

  const openModal = (shortUrl: string) => {
    setUrlToDelete(shortUrl);
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false);
    setUrlToDelete(null);
  };

  const confirmDelete = () => {
    if (urlToDelete) {
      handleDeleteUrl(urlToDelete); // delete function
    }
    closeModal(); // Close the modal
  };

  return (
    <div className="mt-12 sm:w-[90%] w-full m-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-medium mb-4 overflow-hidden pl-2">
          History
        </h1>
        <button
          className="h-10 w-30 right-0 top-0 my-1 mr-1 px-6 py-2 bg-blue-600 dark:bg-blue-700 rounded-xl text-white hover:bg-blue-500 dark:hover:bg-blue-600 mb-3"
          type="submit"
          onClick={() => {
            localStorage.removeItem("urlList"); // Clear only the relevant item
            window.location.reload();
          }}
        >
          Clear All
        </button>
      </div>

      <AnimatePresence>
        {storedUrls.length > 0 ? (
          storedUrls
            .slice() // Create a copy of the array to avoid mutating the original state
            .reverse() // Reverse the array order
            .map((urlObj: UrlObject, index: number) => (
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
                } rounded-2xl outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <div className="p-4">
                  <p className="text-sm font-medium text-white">
                    <span className="font-bold text-base text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-8 pb-4">
                      Shortened URL:
                    </span>{" "}
                    {process.env.NEXT_PUBLIC_FRONTEND_URL}/{urlObj.shortenedUrl}
                  </p>
                  <p className="text-sm font-medium text-white">
                    <span className="font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-8 pb-4">
                      Original URL:
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
                </button>
                <MdDelete
                  className="cursor-pointer ml-2 text-2xl text-red-600"
                  title="delete"
                  onClick={() => openModal(urlObj.shortenedUrl)}
                />
              </motion.div>
            ))
        ) : (
          <p className="text-gray-500 pl-2">No URLs found in history.</p>
        )}
      </AnimatePresence>

      {/* Modal for delete confirmation */}
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          className="bg-white dark:bg-gray-800  rounded-lg"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: 24,
            p: 4,
          }}
        >

          <Typography
            id="modal-modal-description"
            className="text-black text-center"

          >
            Are you sure you want to delete this URL?
          </Typography>
          <Box className="flex justify-around mt-4">

            <Button variant="outlined" color="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={confirmDelete}
              sx={{ mr: 2 }}
              className="!bg-red-600"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default History;
