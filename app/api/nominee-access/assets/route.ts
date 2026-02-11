import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Asset from "@/models/Asset";
import Nominee from "@/models/Nominee";

export async function GET(req: Request) {
  await connectDB();

  // Simulate nominee identity (email passed as header)
  const nomineeEmail = req.headers.get("x-nominee-email");

  if (!nomineeEmail) {
    return NextResponse.json({ error: "Nominee email missing" }, { status: 400 });
  }

  const nominee = await Nominee.findOne({
    email: nomineeEmail,
    accessGranted: true,
  });

  if (!nominee) {
    return NextResponse.json({ error: "Access not granted" }, { status: 403 });
  }

  const assets = await Asset.find({ userId: nominee.userId }).lean();

  return NextResponse.json(
    assets.map((a) => ({
      id: a._id.toString(),
      name: a.name,
      type: a.type,
    }))
  );
}
