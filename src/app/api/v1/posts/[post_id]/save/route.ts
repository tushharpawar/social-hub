import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SaveModel from "@/models/Save.model";

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
            const {post_id}  = params

            const existingSavedPost = await SaveModel.findOne({
                post:post_id,
                owner:userId
            })

            if(existingSavedPost){
                await SaveModel.findByIdAndDelete(existingSavedPost._id)
                return NextResponse.json({
                    success:true,
                    message:"Removed from save"
                },{status:201})                
            }

             const newSaveModel = new SaveModel({
                post:post_id,
                owner:userId
             })

             await newSaveModel.save()

            return NextResponse.json({
                success:true,
                message:"Post saved!"
            },{status:201})
        } catch (error:any) {
            console.log("Error while saving post:",error);
            return NextResponse.json({
                success:false,
                message:"Internal server error!"
            },{status:501})
        }
}