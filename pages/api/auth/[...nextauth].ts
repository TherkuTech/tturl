import NextAuth, { Awaitable, RequestInternal, User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      }
    }),
  ],
  callbacks :{
    async jwt(token: { id: any; }, user: { id: any; }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session: { id: any; }, user: { id: any; }) {
      session.id = user.id;
      return session;
    },
  },
  session: {
    strategy: 'database',
    maxAge: 7 * 24 * 60 * 60,
  },
}

