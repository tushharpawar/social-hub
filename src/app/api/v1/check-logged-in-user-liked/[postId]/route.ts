import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import LikeModel from "@/models/Like.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,{params}:{params:{postId:string}}, res: NextResponse) => {
  await dbConnect();
  try {
    const {postId} = params

    const session = await getServerSession(authOptions)
     const _user = session?.user;
 
     if(!session || !_user){
         return NextResponse.json(
             { success: false, message: 'Not authenticated' },
             { status: 401 }
           );
     }
 
     const likedBy = _user._id;

    const loggedInUserLiked = await LikeModel.findOne({
      post:postId,
      likedBy
    });

    if (loggedInUserLiked) {
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
    console.log("Error while checking logged In user liked: ", error);
    return NextResponse.json(
      {
        suceess: false,
        message: "Failed to check logged In user liked",
      },
      { status: 400 }
    );
  }
};
