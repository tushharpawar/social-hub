import UserModel from "@/models/User.model"
import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"

export const POST =async(req:NextRequest,res:NextResponse)=> {
    await dbConnect();
    try {
        const {username , code} = await req.json()
        const decodedUsername = decodeURIComponent(username)

        const user =await UserModel.findOne({username:decodedUsername})

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
                message: "User is verified now"}
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