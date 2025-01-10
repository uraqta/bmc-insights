import { connect } from "@/dbConfig/dbConfig";
import postsofusers from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";


connect();
export async function POST(request:NextRequest) {

    const reqbody = await request.json();
    const {username,title,text,imageUrl}=reqbody;
    const acceptedpost = new postsofusers( {
        username,
        title,
        text,
        imageUrl,
    }
)
await acceptedpost.save()
return NextResponse.json({
    message: "Userpost created successfully",
    success: true,
    postsofusers: acceptedpost,
  });
}

