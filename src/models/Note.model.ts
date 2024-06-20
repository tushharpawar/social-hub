import mongoose,{Schema,Document, Mongoose} from "mongoose";

export interface Note extends Document{
    content:string;
    owner:any;
    createdAt:Date;
    updatedAt:Date;
}

export const NoteSchema : Schema<Note> = new mongoose.Schema({
    content:{
        type:String,
        required:[true,"Please add content"],
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const NotesModel = mongoose.models.Note as mongoose.Model<Note> || mongoose.model<Note>("Note",NoteSchema)
export default NotesModel;