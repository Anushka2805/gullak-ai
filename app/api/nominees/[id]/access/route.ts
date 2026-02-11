import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Nominee from "@/models/Nominee";
import mongoose from "mongoose";
import { DEMO_USER_ID } from "@/lib/demoUser";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(_: Request, { params }: Params) {
  await connectDB();

  const { id } = await params;
  const nomineeId = id.trim();

  if (!mongoose.Types.ObjectId.isValid(nomineeId)) {
    return NextResponse.json({ error: "Invalid nominee ID" }, { status: 400 });
  }

  const nominee = await Nominee.findOneAndUpdate(
    { _id: nomineeId, userId: DEMO_USER_ID },
    { accessGranted: true },
    { new: true }
  );

  if (!nominee) {
    return NextResponse.json({ error: "Nominee not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    accessGranted: nominee.accessGranted,
  });
}
