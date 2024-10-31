import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post.model";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// get likes and likeOwner and lie ount by mongodb aggregation pipeline

export async function GET(req:NextRequest,{params}:{params:{post_id:string}},res:NextResponse) {
    await dbConnect()

    try {
       const {post_id} = params
       
       const likes = PostModel.aggregate([
        {
            $match:{
                _id:new ObjectId(post_id)
            }
        },
        {
            $lookup:{
                from:'likes',
                localField:'_id',
                foreignField:'post',
                as:'likedPost',
                pipeline:[{
                    $lookup:{
                        from:'users',
                        localField:'likedBy',
                        foreignField:'_id',
                        as:'likeOwner'
                    }
                }]
            }
        },
        {
            $project:{
                "likedPost._id":1,
                "likedPost.likeOwner.username":1,
                "likedPost.likeOwner.avatar":1,
                "likedPost.likeOwner._id":1,
            }
        },
        {
            $addFields: {
              likeCount: { $size: "$likedPost" }  
            }
          },
       ])

       if(!likes || (await likes).length === 0){
        return NextResponse.json({
            success:false,
            message:'No likes yet'
        },{status:404})
      }

      const likeData = await likes

      return NextResponse.json({
        success:true,
        message:likeData
      },{status:201})

    } catch (error) {
        console.log("Error in fetching likes",error);

        return NextResponse.json({
            success:false,
            message:"Internal server error"
          },{status:501})
    }
}

