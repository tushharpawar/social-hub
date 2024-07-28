import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { sendMail } from "@/app/helper/mailer";

//need to add 
//TODO: Add change password features
//TODO: Add update or remove avatar feature
//TODO: Add public/private account feature
//TODO: Add story upload feature

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_TOKEN,
});


export const POST = async (req: Request, res: NextResponse) => {

         await dbConnect()
        try{

        const { email, username, password, fullName}  = await req.json();

        const existingUserByEmail = await UserModel.findOne({email});
        let verificationCode = Math.floor(100000+Math.random()*900000).toString()
        

        if(existingUserByEmail){
            
            if(existingUserByEmail.isVerified){
                return NextResponse.json({
                    success:false,
                    message:"User exist with this email"
                },{status:400})
            }
            else{
                const hashedPassword = await bcrypt.hash(password,10)
                existingUserByEmail.password=hashedPassword
                existingUserByEmail.verificationCode=verificationCode
                existingUserByEmail.verifiCationCodeExpires=new Date(Date.now() + 3600000)
                await existingUserByEmail.save();
                await sendMail({email,verificationCode})
                return NextResponse.json({
                    success: true,
                    message: "We have send you  verificaion email please verify your account",
                }, {status: 200});
            }
        }else{
                const hashedPassword = await bcrypt.hash(password,10)
                const expiryDate = new Date()
                expiryDate.setHours(expiryDate.getHours()+1)
                    
                // const dir = path.resolve('/public','/uploads')
                // const readDir = fs.readdirSync(dir)
                // const imagesPath = readDir.map(name => path.join('/', '/uploads', name))
                
                // const cloudinaryUrl =await uploadOnCloudinary(avatar) 
                // const cloudinaryUrl = await cloudinary.uploader.upload(avatar,{
                //     folder:"avatar"
                // })   
                
                let avatar:string="https://res.cloudinary.com/dsgi2zbq2/image/upload/profile_pic_q6ssck.jpg"

                const newUser = new UserModel({
                    username,
                    email,
                    password:hashedPassword,
                    isVerified:false,
                    avatar,
                    verificationCode:verificationCode,
                    verifiCationCodeExpires:expiryDate,
                    fullName,
                })

                await newUser.save();
                await sendMail({email,verificationCode})
        }

        return NextResponse.json({
            success: true,
            message: "User registered successfully ,please verify your account from email",
        }, {status: 200});
    } catch (error) {
        console.log("Error in sign-up: ", error);
        return NextResponse.json({
            suceess:false,
            message: "Failed to sign-up"}
        ,{status: 400});
    }

}