import mongoose,{Schema,Document} from "mongoose";

export interface IsSeen extends Document{
    isSeen:boolean;
    post:any;
    user:any;
    createdAt:Date;
    updatedAt:Date;
}

export const IsSeenSchema :Schema<IsSeen> =new mongoose.Schema({
    isSeen:{
        type:Boolean
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true})

const IsSeenModel = mongoose.models.IsSeen as mongoose.Model<IsSeen> || mongoose.model<IsSeen> ("IsSeen",IsSeenSchema)
export default IsSeenModel