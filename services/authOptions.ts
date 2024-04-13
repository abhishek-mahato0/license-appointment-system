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
      secret:process.env.NEXTAUTH_SECRET,
      pages:{
          signIn:'/login'
      },
      callbacks: {
          async jwt({ token, user, trigger, session }) {
            if(trigger === 'update'){
                if(session?.hasApplied){
                   token.hasApplied=session.hasApplied
                }else if (session?.citizenship_id){
                  token.citizenship_id=session.citizenship_id
                }else if(session?.license_id){
                  token.license_id=session.license_id
                }else if(session?.information_id){
                  token.information_id=session.information_id
                }
                null;
            }
          if(user){
            return{
              ...token,
            id : user.id,
            jwt : user.token,
            role:user.role,
            citizenship_id:user.citizenship_id,
            license_id:user.license_id,
            information_id:user.information_id,
            hasApplied:user.hasApplied,
            avatar:user.avatar,
            documentStatus:user.documentStatus,
            };
          }
            return token;
          },
      
          async session({ session, token, trigger, newSession }) {
           if(session.user && token){
            session.user.id=token.id;
            session.user.token=token.jwt
            session.user.role=token.role;
            session.user.citizenship_id=token.citizenship_id;
            session.user.license_id=token.license_id;
            session.user.information_id=token.information_id;
            session.user.hasApplied=token.hasApplied;
            session.user.avatar=token.avatar;
            session.user.documentStatus=token.documentStatus;
           }
            return session;
          },
        },   
  }