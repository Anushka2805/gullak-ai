export type MockEmail = {
  from: string;
  subject: string;
  body: string;
  attachments?: string[];
};

export const mockEmails: MockEmail[] = [
  {
    from: "lic@licindia.com",
    subject: "Your LIC Policy Statement",
    body: "Your policy number 123456 is active. Please find attached statement.",
    attachments: ["lic-policy.pdf"],
  },
  {
    from: "no-reply@hdfcbank.com",
    subject: "HDFC Bank Account Statement - Jan 2026",
    body: "Your monthly bank account statement is attached.",
    attachments: ["hdfc-statement.pdf"],
  },
  {
    from: "support@zerodha.com",
    subject: "Contract Note for your recent investment",
    body: "Thank you for trading. Your contract note for mutual fund investment is attached.",
    attachments: ["zerodha-contract.pdf"],
  },
  {
    from: "news@shopping.com",
    subject: "Big Sale is Live!",
    body: "Don’t miss out on discounts.",
  },
];
