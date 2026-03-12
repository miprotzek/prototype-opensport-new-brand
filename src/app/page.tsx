"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Info,
  Copy,
  Check,
  Menu as MenuFeather,
  ChevronDown,
  Filter,
  X,
  Edit,
  MessageSquare,
  ArrowUp,
  Zap,
} from "react-feather";

/* ═══════════════════ Drag Scroll ═══════════════════ */

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ isDown: false, startX: 0, scrollLeft: 0, dragged: false });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    state.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, dragged: false };
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !state.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - state.current.startX;
    if (Math.abs(walk) > 3) state.current.dragged = true;
    el.scrollLeft = state.current.scrollLeft - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    state.current.isDown = false;
    el.style.cursor = "grab";
    el.style.removeProperty("user-select");
  }, []);

  const onClick = useCallback((e: React.MouseEvent) => {
    if (state.current.dragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return { ref, onMouseDown, onMouseMove, onMouseUp, onMouseLeave: onMouseUp, onClickCapture: onClick };
}

/* ═══════════════════════ Icons ═══════════════════════ */

function MenuIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-primary)]">
      <MenuFeather size={18} color="white" />
    </div>
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
  { category: "Injury risk & Fatigue", severity: "High", title: "Jack Innard", description: "Acute: Chronic ratio elevated: 1.41 (7d avg: 351.8, 28d avg: 249.1).", updated: "Updated Feb 4th", accentColor: "bg-[#c23f3f]" },
  { category: "Injury risk & Fatigue", severity: "Medium", title: "Deian Gwynne", description: "is under baseline by 28.1%.", updated: "Updated Today", accentColor: "bg-[#e8b923]" },
  { category: "Match & Training performance", severity: "Medium", title: "Ben Loader", description: "Late game speed drop detected: Q4 maxSpeed (6.93 m/s) is 10.0% below Q1-3 average (7.70 m/s)", updated: "Updated Feb 4th", accentColor: "bg-[#e8b923]" },
  { category: "Match & Training performance", severity: "High", title: "Josh Basham", description: "Late game speed drop detected: Q4 maxSpeed (5.72 m/s) is 17.0% below Q1-3 average (6.89 m/s).", updated: "Updated Feb 4th", accentColor: "bg-[#c23f3f]" },
  { category: "Injury risk & Fatigue", severity: "Medium", title: "Max Llewellyn", description: "is over baseline by 90.9%.", updated: "Updated Feb 4th", accentColor: "bg-[#e8b923]" },
  { category: "Match & Training performance", severity: "Medium", title: "Kirill Gotovtsev", description: "Late game speed drop detected: Q4 maxSpeed (5.17 m/s) is 21.5% below Q1-3 average (6.58 m/s).", updated: "Updated Feb 4th", accentColor: "bg-[#e8b923]" },
];

const SUGGESTIONS = [
  "Who reached the highest top speed during match day warmup?",
  "Which forwards covered the most total distance in training this week?",
  "Which players recorded the most high-intensity efforts this week?",
];

