import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { encode, decode } from 'next-auth/jwt';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ], callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@bindaddync.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
