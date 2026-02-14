"use client";

import { useEffect, useState } from "react";
import {
    RefreshCw,
    Search,
    Filter,
    Download,
    CheckCircle,
    Mail,
} from "lucide-react";

type MailType = {
    id: string;
    from: string;
    subject: string;
    snippet: string;
    body: string;
    attachments?: string[];
};

type Step = "idle" | "scanning" | "filtered" | "importing" | "done";

export default function EmailScanPage() {
    const [mails, setMails] = useState<MailType[]>([]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<Step>("idle");
    const [matches, setMatches] = useState<MailType[]>([]);
    const [newIds, setNewIds] = useState<string[]>([]);


    const loadInbox = async () => {
        setLoading(true);
        const res = await fetch("/api/email/mock-inbox");
        const data = await res.json();

        const ids = data.newMails.map((m: any) => m.id);
        setNewIds(ids);

        if (mails.length === 0) {
            setMails(data.newMails);
        } else {
            setMails((prev) => [...data.newMails, ...prev]);
        }

        setLoading(false);

        // Remove highlight after 2s
        setTimeout(() => setNewIds([]), 2000);
    };



    useEffect(() => {
        loadInbox();
    }, []);

    const scanMails = async () => {
        setStep("scanning");
        await new Promise((r) => setTimeout(r, 800)); // small UX delay

        const res = await fetch("/api/email/mock-scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mails }),
        });
        const data = await res.json();

        setMatches(data.matches);
        setStep("filtered");
    };

    const importMails = async () => {
        setStep("importing");
        await new Promise((r) => setTimeout(r, 800)); // UX delay

        await fetch("/api/email/mock-import", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ matches }),
        });

        setStep("done");
    };

    const isMatched = (id: string) => matches.some((m) => m.id === id);

    const stepsUI = [
        { key: "idle", label: "Inbox", icon: Mail },
        { key: "scanning", label: "Scanning", icon: Search },
        { key: "filtered", label: "Filtering", icon: Filter },
        { key: "importing", label: "Importing", icon: Download },
        { key: "done", label: "Done", icon: CheckCircle },
    ];

    const currentIndex = stepsUI.findIndex((s) => s.key === step);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-yellow-600 mb-6">
                Email Investment Scanner
            </h1>

            {/* Step Progress */}
            <div className="flex items-center justify-between mb-8">
                {stepsUI.map((s, idx) => {
                    const Icon = s.icon;
                    const active = idx <= currentIndex;

                    return (
                        <div key={s.key} className="flex-1 flex items-center">
                            <div
                                className={`flex flex-col items-center transition-all ${active ? "text-yellow-600" : "text-slate-400"
                                    }`}
                            >
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${active ? "border-yellow-500 bg-yellow-50" : "border-slate-300"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-sm mt-2 font-medium">{s.label}</span>
                            </div>
                            {idx !== stepsUI.length - 1 && (
                                <div
                                    className={`flex-1 h-[2px] mx-2 transition-all ${idx < currentIndex ? "bg-yellow-500" : "bg-slate-300"
                                        }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={loadInbox}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-slate-50"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh Inbox
                </button>

                <div className="space-x-2">
                    <button
                        onClick={scanMails}
                        disabled={step === "scanning" || mails.length === 0}
                        className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50"
                    >
                        Scan Emails
                    </button>

                    {step === "filtered" && matches.length > 0 && (
                        <button
                            onClick={importMails}
                            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                        >
                            Import to Gullak
                        </button>
                    )}
                </div>
            </div>

            {/* Inbox */}
            <div className="bg-white rounded-xl shadow border divide-y">
                {loading && (
                    <div className="p-4 text-slate-500">Loading inbox...</div>
                )}

                {!loading &&
                    mails.map((mail) => (
                        <div
                            key={mail.id}
                            className={`p-4 flex justify-between items-center transition-all ${isMatched(mail.id)
                                    ? "bg-yellow-50"
                                    : newIds.includes(mail.id)
                                        ? "bg-blue-50"
                                        : ""
                                }`}

                        >
                            <div>
                                <div className="font-semibold text-slate-800">
                                    {mail.subject}
                                </div>
                                <div className="text-sm text-slate-500">
                                    {mail.from} — {mail.snippet}
                                </div>
                            </div>
                            {isMatched(mail.id) && (
                                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                                    Financial
                                </span>
                            )}
                        </div>
                    ))}
            </div>

            {/* Result Messages */}
            {step === "done" && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
                    Successfully imported {matches.length} emails into Assets & Documents.
                </div>
            )}
        </div>
    );
}
