import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "../../../lib/schemas/UserSchema";
import { makeSureDbIsReady } from "../../../lib/db";

export const authOptions = {
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

          const user = await User.findOne({
            email: credentials?.email,
          });

          if (!user) {
            throw new Error("No user found");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // IMPORTANT: return safe object only
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
          };
        } catch (err) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };