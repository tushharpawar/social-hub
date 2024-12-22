import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import SubscriptionModel from "@/models/Subscription.model";
import UserModel from "@/models/User.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest,{params}:{params:{username:string}},res:NextResponse) =>{
    await dbConnect();

    try {
        const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const loggedInUserId = _user._id;

        const {username} = params
        const user = await UserModel.findOne({username});

        if(!user){
            return NextResponse.json({
                suceess:false,
                message: "Profile not found"}
            ,{status: 400});
        }

        const loggedInUserFollowing = await SubscriptionModel.findOne({
            following:user._id,
            follower:loggedInUserId
          });

          if(loggedInUserFollowing ){
            return NextResponse.json({
                suceess:true,
                message:{...user.toObject(),isFollowing:true}
            }
            ,{status: 200});
          }else{
            return NextResponse.json({
                suceess:true,
                message:{...user.toObject(),isFollowing:false}
            }
            ,{status: 200});
          }
        
          
        

    } catch (error) {
        console.log("Error while getting followers: ", error);
        return NextResponse.json({
            suceess:false,
            message: "Failed to fetch followers"}
        ,{status: 402});
    }
}