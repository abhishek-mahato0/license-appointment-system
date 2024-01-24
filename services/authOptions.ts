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
            token.jwt = user.token;
            token.role=user.role;
            token.document_id=user.document_id;
            token.information_id=user.information_id;
          }
            return token;
          },
      
          async session({ session, token }) {
           if(session.user && token){
            session.user.token=token.jwt
            session.user.role=token.role;
            session.user.document_id=token.document_id;
            session.user.information_id=token.information_id;
           }
            return session;
          },
        },   
  }