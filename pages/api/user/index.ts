import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { GetSession, verifySession } from "@/services/user.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async ( req : NextApiRequest, res : NextApiResponse) => {
    if(req.method === "POST"){
        const receivedSessionID = req.body?.session;
        const session = prisma.session.findFirst({
            where : {
                id : receivedSessionID
            }
        })
        if (!session) {
            return res.status(400).json({error:true, message:"session not found"});
        }
    }
}

export default handler;