import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{params}:{params:{postId:string}},res:NextResponse) {
    
    await dbConnect();
    //Getting userId from logged in user from Session
    const postId = params.postId
    const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const userId = _user._id;

    try {

          const post = await PostModel.findById({_id:postId})

          if(!post){
            return NextResponse.json({
                success: false,
                message: "Post does not exist!",
            }, {status: 401});
          }

          if(post.owner !== userId){
                return NextResponse.json({
                    success: false,
                    message: "You are not owner of this post!",
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