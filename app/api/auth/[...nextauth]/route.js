import NextAuth from "next-auth";
import User from "../../../lib/schemas/UserSchema";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { makeSureDbIsReady } from "../../../lib/db";

const handler = NextAuth({
    session: {
        strategy: "jwt",
    }, 
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    await makeSureDbIsReady();
                    const user = await User.findOne({ email: credentials?.email });

                    if (!user) {
                        throw new Error("No user found with the provided email");
                    }

                    const isPasswordValid = await bcrypt.compare(credentials?.password, user.password);

                    if (!isPasswordValid) {
                        throw new Error("Invalid password");
                    }
                    return user;
                } catch {
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
              session.user = {
                email: token.email,
                name: token.name,
                image: token.picture,
              };
            }
            return session;
        }
    },

    pages: {
        signIn: "/login",
    },  
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };