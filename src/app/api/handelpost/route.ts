import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel";

connect();

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { username, title, text, imageUrl } = reqBody;

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }

        // Remove the post that matches the text and imageUrl
        const result = await User.updateOne(
            { username },
            { $pull: { posts: { title, text, imageUrl } } }
        );

    

        return NextResponse.json({ message: 'Post deleted successfully.' });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ message: 'Error deleting post.' }, { status: 500 });
    }
}
