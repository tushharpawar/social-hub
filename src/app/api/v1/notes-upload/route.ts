import dbConnect from "@/lib/dbConnect";
import NotesModel from "@/models/Note.model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req:NextRequest,res:NextResponse) {
        await dbConnect()

        //Getting userId from logged in user from Session

    const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const userId = _user._id;
        try {
            const {content} = await req.json();

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