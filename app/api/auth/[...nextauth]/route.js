import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "../../../lib/schemas/UserSchema";
import { makeSureDbIsReady } from "../../../lib/db";
import Github from "next-auth/providers/github";

export const authOptions = {
	session: {
		strategy: "jwt",
	},

	providers: [
		Github({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
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
						user.password,
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
		async signIn({ account, profile }) {
			if (account?.provider === "github") {
				await makeSureDbIsReady();

				let user = await User.findOne({ email: profile?.email });

				if (!user) {
					user = await User.create({
						email: profile?.email,
						username: profile?.login,
						image: profile?.avatar_url,
					});
				}

				account.userId = user._id.toString();
			}

			return true;
		},
		async jwt({ token, user, account }) {
			// For credentials login
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.image = user.image || "";
			}

			// For GitHub login 
			if (account?.userId) {
				token.id = account.userId; // This is now MongoDB _id
				token.email = token.email || account.userId;
			}

			return token;
		},

		async session({ session, token }) {
			if (token) {
				session.user = {
					id: token.id || token._id,
					email: token.email,
					name: token.name,
					image: token.image,
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
