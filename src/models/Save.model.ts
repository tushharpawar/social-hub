import mongoose,{Schema,Document} from "mongoose";

export interface Save extends Document{
    post:any;
    owner:any;
    createdAt:Date;
    updatedAt:Date;
}

export const SaveSchema :Schema<Save> =new mongoose.Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
},{timestamps:true})

const SaveModel = mongoose.models.Save as mongoose.Model<Save> || mongoose.model<Save> ("Save",SaveSchema)
export default SaveModel