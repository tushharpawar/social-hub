import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  try {
    //TODO:Change it by getting user id from session

    const { searchParams } = new URL(req.url);

    const queryParams = {
      userId: searchParams.get("userId"),
    };
    const { userId } = queryParams;

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
    console.log("Error while fetching all post:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get all the posts",
      },
      { status: 402 }
    );
  }
}
