import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "logout",
            success: true,
        });

        // Set the cookie to expire immediately
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0), // This will remove the cookie
        });
        response.cookies.set("UserStatus", "", {
            httpOnly: true,
            expires: new Date(0), // This will remove the cookie
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
