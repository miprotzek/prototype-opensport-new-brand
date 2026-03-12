"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ═══════════════════════ Icons ═══════════════════════ */

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

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" stroke="currentColor" strokeWidth="1" fill="currentColor" />
    </svg>
  );
}

/* ═══════════════════════ Data ═══════════════════════ */

type InsightCard = {
  category: string;
  severity: string;
  title: string;
  description: string;
  updated: string;
  accentColor: string;
};

const INSIGHTS: InsightCard[] = [
  { category: "Injury risk & Fatigue", severity: "High", title: "Jack Innard", description: "Acute: Chronic ratio elevated: 1.41 (7d avg: 351.8, 28d avg: 249.1).", updated: "Updated Feb 4th", accentColor: "bg-[#e8b923]" },
  { category: "Injury risk & Fatigue", severity: "Medium", title: "Deian Gwynne", description: "is under baseline by 28.1%.", updated: "Updated Today", accentColor: "bg-[#c23f3f]" },
  { category: "Match & Training performance", severity: "Medium", title: "Ben Loader", description: "Late game speed drop detected: Q4 maxSpeed (6.93 m/s) is 10.0% below Q1-3 average (7.70 m/s)", updated: "Updated Feb 4th", accentColor: "bg-[#247933]" },
  { category: "Match & Training performance", severity: "High", title: "Josh Basham", description: "Late game speed drop detected: Q4 maxSpeed (5.72 m/s) is 17.0% below Q1-3 average (6.89 m/s).", updated: "Updated Feb 4th", accentColor: "bg-[#247933]" },
  { category: "Injury risk & Fatigue", severity: "Low", title: "Max Llewellyn", description: "is over baseline by 90.9%.", updated: "Updated Feb 4th", accentColor: "bg-[#c23f3f]" },
  { category: "Match & Training performance", severity: "Medium", title: "Kirill Gotovtsev", description: "Late game speed drop detected: Q4 maxSpeed (5.17 m/s) is 21.5% below Q1-3 average (6.58 m/s).", updated: "Updated Feb 4th", accentColor: "bg-[#247933]" },
];

const SUGGESTIONS = [
  "Who reached the highest top speed during match day warmup?",
  "Which forwards covered the most total distance in training this week?",
  "Which players recorded the most high-intensity efforts this week?",
];

const FILTER_OPTIONS = {
  severity: { label: "All severity", options: ["Low", "Medium", "High", "Critical"] },
  type: { label: "All types", options: ["Injury risk & Fatigue", "Match & Training performance"] },
  date: { label: "Date range", options: ["Last 7 days", "Last 30 days", "Last 90 days", "02/02/2026 - 12/03/2026"] },
  athlete: { label: "All athletes", options: [...new Set(INSIGHTS.map((i) => i.title))] },
} as const;

type FilterKey = keyof typeof FILTER_OPTIONS;

const AI_RESPONSES: Record<string, string> = {
  "Who reached the highest top speed during match day warmup?":
    "Based on the GPS data from the latest match day warmup, **Ben Loader** recorded the highest top speed at **9.2 m/s** during the warm-up drills. This is consistent with his sprint profile over the past 4 weeks.\n\nNotably, Josh Basham (8.7 m/s) and Jack Innard (8.4 m/s) also showed strong numbers.",
  "Which forwards covered the most total distance in training this week?":
    "This week's training distance leaders among forwards:\n\n1. **Jack Innard** — 28.4 km total\n2. **Max Llewellyn** — 26.1 km total\n3. **Josh Basham** — 24.8 km total\n\nJack's total is 12% above his 4-week average, which correlates with his elevated Acute:Chronic ratio (1.41).",
  "Which players recorded the most high-intensity efforts this week?":
    "Top high-intensity effort counts this week:\n\n1. **Ben Loader** — 142 efforts (↑ 8% vs avg)\n2. **Kirill Gotovtsev** — 128 efforts (↓ 3% vs avg)\n3. **Josh Basham** — 119 efforts (↑ 15% vs avg)\n\nJosh Basham's increase is notable and may warrant monitoring alongside his late-game speed drops.",
};

