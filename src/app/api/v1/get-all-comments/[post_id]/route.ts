import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post.model";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{post_id:string}},res:NextResponse) {
    await dbConnect()

    try {
        const {post_id} = params

        //used nested pipelines for fetching owner of a comment.

        const comments = PostModel.aggregate([
            {
              $match:{
                _id:new ObjectId(post_id)
              }
            },
            {
              $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "post",
                as: "allComments",
                pipeline:[
                  {
                    $lookup:{
                      from:"users",
                      localField:"owner",
                      foreignField:"_id",
                      as:"commentOwner",
                    }
                  }
                ]
              },
            },
            {
              $project: {
                "allComments._id":1,
                "allComments.content":1,
                "allComments.createdAt":1,
                "allComments.commentOwner.username":1,
                "allComments.commentOwner.avatar":1
              }
            } 
          ]).exec();

          if(!comments || (await comments).length === 0){
            return NextResponse.json({
                success:false,
                message:'No comments yet'
            },{status:404})
          }

          const commentData = await comments

          return NextResponse.json({
            success:true,
            message:commentData[0].allComments
          },{status:201})

    } catch (error) {
        console.log("Error in fetching comments",error);

        return NextResponse.json({
            success:false,
            message:"Internal server error"
          },{status:501})
    }
}