import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import PostModel from "@/models/Post.model";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    
    const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const userId = new mongoose.Types.ObjectId(_user._id);

    const allPosts = PostModel.aggregate([
      //owner details
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $unwind: "$owner",
      },

      //  isSeen records
      {
        $lookup: {
          from: "isseens", 
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$post", "$$postId"] }, 
                    { $eq: ["$user", userId] }, 
                    { $eq: ["$isSeen", true] }, 
                  ],
                },
              },
            },
          ],
          as: "seenByUser",
        },
      },

      // Step 3: Exclude seen posts
      {
        $match: {
          "seenByUser.0": { $exists: false }, // Only include posts that are not seen
        },
      },

      // Step 4: Project required fields
      {
        $project: {
          _id: 1,
          postUrl: 1,
          caption: 1,
          createdAt: 1,
          likeCount: 1,
          "owner.username": 1,
          "owner.email": 1,
          "owner.avatar": 1,
          "owner.fullName": 1,
        },
      },

      // Step 5: Sort by creation date
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: (page - 1) * limit, // Skip documents for previous pages
      },
      {
        $limit: limit, // Limit the number of documents
      },
    ]);

    // Get total number of posts for pagination metadata
    const totalPosts = await PostModel.countDocuments();

    // Calculate if there are more posts to fetch
    const hasMore = page * limit < totalPosts;

    const postsData = await allPosts;

    return NextResponse.json(
      {
        success: true,
        message: postsData,
        pagination: {
          page,
          limit,
          totalPosts,
          hasMore,
        },
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