const DEFAULT_AI_RESPONSE =
  "Based on the available GPS and performance data, I can see several interesting patterns. The key metrics show variations across the squad that are worth monitoring.\n\nWould you like me to drill deeper into any specific player or metric?";

/* ═══════════════════ Sub-components ═══════════════════ */

function InsightCardItem({ card }: { card: InsightCard }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(`${card.title}: ${card.description}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

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
            {card.description.includes(":") ? (
              <>
                <span className="font-semibold">{card.description.split(":")[0]}:</span>
                <span className="font-normal"> {card.description.substring(card.description.indexOf(":") + 1).trim()}</span>
              </>
            ) : (
              <span className="font-semibold">{card.description}</span>
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
          <button
            type="button"
            aria-label="Copy"
            onClick={handleCopy}
            className={`flex h-8 w-8 items-center justify-center rounded-2xl transition-colors ${
              copied ? "bg-[var(--very-light-green)] text-[var(--light-green)]" : "bg-[var(--very-light-gray)] text-[var(--text-primary)] hover:bg-[var(--light-gray)]"
            }`}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── Filter item: dropdown when unselected, removable chip when selected ── */

function FilterItem({
  filterKey,
  selectedValue,
  onSelect,
  isOpen,
  onToggle,
}: {
  filterKey: FilterKey;
  selectedValue: string | null;
  onSelect: (key: FilterKey, value: string | null) => void;
  isOpen: boolean;
  onToggle: (key: FilterKey) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const config = FILTER_OPTIONS[filterKey];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onToggle(filterKey);
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, filterKey, onToggle]);

  if (selectedValue) {
    return (
      <div ref={ref} className="relative">
        <span className="flex items-center gap-1 rounded border border-[var(--light-green)] bg-[#fefefe] py-1.5 pl-2.5 pr-1.5 text-sm font-medium text-[#061d0e]">
          <button type="button" onClick={() => onToggle(filterKey)} className="hover:underline">
            {selectedValue}
          </button>
          <button
            type="button"
            aria-label={`Remove ${selectedValue}`}
            onClick={() => onSelect(filterKey, null)}
            className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[#061d0e] transition-colors hover:bg-[var(--light-gray)]"
          >
            <CloseSmallIcon />
          </button>
        </span>

        {isOpen && (
          <div className="absolute left-0 top-full z-20 mt-1.5 w-max min-w-[180px] overflow-hidden rounded-xl border border-[var(--light-gray)] bg-white shadow-lg animate-in">
            {config.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onSelect(filterKey, opt); onToggle(filterKey); }}
                className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors hover:bg-[var(--very-light-gray)] ${
                  selectedValue === opt ? "font-semibold text-[var(--light-green)] bg-[var(--very-light-green)]" : "text-[var(--text-primary)]"
                }`}
              >
                <span>{opt}</span>
                {selectedValue === opt && <CheckIcon />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => onToggle(filterKey)}
        className={`flex items-center gap-1 rounded border px-2.5 py-1.5 text-sm font-medium transition-all active:scale-[0.97] ${
          isOpen
            ? "border-[var(--light-green)] bg-white text-[var(--text-primary)] shadow-sm"
            : "border-[var(--light-gray)] bg-white text-[var(--text-primary)] hover:border-[var(--medium-gray)]"
        }`}
      >
        {config.label}
        <ChevronSmallIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-1.5 w-max min-w-[180px] overflow-hidden rounded-xl border border-[var(--light-gray)] bg-white shadow-lg animate-in">
          {config.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onSelect(filterKey, opt); onToggle(filterKey); }}
              className="flex w-full items-center px-3 py-2.5 text-left text-sm text-[var(--text-primary)] transition-colors hover:bg-[var(--very-light-gray)]"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── AI Alerts View ── */

