"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  Menu as MenuFeather,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  X,
  Edit,
  MessageSquare,
  ArrowUp,
  Zap,
  AlertTriangle,
  Activity,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
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
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#69D55D]">
      <MenuFeather size={18} color="#1E3C20" />
    </div>
  );
}

/* ═══════════════════════ Data ═══════════════════════ */

type AlertState = "at-risk" | "load-imbalance" | "performance-signal";

type PlayerAlert = {
  id: number;
  name: string;
  state: AlertState;
  severity: "High" | "Medium";
  shortReason: string;
  metricSnippet: string;
  updated: string;
  alertTitle: string;
  interpretation: string;
  metrics: { label: string; value: string }[];
  explanation: string;
  recommendations: string[];
};

const PLAYER_ALERTS: PlayerAlert[] = [
  {
    id: 1, name: "Jack Innard", state: "at-risk", severity: "High",
    shortReason: "Acute:chronic ratio elevated",
    metricSnippet: "1.41 ratio · updated today",
    updated: "Updated today",
    alertTitle: "Acute:chronic ratio elevated",
    interpretation: "Current 7-day load is significantly above the 28-day baseline.",
    metrics: [
      { label: "Current value", value: "1.41" },
      { label: "Baseline", value: "1.00–1.20" },
      { label: "Deviation", value: "+18%" },
      { label: "Threshold", value: "1.20" },
    ],
    explanation: "Jack's recent load increased faster than his normal baseline, which may indicate elevated fatigue or overload risk.",
    recommendations: ["Review training volume", "Monitor next session", "Validate with staff context"],
  },
  {
    id: 2, name: "Deian Gwynne", state: "at-risk", severity: "Medium",
    shortReason: "Load is under baseline",
    metricSnippet: "28.1% below normal · updated today",
    updated: "Updated today",
    alertTitle: "Load under baseline",
    interpretation: "Current training load is significantly below the expected range.",
    metrics: [
      { label: "Current load", value: "179.2" },
      { label: "Baseline", value: "249.1" },
      { label: "Deviation", value: "-28.1%" },
      { label: "Threshold", value: "±20%" },
    ],
    explanation: "Deian's recent training load has dropped below his established baseline, which may indicate under-training or recovery from an unreported issue.",
    recommendations: ["Check for unreported injury", "Review recent attendance", "Adjust training plan if needed"],
  },
  {
    id: 3, name: "Max Llewellyn", state: "at-risk", severity: "Medium",
    shortReason: "Load is above baseline",
    metricSnippet: "90.9% above normal · updated Feb 4",
    updated: "Updated Feb 4th",
    alertTitle: "Load above baseline",
    interpretation: "Current training load is well above the expected range.",
    metrics: [
      { label: "Current load", value: "475.6" },
      { label: "Baseline", value: "249.1" },
      { label: "Deviation", value: "+90.9%" },
      { label: "Threshold", value: "±20%" },
    ],
    explanation: "Max's recent training volume has spiked significantly above his normal range, increasing the risk of overuse injury.",
    recommendations: ["Reduce session intensity", "Monitor fatigue markers", "Consider rest day"],
  },
  {
    id: 4, name: "Ben Loader", state: "load-imbalance", severity: "Medium",
    shortReason: "Late game speed drop detected",
    metricSnippet: "10.0% drop Q4 vs Q1-3 · updated Feb 4",
    updated: "Updated Feb 4th",
    alertTitle: "Late game speed drop",
    interpretation: "Q4 max speed (6.93 m/s) is 10.0% below Q1-3 average (7.70 m/s).",
    metrics: [
      { label: "Q4 speed", value: "6.93 m/s" },
      { label: "Q1-3 avg", value: "7.70 m/s" },
      { label: "Drop", value: "-10.0%" },
      { label: "Threshold", value: "-8%" },
    ],
    explanation: "Ben's speed output decreased in the final quarter, suggesting accumulated fatigue during match play.",
    recommendations: ["Review conditioning program", "Check hydration protocol", "Monitor in next match"],
  },
  {
    id: 5, name: "Josh Basham", state: "load-imbalance", severity: "High",
    shortReason: "Late game speed drop detected",
    metricSnippet: "17.0% drop Q4 vs Q1-3 · updated Feb 4",
    updated: "Updated Feb 4th",
    alertTitle: "Late game speed drop",
    interpretation: "Q4 max speed (5.72 m/s) is 17.0% below Q1-3 average (6.89 m/s).",
    metrics: [
      { label: "Q4 speed", value: "5.72 m/s" },
      { label: "Q1-3 avg", value: "6.89 m/s" },
      { label: "Drop", value: "-17.0%" },
      { label: "Threshold", value: "-8%" },
    ],
    explanation: "Josh showed a significant drop in speed output in the final quarter, well above the acceptable threshold.",
    recommendations: ["Assess match fitness", "Review workload distribution", "Consider substitution strategy"],
  },
  {
    id: 6, name: "Kirill Gotovtsev", state: "performance-signal", severity: "Medium",
    shortReason: "Late game speed drop detected",
    metricSnippet: "21.5% drop Q4 vs Q1-3 · updated Feb 4",
    updated: "Updated Feb 4th",
    alertTitle: "Late game speed drop",
    interpretation: "Q4 max speed (5.17 m/s) is 21.5% below Q1-3 average (6.58 m/s).",
    metrics: [
      { label: "Q4 speed", value: "5.17 m/s" },
      { label: "Q1-3 avg", value: "6.58 m/s" },
      { label: "Drop", value: "-21.5%" },
      { label: "Threshold", value: "-8%" },
    ],
    explanation: "Kirill's speed dropped substantially in the final quarter, indicating potential conditioning issues during match play.",
    recommendations: ["Review game-day preparation", "Evaluate conditioning baseline", "Monitor trend over next matches"],
  },
];

