"use client";

import { useState } from "react";

// Icons as inline SVGs (no external assets)
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#f8f7f3" />
      <path d="M12 14h16M12 20h16M12 26h16" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v4M10 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15 7l-5-4v3c-4 0-7 2.5-7 6 1-2 3-3 5-3h2v3l5-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="6" y="6" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 14V4a1 1 0 011-1h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type InsightCard = {
  category: string;
  title: string;
  description: string;
  updated: string;
  accentColor: string;
};

const INSIGHTS: InsightCard[] = [
  {
    category: "Injury risk & Fatigue",
    title: "Jack Innard",
    description: "Acute: Chronic ratio elevated: 1.41 (7d avg: 351.8, 28d avg: 249.1).",
    updated: "Updated Feb 4th",
    accentColor: "bg-[#e8b923]",
  },
  {
    category: "Injury risk & Fatigue",
    title: "Deian Gwynne",
    description: "is under baseline by 28.1%.",
    updated: "Updated Today",
    accentColor: "bg-[#5b3fc2]",
  },
  {
    category: "Match & Training performance",
    title: "Ben Loader",
    description: "Late game speed drop detected: Q4 maxSpeed (6.93 m/s) is 10.0% below Q1-3 average (7.70 m/s)",
    updated: "Updated Feb 4th",
    accentColor: "bg-[#22c55e]",
  },
  {
    category: "Match & Training performance",
    title: "Josh Basham",
    description: "Late game speed drop detected: Q4 maxSpeed (5.72 m/s) is 17.0% below Q1-3 average (6.89 m/s).",
    updated: "Updated Feb 4th",
    accentColor: "bg-[#22c55e]",
  },
  {
    category: "Injury risk & Fatigue",
    title: "Max Llewellyn",
    description: "is over baseline by 90.9%.",
    updated: "Updated Feb 4th",
    accentColor: "bg-[#5b3fc2]",
  },
  {
    category: "Match & Training performance",
    title: "Kirill Gotovtsev",
    description: "Late game speed drop detected: Q4 maxSpeed (5.17 m/s) is 21.5% below Q1-3 average (6.58 m/s).",
    updated: "Updated Feb 4th",
    accentColor: "bg-[#22c55e]",
  },
];

function InsightCardItem({ card }: { card: InsightCard }) {
  return (
    <article className="flex flex-col gap-4 border-b border-[var(--light-gray)] bg-white p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium leading-5 text-[var(--brand-primary)]" style={{ fontFamily: "var(--font-geist-sans)" }}>
          {card.category}
        </p>
        <div className="flex gap-2.5 items-start">
          <div className={`w-1 shrink-0 self-stretch rounded-full ${card.accentColor}`} />
          <p className="min-w-0 flex-1 text-base font-semibold leading-[22px] tracking-[-0.32px] text-[var(--text-primary)]">
            <span className="font-semibold">{card.title}</span>
            <span className="font-normal"> {card.description}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium leading-5 text-[var(--text-muted)] whitespace-nowrap" style={{ fontFamily: "var(--font-geist-sans)" }}>
          {card.updated}
        </p>
        <div className="flex gap-2.5 items-center">
          <button type="button" aria-label="More info" className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[var(--very-light-gray)] text-[var(--text-primary)] hover:bg-[var(--light-gray)]">
            <InfoIcon className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Share" className="flex h-8 w-8 items-center justify-center text-[var(--text-primary)] hover:opacity-80">
            <ShareIcon className="h-8 w-8" />
          </button>
          <button type="button" aria-label="Copy" className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[var(--very-light-gray)] text-[var(--text-primary)] hover:bg-[var(--light-gray)]">
            <CopyIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<"alerts" | "chat">("alerts");

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[var(--very-light-gray)]" style={{ maxWidth: 375, margin: "0 auto" }}>
      {/* Status bar */}
      <div className="flex h-[54px] w-full max-w-[375px] items-center justify-between px-6 pt-3">
        <span className="text-[15px] font-semibold tracking-[-0.28px] text-black">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M1 6c0-2.5 1.5-5 4-5s3 2.5 4 5 1.5 5 4 5 4-2.5 4-5" stroke="black" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M1 6l2-3 2 2 3-4 3 4 2-2 2 3" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="black" strokeWidth="1" />
            <rect x="3" y="3" width="7" height="6" rx="0.5" fill="black" />
            <path d="M12 4v5M15 4v5M18 4v5" stroke="black" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="flex w-full items-center justify-between px-4 pb-2">
        <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full hover:opacity-80" aria-label="Menu">
          <MenuIcon />
        </button>
        <div className="flex items-center gap-2 py-0.5">
          <span className="text-base font-semibold text-[var(--brand-primary)] whitespace-nowrap" style={{ fontFamily: "var(--font-open-sans)" }}>
            Gloucester Rugby
          </span>
          <span className="flex text-[var(--brand-primary)]">
            <ChevronDownIcon />
          </span>
        </div>
        <div className="w-10" />
      </header>

      {/* Tabs */}
      <div className="w-full rounded-t-2xl overflow-hidden bg-white">
        <div className="flex h-[47px] items-center justify-between border-b border-[var(--light-gray)] px-4">
          <div className="flex h-full gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("alerts")}
              className="flex flex-col items-center justify-center gap-2.5 min-w-[64px] pt-0"
            >
              <span className={`text-base font-semibold leading-5 ${activeTab === "alerts" ? "text-[var(--brand-primary)]" : "text-[var(--medium-gray)]"}`}>
                AI alerts
              </span>
              <div className={`h-0.5 w-full ${activeTab === "alerts" ? "bg-[var(--brand-primary)]" : "bg-transparent"}`} />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className="flex flex-col items-center justify-center gap-2.5 pt-0"
            >
              <span className={`text-base font-semibold leading-5 ${activeTab === "chat" ? "text-[var(--brand-primary)]" : "text-[var(--medium-gray)]"}`}>
                AI chat
              </span>
              <div className={`h-0.5 w-11 ${activeTab === "chat" ? "bg-[var(--brand-primary)]" : "bg-transparent"}`} />
            </button>
          </div>
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]" aria-label="Add">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {activeTab === "alerts" && INSIGHTS.map((card, i) => <InsightCardItem key={i} card={card} />)}
          {activeTab === "chat" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 px-4 text-center">
              <p className="text-base text-[var(--medium-gray)]">AI chat</p>
              <p className="text-sm text-[var(--text-muted)]">Start a conversation with the AI assistant.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
