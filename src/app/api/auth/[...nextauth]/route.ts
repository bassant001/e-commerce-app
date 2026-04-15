import NextAuth from "next-auth";
import { nextAuthConfig } from "_/next_auth/nextauth.config";

const handler = NextAuth(nextAuthConfig);
export { handler as GET, handler as POST };