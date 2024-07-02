import dbConnect from "@/lib/dbConnect";
import PostModel from "@/models/Post.model";
import UserModel from "@/models/User.model";

export async function DELETE(req:Request,{params}:{params:{postId:string}}) {
    const postId = params.postId

    await dbConnect();
    
}