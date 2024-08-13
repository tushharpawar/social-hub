import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();

  try {
    //getting user from session
    const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const userId = _user._id;
    //aggregation pipeline for getting all the post of logged in user
    const posts = UserModel.aggregate([
      {
        $match: { _id: new ObjectId(userId!) },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "owner",
          as: "all_posts",
        },
      },
    ]).exec();


    //check if there is post or not

    if (!posts || (await posts).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Feed is empty",
        },
        { status: 402 }
      );
    }

    //returning all the post by an user

    const postsData = await posts;
    return NextResponse.json(
      {
        success: true,
        message: postsData[0].all_posts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while fetching all post by loggedIn user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch your all the posts",
      },
      { status: 402 }
    );
  }
}
