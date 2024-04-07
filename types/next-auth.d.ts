import NextAuth, { DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

interface Iuser extends DefaultUser{
  token:string;
  role:string;
  citizenship_id:string;
  license_id:string;
  information_id:string;
  hasApplied:boolean;
  avatar:string
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
      citizenship_id:string,
      license_id:string,
      information_id:string,
      hasApplied:boolean
      avatar:string
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      role: string;
      jwt:string;
      citizenship_id:string;
      license_id:string;
      information_id:string;
      hasApplied:boolean
      avatar:string
    }
  }
