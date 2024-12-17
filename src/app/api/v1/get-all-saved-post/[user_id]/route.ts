import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";

export async function GET(
  req: NextRequest,
  { params }: { params: { user_id: string } },
  res: NextResponse
) {
    
    try {
      await dbConnect();
    
    const {user_id} = params
    console.log("USer id",user_id);
    

    //aggregation pipeline for getting all the post of logged in user
    const posts = UserModel.aggregate([
      {
        $match: {
          _id: new ObjectId(user_id),
        },
      },
      {
        $lookup: {
          from: "saves",
          localField: "_id",
          foreignField: "owner",
          as: "saved",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "saved.post",
          foreignField: "_id",
          as: "saved_post",
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          fullName: 1,
          avatar: 1,
          "saved_post.postUrl": 1,
          "saved_post._id": 1,
          "saved_post.caption": 1,
          "saved_post.createdAt": 1,
          "saved_post.likeCount": 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]).exec();

    //check if there is post or not

    if (!posts || (await posts).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Nothing saved",
        },
        { status: 402 }
      );
    }

    //returning all the post by an user

    const postsData = await posts;
    return NextResponse.json(
      {
        success: true,
        message: postsData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "Error while fetching all saved posts by loggedIn user:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch your all saved posts",
      },
      { status: 402 }
    );
  }
}
