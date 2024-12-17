import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{postId:string}},res:NextResponse) {
    
    await dbConnect();
    //Getting userId from logged in user from Session
    const postId = params.postId

    const userId = await req.json();

    try {

          const post = await PostModel.findById({_id:postId})

          if(!post){
            return NextResponse.json({
                success: false,
                message: "Post does not exist!",
            }, {status: 401});
          }

        await post.deleteOne({id:postId});
            
        return NextResponse.json({
            success: true,
            message: "Post deleted successfully!",
        }, {status: 201});

    } catch (error:any) {
        console.log("Error in posting images: ", error);
        return NextResponse.json({
            suceess:false,
            message: "Failed to post an image"}
        ,{status: 400});
    }
}