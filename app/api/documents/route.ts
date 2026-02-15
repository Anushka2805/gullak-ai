import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Document from "@/models/Document";
import Asset from "@/models/Asset";
import { DEMO_USER_ID } from "@/lib/demoUser";
import fs from "fs";
import path from "path";
import { analyzeDocumentText } from "@/lib/documentAnalyzer";

/* ---------------- TYPES ---------------- */

type PopulatedAsset = {
  _id: string;
  name: string;
  type: string;
};

type PopulatedDocument = {
  _id: string;
  name: string;
  filePath: string;
  createdAt: Date;
  assetId?: PopulatedAsset | null;
};

/* ---------------- GET ---------------- */

export async function GET() {
  await connectDB();

  const docs = (await Document.find({ userId: DEMO_USER_ID })
    .populate("assetId")
    .lean()) as PopulatedDocument[];

  return NextResponse.json(
    docs.map((d) => ({
      id: d._id.toString(),
      name: d.name,
      filePath: d.filePath,
      createdAt: d.createdAt,
      asset: d.assetId
        ? {
            id: d.assetId._id.toString(),
            name: d.assetId.name,
            type: d.assetId.type,
          }
        : null,
    }))
  );
}

/* ---------------- POST ---------------- */

export async function POST(req: Request) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const name = formData.get("name") as string;

  if (!file || !name) {
    return NextResponse.json(
      { error: "File and name are required" },
      { status: 400 }
    );
  }

  // 1️⃣ Save file
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `/uploads/${fileName}`;

  fs.writeFileSync(path.join(uploadDir, fileName), buffer);

  // 2️⃣ Create document
  const doc = await Document.create({
    userId: DEMO_USER_ID,
    name,
    filePath,
  });

  // 3️⃣ MOCK extracted text (later OCR / AI will replace this)
  const extractedText = `
    LIC Policy Document
    Policy Number: 123456
    Premium Paid Successfully
  `;

  // 4️⃣ Analyze document
  const analysis = analyzeDocumentText(extractedText);

  let linkedAssetId: string | null = null;

  if (analysis && analysis.confidence > 0.85) {
    // 5️⃣ Create asset
    const asset = await Asset.create({
      userId: DEMO_USER_ID,
      name: analysis.assetName,
      type: analysis.assetType,
      notes: "Auto-created via document scan",
    }) as {
      _id: string;
    };

    linkedAssetId = asset._id.toString();

    // 6️⃣ Link document to asset
    await Document.findByIdAndUpdate(doc._id, {
      assetId: asset._id,
    });
  }

  return NextResponse.json({
    id: doc._id.toString(),
    name: doc.name,
    filePath: doc.filePath,
    assetCreated: !!linkedAssetId,
    assetType: analysis?.assetType || null,
    confidence: analysis?.confidence || null,
  });
}
