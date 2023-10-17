import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      email:string,
      id:string,
      role:string,
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string
  }
}