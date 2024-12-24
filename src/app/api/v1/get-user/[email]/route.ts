import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { sendMail } from "@/app/helper/mailer";

export async function POST(req: NextRequest,{params}:{params:{email:string}}, res: NextResponse) {
  await dbConnect();

  const { email } = params;
  try {

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found!" },
        { status: 400 }
      );
    }

    let verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verificationCode = verificationCode;
    user.verifiCationCodeExpires = new Date(Date.now() + 3600000);
    await user.save();
    await sendMail({ email, verificationCode });
    return NextResponse.json(
      {
        success: true,
        message: user._id,
      },
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
