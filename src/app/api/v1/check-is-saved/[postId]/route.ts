import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import SaveModel from "@/models/Save.model";
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
 
     const owner = _user._id;

    const loggedInUserSaved = await SaveModel.findOne({
      post:postId,
      owner
    });

    if (loggedInUserSaved) {
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
    console.log("Error while checking logged In user saved: ", error);
    return NextResponse.json(
      {
        suceess: false,
        message: "Failed to check logged In user saved",
      },
      { status: 400 }
    );
  }
};
