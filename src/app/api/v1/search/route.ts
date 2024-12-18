import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);

    const queryParams = {
      search: searchParams.get("search"),
    };

    const { search } = queryParams;

  if (!search) {
    return NextResponse.json(
      { success: false, message: "Search query is required" },
      { status: 400 }
    );
  }

  try {
    const users = await UserModel.aggregate([
      {
        $match: {
          username: { $regex: search, $options: "i" }, // Case-insensitive regex
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          avatar: 1, // Include any additional fields you want
        },
      },
      {
        $limit: 5, // Return only 5 closest matches
      },
    ]);

    return NextResponse.json(
      { success: true, data: users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching usernames:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch usernames" },
      { status: 500 }
    );
  }
}
