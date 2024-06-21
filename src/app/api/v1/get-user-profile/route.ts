import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest,res:NextResponse) =>{
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        
        const queryParams = {
            username: searchParams.get("username"),
        };
        const { username } = queryParams;
        const user = await UserModel.findOne({username});
        
        const profile =await UserModel.aggregate([
            {
                $match:{
                    username,
                }
            },
            {
                $lookup:{
                    from:"subscriptions",
                    localField:"_id",
                    foreignField:"following",
                    as:"followers",
                }
            },
            {
                $lookup:{
                    from:"subscriptions",
                    localField:"_id",
                    foreignField:"followers",
                    as:"following",
                }
            },
            {
                $addFields:{
                    followersCount:{
                        $size: "$followers",
                    },
                    followingCount:{
                        $size:"$following",
                    },
                    isFollowing:{
                        $cond:{
                            if:{$in:[user?._id,"$followers.followers"]},
                            then:true,
                            else:false,
                        }
                    }
                }
            },
            {
                $project:{
                    username:1,
                    email:1,
                    avatar:1,
                    fullName:1,
                    followersCount:1,
                    followingCount:1,
                    isFollowing:1,
                    createdAt:1,
                }
            }
        ])

        if(!profile?.length){
            return NextResponse.json({
                suceess:false,
                message: "Profile not found"}
            ,{status: 400});
        }
        
        return NextResponse.json({
            suceess:true,
            message:profile[0] }
        ,{status: 200});

    } catch (error) {
        console.log("Error while getting followers: ", error);
        return NextResponse.json({
            suceess:false,
            message: "Failed to fetch followers"}
        ,{status: 400});
    }
}