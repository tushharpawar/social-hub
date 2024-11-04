import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SubscriptionModel from "@/models/Subscription.model";
import UserModel from "@/models/User.model";

export async function POST(req:NextRequest,{params}:{params:{user_id:string}},res:NextResponse) {
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

    const userId = _user._id; //is of logged in user
    const followUserId = params.user_id //id of an user whom a logged in user wants to follow
        try {

            const alreadyFollowing = await SubscriptionModel.findOne({
                following:followUserId,
                follower:userId
            })

            if(alreadyFollowing){
                await SubscriptionModel.findByIdAndDelete(alreadyFollowing._id)
                await UserModel.findByIdAndUpdate(userId,{$inc:{following:-1}})
                return NextResponse.json({
                    success:true,
                    message:"UnFollowed"
                },{status:201})
            }
            
             const newSubscriptionModel = new SubscriptionModel({
                following:followUserId,
                follower:userId
             })

             await newSubscriptionModel.save()
             await UserModel.findByIdAndUpdate(userId,{$inc:{followers:1}})

            return NextResponse.json({
                success:true,
                message:`user ${userId} is now following user ${followUserId}`
            },{status:201})
             
        } catch (error:any) {
            console.log("Error while following a user:",error);
            return NextResponse.json({
                success:false,
                message:"Internal server error!"
            },{status:501})
        }
}