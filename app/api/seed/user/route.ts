import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { DEMO_USER_ID } from "@/lib/demoUser";

export async function POST() {
  await connectDB();

  const existing = await User.findById(DEMO_USER_ID);

  if (existing) {
    return NextResponse.json({
      message: "Demo user already exists",
      userId: existing._id.toString(),
    });
  }

  const user = await User.create({
    _id: DEMO_USER_ID,
    name: "Demo User",
    email: "demo@gullak.com",
    passwordHash: "demo_hash",
    lastActiveAt: new Date(),
    isDeceased: false,
  });

  return NextResponse.json({
    message: "Demo user created ✅",
    userId: user._id.toString(),
  });
}
