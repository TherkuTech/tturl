import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { isLongUrlExists, generateShortUrl } from '@/services/generateUrl.service';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { longUrl } = req.body;

        if (!longUrl) {
            res.status(400).json({ error: true, message: 'Missing longUrl' });
            return;
        }

        const isLongAvailable = await isLongUrlExists(longUrl);

        if(!isLongAvailable.error){
            res.status(200).json({error: false, data: isLongAvailable.data});
        }
  
      try {
        const shortUrl = await generateShortUrl(longUrl);
        const newUrl = await prisma.url.create({
          data: {
            longUrl,
            shortUrl,
          },
        });
        res.status(200).json({error: false, data: newUrl});
      } catch (error: any) {
        console.error('Error inserting URL:', error);
        res.status(500).json({ error: true, message: error.message });
      } finally {
        await prisma.$disconnect();
      }
    } else {
      res.status(405).json({ error: true, message: 'Method not allowed' });
    }
  }