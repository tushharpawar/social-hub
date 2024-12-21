import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(req: NextRequest, { params }: { params: { user_id: string } }, res: NextResponse) {
  await dbConnect();

  const { user_id } = params;
  try {
    const { newPassword } = await req.json();

    if ( !newPassword) {
      return NextResponse.json(
        { success: false, message: "New password are required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({_id:user_id});

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 400 }
      );
    }


    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { success: true, message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in reset password:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
