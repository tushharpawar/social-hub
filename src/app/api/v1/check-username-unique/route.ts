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

    // Validate username
    if (!username || username.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Username can't be empty.",
        },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Username must be more than 2 characters.",
        },
        { status: 400 }
      );
    }

    // Check if username exists
    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "This username is already taken.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Username is unique.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while checking unique username: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to check unique username.",
      },
      { status: 500 }
    );
  }
}
