"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { MdDelete } from "react-icons/md";
import { Modal, Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import useLocalStorage from "../hooks/useLocalStorage"; // Import the custom hook
import preview from "@/assets/preview.svg"
import copy from "@/assets/copy.svg"
import toast from "react-hot-toast";

interface UrlObject {
  shortenedUrl: string;
  longUrl: string;
}

const History = () => {
  const { storedUrls, removeUrl } = useLocalStorage("urlList"); // Use the custom hook
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "dark" ? systemTheme : theme;
  const [client, setClient] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null); // Store URL to delete

  const handlePreview = (url: string) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${url}`;
    window.open(fullUrl, "_blank");
  };

  useEffect(()=>{
    setClient(true)
  },[])

  const copyToClipboard = (shortenedUrl : string) => {
    if (!shortenedUrl) return;
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${shortenedUrl}`
    );
    toast.success("Copied to clipboard");

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

  if (!client) return null;

  return (
    <div className="mt-6 sm:w-[90%] w-full m-auto">
      <div className="flex justify-between items-center mb-2">
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
                className={`w-full mb-4 pl-6 pr-3 py-2 flex items-center justify-between ${ "text-black bg-[#D1D5DE]"
                } rounded-2xl outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <div className="p-2">
                  <p className="text-sm font-medium text-black truncate w-[70%]">
                    {urlObj.longUrl}
                  </p>
                  <p className="text-sm font-medium text-black">
                    <span className="font-bold text-base text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-8 pb-4">
                      Shortened URL:
                    </span>{" "}
                    {process.env.NEXT_PUBLIC_FRONTEND_URL}/{urlObj.shortenedUrl}
                  </p>
                </div>
                <div className="flex justify-between w-[120px] items-center">
                  <button
                    className="my-1 p-2 bg-blue-600 dark:bg-blue-700 rounded-full text-white hover:bg-blue-500 dark:hover:bg-blue-600"
                    type="submit"
                    onClick={() => handlePreview(urlObj.shortenedUrl)} >
                    <Image src={preview} alt="preview" width={15} height={15} />
                  </button>
                  <button
                    className="my-1 p-2 bg-blue-600 dark:bg-blue-700 rounded-full text-white hover:bg-blue-500 dark:hover:bg-blue-600"
                    onClick={() => copyToClipboard(urlObj.shortenedUrl)} >
                    <Image src={copy} alt="copy" width={15} height={15} />
                  </button>
                  <MdDelete
                    className="cursor-pointer text-3xl text-red-600 mr-1"
                    title="delete"
                    onClick={() => openModal(urlObj.shortenedUrl)}
                  />
                </div>
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
