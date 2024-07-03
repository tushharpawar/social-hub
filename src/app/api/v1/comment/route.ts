import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest,res:NextResponse) {
    await dbConnect();
        try {
        } catch (error) {
            
        }
}