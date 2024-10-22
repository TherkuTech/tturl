import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { GetSession, verifySession } from "@/services/user.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if ( req.method === "POST" ) {
        try{
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: true, message: "Missing email or password" });
            }
            const user = await prisma.user.findFirst({ where: { email } });
            if(user) {
                return res.status(400).json({ error: true, message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            if(!hashedPassword) {
                return res.status(500).json({ error: true, message: "Error hashing password" });
            }
            const newUser = await prisma.user.create({ data: { email, password: hashedPassword }});
            const session = await GetSession({ email, hashedPassword });
            const newSession = await prisma.session.create({data:{
                sessionToken: session,
                user : {
                    connect: { id: newUser.id}
                }
            }})
            if(!newSession){
                return res.status(500).json({error:"true", message: "error while creating token"});
            }
            return res.status(200).json({error: false, message: "session created successfully ", session: newSession.id });
        }
        catch(err){
            return res.status(500).json(err)
        }
    }
    return { error: true, message: "Invalid request" }
}

export default handler;