import NextAuth, { DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

interface Iuser extends DefaultUser{
  token:string;
  role:string;
  document_id:string;
  information_id:string;
}
declare module "next-auth" {
  interface Session {
    user?:Iuser
  }
    interface User {
      email:string,
      id:string,
      role:string,
      token:string,
      document_id:string,
      information_id:string,
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      role: string;
      jwt:string;
      document_id:string;
      information_id:string;
    }
  }
