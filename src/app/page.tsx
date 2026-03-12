"use client";

import { useRef, useState } from "react";

/* ─────────────────────── Icons ─────────────────────── */

function MenuIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#f8f7f3" />
      <path d="M12 14h16M12 20h16M12 26h16" stroke="#1e3c20" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronSmallIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 4h16M5 10h10M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 3.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MessageSquareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 2h12v9H5l-3 3V2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 13V3M8 3l-4 4M8 3l4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v4M10 7v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15 7l-5-4v3c-4 0-7 2.5-7 6 1-2 3-3 5-3h2v3l5-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="6" y="6" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 14V4a1 1 0 011-1h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─────────────────────── Data ─────────────────────── */

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
    accentColor: "bg-[#c23f3f]",
  },
  {
    category: "Match & Training performance",
    title: "Ben Loader",
    description: "Late game speed drop detected: Q4 maxSpeed (6.93 m/s) is 10.0% below Q1-3 average (7.70 m/s)",
    updated: "Updated Feb 4th",
    accentColor: "bg-[#247933]",
  },
  {
    category: "Match & Training performance",
    title: "Josh Basham",
    description: "Late game speed drop detected: Q4 maxSpeed (5.72 m/s) is 17.0% below Q1-3 average (6.89 m/s).",
    updated: "Updated Feb 4th",
    accentColor: "bg-[#247933]",
  },
  {
    category: "Injury risk & Fatigue",
    title: "Max Llewellyn",
    description: "is over baseline by 90.9%.",
    updated: "Updated Feb 4th",
    accentColor: "bg-[#c23f3f]",
  },
  {
    category: "Match & Training performance",
    title: "Kirill Gotovtsev",
    description: "Late game speed drop detected: Q4 maxSpeed (5.17 m/s) is 21.5% below Q1-3 average (6.58 m/s).",
    updated: "Updated Feb 4th",
    accentColor: "bg-[#247933]",
  },
];

const SUGGESTIONS = [
  "Who reached the highest top speed during match day warmup?",
  "Which forwards covered the most total distance in training this week?",
  "Which players recorded the most high-intensity efforts this week?",
];

type FilterChip = { label: string; id: string };

const ACTIVE_FILTERS: FilterChip[] = [
  { id: "severity", label: "Medium severity" },
  { id: "type", label: "Injury risk & Fatigue" },
  { id: "date", label: "02/02/2026 - 12/03/2026" },
  { id: "athlete", label: "Jack Innard" },
];

/* ─────────────────── Sub-components ─────────────────── */

