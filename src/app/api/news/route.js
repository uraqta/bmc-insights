import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import AcceptedPost from "@/models/postModel";


export const GET =  async (request) => {
    try {
        await connect();        
        const news = await AcceptedPost.find();
        return new NextResponse(JSON.stringify(news), {status: 200});

    } catch(err) {
        return new NextResponse("error while fetching news " + err, {status: 500});
    }
}