import dbConnect from "@/lib/dbConnect";
import LikeModel from "@/models/Like.model";
import PostModel from "@/models/Post.model";

export async function moniterLikeChanges() {

    try {
        const changeStream = LikeModel.watch();
    
        changeStream.on('change',async(change)=>{

            console.log("Change ",change);
            
            const post_id = change.documentKey?._id;
    
            if(change.operationType === 'insert'){
                await PostModel.updateOne({
                    _id:post_id
                },
            {$inc:{likeCount:1}}
            )
    
            console.log(`Incremented likeCount for post ${post_id}`);
            }else if(change.operationType === 'delete'){
                await PostModel.updateOne(
                    { _id: post_id },
                    { $inc: { likeCount: -1 } }
                  );
                  console.log(`Decremented likeCount for post ${post_id}`);
            }
        })
        console.log("Listening for like changes...");
    } catch (error) {
        console.log("error in change stream",error);
    }
}