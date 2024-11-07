import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/models/User.model";

export async function POST(req:NextRequest,res:NextResponse) {
    await dbConnect();

     //Getting userId from logged in user from Session

    const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const userId = _user._id;
    
        try {
            const {fullName,bio} = await req.json()

            const updateUserInfo = await UserModel.findByIdAndUpdate(userId,{
                $set:{
                    fullName,
                    bio
                }
            },{new:true})

            if(updateUserInfo){
                return NextResponse.json({
                    success:true,
                    message:"Your info has been updated!"
                },{status:201})
            }

            return NextResponse.json({
                success:false,
                message:"We failed to update user info!"
            },{status:401})
             
        } catch (error:any) {
            console.log("Error while updating user info:",error);
            return NextResponse.json({
                success:false,
                message:"Internal server error!"
            },{status:501})
        }
}