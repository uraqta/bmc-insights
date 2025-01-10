import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // Get the cookies from the request headers
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
      console.error("No cookies found in the request");
      return NextResponse.json({ error: "No cookies found" }, { status: 401 });
    }

    // Parse the cookies manually
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => cookie.split("="))
    );

    const userToken = cookies.token; // Extract the token
    if (!userToken) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }

    // Verify the token using the secret
    const decodedToken = jwt.verify(userToken, process.env.TOKEN_SECRET!);
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { username, email, createdAt } = decodedToken; // Assuming token contains these fields

    console.log("Decoded User:", { username, email, createdAt });

    // Return the username, email, and createdAt (join date)
    return NextResponse.json({ username, email, createdAt });
  } catch (err) {
    console.error("Error verifying token:", err);
    return NextResponse.json({ error: "Failed to verify token" }, { status: 500 });
  }
}
