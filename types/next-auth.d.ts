import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      email: string;
      password: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
    /** OpenID Access Token */
    accessToken?: string;
    /** OpenID Refresh Token */
    refreshToken?: string;
    /** OpenID ID Token payload */
    idTokenPayload?: object;
    /** OpenID Access Token payload */
    accessTokenPayload?: object;
    /** OpenID Refresh Token payload */
    refreshTokenPayload?: object;
  }
}
