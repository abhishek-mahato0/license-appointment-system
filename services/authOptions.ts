import { apiinstance } from "@/services/Api";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:AuthOptions = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
          name: "Credentials",
          type: 'credentials',
          credentials:{},
          async authorize(credentials: any) {
              console.log(credentials)
              return null
              // const payload = {
              //     email: credentials?.email,
              //     pass: credentials?.pass
              // };
              // const res = await apiinstance.post("user/login", payload);
              // if (res.status == 200) {
              //     return res?.data?.user;
              // } else {
              //     return null;
              // }
          },
      })
      ],
      session:{
          strategy:'jwt'
      },
      secret:"aslkdjsalkdfasdf80980",
      pages:{
          signIn:'/login'
      },
      // callbacks: {
      //     async jwt({ token, user, account }) {
      //       if (account && user) {
      //         return {
      //           ...token,
      //           accessToken: user.token,
      //           refreshToken: user.refreshToken,
      //         };
      //       }
      
      //       return token;
      //     },
      
      //     async session({ session, token }) {
      //       session.user.accessToken = token.accessToken;
      //       session.user.refreshToken = token.refreshToken;
      //       session.user.accessTokenExpires = token.accessTokenExpires;
      
      //       return session;
      //     },
      //   },
      
  }