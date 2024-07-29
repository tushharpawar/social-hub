import UserModel from "@/models/User.model"
import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import mongoose from "mongoose";

export const POST =async(req:NextRequest,{params}:{params:{_id:string}},res:NextResponse)=> {
    await dbConnect();
    try {
        const { code} = await req.json()
        // const decodedUsername:any = decodeURIComponent(_id)
        // const objectId = new mongoose.Types.ObjectId(_id);
        const {_id} = params

        console.log(_id);
        
        const user = await UserModel.findById(_id)

        if(!user){
            return NextResponse.json({
                suceess:false,
                message: "User doesn't exist"}
            ,{status: 404}); 
        }

        const isCodeValid = user.verificationCode === code
        const isCodeNotExpired = new Date(user.verifiCationCodeExpires) > new Date();

        if(isCodeNotExpired && isCodeValid){
            user.isVerified = true

            await user.save();
            return NextResponse.json({
                suceess:true,
                message: "Your account is verified successfuly!"}
            ,{status: 201});
        }else if(!isCodeNotExpired){
            //Verification code is expired now

            return NextResponse.json({
                suceess:false,
                message: "Verification code is expired"}
            ,{status: 404});
        }else{
            //wrong code
            return NextResponse.json({
                suceess:false,
                message: "Wrong verification code"}
            ,{status: 404});
        }
    } catch (error) {
        console.log("Error in verify-email code",error);

        return NextResponse.json({
            suceess:false,
            message: "We are facing issue while verifying user"}
        ,{status: 404});
    }
}