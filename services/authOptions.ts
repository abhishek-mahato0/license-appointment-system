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
          async jwt({ token, user, trigger, session }) {
            // if(trigger === 'update' && session?.citizenship_id){
            //   console.log("triggered")
            //   token.citizenship_id=session.citizenship_id;
            // }
          if(token && user){
            token.id = user.id;
            token.jwt = user.token;
            token.role=user.role;
            token.citizenship_id=user.citizenship_id;
            token.license_id=user.license_id;
            token.information_id=user.information_id;
          }
            return token;
          },
      
          async session({ session, token, trigger, newSession }) {
            // if (trigger === "update" && newSession?.citizenship_id) {
            //     session.user.citizenship_id = newSession.citizenship_id;
            // }
           if(session.user && token){
            session.user.id=token.id;
            session.user.token=token.jwt
            session.user.role=token.role;
            session.user.citizenship_id=token.citizenship_id;
            session.user.license_id=token.license_id;
            session.user.information_id=token.information_id;
           }
            return session;
          },
        },   
  }