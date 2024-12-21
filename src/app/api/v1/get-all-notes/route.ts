export const dynamic = 'force-dynamic';

import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import NotesModel from "@/models/Note.model";

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  try {

    const session = await getServerSession(authOptions)
    const _user = session?.user;

    if(!session || !_user){
        return NextResponse.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
          );
    }

    const allNotes = NotesModel.aggregate([
        
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
              }
          },
            {
              $unwind: "$owner"
          },
            {
          $project: {
            content:1,
            createdAt:1,
            "owner.username":1,
            "owner.email":1,
            "owner.avatar":1,
            "owner.fullName":1
          }
        },
        {
          $sort:{
            createdAt: -1
          }
        }
          
    ])

    const notesData = await allNotes;

    return NextResponse.json(
      {
        success: true,
        message: notesData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error while fetching all post:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get all the posts",
      },
      { status: 402 }
    );
  }
}
