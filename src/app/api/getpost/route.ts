// /app/api/posts/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";

connect();

export async function GET() {
  try {
    const users = await User.find({}, "username posts");
    
    // Extract all posts with associated usernames
    const posts = users.flatMap(user => 
      user.posts.map((post: { _doc: any; }) => ({
        username: user.username,
        ...post._doc,
      }))
    );

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
