import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertUrl(longUrl: string, shortUrl: string) {
    try {
      const newUrl = await prisma.url.create({
        data: {
          longUrl,
          shortUrl,
        },
      });
      console.log('Inserted URL:', newUrl);
      return newUrl;
    } catch (error) {
      console.error('Error inserting URL:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

export default insertUrl;
