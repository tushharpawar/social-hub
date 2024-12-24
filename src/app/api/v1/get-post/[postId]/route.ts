import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import { ObjectId } from "mongodb";
import PostModel from "@/models/Post.model";

export async function GET(req: NextRequest, {params}:{params:{postId:string}},res: NextResponse) {
  await dbConnect();

  try {
    // getting user from session
    const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const {postId} = params;
    //aggregation pipeline for getting all the post of logged in user
    const posts = PostModel.aggregate([
      {
        $match: { _id:new ObjectId(postId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "post_owner",
        },
      },
      {
        $project:{
          _id:1,
          postUrl:1,
          caption:1,
          all_posts:1,
          likeCount:1,
          "post_owner._id":1,
          "post_owner.username":1,
          "post_owner.fullName":1,
          "post_owner.avatar":1,
        }
      },
      {
        $sort:{
          createdAt: -1
        }
      }
    ]).exec();


    //check if there is post or not

    if (!posts || (await posts).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found!",
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
    console.log("Error while fetching post:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to the posts",
      },
      { status: 402 }
    );
  }
}
