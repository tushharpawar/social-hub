import dbConnect from "@/lib/dbConnect";
import CommentModel from "@/models/Comment.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req:NextRequest,{params}:{params:{post_id:string}},res:NextResponse) {
    await dbConnect();

     //Getting userId from logged in user from Session

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
            const {content} =await req.json()
            const {post_id}  = params
             const newCommentModel = new CommentModel({
                content,
                post:post_id,
                owner:userId
             })

             await newCommentModel.save()

            return NextResponse.json({
                success:true,
                message:"Your comment has been added!"
            },{status:201})
             
        } catch (error:any) {
            console.log("Error while commenting on post:",error);
            return NextResponse.json({
                success:false,
                message:"Internal server error!"
            },{status:501})
        }
}