function InsightCardItem({ card }: { card: InsightCard }) {
  return (
    <article className="flex flex-col gap-4 border-b border-[var(--light-gray)] bg-white p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium leading-5 text-[var(--brand-primary)]">
          {card.category}
        </p>
        <div className="flex gap-2.5 items-start">
          <div className={`w-1 shrink-0 self-stretch rounded-full ${card.accentColor}`} />
          <p className="min-w-0 flex-1 text-base leading-[22px] tracking-[-0.32px] text-[var(--text-primary)]">
            <span className="font-semibold text-[var(--light-green)]">{card.title} </span>
            <span className="font-semibold">{card.description.split(":")[0]}:</span>
            {card.description.includes(":") && (
              <span className="font-normal"> {card.description.substring(card.description.indexOf(":") + 1).trim()}</span>
            )}
            {!card.description.includes(":") && (
              <span className="font-normal">{card.description}</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium leading-5 text-[var(--text-muted)] whitespace-nowrap">
          {card.updated}
        </p>
        <div className="flex gap-2.5 items-center">
          <button type="button" aria-label="More info" className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[var(--very-light-gray)] text-[var(--text-primary)] hover:bg-[var(--light-gray)]">
            <InfoIcon />
          </button>
          <button type="button" aria-label="Share" className="flex h-8 w-8 items-center justify-center text-[var(--text-primary)] hover:opacity-80">
            <ShareIcon />
          </button>
          <button type="button" aria-label="Copy" className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[var(--very-light-gray)] text-[var(--text-primary)] hover:bg-[var(--light-gray)]">
            <CopyIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Filter dropdown buttons (Screen 2: 14179:26036) ── */
function FilterDropdowns() {
  return (
    <div className="flex flex-wrap gap-2 border-b border-[var(--light-gray)] bg-white px-4 py-2.5">
      {["All severity", "All types", "Date range", "All athletes"].map((label) => (
        <button
          key={label}
          type="button"
          className="flex items-center gap-1 rounded border border-[var(--light-gray)] bg-white px-2.5 py-1.5 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--light-green)]"
        >
          {label}
          <ChevronSmallIcon className="h-4 w-4 text-[var(--text-primary)]" />
        </button>
      ))}
    </div>
  );
}

/* ── Active filter chips (Screen 3: 14179:26554) ── */
function FilterChips({
  filters,
  onRemove,
  onClearAll,
}: {
  filters: FilterChip[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 bg-[#ededea] px-2 py-2.5">
      {filters.map((f) => (
        <span
          key={f.id}
          className="flex items-center gap-1.5 rounded border border-[var(--light-green)] bg-[#fefefe] py-1.5 pl-2.5 pr-2 text-sm font-medium text-[#061d0e]"
        >
          {f.label}
          <button type="button" aria-label={`Remove ${f.label}`} onClick={() => onRemove(f.id)} className="text-[#061d0e] hover:opacity-70">
            <CloseSmallIcon />
          </button>
        </span>
      ))}
      <button type="button" onClick={onClearAll} className="text-sm font-medium text-[var(--light-green)] underline">
        Clear all
      </button>
    </div>
  );
}

/* ── AI Alerts view ── */
function AIAlertsView({
  filterState,
  filters,
  onRemoveFilter,
  onClearFilters,
}: {
  filterState: "hidden" | "dropdowns" | "chips";
  filters: FilterChip[];
  onRemoveFilter: (id: string) => void;
  onClearFilters: () => void;
}) {
  const filteredInsights =
    filterState === "chips" && filters.length > 0
      ? INSIGHTS.filter((c) => {
          const hasAthlete = filters.find((f) => f.id === "athlete");
          const hasType = filters.find((f) => f.id === "type");
          let match = true;
          if (hasAthlete) match = match && c.title === hasAthlete.label;
          if (hasType) match = match && c.category === hasType.label;
          return match;
        })
      : INSIGHTS;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {filterState === "dropdowns" && <FilterDropdowns />}
      {filterState === "chips" && filters.length > 0 && (
        <FilterChips filters={filters} onRemove={onRemoveFilter} onClearAll={onClearFilters} />
      )}
      <div className="flex-1 overflow-y-auto">
        {filteredInsights.map((card, i) => (
          <InsightCardItem key={i} card={card} />
        ))}
      </div>
    </div>
  );
}

/* ── AI Chat view ── */
function AIChatView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState("");
  const hasText = inputText.trim().length > 0;

  return (
    <div className="flex flex-1 flex-col justify-end bg-white">
      {/* Suggestion cards */}
      <div className="px-2.5 pt-2.5">
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {SUGGESTIONS.map((text, i) => (
            <button
              key={i}
              type="button"
              className="shrink-0 w-[164px] rounded-2xl bg-[var(--very-light-green)] px-2.5 py-2 text-left hover:opacity-90"
              onClick={() => setInputText(text)}
            >
              <span className="text-sm font-medium leading-[18px] text-[var(--brand-primary)]">
                {text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat input area */}
      <div className="flex flex-col gap-2 px-2.5 pb-2.5">
        <div className="flex flex-col gap-2 rounded-2xl border-2 border-[var(--light-green)] bg-white p-2.5 shadow-[0px_0px_15px_0px_#dfdde2]">
          <div className="px-1.5">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type # to browse Drills, Sessions, and Timeframes, @ for Participants, and ! for Metrics."
              rows={2}
              className="w-full resize-none bg-transparent text-base leading-6 text-[var(--text-primary)] placeholder:text-[#a9a9a6] focus:outline-none"
            />
          </div>

          {/* Filter chips + send button */}
          <div className="flex items-center gap-2">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <span className="rounded-2xl bg-[var(--very-light-green)] px-1.5 py-[3px] text-sm font-medium tracking-[0.14px] text-[var(--medium-gray)]">
                GPS data
              </span>
              <button type="button" className="flex items-center gap-0.5 rounded-2xl bg-[var(--very-light-gray)] px-1.5 py-[3px] text-sm font-medium tracking-[0.14px] text-[var(--medium-gray)]">
                Metrics
                <ChevronSmallIcon className="h-4 w-4 text-[var(--medium-gray)]" />
              </button>
              <button type="button" className="flex items-center gap-1 rounded-2xl bg-[var(--very-light-gray)] px-1.5 py-[3px] text-sm font-medium tracking-[0.14px] text-[var(--medium-gray)]">
                Suggestions
                <ChevronSmallIcon className="h-4 w-4 text-[var(--medium-gray)]" />
              </button>
            </div>
            <button
              type="button"
              aria-label="Send message"
              className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-colors ${
                hasText ? "bg-[var(--light-green)]" : "bg-[#a9a9a6]"
              }`}
            >
              <ArrowUpIcon />
            </button>
          </div>
        </div>

        <p className="text-center text-xs leading-normal text-[var(--medium-gray)]">
          OpenSport AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────── Main Page ─────────────────── */

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<"alerts" | "chat">("alerts");
  const [filterState, setFilterState] = useState<"hidden" | "dropdowns" | "chips">("hidden");
  const [filters, setFilters] = useState<FilterChip[]>([]);

  function handleFilterToggle() {
    if (filterState === "hidden") {
      setFilterState("dropdowns");
    } else if (filterState === "dropdowns") {
      setFilters([...ACTIVE_FILTERS]);
      setFilterState("chips");
    } else {
      setFilterState("hidden");
      setFilters([]);
    }
  }

  function handleRemoveFilter(id: string) {
    const next = filters.filter((f) => f.id !== id);
    if (next.length === 0) {
      setFilterState("hidden");
      setFilters([]);
    } else {
      setFilters(next);
    }
  }

  function handleClearFilters() {
    setFilterState("hidden");
    setFilters([]);
  }

  return (
    <div className="mx-auto flex h-screen max-w-[375px] flex-col bg-[var(--very-light-gray)]">
      {/* Status bar */}
      <div className="flex h-[54px] w-full shrink-0 items-center justify-between px-6 pt-3">
        <span className="text-[15px] font-semibold tracking-[-0.28px] text-black">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <rect x="1" y="3" width="3" height="9" rx="1" fill="black" />
            <rect x="5.5" y="2" width="3" height="10" rx="1" fill="black" />
            <rect x="10" y="1" width="3" height="11" rx="1" fill="black" />
            <rect x="14.5" y="0" width="3" height="12" rx="1" fill="black" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M8 3.6C9.8 3.6 11.4 4.3 12.6 5.4L14 4C12.4 2.5 10.3 1.6 8 1.6S3.6 2.5 2 4l1.4 1.4C4.6 4.3 6.2 3.6 8 3.6z" fill="black" />
            <path d="M8 7.2c1 0 1.9.4 2.6 1L12 6.8c-1.1-1-2.5-1.6-4-1.6s-2.9.6-4 1.6L5.4 8.2C6.1 7.6 7 7.2 8 7.2z" fill="black" />
            <circle cx="8" cy="10.4" r="1.6" fill="black" />
          </svg>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
            <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="black" strokeOpacity="0.35" />
            <rect x="2" y="2" width="18" height="9" rx="1.5" fill="black" />
            <path d="M24 4.5v4a2.5 2.5 0 000-4z" fill="black" fillOpacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="flex w-full shrink-0 items-center justify-between px-4 pb-2">
        <button type="button" aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-full hover:opacity-80">
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

      {/* Content area */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-2xl bg-white">
        {/* Tab bar */}
        <div className="flex h-[47px] shrink-0 items-center justify-between border-b border-[var(--light-gray)] px-4">
          <div className="flex h-full gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("alerts")}
              className="flex h-full flex-col items-center justify-between pt-3"
            >
              <span className={`text-base font-semibold leading-5 ${activeTab === "alerts" ? "text-[var(--brand-primary)]" : "text-[var(--medium-gray)]"}`}>
                AI alerts
              </span>
              <div className={`h-0.5 w-full rounded-full ${activeTab === "alerts" ? "bg-[var(--brand-primary)]" : "bg-transparent"}`} />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className="flex h-full flex-col items-center justify-between pt-3"
            >
              <span className={`text-base font-semibold leading-5 ${activeTab === "chat" ? "text-[var(--brand-primary)]" : "text-[var(--medium-gray)]"}`}>
                AI chat
              </span>
              <div className={`h-0.5 w-full rounded-full ${activeTab === "chat" ? "bg-[var(--brand-primary)]" : "bg-transparent"}`} />
            </button>
          </div>

          {/* Tab-bar actions */}
          {activeTab === "alerts" ? (
            <button
              type="button"
              aria-label="Filter"
              onClick={handleFilterToggle}
              className="flex h-[34px] w-[34px] items-center justify-center rounded border border-[var(--light-gray)] bg-white text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]"
            >
              <FilterIcon />
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button type="button" aria-label="New chat" className="flex h-[30px] w-[30px] items-center justify-center rounded border border-[var(--light-gray)] text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]">
                <EditIcon />
              </button>
              <button type="button" aria-label="Chat history" className="flex h-[30px] w-[30px] items-center justify-center rounded border border-[var(--light-gray)] text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]">
                <MessageSquareIcon />
              </button>
            </div>
          )}
        </div>

        {/* Tab content */}
        {activeTab === "alerts" ? (
          <AIAlertsView
            filterState={filterState}
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <AIChatView />
        )}
      </div>
    </div>
  );
}
