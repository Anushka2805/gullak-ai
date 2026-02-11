import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Document";
import { DEMO_USER_ID } from "@/lib/demoUser";
import fs from "fs";
import path from "path";

export async function GET() {
  await connectDB();

  const docs = await Document.find({ userId: DEMO_USER_ID }).lean();

  return NextResponse.json(
    docs.map((d) => ({
      id: d._id.toString(),

      name: d.name,
      filePath: d.filePath,
      createdAt: d.createdAt,
    }))
  );
}

export async function POST(req: Request) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const name = formData.get("name") as string;
  const assetId = formData.get("assetId") as string | null;

  if (!file || !name) {
    return NextResponse.json(
      { error: "File and name are required" },
      { status: 400 }
    );
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `/uploads/${fileName}`;

  fs.writeFileSync(path.join(uploadDir, fileName), buffer);

  const doc = await Document.create({
    userId: DEMO_USER_ID,
    assetId: assetId || undefined,
    name,
    filePath,
  });

  return NextResponse.json({
    id: doc._id.toString(),
    name: doc.name,
    filePath: doc.filePath,
  });
}
