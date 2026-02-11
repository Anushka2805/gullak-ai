import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { DEMO_USER_ID } from "@/lib/demoUser";

export async function GET() {
  await connectDB();

  const user = await User.findById(DEMO_USER_ID).lean();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    lastActiveAt: user.lastActiveAt,
    isDeceased: user.isDeceased,
  });
}

export async function PUT(req: Request) {
  await connectDB();

  const body = await req.json();

  const user = await User.findByIdAndUpdate(
    DEMO_USER_ID,
    {
      name: body.name,
      email: body.email,
      lastActiveAt: new Date(), // 👈 update activity
    },
    { new: true }
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    name: user.name,
    email: user.email,
  });
}
