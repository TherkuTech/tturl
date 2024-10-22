import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { GetSession, verifySession } from "@/services/user.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async ( req : NextApiRequest, res : NextApiResponse) => {
    if(req.method === "POST"){
        const {email, password} = req.body;
        const user = await prisma.user.findFirst({
            where : {
                email: email
            }
        })
        if (!user) {
            return res.status(400).json({error:true, message:"User not found !"});
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            res.status(400).json({error:true, message:"Invalid password"});
        }
        const session = await GetSession({ email, hashedPassword: password });
        const newSession = await prisma.session.create({data:{
            sessionToken: session,
            user : {
                connect: { id: user.id}
            }
        }})
        if(!newSession){
            return res.status(500).json({error:"true", message: "error while creating token"});
        }
        return res.status(200).json({error: false, message: "session created successfully ", session: newSession.id });
    }
    return res.status(400).json({error:true, message: "Invalid request method"})
}

export default handler;