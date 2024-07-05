import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,res:NextResponse) {
    await dbConnect();
        try {
            const {content,userId} =await req.json()

             
        } catch (error) {
            
        }
}