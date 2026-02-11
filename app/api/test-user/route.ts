import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const user = await User.create({
    name: "Test User",
    email: "test@gullak.com",
    passwordHash: "hashed_password_here",
  });

  return NextResponse.json({
    message: "User created ✅",
    userId: user._id,
  });
}
