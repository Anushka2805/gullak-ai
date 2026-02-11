import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Nominee from "@/models/Nominee";
import { DEMO_USER_ID } from "@/lib/demoUser";

export async function GET() {
  await connectDB();

  const nominees = await Nominee.find({ userId: DEMO_USER_ID }).lean();

  return NextResponse.json(
    nominees.map((n) => ({
      id: n._id.toString(),
      name: n.name,
      relation: n.relation,
      email: n.email,
      accessGranted: n.accessGranted,
    }))
  );
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const nominee = await Nominee.create({
    userId: DEMO_USER_ID,
    name: body.name,
    relation: body.relation,
    email: body.email,
  });

  return NextResponse.json({
    id: nominee._id.toString(),
    name: nominee.name,
    relation: nominee.relation,
    email: nominee.email,
    accessGranted: nominee.accessGranted,
  });
}