function AIAlertsView({
  showFilters,
  activeFilters,
  onFilterChange,
  onClearFilters,
}: {
  showFilters: boolean;
  activeFilters: Record<FilterKey, string | null>;
  onFilterChange: (key: FilterKey, value: string | null) => void;
  onClearFilters: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  const handleToggle = useCallback((key: FilterKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const filteredInsights = INSIGHTS.filter((card) => {
    if (activeFilters.severity && card.severity !== activeFilters.severity) return false;
    if (activeFilters.type && card.category !== activeFilters.type) return false;
    if (activeFilters.athlete && card.title !== activeFilters.athlete) return false;
    return true;
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {showFilters && (
        <div className="shrink-0 border-b border-[var(--light-gray)]">
          <div className="flex flex-wrap items-center gap-2 bg-white px-4 py-2.5">
            {(Object.keys(FILTER_OPTIONS) as FilterKey[]).map((key) => (
              <FilterItem
                key={key}
                filterKey={key}
                selectedValue={activeFilters[key]}
                onSelect={onFilterChange}
                isOpen={openDropdown === key}
                onToggle={handleToggle}
              />
            ))}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="ml-auto text-sm font-medium text-[var(--light-green)] underline underline-offset-2 transition-colors hover:text-[var(--brand-primary)]"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      )}

      {showFilters && hasActiveFilters && (
        <div className="shrink-0 bg-white px-4 py-2 border-b border-[var(--light-gray)]">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            {filteredInsights.length} {filteredInsights.length === 1 ? "result" : "results"}
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {filteredInsights.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--very-light-gray)] text-[var(--text-muted)]">
              <FilterIcon />
            </div>
            <p className="text-base font-medium text-[var(--text-primary)]">No alerts match</p>
            <p className="max-w-[200px] text-sm text-[var(--text-muted)]">Try removing some filters to see more results.</p>
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-1 rounded-lg bg-[var(--very-light-green)] px-4 py-2 text-sm font-medium text-[var(--light-green)] transition-colors hover:bg-[#d4efd2]"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredInsights.map((card, i) => <InsightCardItem key={i} card={card} />)
        )}
      </div>
    </div>
  );
}

/* ── Chat message types ── */

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

/* ── Typing dots animation ── */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 px-4 py-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--very-light-green)] text-[var(--light-green)]">
        <SparkleIcon />
      </div>
      <div className="flex items-center gap-1 rounded-2xl bg-[var(--very-light-gray)] px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:300ms]" />
      </div>
    </div>
  );
}

