import NextAuth from "next-auth"
import { Options } from "./AuthOptions"

const handler = NextAuth(Options)

export { handler as GET, handler as POST }