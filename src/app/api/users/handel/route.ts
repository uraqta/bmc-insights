import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        const user:any = await User.findOne({email})
        const userStatus = user.isVerified
        const response = NextResponse.json({ userStatus }, { status: 200 });
        response.cookies.set('UserStatus', userStatus, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return response


    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }
}