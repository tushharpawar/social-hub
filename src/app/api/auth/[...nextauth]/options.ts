import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any):Promise<any>{
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error('No user found with this email')
          }
          if(!user.isVerified){
            throw new Error('Verify your account to log in!')
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password, user.password
          )

          if(!isPasswordCorrect){
            throw new Error('Wrong password!')
          }else{
            return user
          }
        } catch (error:any) {
             throw new Error("Error in login",error)
        }
      },
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
  ],
  callbacks:{
async signIn( {account, profile}:any ) {
      if (account?.provider === "google") {
        return profile?.email_verified && profile?.email?.endsWith("@gmail.com");
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({token,user}) {
        if(user){
          token._id = user._id?.toString();
          token.email = user.email;
          token.username = user.username;
          token.isVerified = user.isVerified;
        }
        return token;
    },
    async session({session,token}){
      if(token){
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      //redirecting user to anoher page after sign in
      return "/post"; 
    },
  },
  session:{
    strategy:"jwt",
  },
  secret: process.env.NEXTAUTH_SECRET ,
  pages:{
    signIn: '/sign-in',
  }
}