const FILTER_OPTIONS = {
  severity: { label: "All severity", options: ["Medium", "High"] },
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

function InsightCardItem({ card, onSendToChat, onFilterBy }: { card: InsightCard; onSendToChat: (card: InsightCard) => void; onFilterBy: (key: FilterKey, value: string) => void }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(`${card.title}: ${card.description}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <article className="flex flex-col gap-4 border-b border-[var(--light-gray)] bg-white p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col gap-4">
        <button type="button" onClick={() => onFilterBy("type", card.category)} className="text-sm font-medium leading-5 text-[var(--brand-primary)] text-left hover:underline underline-offset-2 transition-all">
          {card.category}
        </button>
        <div className="flex gap-2.5 items-start">
          <div className={`w-1 shrink-0 self-stretch rounded-full ${card.accentColor}`} />
          <p className="min-w-0 flex-1 text-base leading-[22px] tracking-[-0.32px] text-[var(--text-primary)]">
            <button type="button" onClick={() => onFilterBy("athlete", card.title)} className="font-semibold text-[var(--light-green)] hover:underline underline-offset-2 transition-all">{card.title}</button>{" "}
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
          <button type="button" aria-label="More info" className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[var(--very-light-gray)] text-[var(--text-primary)] hover:bg-[var(--light-gray)] hover:scale-105 active:scale-95 transition-all duration-150">
            <Info size={18} />
          </button>
          <button type="button" aria-label="Send to AI chat" onClick={() => onSendToChat(card)} className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[var(--very-light-gray)] text-[var(--text-primary)] hover:bg-[var(--light-gray)] hover:scale-105 active:scale-95 transition-all duration-150">
            <Zap size={18} />
          </button>
          <button
            type="button"
            aria-label="Copy"
            onClick={handleCopy}
            className={`flex h-8 w-8 items-center justify-center rounded-2xl transition-all duration-150 ${
              copied ? "bg-[var(--very-light-green)] text-[var(--light-green)] animate-pop-in" : "bg-[var(--very-light-gray)] text-[var(--text-primary)] hover:bg-[var(--light-gray)] hover:scale-105 active:scale-95"
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={18} />}
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
  const [alignRight, setAlignRight] = useState(false);

  useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const container = ref.current.closest("[data-app-root]");
      const maxRight = container ? container.getBoundingClientRect().right : window.innerWidth;
      setAlignRight(rect.left + 200 > maxRight);
    }
  }, [isOpen]);

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
            <X size={14} />
          </button>
        </span>

        {isOpen && (
          <div className={`absolute top-full z-40 mt-1.5 w-max min-w-[180px] overflow-hidden rounded-xl border border-[var(--light-gray)] bg-white shadow-lg animate-in ${alignRight ? "right-0" : "left-0"}`}>
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
                {selectedValue === opt && <Check size={14} />}
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
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full z-40 mt-1.5 w-max min-w-[180px] overflow-hidden rounded-xl border border-[var(--light-gray)] bg-white shadow-lg animate-in ${alignRight ? "right-0" : "left-0"}`}>
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
  onSendToChat,
  onShowFilters,
}: {
  showFilters: boolean;
  activeFilters: Record<FilterKey, string | null>;
  onFilterChange: (key: FilterKey, value: string | null) => void;
  onClearFilters: () => void;
  onSendToChat: (card: InsightCard) => void;
  onShowFilters: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  const handleToggle = useCallback((key: FilterKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const handleQuickFilter = useCallback((key: FilterKey, value: string) => {
    if (!showFilters) onShowFilters();
    onFilterChange(key, value);
  }, [showFilters, onShowFilters, onFilterChange]);

  const filteredInsights = INSIGHTS.filter((card) => {
    if (activeFilters.severity && card.severity !== activeFilters.severity) return false;
    if (activeFilters.type && card.category !== activeFilters.type) return false;
    if (activeFilters.athlete && card.title !== activeFilters.athlete) return false;
    return true;
  });

  return (
    <div className="flex flex-1 flex-col min-h-0">
      {showFilters && (
        <div className="shrink-0 border-b border-[var(--light-gray)] animate-slide-down relative z-30">
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
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center animate-fade-in">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--very-light-gray)] text-[var(--text-muted)]">
              <Filter size={20} />
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
          filteredInsights.map((card, i) => (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <InsightCardItem card={card} onSendToChat={onSendToChat} onFilterBy={handleQuickFilter} />
            </div>
          ))
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
    <div className="flex items-start gap-2 px-4 py-3 animate-fade-up">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--very-light-green)] text-[var(--light-green)]">
        <Zap size={14} />
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
    <div className={`flex items-start gap-2 px-4 py-1.5 animate-fade-up ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--very-light-green)] text-[var(--light-green)]">
          <Zap size={14} />
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

/* ── Chat conversation type ── */

type Conversation = {
  id: number;
  title: string;
  messages: ChatMessage[];
  timestamp: string;
};

/* ── Chat history panel ── */

