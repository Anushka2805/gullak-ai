import { NextResponse } from "next/server";

const ALL_MAILS = [
    {
        from: "lic@licindia.com",
        subject: "Your LIC Policy Statement",
        snippet: "Your policy number 123456 is active...",
        body: "Your policy number 123456 is active. Statement attached.",
        attachments: ["lic-policy.pdf"],
    },
    {
        from: "no-reply@hdfcbank.com",
        subject: "HDFC Bank Account Statement - Jan 2026",
        snippet: "Your monthly bank statement is ready...",
        body: "Your monthly bank account statement is attached.",
        attachments: ["hdfc-statement.pdf"],
    },
    {
        from: "support@zerodha.com",
        subject: "Contract Note for your recent investment",
        snippet: "Thank you for trading with Zerodha...",
        body: "Your contract note for mutual fund investment is attached.",
        attachments: ["zerodha-contract.pdf"],
    },
    {
        from: "news@shopping.com",
        subject: "Big Sale is Live!",
        snippet: "Don’t miss out on discounts...",
        body: "Huge discounts on electronics.",
    },
    {
        from: "team@netflix.com",
        subject: "Your subscription receipt",
        snippet: "Thanks for your payment...",
        body: "Your monthly subscription receipt.",
    },
    {
        from: "alerts@sbi.co.in",
        subject: "SBI Account Statement Available",
        snippet: "Your account statement is ready to view...",
        body: "Please find your SBI bank statement attached.",
        attachments: ["sbi-statement.pdf"],
    },
    {
        from: "mutualfunds@icici.com",
        subject: "ICICI Mutual Fund SIP Confirmation",
        snippet: "Your SIP has been processed...",
        body: "Your mutual fund SIP has been successfully processed.",
        attachments: ["icici-sip.pdf"],
    },

    // -------- NEW REALISTIC INVESTMENT EMAILS --------

    {
        from: "noreply@rbionline.org",
        subject: "Sovereign Gold Bond Certificate - Tranche 2025-26",
        snippet: "Your Sovereign Gold Bond certificate is now available...",
        body: "Thank you for investing in Sovereign Gold Bonds. Please find your certificate attached.",
        attachments: ["sgb-certificate.pdf"],
    },
    {
        from: "invest@groww.in",
        subject: "Monthly SIP Investment Successful - Axis Bluechip Fund",
        snippet: "Your SIP for Axis Bluechip Fund has been processed...",
        body: "Your monthly SIP investment has been successfully processed.",
        attachments: ["sip-receipt.pdf"],
    },
    {
        from: "noreply@camsonline.com",
        subject: "Consolidated Mutual Fund Account Statement",
        snippet: "Your mutual fund portfolio statement is ready...",
        body: "Please find attached your consolidated account statement for mutual fund investments.",
        attachments: ["cams-cas.pdf"],
    },
    {
        from: "alerts@hdfclife.com",
        subject: "HDFC Life Insurance Premium Paid Successfully",
        snippet: "Your insurance premium payment has been received...",
        body: "Thank you for paying your HDFC Life policy premium.",
        attachments: ["premium-receipt.pdf"],
    },
    {
        from: "noreply@icicibank.com",
        subject: "Fixed Deposit Advice - FD Account Opened",
        snippet: "Your fixed deposit has been successfully created...",
        body: "Your fixed deposit account has been opened successfully. Please find advice attached.",
        attachments: ["fd-advice.pdf"],
    },
    {
        from: "portfolio@zerodha.com",
        subject: "Your Monthly Portfolio Performance Report",
        snippet: "Here is your investment portfolio performance summary...",
        body: "Your portfolio performance report for this month is attached.",
        attachments: ["portfolio-report.pdf"],
    },
    {
        from: "sales@sunriserealty.com",
        subject: "Property Booking Confirmation - Sunrise Residency",
        snippet: "Congratulations on booking your new property...",
        body: "Your booking for Sunrise Residency has been confirmed. Please find allotment letter attached.",
        attachments: ["property-allotment.pdf"],
    },
    {
        from: "noreply@incometax.gov.in",
        subject: "Capital Gains Statement for FY 2025-26",
        snippet: "Your capital gains statement is now available...",
        body: "Please find attached your capital gains statement for the financial year.",
        attachments: ["capital-gains.pdf"],
    },
    {
        from: "demat@upstox.com",
        subject: "Demat Account Holding Statement",
        snippet: "Your demat account holding statement is ready...",
        body: "Attached is your latest demat holding statement.",
        attachments: ["demat-holdings.pdf"],
    },
];

function getRandomNewMails(count: number) {
    const shuffled = [...ALL_MAILS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((m, i) => ({
        id: `${Date.now()}-${Math.random()}-${i}`,
        ...m,
    }));
}

export async function GET() {
    const newCount = 1 + Math.floor(Math.random() * 2);
    const newMails = getRandomNewMails(newCount);

    return NextResponse.json({ newMails });
}
