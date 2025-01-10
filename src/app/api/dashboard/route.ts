import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const userToken = request.cookies.get("token")?.value; // Get the token value
    if (!userToken || typeof userToken !== "string") {
      return NextResponse.json({ error: "Invalid token provided" }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(userToken, process.env.TOKEN_SECRET!);
    const userID = decodedToken.id;
    const uploadedUser = await User.findById(userID);

    if (!uploadedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Extract data from the request body
    const { title, text, imageUrl } = await request.json();

    // Create a new post object
    const newPost = {
      title,
      text,
      imageUrl,
    };

    // Add the new post to the user's posts array
    uploadedUser.posts.push(newPost);

    // Save the updated user document
    await uploadedUser.save();

    console.log("Post added successfully:", newPost);
    return NextResponse.json({ message: "Post added successfully" });
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json({ error: "Invalid token or server error" }, { status: 500 });
  }
}
