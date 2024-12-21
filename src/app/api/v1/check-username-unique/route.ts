import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,{params}:{params:{username:string}} ,res: NextResponse) => {
  await dbConnect();
  try {
    const { username } = params;

    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          suceess: false,
          message: "This username is already taken",
        },
        { status: 400 }
      );
    }

    if(username?.length ! <3){
      return NextResponse.json(
        {
          suceess: false,
          message: "Username must be more than 2 charcters.",
        },
        { status: 400 }
      );
    }

    if(username === ""){
      return NextResponse.json(
        {
          suceess: false,
          message: "Username can't be empty.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        suceess: true,
        message: "Username is unique",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error while checking unique username: ", error);
    return NextResponse.json(
      {
        suceess: false,
        message: "Failed to check unique username",
      },
      { status: 400 }
    );
  }
};