type AlertStateConfig = {
  key: AlertState;
  label: string;
  color: string;
  dotColor: string;
  bgColor: string;
  icon: React.ElementType;
  summary: string;
};

const ALERT_STATES: AlertStateConfig[] = [
  {
    key: "at-risk", label: "At Risk", color: "text-[#c23f3f]", dotColor: "bg-[#c23f3f]",
    bgColor: "bg-[#fef2f2]", icon: AlertTriangle,
    summary: "Immediate injury or overload concerns detected.",
  },
  {
    key: "load-imbalance", label: "Load Imbalance", color: "text-[#b45309]", dotColor: "bg-[#e8b923]",
    bgColor: "bg-[#fffbeb]", icon: Activity,
    summary: "Training load is trending above or below baseline.",
  },
  {
    key: "performance-signal", label: "Performance Signal", color: "text-[#247933]", dotColor: "bg-[#69D55D]",
    bgColor: "bg-[#f0fdf4]", icon: TrendingUp,
    summary: "Performance changes detected during training or match play.",
  },
];

const SUGGESTIONS = [
  "Who reached the highest top speed during match day warmup?",
  "Which forwards covered the most total distance in training this week?",
  "Which players recorded the most high-intensity efforts this week?",
];

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

/* ═══════════════════ Screen 1 — Alerts Overview ═══════════════════ */

