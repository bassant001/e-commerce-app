import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(request:NextRequest) {
const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
console.log("from middleware:", token);
if (!!token) {
  return NextResponse.next();
}
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
}
export const config = {
    matcher:["/cart","/checkout","/profile","/orders","/wishlist"]
}