/* ── Single chat bubble ── */
function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-start gap-2 px-4 py-1.5 ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--very-light-green)] text-[var(--light-green)]">
          <SparkleIcon />
        </div>
      )}
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[15px] leading-[22px] ${
          isUser
            ? "rounded-tr-md bg-[var(--very-light-green)] text-[var(--brand-primary)]"
            : "rounded-tl-md bg-[var(--very-light-gray)] text-[var(--text-primary)]"
        }`}
        dangerouslySetInnerHTML={{
          __html: msg.text
            .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
            .replace(/\n/g, "<br/>"),
        }}
      />
    </div>
  );
}

/* ── AI Chat View ── */

function AIChatView({ onNewChat }: { onNewChat: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (onNewChat) {
      setMessages([]);
      setInputText("");
      setIsTyping(false);
      setShowSuggestions(true);
      nextId.current = 1;
    }
  }, [onNewChat]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: nextId.current++, role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setShowSuggestions(false);
    setIsTyping(true);
    scrollToBottom();

    const responseText = AI_RESPONSES[text.trim()] ?? DEFAULT_AI_RESPONSE;
    const delay = 1200 + Math.random() * 800;

    setTimeout(() => {
      const aiMsg: ChatMessage = { id: nextId.current++, role: "assistant", text: responseText };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      scrollToBottom();
    }, delay);
  }

  function handleSubmit() {
    sendMessage(inputText);
    textareaRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSuggestionClick(text: string) {
    sendMessage(text);
  }

  const hasText = inputText.trim().length > 0;

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Messages area */}
      <div className="flex flex-1 flex-col justify-end overflow-y-auto">
        {messages.length === 0 && showSuggestions && (
          <div className="flex flex-1 flex-col justify-end px-2.5 pt-2.5">
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {SUGGESTIONS.map((text, i) => (
                <button
                  key={i}
                  type="button"
                  className="shrink-0 w-[164px] rounded-2xl bg-[var(--very-light-green)] px-2.5 py-2 text-left hover:opacity-90 active:scale-[0.98] transition-transform"
                  onClick={() => handleSuggestionClick(text)}
                >
                  <span className="text-sm font-medium leading-[18px] text-[var(--brand-primary)]">
                    {text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="flex flex-col gap-1 py-3">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} msg={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="shrink-0 flex flex-col gap-2 px-2.5 pb-2.5">
        <div className="flex flex-col gap-2 rounded-2xl border-2 border-[var(--light-green)] bg-white p-2.5 shadow-[0px_0px_15px_0px_#dfdde2]">
          <div className="px-1.5">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type # to browse Drills, Sessions, and Timeframes, @ for Participants, and ! for Metrics."
              rows={2}
              className="w-full resize-none bg-transparent text-base leading-6 text-[var(--text-primary)] placeholder:text-[#a9a9a6] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <span className="rounded-2xl bg-[var(--very-light-green)] px-1.5 py-[3px] text-sm font-medium tracking-[0.14px] text-[var(--medium-gray)]">
                GPS data
              </span>
              <button type="button" className="flex items-center gap-0.5 rounded-2xl bg-[var(--very-light-gray)] px-1.5 py-[3px] text-sm font-medium tracking-[0.14px] text-[var(--medium-gray)]">
                Metrics
                <ChevronSmallIcon className="h-4 w-4 text-[var(--medium-gray)]" />
              </button>
              <button
                type="button"
                onClick={() => setShowSuggestions(!showSuggestions)}
                className={`flex items-center gap-1 rounded-2xl px-1.5 py-[3px] text-sm font-medium tracking-[0.14px] transition-colors ${
                  showSuggestions && messages.length === 0
                    ? "bg-[var(--very-light-green)] text-[var(--brand-primary)]"
                    : "bg-[var(--very-light-gray)] text-[var(--medium-gray)]"
                }`}
              >
                Suggestions
                <ChevronSmallIcon className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              aria-label="Send message"
              onClick={handleSubmit}
              disabled={!hasText}
              className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-colors ${
                hasText ? "bg-[var(--light-green)] active:scale-95" : "bg-[#a9a9a6]"
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

/* ═══════════════════ Main Page ═══════════════════ */

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<"alerts" | "chat">("alerts");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<FilterKey, string | null>>({
    severity: null,
    type: null,
    date: null,
    athlete: null,
  });
  const [newChatSignal, setNewChatSignal] = useState(false);

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  function handleFilterChange(key: FilterKey, value: string | null) {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleClearFilters() {
    setActiveFilters({ severity: null, type: null, date: null, athlete: null });
  }

  function handleNewChat() {
    setNewChatSignal(true);
    setTimeout(() => setNewChatSignal(false), 100);
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

          {activeTab === "alerts" ? (
            <button
              type="button"
              aria-label="Toggle filters"
              onClick={() => setShowFilters(!showFilters)}
              className={`relative flex h-[34px] w-[34px] items-center justify-center rounded border transition-all active:scale-95 ${
                showFilters || hasActiveFilters
                  ? "border-[var(--light-green)] bg-[var(--very-light-green)] text-[var(--light-green)]"
                  : "border-[var(--light-gray)] bg-white text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]"
              }`}
            >
              <FilterIcon />
              {hasActiveFilters && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--light-green)] text-[10px] font-bold text-white">
                  {Object.values(activeFilters).filter(Boolean).length}
                </span>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button type="button" aria-label="New chat" onClick={handleNewChat} className="flex h-[30px] w-[30px] items-center justify-center rounded border border-[var(--light-gray)] text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-transform">
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
            showFilters={showFilters}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <AIChatView onNewChat={newChatSignal} />
        )}
      </div>
    </div>
  );
}