function AlertsOverview({ onSelectState }: { onSelectState: (state: AlertState) => void }) {
  const totalPlayers = new Set(PLAYER_ALERTS.map((a) => a.name)).size;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 pt-5 pb-3">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Alerts overview</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {totalPlayers} players need attention today
        </p>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-4">
        {ALERT_STATES.map((stateConfig, i) => {
          const players = PLAYER_ALERTS.filter((a) => a.state === stateConfig.key);
          if (players.length === 0) return null;
          const highCount = players.filter((p) => p.severity === "High").length;
          const medCount = players.filter((p) => p.severity === "Medium").length;
          const Icon = stateConfig.icon;

          return (
            <button
              key={stateConfig.key}
              type="button"
              onClick={() => onSelectState(stateConfig.key)}
              className="flex flex-col gap-3 rounded-2xl border border-[var(--light-gray)] bg-white p-4 text-left shadow-[0px_2px_12px_0px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)] active:scale-[0.99] animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stateConfig.bgColor}`}>
                    <Icon size={18} className={stateConfig.color} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${stateConfig.dotColor}`} />
                      <span className="text-base font-semibold text-[var(--text-primary)]">{stateConfig.label}</span>
                    </div>
                    <span className="text-sm text-[var(--text-muted)]">{players.length} {players.length === 1 ? "player" : "players"}</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[var(--text-muted)]" />
              </div>

              <p className="text-sm leading-5 text-[var(--medium-gray)]">{stateConfig.summary}</p>

              {(highCount > 0 || medCount > 0) && (
                <div className="flex items-center gap-3">
                  {highCount > 0 && (
                    <span className="flex items-center gap-1 rounded-full bg-[#fef2f2] px-2 py-0.5 text-xs font-medium text-[#c23f3f]">
                      {highCount} high
                    </span>
                  )}
                  {medCount > 0 && (
                    <span className="flex items-center gap-1 rounded-full bg-[#fffbeb] px-2 py-0.5 text-xs font-medium text-[#b45309]">
                      {medCount} medium
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Daily summary */}
      <div className="mx-4 mb-4 rounded-2xl border border-[var(--light-gray)] bg-[var(--very-light-gray)] p-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Today&apos;s summary</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#c23f3f]" />
            <span className="text-sm text-[var(--medium-gray)]">{PLAYER_ALERTS.length} new alerts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#e8b923]" />
            <span className="text-sm text-[var(--medium-gray)]">{PLAYER_ALERTS.length} unresolved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#69D55D]" />
            <span className="text-sm text-[var(--medium-gray)]">0 reviewed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ Screen 2 — Player List by State ═══════════════════ */

function PlayerListView({
  stateKey,
  onBack,
  onSelectPlayer,
}: {
  stateKey: AlertState;
  onBack: () => void;
  onSelectPlayer: (player: PlayerAlert) => void;
}) {
  const stateConfig = ALERT_STATES.find((s) => s.key === stateKey)!;
  const players = PLAYER_ALERTS.filter((a) => a.state === stateKey);
  const [sortBy, setSortBy] = useState<"severity" | "latest">("severity");

  const sorted = [...players].sort((a, b) => {
    if (sortBy === "severity") {
      const order = { High: 0, Medium: 1 };
      return order[a.severity] - order[b.severity];
    }
    return 0;
  });

  return (
    <div className="flex flex-1 flex-col min-h-0">
      {/* Header */}
      <div className="shrink-0 flex items-center gap-3 px-4 pt-4 pb-2">
        <button type="button" aria-label="Go back" onClick={onBack} className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-all">
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${stateConfig.dotColor}`} />
            <h2 className="text-lg font-bold text-[var(--text-primary)]">{stateConfig.label}</h2>
          </div>
          <p className="text-sm text-[var(--text-muted)]">{players.length} {players.length === 1 ? "player needs" : "players need"} review</p>
        </div>
      </div>

      {/* Sort chips */}
      <div className="shrink-0 flex gap-2 px-4 py-2">
        {(["severity", "latest"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSortBy(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              sortBy === s
                ? "bg-[var(--very-light-green)] text-[var(--light-green)]"
                : "bg-[var(--very-light-gray)] text-[var(--medium-gray)] hover:bg-[var(--light-gray)]"
            }`}
          >
            {s === "severity" ? "By severity" : "By latest"}
          </button>
        ))}
      </div>

      {/* Player list */}
      <div className="flex-1 overflow-y-auto">
        {sorted.map((player, i) => (
          <button
            key={player.id}
            type="button"
            onClick={() => onSelectPlayer(player)}
            className="flex w-full items-center gap-3 border-b border-[var(--light-gray)] px-4 py-3.5 text-left transition-colors hover:bg-[var(--very-light-gray)] active:bg-[var(--light-gray)] animate-fade-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--very-light-green)] text-sm font-semibold text-[var(--light-green)]">
              {player.name.split(" ").map((n) => n[0]).join("")}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-[var(--text-primary)] truncate">{player.name}</p>
              <p className="text-sm text-[var(--medium-gray)] truncate">{player.shortReason}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{player.metricSnippet}</p>
            </div>

            {/* Severity + chevron */}
            <div className="flex items-center gap-2 shrink-0">
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                player.severity === "High"
                  ? "bg-[#fef2f2] text-[#c23f3f]"
                  : "bg-[#fffbeb] text-[#b45309]"
              }`}>
                {player.severity}
              </span>
              <ChevronRight size={16} className="text-[var(--text-muted)]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ Screen 3 — Alert Detail / Decision ═══════════════════ */

function AlertDetailView({
  player,
  onBack,
  onSendToChat,
}: {
  player: PlayerAlert;
  onBack: () => void;
  onSendToChat: (player: PlayerAlert) => void;
}) {
  const stateConfig = ALERT_STATES.find((s) => s.key === player.state)!;
  const [actionTaken, setActionTaken] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  return (
    <div className="flex flex-1 flex-col min-h-0">
      {/* Header */}
      <div className="shrink-0 flex items-center gap-3 px-4 pt-4 pb-3 border-b border-[var(--light-gray)]">
        <button type="button" aria-label="Go back" onClick={onBack} className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-all">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">{player.name}</h2>
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${stateConfig.dotColor}`} />
            <span className="text-sm text-[var(--text-muted)]">{stateConfig.label}</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Summary card */}
        <div className="mx-4 mt-4 rounded-2xl border border-[var(--light-gray)] bg-white p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] animate-fade-up">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">{player.alertTitle}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              player.severity === "High"
                ? "bg-[#fef2f2] text-[#c23f3f]"
                : "bg-[#fffbeb] text-[#b45309]"
            }`}>
              {player.severity}
            </span>
          </div>
          <p className="mt-2 text-sm leading-5 text-[var(--medium-gray)]">{player.interpretation}</p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">{player.updated}</p>
        </div>

        {/* Metrics grid */}
        <div className="mx-4 mt-3 grid grid-cols-2 gap-2 animate-fade-up" style={{ animationDelay: "80ms" }}>
          {player.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-[var(--light-gray)] bg-white p-3">
              <p className="text-xs text-[var(--text-muted)]">{m.label}</p>
              <p className="mt-1 text-lg font-bold text-[var(--text-primary)]">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Trend chart placeholder */}
        <div className="mx-4 mt-3 rounded-2xl border border-[var(--light-gray)] bg-white p-4 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Load trend</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">7-day average vs 28-day baseline</p>
          <div className="mt-3 flex h-24 items-center justify-center rounded-xl bg-[var(--very-light-gray)]">
            <Activity size={24} className="text-[var(--text-muted)]" />
          </div>
        </div>

        {/* Explanation */}
        <div className="mx-4 mt-3 rounded-2xl border border-[var(--light-gray)] bg-white p-4 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Why this alert appeared</p>
          <p className="mt-2 text-sm leading-5 text-[var(--medium-gray)]">{player.explanation}</p>
        </div>

        {/* Recommended actions */}
        <div className="mx-4 mt-3 rounded-2xl border border-[var(--light-green)] bg-[var(--very-light-green)] p-4 animate-fade-up" style={{ animationDelay: "320ms" }}>
          <p className="text-sm font-semibold text-[var(--brand-primary)]">Suggested next steps</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {player.recommendations.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-[var(--brand-primary)]">
                <Check size={14} className="shrink-0 mt-0.5 text-[var(--light-green)]" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* AI Chat action */}
        <div className="mx-4 mt-3 animate-fade-up" style={{ animationDelay: "360ms" }}>
          <button
            type="button"
            onClick={() => onSendToChat(player)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--light-gray)] bg-white py-3 text-sm font-medium text-[#247933] transition-all hover:bg-[var(--very-light-green)] active:scale-[0.98]"
          >
            <Zap size={16} />
            Discuss with AI Chat
          </button>
        </div>

        {/* Decision actions */}
        <div className="mx-4 mt-4 flex flex-col gap-2 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Take action</p>
          <button
            type="button"
            onClick={() => setActionTaken("review")}
            className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
              actionTaken === "review"
                ? "bg-[var(--light-green)] text-white"
                : "bg-[var(--brand-primary)] text-white hover:opacity-90"
            }`}
          >
            <Eye size={16} />
            {actionTaken === "review" ? "Marked for review" : "Needs review"}
          </button>
          <button
            type="button"
            onClick={() => setActionTaken("monitor")}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
              actionTaken === "monitor"
                ? "border-[var(--light-green)] bg-[var(--very-light-green)] text-[var(--light-green)]"
                : "border-[var(--light-gray)] bg-white text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]"
            }`}
          >
            <Activity size={16} />
            {actionTaken === "monitor" ? "Monitoring" : "Monitor"}
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActionTaken("expected")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-all active:scale-[0.98] ${
                actionTaken === "expected"
                  ? "border-[var(--light-green)] bg-[var(--very-light-green)] text-[var(--light-green)]"
                  : "border-[var(--light-gray)] text-[var(--medium-gray)] hover:bg-[var(--very-light-gray)]"
              }`}
            >
              <CheckCircle size={14} />
              Mark expected
            </button>
            <button
              type="button"
              onClick={() => setActionTaken("override")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-all active:scale-[0.98] ${
                actionTaken === "override"
                  ? "border-[#c23f3f] bg-[#fef2f2] text-[#c23f3f]"
                  : "border-[var(--light-gray)] text-[var(--medium-gray)] hover:bg-[var(--very-light-gray)]"
              }`}
            >
              <XCircle size={14} />
              Override
            </button>
          </div>
        </div>

        {/* Note section */}
        <div className="mx-4 mt-4 mb-6 animate-fade-up" style={{ animationDelay: "480ms" }}>
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Add note</p>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Explain context or override reason..."
            rows={3}
            className="w-full rounded-xl border border-[var(--light-gray)] bg-white p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--light-green)] focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ Alerts Navigation Wrapper ═══════════════════ */

type AlertsScreen =
  | { view: "overview" }
  | { view: "player-list"; state: AlertState }
  | { view: "detail"; player: PlayerAlert };

function AIAlertsView({ onSendToChat }: { onSendToChat: (player: PlayerAlert) => void }) {
  const [screen, setScreen] = useState<AlertsScreen>({ view: "overview" });

  if (screen.view === "detail") {
    return (
      <AlertDetailView
        player={screen.player}
        onBack={() => setScreen({ view: "player-list", state: screen.player.state })}
        onSendToChat={onSendToChat}
      />
    );
  }

  if (screen.view === "player-list") {
    return (
      <PlayerListView
        stateKey={screen.state}
        onBack={() => setScreen({ view: "overview" })}
        onSelectPlayer={(player) => setScreen({ view: "detail", player })}
      />
    );
  }

  return (
    <AlertsOverview onSelectState={(state) => setScreen({ view: "player-list", state })} />
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
  const [showSuggestions, setShowSuggestions] = useState(false);
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
    <div className="relative flex min-h-0 flex-1 flex-col bg-white">
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
      <div className="min-h-0 flex-1 overflow-y-auto">
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
      <div className="relative shrink-0 flex flex-col gap-2 px-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-4 before:pointer-events-none before:absolute before:inset-x-0 before:-top-8 before:h-8 before:bg-gradient-to-t before:from-white before:to-transparent">
        {showSuggestions && (
          <div
            ref={dragScroll.ref}
            onMouseDown={dragScroll.onMouseDown}
            onMouseMove={dragScroll.onMouseMove}
            onMouseUp={dragScroll.onMouseUp}
            onMouseLeave={dragScroll.onMouseLeave}
            onClickCapture={dragScroll.onClickCapture}
            className="flex cursor-grab gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory animate-slide-down"
          >
            {SUGGESTIONS.map((text, i) => (
              <button
                key={i}
                type="button"
                className="min-w-[42%] max-w-[45%] snap-start rounded-2xl bg-[var(--very-light-green)] px-2.5 py-2 text-left hover:opacity-90 active:scale-[0.98] transition-transform animate-slide-in-right"
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => { sendMessage(text); setShowSuggestions(false); }}
              >
                <span className="text-sm font-medium leading-[18px] text-[var(--brand-primary)]">
                  {text}
                </span>
              </button>
            ))}
          </div>
        )}
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
                  showSuggestions
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

  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, title: "New chat", messages: [], timestamp: "Now" },
  ]);
  const [activeConvId, setActiveConvId] = useState(1);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const nextConvId = useRef(2);

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

  function handleAlertToChat(player: PlayerAlert) {
    const newId = nextConvId.current++;
    const prompt = `Validate this alert and suggest follow up actions:\n\nAlert: ${player.alertTitle}\nAthlete: ${player.name}\nSeverity: ${player.severity}\nDetails: ${player.interpretation}\nCategory: ${ALERT_STATES.find((s) => s.key === player.state)?.label}`;
    const userMsg: ChatMessage = { id: 1, role: "user", text: prompt };
    const newConv: Conversation = {
      id: newId,
      title: `Alert: ${player.name}`,
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
              <div className={`h-[2px] w-full ${activeTab === "alerts" ? "bg-[#69D55D]" : "bg-transparent"}`} />
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
              <div className={`h-[2px] w-full ${activeTab === "chat" ? "bg-[#69D55D]" : "bg-transparent"}`} />
            </button>
          </div>

          {activeTab === "alerts" ? (
            <div />
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
            <AIAlertsView onSendToChat={handleAlertToChat} />
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
