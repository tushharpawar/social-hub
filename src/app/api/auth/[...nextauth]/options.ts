import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import GoogleProvider from "next-auth/providers/google";
import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!, process.env.STREAM_API_SECRET);

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
async signIn({ user }: any): Promise<boolean> {
      // if (account?.provider === "google") {
      //   return profile?.email_verified && profile?.email?.endsWith("@gmail.com");
      // }
      // return true // Do different verification for other providers that don't have `email_verified`
      
      try {
        const foundUsers = await UserModel.find(user?._id)
        const foundUser = foundUsers[0] as { _id: string, username: string, avatar: string };

        const existingUsers = await client.queryUsers({ id: user._id.toString() });

        if (existingUsers.users.length > 0) {
          console.log('User already exists in Stream Chat:', user._id);
          return true
        }else{
          await client.upsertUser({
            id: foundUser._id,
            username:foundUser.username,
            avatar:foundUser.avatar,
          });
          console.log("user upserted!!"); 
        }
        return true;
      } catch (error) {
        console.log("Error while inserting user in stream", error);
        return false;        
      }

    },
    async jwt({token,user}) {
        if(user){
          token._id = user._id?.toString();
          token.email = user.email;
          token.username = user.username;
          token.isVerified = user.isVerified;
          token.avatar = user.avatar;
          token.fullName = user.fullName;
        }
        return token;
    },
    async session({session,token}){
      if(token){
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
        session.user.avatar = token.avatar;
        session.user.fullName = token.fullName;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      //redirecting user to anoher page after sign in
      return "/"; 
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