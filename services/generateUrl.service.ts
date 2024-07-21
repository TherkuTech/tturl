import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Response {
    error: boolean;
    data: any | null;
}

const isLongUrlExists = async (longUrl: string): Promise<Response> => {
    const response: Response = {
        error: false,
        data: null,
    };
    try {
        const url = await prisma.url.findFirst({ where: { longUrl } });
        if (url) {
            response.error = false;
            response.data = url?.shortUrl;
        }
        else{
            response.error = true;
            response.data = null;
        }
    } catch (err: any) {
        response.error = true;
        response.data = err.message;
    }
    return response;
}

const generateShortUrl = async (longUrl: string): Promise<string> => {
    let shortUrl = Math.random().toString(36).substring(6);
    while (await prisma.url.findFirst({ where: { shortUrl } })) {
        shortUrl = Math.random().toString(36).substring(6);
    }
    return shortUrl;
}

export { isLongUrlExists, generateShortUrl };