import jwt from 'jsonwebtoken';

const GetSession = async (payload : {email : string, hashedPassword: string}) : Promise<string> => {
	const session = jwt.sign({ email: payload.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
	return session;
}

const verifySession = async (token : string) : Promise<string | object | null> => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded;
    } catch (error) {
        return null;
    }
}

export { GetSession, verifySession }
