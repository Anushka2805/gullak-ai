import { NextResponse } from "next/server";

const KEYWORDS = [
    "policy",
    "insurance",
    "investment",
    "mutual",
    "sip",
    "bank",
    "statement",
    "contract",
];

export async function POST(req: Request) {
    const { mails } = await req.json();

    const matches = mails.filter((m: any) => {
        const text = (m.subject + " " + m.body).toLowerCase();
        return KEYWORDS.some((k) => text.includes(k));
    });

    return NextResponse.json({
        total: mails.length,
        found: matches.length,
        matches,
    });
}
