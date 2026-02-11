import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Asset from "@/models/Asset";
import mongoose from "mongoose";
import { DEMO_USER_ID } from "@/lib/demoUser";

type Params = {
  params: Promise<{ id: string }>;
};

/* ---------------- GET asset by ID ---------------- */
export async function GET(_: Request, { params }: Params) {
  await connectDB();

  const { id } = await params; // ✅ FIX
  const assetId = id.trim();

  if (!mongoose.Types.ObjectId.isValid(assetId)) {
    return NextResponse.json({ error: "Invalid asset ID" }, { status: 400 });
  }

  const asset = await Asset.findOne({
    _id: assetId,
    userId: DEMO_USER_ID,
  });

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: asset._id.toString(),
    name: asset.name,
    type: asset.type,
    notes: asset.notes,
  });
}

/* ---------------- UPDATE asset ---------------- */
export async function PUT(req: Request, { params }: Params) {
  await connectDB();

  const { id } = await params; // ✅ FIX
  const assetId = id.trim();

  if (!mongoose.Types.ObjectId.isValid(assetId)) {
    return NextResponse.json({ error: "Invalid asset ID" }, { status: 400 });
  }

  const body = await req.json();

  const asset = await Asset.findOneAndUpdate(
    { _id: assetId, userId: DEMO_USER_ID },
    {
      name: body.name,
      type: body.type,
      notes: body.notes,
    },
    { new: true }
  );

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: asset._id.toString(),
    name: asset.name,
    type: asset.type,
  });
}

/* ---------------- DELETE asset ---------------- */
export async function DELETE(_: Request, { params }: Params) {
  await connectDB();

  const { id } = await params; // ✅ FIX
  const assetId = id.trim();

  if (!mongoose.Types.ObjectId.isValid(assetId)) {
    return NextResponse.json({ error: "Invalid asset ID" }, { status: 400 });
  }

  const asset = await Asset.findOneAndDelete({
    _id: assetId,
    userId: DEMO_USER_ID,
  });

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
