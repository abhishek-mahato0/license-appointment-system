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
          async authorize(credentials:any) {
            if(credentials){
                return credentials
            }else{
              return null
            }
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
      callbacks: {
          async jwt({ token, user }) {
          if(token && user){
            token.jwt = user.jwt;
            token.role=user.role;
          }
            return token;
          },
      
          async session({ session, token }) {
           if(session.user && token){
            session.user.jwt=token.jwt
            session.user.role=token.role;
           }
            return session;
          },
        },   
  }