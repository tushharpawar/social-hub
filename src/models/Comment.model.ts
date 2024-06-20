import mongoose,{Schema,Document} from "mongoose";

export interface Comment extends Document{
    content:string;
    note:any;
    post:any;
    owner:any;
    createdAt:Date;
    updatedAt:Date;
}

export const CommentSchema:Schema<Comment> = new mongoose.Schema({
    content:{
        type:String,
        required:[true,"content is required"]
    },
    note:
    {
        type:Schema.Types.ObjectId,
        ref:"Note"
    },
    post:
    {
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    owner:
    {
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const CommentModel = mongoose.models.Comment as mongoose.Model<Comment> || mongoose.model<Comment>("Comment",CommentSchema)
export default CommentModel;