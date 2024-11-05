import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import SubscriptionModel from "@/models/Subscription.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,{params}:{params:{userId:string}}, res: NextResponse) => {
  await dbConnect();
  try {
    const {userId} = params

    const session = await getServerSession(authOptions)
     const _user = session?.user;
 
     if(!session || !_user){
         return NextResponse.json(
             { success: false, message: 'Not authenticated' },
             { status: 401 }
           );
     }
 
     const loggedInUserId = _user._id;

    const loggedInUserFollowing = await SubscriptionModel.findOne({
      following:userId,
      follower:loggedInUserId
    });

    if (loggedInUserFollowing) {
      return NextResponse.json(
        {
          suceess: true,
          message: true,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        suceess: false,
        message: false,
      },
      { status: 400 }
    );
  } catch (error) {
    console.log("Error while checking logged In user following: ", error);
    return NextResponse.json(
      {
        suceess: false,
        message: "Failed to check logged In user following",
      },
      { status: 400 }
    );
  }
};
