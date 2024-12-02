// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    apiKey: string;
    user: {
      uid: number;
      name: string;
      username: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: number,
    name?: string,
    username?: string,
    email?: string,
    department?: string,
    password?: string,
    is_active?: number,
    createdAt?: string,
    updatedAt?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: number;
    name: string;
    username: string;
    email: string;
  }
}
