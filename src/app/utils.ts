import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export default async function decodeAuthenticatedUserToken(): Promise<string | null> {
  const cookie = await cookies();
  const nextAuthToken = cookie.get("next-auth.session-token")?.value || cookie.get("__Secure-next-auth.session-token")?.value;

  //DECODE
  const jwtResponse = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: nextAuthToken!,
  });

  if (jwtResponse) {
    return jwtResponse.routeToken as string;
  } else {
    return null;
  }
}
