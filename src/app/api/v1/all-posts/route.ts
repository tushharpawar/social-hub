import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import PostModel from "@/models/Post.model";

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  try {

    const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const allPosts = PostModel.aggregate([
        
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "post"
              }
          },
            {
              $unwind: "$post"
          },
            {
          $project: {
            postUrl:1,
            caption:1,
            createdAt:1,
            "post.username":1,
            "post.email":1,
            "post.avatar.url":1,
            "post.fullName":1
          }}
          
    ])

    const postsData = await allPosts;

    return NextResponse.json(
      {
        success: true,
        message: postsData,
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