function ChatHistoryPanel({
  conversations,
  activeConvId,
  onSelect,
  onClose,
}: {
  conversations: Conversation[];
  activeConvId: number;
  onSelect: (id: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-white animate-in">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--light-gray)] px-4">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Chat history</h2>
        <button type="button" aria-label="Close history" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--very-light-gray)] text-[var(--text-muted)]">
              <MessageSquare size={20} />
            </div>
            <p className="text-sm text-[var(--text-muted)]">No conversations yet</p>
          </div>
        ) : (
          conversations.map((conv, i) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => { onSelect(conv.id); onClose(); }}
              className={`flex w-full flex-col gap-1 border-b border-[var(--light-gray)] px-4 py-3 text-left transition-colors hover:bg-[var(--very-light-gray)] animate-fade-up ${
                conv.id === activeConvId ? "bg-[var(--very-light-green)]" : ""
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-sm font-semibold text-[var(--text-primary)] line-clamp-1">{conv.title}</span>
              <span className="text-xs text-[var(--text-muted)]">
                {conv.messages.length} messages · {conv.timestamp}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

/* ── AI Chat View ── */

function AIChatView({
  conversations,
  activeConvId,
  onUpdateConversation,
  showHistory,
  onSelectConversation,
  onCloseHistory,
}: {
  conversations: Conversation[];
  activeConvId: number;
  onUpdateConversation: (id: number, messages: ChatMessage[], title: string) => void;
  showHistory: boolean;
  onSelectConversation: (id: number) => void;
  onCloseHistory: () => void;
}) {
  const activeConv = conversations.find((c) => c.id === activeConvId);
  const messages = activeConv?.messages ?? [];

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nextMsgId = useRef(1);
  const dragScroll = useDragScroll();

  useEffect(() => {
    setInputText("");
    setIsTyping(false);
    setShowSuggestions(messages.length === 0);
    nextMsgId.current = messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1;

    if (messages.length === 1 && messages[0].role === "user") {
      setIsTyping(true);
      scrollToBottom();
      const convId = activeConvId;
      const title = activeConv?.title ?? "New chat";
      const delay = 1200 + Math.random() * 800;
      setTimeout(() => {
        const aiMsg: ChatMessage = { id: nextMsgId.current++, role: "assistant", text: DEFAULT_AI_RESPONSE };
        onUpdateConversation(convId, [...messages, aiMsg], title);
        setIsTyping(false);
      }, delay);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConvId]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  function sendMessage(text: string) {
    if (!text.trim() || isTyping) return;

    const userMsg: ChatMessage = { id: nextMsgId.current++, role: "user", text: text.trim() };
    const updatedMessages = [...messages, userMsg];
    const title = messages.length === 0 ? text.trim().slice(0, 50) : (activeConv?.title ?? "New chat");
    onUpdateConversation(activeConvId, updatedMessages, title);
    setInputText("");
    setShowSuggestions(false);
    setIsTyping(true);
    scrollToBottom();

    const responseText = AI_RESPONSES[text.trim()] ?? DEFAULT_AI_RESPONSE;
    const delay = 1200 + Math.random() * 800;

    setTimeout(() => {
      const aiMsg: ChatMessage = { id: nextMsgId.current++, role: "assistant", text: responseText };
      onUpdateConversation(activeConvId, [...updatedMessages, aiMsg], title);
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

  const hasText = inputText.trim().length > 0;

  return (
    <div className="relative flex flex-1 flex-col bg-white">
      {/* Chat history overlay */}
      {showHistory && (
        <ChatHistoryPanel
          conversations={conversations}
          activeConvId={activeConvId}
          onSelect={onSelectConversation}
          onClose={onCloseHistory}
        />
      )}

      {/* Messages area */}
      <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-hide">
        <div className="flex flex-1 flex-col justify-end">
          {messages.length === 0 && showSuggestions && (
            <div className="flex flex-1 flex-col justify-end pt-2.5">
              <div
                ref={dragScroll.ref}
                onMouseDown={dragScroll.onMouseDown}
                onMouseMove={dragScroll.onMouseMove}
                onMouseUp={dragScroll.onMouseUp}
                onMouseLeave={dragScroll.onMouseLeave}
                onClickCapture={dragScroll.onClickCapture}
                className="flex cursor-grab gap-2 overflow-x-auto px-2.5 pb-4 scrollbar-hide snap-x snap-mandatory"
              >
                {SUGGESTIONS.map((text, i) => (
                  <button
                    key={i}
                    type="button"
                    className="min-w-[42%] max-w-[45%] snap-start rounded-2xl bg-[var(--very-light-green)] px-2.5 py-2 text-left hover:opacity-90 active:scale-[0.98] transition-transform animate-slide-in-right"
                    style={{ animationDelay: `${i * 80}ms` }}
                    onClick={() => sendMessage(text)}
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
      </div>

      {/* Input area */}
      <div className="relative shrink-0 flex flex-col gap-2 px-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-4 before:pointer-events-none before:absolute before:inset-x-0 before:-top-8 before:h-8 before:bg-gradient-to-t before:from-white before:to-transparent">
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
                <ChevronDown size={14} className="text-[var(--medium-gray)]" />
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
                <ChevronDown size={14} />
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
              <ArrowUp size={16} color="white" />
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

  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, title: "New chat", messages: [], timestamp: "Now" },
  ]);
  const [activeConvId, setActiveConvId] = useState(1);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const nextConvId = useRef(2);

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  function handleFilterChange(key: FilterKey, value: string | null) {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleClearFilters() {
    setActiveFilters({ severity: null, type: null, date: null, athlete: null });
  }

  function handleNewChat() {
    const newId = nextConvId.current++;
    const newConv: Conversation = { id: newId, title: "New chat", messages: [], timestamp: "Now" };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
    setShowChatHistory(false);
  }

  function handleUpdateConversation(id: number, messages: ChatMessage[], title: string) {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages, title } : c))
    );
  }

  function handleSelectConversation(id: number) {
    setActiveConvId(id);
  }

  function handleAlertToChat(card: InsightCard) {
    const newId = nextConvId.current++;
    const prompt = `Validate this alert and suggest follow up actions:\n\nAlert details: "${card.title} ${card.description}"\nAthlete: ${card.title}\nCategory: ${card.category}`;
    const userMsg: ChatMessage = { id: 1, role: "user", text: prompt };
    const newConv: Conversation = {
      id: newId,
      title: `Alert: ${card.title}`,
      messages: [userMsg],
      timestamp: "Now",
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConvId(newId);
    setActiveTab("chat");
    setShowChatHistory(false);
  }

  return (
    <div data-app-root className="mx-auto flex h-[100dvh] w-full max-w-[480px] flex-col bg-[var(--very-light-gray)]">
      {/* Top spacer */}
      <div className="shrink-0 h-4" />

      {/* Header */}
      <header className="flex w-full shrink-0 items-center justify-between px-4 pb-2">
        <button type="button" aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-full hover:opacity-80">
          <MenuIcon />
        </button>
        <div className="flex items-center gap-2 py-[3px]">
          <span className="text-base font-semibold text-[var(--brand-primary)] whitespace-nowrap" style={{ fontFamily: "var(--font-open-sans)" }}>
            Gloucester Rugby
          </span>
          <span className="flex text-[var(--brand-primary)]">
            <ChevronDown size={16} />
          </span>
        </div>
      </header>

      {/* Content area */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-1">
        {/* Tab bar */}
        <div className="flex h-[47px] shrink-0 items-center justify-between border-b border-[var(--light-gray)] px-4">
          <div className="flex h-full gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("alerts")}
              className="flex h-full flex-col items-center gap-[10px]"
            >
              <div className="flex flex-1 items-center justify-center">
                <span className={`text-base font-semibold leading-5 ${activeTab === "alerts" ? "text-[var(--brand-primary)]" : "text-[var(--medium-gray)]"}`}>
                  AI alerts
                </span>
              </div>
              <div className={`h-[2px] w-full ${activeTab === "alerts" ? "bg-[var(--light-green)]" : "bg-transparent"}`} />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className="flex h-full flex-col items-center gap-[10px]"
            >
              <div className="flex flex-1 items-center justify-center">
                <span className={`text-base font-semibold leading-5 ${activeTab === "chat" ? "text-[var(--brand-primary)]" : "text-[var(--medium-gray)]"}`}>
                  AI chat
                </span>
              </div>
              <div className={`h-[2px] w-full ${activeTab === "chat" ? "bg-[var(--light-green)]" : "bg-transparent"}`} />
            </button>
          </div>

          {activeTab === "alerts" ? (
            <button
              type="button"
              aria-label="Toggle filters"
              onClick={() => setShowFilters(!showFilters)}
              className={`relative flex h-[34px] w-[34px] items-center justify-center rounded-[4px] border transition-all active:scale-95 ${
                showFilters || hasActiveFilters
                  ? "border-[var(--light-green)] bg-[var(--very-light-green)] text-[var(--light-green)]"
                  : "border-[var(--light-gray)] text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]"
              }`}
            >
              <Filter size={16} />
              {hasActiveFilters && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--light-green)] text-[10px] font-bold text-white">
                  {Object.values(activeFilters).filter(Boolean).length}
                </span>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button type="button" aria-label="New chat" onClick={handleNewChat} className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] border border-[var(--light-gray)] text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-all">
                <Edit size={16} />
              </button>
              <button
                type="button"
                aria-label="Chat history"
                onClick={() => setShowChatHistory(!showChatHistory)}
                className={`flex h-[34px] w-[34px] items-center justify-center rounded-[4px] border transition-all active:scale-95 ${
                  showChatHistory
                    ? "border-[var(--light-green)] bg-[var(--very-light-green)] text-[var(--light-green)]"
                    : "border-[var(--light-gray)] text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]"
                }`}
              >
                <MessageSquare size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Tab content */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
          {activeTab === "alerts" ? (
            <AIAlertsView
              showFilters={showFilters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onSendToChat={handleAlertToChat}
              onShowFilters={() => setShowFilters(true)}
            />
          ) : (
            <AIChatView
              conversations={conversations}
              activeConvId={activeConvId}
              onUpdateConversation={handleUpdateConversation}
              showHistory={showChatHistory}
              onSelectConversation={handleSelectConversation}
              onCloseHistory={() => setShowChatHistory(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
