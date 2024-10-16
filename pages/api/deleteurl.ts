import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { shortUrl } = req.body;

    if (!shortUrl) {
      return res
        .status(400)
        .json({ error: true, message: "shortUrl is required" });
    }

    try {
      const updatedUrl = await prisma.url.updateMany({
        where: {
          shortUrl: shortUrl,
        },
        data: {
          deleted: true,
        },
      });

      if (updatedUrl.count === 0) {
        return res.status(404).json({ error: true, message: "URL not found" });
      }

      return res
        .status(200)
        .json({ error: false, message: "URL marked as deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: true, message: "Method Not Allowed" });
  }
}
