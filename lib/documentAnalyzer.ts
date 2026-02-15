type AnalysisResult = {
  assetType: "Insurance" | "Investment" | "FD" | "Property" | "Gold" | "Bank";
  assetName: string;
  confidence: number;
};

export function analyzeDocumentText(text: string): AnalysisResult | null {
  const t = text.toLowerCase();

  if (t.includes("policy") || t.includes("insurance") || t.includes("lic")) {
    return {
      assetType: "Insurance",
      assetName: "Insurance Policy",
      confidence: 0.92,
    };
  }

  if (t.includes("fixed deposit") || t.includes("fd")) {
    return {
      assetType: "FD",
      assetName: "Fixed Deposit",
      confidence: 0.9,
    };
  }

  if (t.includes("mutual fund") || t.includes("sip") || t.includes("folio")) {
    return {
      assetType: "Investment",
      assetName: "Mutual Fund Investment",
      confidence: 0.91,
    };
  }

  if (t.includes("property") || t.includes("allotment") || t.includes("real estate")) {
    return {
      assetType: "Property",
      assetName: "Property Investment",
      confidence: 0.88,
    };
  }

  if (t.includes("gold") || t.includes("sovereign gold bond")) {
    return {
      assetType: "Gold",
      assetName: "Gold Investment",
      confidence: 0.89,
    };
  }

  return null;
}
