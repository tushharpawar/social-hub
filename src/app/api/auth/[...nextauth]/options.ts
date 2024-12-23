import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import GoogleProvider from "next-auth/providers/google";
import { StreamChat } from "stream-chat";

const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!, process.env.STREAM_API_SECRET);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
          // Find user by email or username
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          // Handle errors with meaningful messages
          if (!user) {
            throw new Error("No user found with this email or username.");
          }

          if (!user.isVerified) {
            throw new Error("Verify your account to log in.");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Wrong password.");
          }

          // Return user on successful login
          return user;
        } catch (error: any) {
          console.error("Error during login:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: any): Promise<boolean> {
      try {
        const foundUser = await UserModel.findById(user._id);

        const existingUsers = await client.queryUsers({ id: user._id.toString() });

        if (existingUsers.users.length > 0) {
          console.log("User already exists in Stream Chat:", user._id);
          return true;
        } else {
          if (foundUser) {
            await client.upsertUser({
              id: foundUser.username,
              name: foundUser.username,
              image: foundUser.avatar,
            });
          } else {
            throw new Error("User not found.");
          }
          console.log("User upserted in Stream Chat!");
        }
        return true;
      } catch (error) {
        console.error("Error while inserting user in Stream:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.email = user.email;
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.avatar = user.avatar;
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id,
          email: token.email,
          username: token.username,
          isVerified: token.isVerified,
          avatar: token.avatar,
          fullName: token.fullName,
        };
      }
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   return "/";
    // },
  },
  session: {
    strategy: "jwt",
  },
  events: {
    async signOut({ token, session }) {
      console.log("User signed out.");
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    error: '/sign-in',
  },
};
