import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Document";
import Nominee from "@/models/Nominee";

export async function GET(req: Request) {
  await connectDB();

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

  const docs = await Document.find({ userId: nominee.userId }).lean();

  return NextResponse.json(
    docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      filePath: d.filePath,
      createdAt: d.createdAt,
    }))
  );
}
