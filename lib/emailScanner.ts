import { mockEmails } from "@/lib/mockEmails";
import Asset from "@/models/Asset";
import Document from "@/models/Document";
import { DEMO_USER_ID } from "@/lib/demoUser";
import { connectDB } from "@/lib/db";

const KEYWORDS = [
  "policy",
  "insurance",
  "investment",
  "mutual fund",
  "sip",
  "bank",
  "statement",
  "contract",
];

function classifyEmail(subject: string, body: string) {
  const text = (subject + " " + body).toLowerCase();

  if (text.includes("policy") || text.includes("insurance")) return "Insurance";
  if (text.includes("mutual") || text.includes("investment") || text.includes("sip"))
    return "Investment";
  if (text.includes("bank") || text.includes("statement")) return "Bank";

  return "Other";
}

export async function runMockEmailScan() {
  await connectDB();

  let found = 0;
  let createdAssets = 0;

  for (const email of mockEmails) {
    const text = (email.subject + " " + email.body).toLowerCase();
    const isFinancial = KEYWORDS.some((k) => text.includes(k));

    if (!isFinancial) continue;

    found++;

    const type = classifyEmail(email.subject, email.body);

    // Create Asset
    const asset = await Asset.create({
      userId: DEMO_USER_ID,
      name: email.subject,
      type,
      notes: `Auto-imported from email: ${email.from}`,
    });

    createdAssets++;

    // Create Document for each attachment
    if (email.attachments && email.attachments.length > 0) {
      for (const file of email.attachments) {
        await Document.create({
          userId: DEMO_USER_ID,
          assetId: asset._id,
          name: file,
          filePath: `/mock-uploads/${file}`, // demo path
        });
      }
    }
  }

  return {
    scanned: mockEmails.length,
    found,
    createdAssets,
  };
}
