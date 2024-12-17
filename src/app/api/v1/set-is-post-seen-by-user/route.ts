import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import IsSeenModel from "@/models/IsSeen.model";


export const POST = async (req: NextRequest, res: NextResponse) =>{
    await dbConnect()

    //Getting userId from logged in user from Session

    // const session = await getServerSession(authOptions)
    // const _user = session?.user;

    // if(!session || !_user){
    //     return NextResponse.json(
    //         { success: false, message: 'Not authenticated' },
    //         { status: 401 }
    //       );
    // }

    try {

        const {seenPosts} = await req.json()

        if (!Array.isArray(seenPosts)) {
            return NextResponse.json({ success: false, message: "Invalid data format. Expected an array." }, { status: 400 });
          }
            
          const response = await IsSeenModel.insertMany(seenPosts)
            
            return NextResponse.json({
                success: true,
                message: `Data added ${response.length}`,
            }, {status: 201});

    } catch (error:any) {
        console.log("Error while inserting data: ", error);
        return NextResponse.json({
            suceess:false,
            message: "Failed to insert data"}
        ,{status: 400});
    }
}