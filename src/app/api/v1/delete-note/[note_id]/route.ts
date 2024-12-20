import dbConnect from "@/lib/dbConnect";
import NotesModel from "@/models/Note.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{note_id:string}},res:NextResponse) {
    
    await dbConnect();
    //Getting userId from logged in user from Session
    const note_id = params.note_id

    try {

          const note = await NotesModel.findById({_id:note_id})

          if(!note){
            return NextResponse.json({
                success: false,
                message: "Note does not exist!",
            }, {status: 401});
          }

        await note.deleteOne({id:note_id});
            
        return NextResponse.json({
            success: true,
            message: "Note deleted successfully!",
        }, {status: 201});

    } catch (error:any) {
        console.log("Error in posting images: ", error);
        return NextResponse.json({
            suceess:false,
            message: "Failed to post an image"}
        ,{status: 400});
    }
}