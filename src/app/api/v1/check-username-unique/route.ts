import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);

    const queryParams = {
      username: searchParams.get("username"),
    };

    const { username } = queryParams;

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
