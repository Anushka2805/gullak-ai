import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Asset from "@/models/Asset";
import Document from "@/models/Document";
import { DEMO_USER_ID } from "@/lib/demoUser";

function classify(subject: string, body: string) {
    const text = (subject + " " + body).toLowerCase();

    if (
        text.includes("property") ||
        text.includes("real estate") ||
        text.includes("booking") ||
        text.includes("allotment")
    )
        return "Property";

    if (
        text.includes("gold") ||
        text.includes("sovereign gold bond") ||
        text.includes("sgb")
    )
        return "Gold";

    if (
        text.includes("fixed deposit") ||
        text.includes("fd account") ||
        text.includes("fd advice") ||
        text.includes("fd")
    )
        return "FD";

    if (text.includes("policy") || text.includes("insurance"))
        return "Insurance";

    if (
        text.includes("mutual") ||
        text.includes("investment") ||
        text.includes("sip") ||
        text.includes("portfolio") ||
        text.includes("demat")
    )
        return "Investment";

    if (text.includes("bank") || text.includes("statement") || text.includes("account"))
        return "Bank";

    return "Other";
}


export async function POST(req: Request) {
    await connectDB();
    const { matches } = await req.json();

    let createdAssets = 0;

    for (const email of matches) {
        const type = classify(email.subject, email.body);

        const asset = await Asset.create({
            userId: DEMO_USER_ID,
            name: email.subject,
            type,
            notes: `Imported from email: ${email.from}`,
        });

        createdAssets++;

        if (email.attachments) {
            for (const file of email.attachments) {
                await Document.create({
                    userId: DEMO_USER_ID,
                    assetId: asset._id,
                    name: file,
                    filePath: `/mock-uploads/${file}`,
                });
            }
        }
    }

    return NextResponse.json({
        success: true,
        createdAssets,
    });
}
