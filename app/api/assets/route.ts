import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Asset from "@/models/Asset";
import mongoose from "mongoose";

// TEMP userId for now
import { DEMO_USER_ID } from "@/lib/demoUser";

export async function GET() {
  await connectDB();

  const assets = await Asset.find({ userId: DEMO_USER_ID }).lean();

  return NextResponse.json(
    assets.map((a) => ({
      id: a._id.toString(),
      name: a.name,
      type: a.type,
    }))
  );
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const asset = await Asset.create({
    userId: DEMO_USER_ID,
    name: body.name,
    type: body.type,
    notes: body.notes,
  });

  return NextResponse.json({
    id: asset._id.toString(),
    name: asset.name,
    type: asset.type,
  });
}
