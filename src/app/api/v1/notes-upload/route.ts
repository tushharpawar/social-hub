import dbConnect from "@/lib/dbConnect";
import NotesModel from "@/models/Note.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse) {
        await dbConnect()
        try {
            const {content,userId} = await req.json();

            const newNote = new NotesModel({
                content,
                owner:userId
            })

            await newNote.save();

            return NextResponse.json({
                success: true,
                message: "Note uploaded successfully!",
            }, {status: 200});

        } catch (error:any) {
            console.log("Error in posting notes:",error);
            return NextResponse.json({
                success:false,
                message:"Sorry,notes can't be uploaded!"
            },{status:501})
        }
}