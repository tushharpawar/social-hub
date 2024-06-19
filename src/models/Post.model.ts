import mongoose ,{Schema,Document, Mongoose} from "mongoose";

export interface Post extends Document {
    postUrl: string;
    caption: string;
    likeCount: number;
    commentCount: number;
    isPublished: boolean;
    owner:any; 
    createdAt: Date;
    updatedAt: Date;
}

export const PostSchema:Schema<Post> = new mongoose.Schema({
    postUrl:{
        type:String,
        required: [true, "Post is required"],
    },
    caption:{
        type:String,
    },
    likeCount:{
        type:Number,
    },
    commentCount:{
        type:Number,
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},{timestamps:true}) 

const PostModel = mongoose.models.Post as mongoose.Model<Post> || mongoose.model<Post>("Post", PostSchema);
export default PostModel;