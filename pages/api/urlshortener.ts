import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  isLongUrlExists,
  generateShortUrl,
} from "@/services/generateUrl.service";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { longUrl } = req.body;
    longUrl = longUrl.replace(/^https:\/\/(www\.)?/, ""); // Removes 'https://' or 'https://www.' if present
    if (!longUrl) {
      res.status(400).json({ error: true, message: "Missing longUrl" });
      return;
    }
    const isLongAvailable = await isLongUrlExists(longUrl);

    if (!isLongAvailable.error) {
      return res.status(200).json({ error: false, data: isLongAvailable.data });
    }

    try {
      const shortUrl = await generateShortUrl(longUrl);
      console.log("shortUrl", shortUrl);
      const newUrl = await prisma.url.create({
        data: {
          longUrl,
          shortUrl,
        },
      });
      return res.status(200).json({ error: false, data: newUrl.shortUrl });
    } catch (error: any) {
      return res.status(500).json({ error: true, message: error.message });
    }
  } else if (req.method === "GET") {
    const { shortUrl } = req.query;
    if (!shortUrl) {
      res.status(400).json({ error: true, message: "Missing shortUrl" });
      return;
    }
    const longUrl = await prisma.url.findMany({
      where: {
        shortUrl: shortUrl as string,
      },
    });
    if (longUrl.length === 0) {
      res.status(404).json({ error: true, message: "URL not found" });
      return;
    }
    return res.status(200).json({ error: false, data: longUrl[0].longUrl });
  } else {
    return res
      .status(405)
      .json({ error: true, message: "Method is not valid" });
  }
}
