import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Fresh Cart credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();


        if (res.ok && user.message === "success") {

          return {
            id: user.user.email, 
            name: user.user.name,
            email: user.user.email,
            token: user.token, 
          };
        }

     
        return null;
      },
    }),
  ],
  callbacks: {

   jwt: function (param: any) {

      if (param.user) {

        param.token.routeToken = param.user.token;
      }
      
      console.log('wareny el jwt parameter', param);
      
      return param.token; 
    },

  
    session: function (param: any) {

      param.session.accessToken = param.token.routeToken;
      
      return param.session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, 
};