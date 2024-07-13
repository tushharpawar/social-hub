import mongoose ,{Schema,Document} from "mongoose";

export interface Like extends Document {
    post:any;
    comment:any;
    note:any;
    likedBy:any;
}

export const LikeSchema : Schema<Like> = new mongoose.Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },
    note:{
        type:Schema.Types.ObjectId,
        ref:"Note"
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        unique:true
    }
},{timestamps:true})

const LikeModel = mongoose.models.Like as mongoose.Model<Like> || mongoose.model<Like>("Like",LikeSchema)
export default LikeModel;