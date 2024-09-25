/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Connection from "@/database/Connection";
import { User } from "@/database/auth.schema";

export const Options: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        Connection();
        if (!credentials) return null;
        const { email, password } = credentials;

        const user = await User.findOne({ email: email });
        if (user) {
          const check = user.password === password ? user : null;
          return check;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: "/api/auth/signIn",
    newUser: "/api/auth/signUp",
  },
};
