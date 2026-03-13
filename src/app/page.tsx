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
  Users,
  Share2,
  Shield,
  RefreshCw,
  Clock,
  Sliders,
  UserPlus,
  Settings,
  ToggleLeft,
  ToggleRight,
  Download,
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
    <div className="flex h-11 w-11 items-center justify-center">
      <MenuFeather size={22} color="#0a0a0a" strokeWidth={2.5} />
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
  thresholdRule?: string;
  trendData?: Record<"7d" | "14d" | "28d", number[]>;
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
    thresholdRule: "Alert fires when acute:chronic ratio exceeds 1.20",
    trendData: {
      "7d": [1.02, 1.05, 1.08, 1.12, 1.18, 1.28, 1.41],
      "14d": [0.98, 1.0, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12, 1.15, 1.2, 1.25, 1.3, 1.35, 1.41],
      "28d": [0.95, 0.97, 0.99, 1.0, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.1, 1.12, 1.14, 1.16, 1.18, 1.2, 1.22, 1.25, 1.28, 1.32, 1.35, 1.38, 1.39, 1.4, 1.4, 1.41],
    },
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
    thresholdRule: "Alert fires when load deviates more than ±20% from 28-day baseline",
    trendData: {
      "7d": [245, 238, 225, 210, 195, 185, 179.2],
      "14d": [255, 252, 248, 245, 240, 235, 228, 220, 212, 205, 198, 192, 186, 179.2],
      "28d": [250, 251, 252, 250, 248, 245, 242, 238, 232, 225, 218, 210, 202, 195, 188, 182, 178, 175, 173, 172, 171, 170, 170, 175, 178, 179, 179.2, 179.2],
    },
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
    thresholdRule: "Alert fires when load deviates more than ±20% from 28-day baseline",
    trendData: {
      "7d": [255, 280, 320, 365, 410, 445, 475.6],
      "14d": [248, 250, 255, 265, 280, 300, 325, 350, 375, 400, 420, 440, 455, 475.6],
      "28d": [245, 246, 248, 250, 255, 260, 268, 278, 290, 305, 322, 340, 358, 375, 392, 408, 425, 440, 452, 460, 465, 468, 472, 474, 475, 475.6, 475.6, 475.6],
    },
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
    thresholdRule: "Alert fires when Q4 max speed drops more than 8% vs Q1-3 average",
    trendData: {
      "7d": [7.5, 7.55, 7.6, 7.65, 7.68, 7.7, 6.93],
      "14d": [7.4, 7.45, 7.5, 7.55, 7.58, 7.6, 7.62, 7.65, 7.67, 7.68, 7.69, 7.7, 7.7, 6.93],
      "28d": [7.2, 7.25, 7.3, 7.35, 7.4, 7.45, 7.5, 7.55, 7.58, 7.6, 7.62, 7.64, 7.66, 7.68, 7.69, 7.7, 7.7, 7.7, 7.7, 7.7, 7.7, 7.7, 7.7, 7.7, 7.7, 7.7, 7.7, 6.93],
    },
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
    thresholdRule: "Alert fires when Q4 max speed drops more than 8% vs Q1-3 average",
    trendData: {
      "7d": [6.7, 6.75, 6.8, 6.84, 6.87, 6.89, 5.72],
      "14d": [6.6, 6.65, 6.7, 6.75, 6.78, 6.82, 6.85, 6.87, 6.88, 6.89, 6.89, 6.89, 6.89, 5.72],
      "28d": [6.5, 6.55, 6.6, 6.65, 6.7, 6.75, 6.78, 6.82, 6.85, 6.87, 6.88, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 6.89, 5.72],
    },
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
    thresholdRule: "Alert fires when Q4 max speed drops more than 8% vs Q1-3 average",
    trendData: {
      "7d": [6.4, 6.45, 6.5, 6.54, 6.56, 6.58, 5.17],
      "14d": [6.3, 6.35, 6.4, 6.45, 6.5, 6.54, 6.56, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 5.17],
      "28d": [6.2, 6.25, 6.3, 6.35, 6.4, 6.45, 6.5, 6.54, 6.56, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 6.58, 5.17],
    },
  },
];

type AlertStateConfig = {
  key: AlertState;
  label: string;
  color: string;
  dotColor: string;
  bgColor: string;
  icon: React.ElementType;
  countColor: string;
  summary: string;
  rules: string[];
};

const ALERT_STATES: AlertStateConfig[] = [
  {
    key: "at-risk", label: "At Risk", color: "text-[#dc2626]", dotColor: "bg-[#dc2626]",
    bgColor: "bg-[#fef2f2]", icon: AlertTriangle, countColor: "text-[#dc2626]",
    summary: "Immediate injury or overload concerns detected.",
    rules: ["acute_chronic_ratio", "weekly_load_spike", "red_zone_sprint_spike", "overloading", "approaching_14day_load_limit", "high_deceleration_count", "reduced_max_velocity", "sprint_recovery_spacing"],
  },
  {
    key: "load-imbalance", label: "Load Imbalance", color: "text-[#d97706]", dotColor: "bg-[#d97706]",
    bgColor: "bg-[#fffbeb]", icon: Activity, countColor: "text-[#d97706]",
    summary: "Training load is trending above or below baseline.",
    rules: ["four_week_load_change", "four_week_hsr_load_increase", "sprint_exposure_trend_28d", "weekly_max_vs_28day_max", "weekly_load_vs_28day_average", "seasonal_max_distance_exceeded"],
  },
  {
    key: "performance-signal", label: "Performance Signal", color: "text-[#2563eb]", dotColor: "bg-[#2563eb]",
    bgColor: "bg-[#eff6ff]", icon: TrendingUp, countColor: "text-[#2563eb]",
    summary: "Performance changes detected during training or match play.",
    rules: ["late_game_speed_drop", "low_work_rate", "positional_output_outlier", "load_trend_decreasing", "consistency_drop", "match_average_vs_baseline", "season_max_achieved"],
  },
];

/* ═══════════════════ Squad Data ═══════════════════ */

type SquadPlayer = {
  id: number;
  name: string;
  position: string;
  group: "Forward" | "Back" | "Halfback";
  availability: "Available" | "Limited" | "Unavailable";
  loadStatus: "Normal" | "High" | "Low";
};

const SQUAD_PLAYERS: SquadPlayer[] = [
  { id: 1, name: "Jack Innard", position: "Hooker", group: "Forward", availability: "Limited", loadStatus: "High" },
  { id: 2, name: "Deian Gwynne", position: "Scrum-half", group: "Halfback", availability: "Available", loadStatus: "Low" },
  { id: 3, name: "Max Llewellyn", position: "Centre", group: "Back", availability: "Limited", loadStatus: "High" },
  { id: 4, name: "Ben Loader", position: "Wing", group: "Back", availability: "Available", loadStatus: "Normal" },
  { id: 5, name: "Josh Basham", position: "Flanker", group: "Forward", availability: "Limited", loadStatus: "High" },
  { id: 6, name: "Kirill Gotovtsev", position: "Prop", group: "Forward", availability: "Available", loadStatus: "Normal" },
  { id: 7, name: "Freddie Thomas", position: "Lock", group: "Forward", availability: "Available", loadStatus: "Normal" },
  { id: 8, name: "Lewis Ludlow", position: "Flanker", group: "Forward", availability: "Available", loadStatus: "Normal" },
  { id: 9, name: "Tomos Williams", position: "Scrum-half", group: "Halfback", availability: "Available", loadStatus: "Normal" },
  { id: 10, name: "Santiago Carreras", position: "Fullback", group: "Back", availability: "Available", loadStatus: "Normal" },
];

/* ═══════════════════ Settings Data ═══════════════════ */

type AIModule = { id: string; name: string; description: string; enabled: boolean };
type SensitivityMode = "Conservative" | "Balanced" | "Aggressive";

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

function AlertsOverview({
  onSelectState,
  reviewedCount,
  refreshing,
  onRefresh,
  lastUpdated,
}: {
  onSelectState: (state: AlertState) => void;
  reviewedCount: number;
  refreshing: boolean;
  onRefresh: () => void;
  lastUpdated: string;
}) {
  const totalPlayers = new Set(PLAYER_ALERTS.map((a) => a.name)).size;
  const totalAlerts = PLAYER_ALERTS.length;

  const hasAlerts = totalAlerts > 0;

  return (
    <div className="relative flex-1 overflow-y-auto">
      {refreshing && (
        <div className="absolute inset-0 z-10 flex items-start justify-center bg-white/80 pt-16 animate-fade-in">
          <div className="flex items-center gap-2 rounded-xl bg-[var(--text-primary)] px-4 py-2.5 text-sm font-medium text-white shadow-lg">
            <RefreshCw size={16} className="animate-spin" />
            Refreshing data…
          </div>
        </div>
      )}
      {/* Page title + hero */}
      <div className="px-4 pt-5">
        <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
          Performance Overview
        </h1>
      </div>

      {/* Hero metric + refresh */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <p className="text-5xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums">
              {totalPlayers}
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              need attention
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              type="button"
              aria-label="Refresh alerts"
              onClick={onRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-[var(--text-muted)] hover:bg-[var(--very-light-gray)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-60"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
            <span className="text-[10px] text-[var(--text-muted)]">{lastUpdated}</span>
          </div>
        </div>
      </div>

      {!hasAlerts ? (
        /* Empty state */
        <div className="mx-4 mt-4 flex flex-col items-center justify-center rounded-2xl border border-[var(--light-gray)] bg-[var(--very-light-gray)] py-16 px-6 text-center animate-fade-up">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <CheckCircle size={28} className="text-[var(--light-green)]" />
          </div>
          <p className="mt-4 text-lg font-semibold text-[var(--text-primary)]">No alerts today</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            All players are within normal ranges. Check back after the next session.
          </p>
        </div>
      ) : (
        <>
          {/* State cards */}
          <div className="flex flex-col gap-3 px-4">
            {ALERT_STATES.map((stateConfig, i) => {
              const players = [...PLAYER_ALERTS.filter((a) => a.state === stateConfig.key)]
                .sort((a, b) => (a.severity === "High" ? -1 : 1) - (b.severity === "High" ? -1 : 1));
              if (players.length === 0) return null;
              const highCount = players.filter((p) => p.severity === "High").length;
              const medCount = players.filter((p) => p.severity === "Medium").length;
              const severityLabel = [highCount > 0 && `${highCount} high`, medCount > 0 && `${medCount} med`]
                .filter(Boolean)
                .join(", ");
              const Icon = stateConfig.icon;

              return (
                <button
                  key={stateConfig.key}
                  type="button"
                  onClick={() => onSelectState(stateConfig.key)}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--light-gray)] bg-white p-4 text-left transition-all hover:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] active:scale-[0.99] animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stateConfig.bgColor}`}>
                    <Icon size={20} className={stateConfig.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-base font-semibold text-[var(--text-primary)]">{stateConfig.label}</span>
                    <p className="mt-0.5 text-[13px] text-[var(--text-muted)]">
                      {players.length} {players.length === 1 ? "player" : "players"}
                      {severityLabel && (
                        <span className="text-[var(--medium-gray)]"> · {severityLabel}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--light-green)] shrink-0">
                    Review
                  </span>
                  <ChevronRight size={18} className="shrink-0 text-[var(--text-muted)]" />
                </button>
              );
            })}
          </div>

          {/* Today's summary */}
          <div className="mx-4 mt-4 mb-4 rounded-2xl border border-[var(--light-gray)] bg-[var(--very-light-gray)] p-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Today&apos;s summary</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#dc2626]" />
                <span className="text-sm text-[var(--medium-gray)]">{totalAlerts} new</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#d97706]" />
                <span className="text-sm text-[var(--medium-gray)]">{totalAlerts} unresolved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--light-green)]" />
                <span className="text-sm text-[var(--medium-gray)]">{reviewedCount} reviewed</span>
              </div>
            </div>
          </div>
        </>
      )}
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
  const sorted = [...players].sort((a, b) => {
    const order = { High: 0, Medium: 1 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <div className="flex flex-1 flex-col min-h-0">
      {/* Header */}
      <div className="shrink-0 border-b border-[var(--light-gray)] bg-white px-4 pt-4 pb-4">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Go back" onClick={onBack} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-all">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            {stateConfig.label}
          </h1>
        </div>
        <div className="mt-3 flex items-baseline gap-3 pl-[52px]">
          <p className="text-5xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums">{players.length}</p>
          <p className="text-sm text-[var(--text-muted)]">
            {players.length === 1 ? "needs review" : "need review"}
          </p>
        </div>
      </div>

      {/* Player list — auto-ranked by severity, no manual sort per spec */}
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
                  ? "bg-[#fef2f2] text-[#dc2626]"
                  : "bg-[#fffbeb] text-[#d97706]"
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

/* ═══════════════════ Trend Chart (SVG) ═══════════════════ */

function TrendChart({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = { top: 4, right: 4, bottom: 4, left: 4 };
  const w = 280;
  const h = 80;
  const points = data.map((v, i) => {
    const x = padding.left + (i / (data.length - 1)) * (w - padding.left - padding.right);
    const y = padding.top + (1 - (v - min) / range) * (h - padding.top - padding.bottom);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="trendGradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--light-green)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--light-green)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon fill="url(#trendGradient)" points={`${padding.left},${h - padding.bottom} ${points} ${w - padding.right},${h - padding.bottom}`} />
      <polyline fill="none" stroke="var(--light-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

/* ═══════════════════ Screen 3 — Alert Detail / Decision ═══════════════════ */

function AlertDetailView({
  player,
  onBack,
  onSendToChat,
  onReview,
}: {
  player: PlayerAlert;
  onBack: () => void;
  onSendToChat: (player: PlayerAlert) => void;
  onReview?: (playerId: number) => void;
}) {
  const stateConfig = ALERT_STATES.find((s) => s.key === player.state)!;
  const [actionTaken, setActionTaken] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [trendWindow, setTrendWindow] = useState<"7d" | "14d" | "28d">("7d");
  const [overrideConfirmed, setOverrideConfirmed] = useState(false);

  function markReviewed() {
    onReview?.(player.id);
  }

  function handleOverride() {
    if (actionTaken === "override" && !overrideConfirmed) {
      if (!noteText.trim()) return;
      setOverrideConfirmed(true);
      markReviewed();
      return;
    }
    setActionTaken("override");
  }

  return (
    <div className="flex flex-1 flex-col min-h-0">
      {/* Header */}
      <div className="shrink-0 border-b border-[var(--light-gray)] bg-white px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Go back" onClick={onBack} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)] truncate">{player.name}</h1>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${stateConfig.dotColor}`} />
              <span className="text-sm text-[var(--text-muted)]">{stateConfig.label}</span>
            </div>
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
                ? "bg-[#fef2f2] text-[#dc2626]"
                : "bg-[#fffbeb] text-[#d97706]"
            }`}>
              {player.severity}
            </span>
          </div>
          <p className="mt-2 text-sm leading-5 text-[var(--medium-gray)]">{player.interpretation}</p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">{player.updated}</p>
        </div>

        {/* Explainable metrics: 2x2 grid of cards */}
        <div className="mx-4 mt-3 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="grid grid-cols-2 gap-2">
            {player.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-[var(--light-gray)] bg-white px-4 py-3"
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{m.label}</p>
                <p className="mt-1.5 text-xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Threshold rule — always visible per spec */}
        {player.thresholdRule && (
          <div className="mx-4 mt-3 rounded-2xl border border-[var(--light-green)] bg-[var(--very-light-green)] p-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--brand-primary)] mb-1">Threshold rule</p>
            <p className="text-sm text-[var(--brand-primary)]">{player.thresholdRule}</p>
          </div>
        )}

        {/* Trend chart with time window selector */}
        <div className="mx-4 mt-3 rounded-2xl border border-[var(--light-gray)] bg-white p-4 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)]">Trend</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{trendWindow === "7d" ? "7-day" : trendWindow === "14d" ? "14-day" : "28-day"} values</p>
            </div>
            <div className="flex rounded-lg border border-[var(--light-gray)] overflow-hidden">
              {(["7d", "14d", "28d"] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setTrendWindow(w)}
                  className={`px-3 py-2 text-[13px] font-medium transition-colors ${
                    trendWindow === w
                      ? "bg-[var(--very-light-green)] text-[var(--light-green)]"
                      : "bg-white text-[var(--text-muted)] hover:bg-[var(--very-light-gray)]"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 h-24 rounded-xl bg-[var(--very-light-gray)] p-2">
            {player.trendData?.[trendWindow] ? (
              <TrendChart data={player.trendData[trendWindow]} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Activity size={24} className="text-[var(--text-muted)]" />
              </div>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div className="mx-4 mt-3 rounded-2xl border border-[var(--light-gray)] bg-white p-4 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)]">Why this alert appeared</p>
          <p className="mt-2 text-sm leading-5 text-[var(--medium-gray)]">{player.explanation}</p>
        </div>

        {/* Recommended actions */}
        <div className="mx-4 mt-3 rounded-2xl border border-[var(--light-green)] bg-[var(--very-light-green)] p-4 animate-fade-up" style={{ animationDelay: "320ms" }}>
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--brand-primary)]">Suggested next steps</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {player.recommendations.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-[var(--brand-primary)]">
                <Check size={16} className="shrink-0 mt-0.5 text-[var(--light-green)]" />
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
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--light-gray)] bg-white py-3 text-sm font-medium text-[var(--light-green)] transition-all hover:bg-[var(--very-light-green)] active:scale-[0.98]"
          >
            <Zap size={16} />
            Discuss with AI Chat
          </button>
        </div>

        {/* Decision actions */}
        <div className="mx-4 mt-4 flex flex-col gap-2 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)] mb-2">Take action</p>
          <button
            type="button"
            onClick={() => { setActionTaken("review"); markReviewed(); }}
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
            onClick={() => { setActionTaken("monitor"); markReviewed(); }}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
              actionTaken === "monitor"
                ? "border-[var(--light-green)] bg-[var(--very-light-green)] text-[var(--light-green)]"
                : "border-[var(--light-gray)] bg-white text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]"
            }`}
          >
            <Activity size={16} />
            {actionTaken === "monitor" ? "Monitoring" : "Monitor"}
          </button>
          {/* T3: Assign follow-up */}
          <button
            type="button"
            onClick={() => { setActionTaken("assign"); markReviewed(); }}
            className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
              actionTaken === "assign"
                ? "border-[var(--light-green)] bg-[var(--very-light-green)] text-[var(--light-green)]"
                : "border-[var(--light-gray)] bg-white text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]"
            }`}
          >
            <UserPlus size={16} />
            {actionTaken === "assign" ? "Follow-up assigned" : "Assign follow-up"}
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setActionTaken("expected"); markReviewed(); }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-all active:scale-[0.98] ${
                actionTaken === "expected"
                  ? "border-[var(--light-green)] bg-[var(--very-light-green)] text-[var(--light-green)]"
                  : "border-[var(--light-gray)] text-[var(--medium-gray)] hover:bg-[var(--very-light-gray)]"
              }`}
            >
              <CheckCircle size={16} />
              Mark expected
            </button>
            {/* T5: Override with note requirement */}
            <button
              type="button"
              onClick={handleOverride}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-all active:scale-[0.98] ${
                overrideConfirmed
                  ? "border-[#dc2626] bg-[#dc2626] text-white"
                  : actionTaken === "override"
                    ? "border-[#dc2626] bg-[#fef2f2] text-[#dc2626]"
                    : "border-[var(--light-gray)] text-[var(--medium-gray)] hover:bg-[var(--very-light-gray)]"
              }`}
            >
              <XCircle size={16} />
              {overrideConfirmed ? "Override logged" : "Override"}
            </button>
          </div>
        </div>

        {/* T5: Note section with override requirement */}
        <div className="mx-4 mt-4 mb-6 animate-fade-up" style={{ animationDelay: "480ms" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)]">Add note</p>
            {actionTaken === "override" && !overrideConfirmed && (
              <span className="text-xs font-medium text-[#dc2626]">Required for override</span>
            )}
          </div>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={actionTaken === "override" ? "Explain why this alert is being overridden (required)..." : "Explain context or override reason..."}
            rows={3}
            className={`w-full rounded-xl border bg-white p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors resize-none ${
              actionTaken === "override" && !overrideConfirmed && !noteText.trim()
                ? "border-[#dc2626] focus:border-[#dc2626]"
                : "border-[var(--light-gray)] focus:border-[var(--light-green)]"
            }`}
          />
          {actionTaken === "override" && !overrideConfirmed && !noteText.trim() && (
            <p className="mt-1 text-xs text-[#dc2626]">A note is required before confirming an override.</p>
          )}
          {overrideConfirmed && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
              <Clock size={16} />
              Override logged at {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} — stored in audit log
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ Alerts Navigation Wrapper ═══════════════════ */

type AlertsScreen =
  | { view: "overview" }
  | { view: "player-list"; state: AlertState }
  | { view: "detail"; player: PlayerAlert }
  | { view: "squad" }
  | { view: "summary" }
  | { view: "settings" };

function AIAlertsView({ onSendToChat }: { onSendToChat: (player: PlayerAlert) => void }) {
  const [screen, setScreen] = useState<AlertsScreen>({ view: "overview" });
  const [reviewedAlertIds, setReviewedAlertIds] = useState<Set<number>>(new Set());
  const [refreshing, setRefreshing] = useState(false);
  const lastUpdated = "18:30 GMT · 11 Feb";

  const reviewedCount = reviewedAlertIds.size;

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }

  function handleReview(playerId: number) {
    setReviewedAlertIds((prev) => new Set(prev).add(playerId));
  }

  if (screen.view === "detail") {
    return (
      <AlertDetailView
        player={screen.player}
        onBack={() => setScreen({ view: "player-list", state: screen.player.state })}
        onSendToChat={onSendToChat}
        onReview={handleReview}
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

  if (screen.view === "squad") {
    return (
      <div className="flex flex-1 flex-col min-h-0">
        <div className="shrink-0 flex items-center gap-3 border-b border-[var(--light-gray)] bg-white px-4 pt-4 pb-3">
          <button type="button" aria-label="Go back" onClick={() => setScreen({ view: "overview" })} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-all">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">Squad</h1>
        </div>
        <SquadView
          onSelectPlayer={(squadPlayer) => {
            const alerts = PLAYER_ALERTS.filter((a) => a.name === squadPlayer.name)
              .sort((a, b) => (a.severity === "High" ? -1 : 1) - (b.severity === "High" ? -1 : 1));
            if (alerts.length > 0) setScreen({ view: "detail", player: alerts[0] });
          }}
        />
      </div>
    );
  }

  if (screen.view === "summary") {
    return (
      <div className="flex flex-1 flex-col min-h-0">
        <div className="shrink-0 flex items-center gap-3 border-b border-[var(--light-gray)] bg-white px-4 pt-4 pb-3">
          <button type="button" aria-label="Go back" onClick={() => setScreen({ view: "overview" })} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-all">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">Executive Summary</h1>
        </div>
        <ExecutiveSummary />
      </div>
    );
  }

  if (screen.view === "settings") {
    return (
      <div className="flex flex-1 flex-col min-h-0">
        <div className="shrink-0 flex items-center gap-3 border-b border-[var(--light-gray)] bg-white px-4 pt-4 pb-3">
          <button type="button" aria-label="Go back" onClick={() => setScreen({ view: "overview" })} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-all">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">AI Settings</h1>
        </div>
        <SettingsView />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <AlertsOverview
        onSelectState={(state) => setScreen({ view: "player-list", state })}
        reviewedCount={reviewedCount}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        lastUpdated={lastUpdated}
      />
      {/* Quick access — compact icons */}
      <div className="shrink-0 flex items-center justify-center gap-8 border-t border-[var(--light-gray)] bg-[var(--very-light-gray)] py-2.5 px-4">
        <button type="button" onClick={() => setScreen({ view: "squad" })} className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-white hover:text-[var(--text-primary)] transition-colors" aria-label="Squad">
          <Users size={20} />
        </button>
        <button type="button" onClick={() => setScreen({ view: "summary" })} className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-white hover:text-[var(--text-primary)] transition-colors" aria-label="Summary">
          <Zap size={20} />
        </button>
        <button type="button" onClick={() => setScreen({ view: "settings" })} className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-white hover:text-[var(--text-primary)] transition-colors" aria-label="Settings">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════ T6: Squad View ═══════════════════ */

function SquadView({ onSelectPlayer }: { onSelectPlayer?: (player: SquadPlayer) => void }) {
  const [filterGroup, setFilterGroup] = useState<"All" | "Forward" | "Back" | "Halfback">("All");
  const [filterPosition, setFilterPosition] = useState<string>("All");

  const positions = ["All", ...Array.from(new Set(SQUAD_PLAYERS.map((p) => p.position)))];
  const filteredByGroup = filterGroup === "All"
    ? SQUAD_PLAYERS
    : SQUAD_PLAYERS.filter((p) => p.group === filterGroup);
  const filtered = filterPosition === "All"
    ? filteredByGroup
    : filteredByGroup.filter((p) => p.position === filterPosition);

  function getPlayerAlerts(name: string) {
    return PLAYER_ALERTS.filter((a) => a.name === name);
  }

  function getRiskColor(name: string) {
    const alerts = getPlayerAlerts(name);
    if (alerts.some((a) => a.severity === "High")) return "bg-[#dc2626]";
    if (alerts.length > 0) return "bg-[#d97706]";
    return "bg-[#22c55e]";
  }

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div className="shrink-0 px-4 pt-4 pb-4">
        <div className="flex items-baseline gap-3">
          <p className="text-5xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums">{SQUAD_PLAYERS.length}</p>
          <p className="text-sm text-[var(--text-muted)]">athletes</p>
        </div>
        <p className="mt-1 text-xs text-[var(--text-muted)]">{PLAYER_ALERTS.length} active alerts</p>
      </div>

      <div className="shrink-0 space-y-2 px-4 py-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {(["All", "Forward", "Back", "Halfback"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setFilterGroup(g)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                filterGroup === g
                  ? "bg-[var(--very-light-green)] text-[var(--light-green)]"
                  : "bg-[var(--very-light-gray)] text-[var(--medium-gray)] hover:bg-[var(--light-gray)]"
              }`}
            >
              {g === "All" ? `All (${SQUAD_PLAYERS.length})` : `${g}s`}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {positions.map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => setFilterPosition(pos)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                filterPosition === pos
                  ? "bg-[var(--very-light-green)] text-[var(--light-green)]"
                  : "bg-[var(--very-light-gray)] text-[var(--medium-gray)] hover:bg-[var(--light-gray)]"
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="mx-4 mt-4 flex flex-col items-center justify-center rounded-2xl border border-[var(--light-gray)] bg-[var(--very-light-gray)] py-12 px-6 text-center">
            <Users size={32} className="text-[var(--text-muted)]" />
            <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">No players in this group</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">Try selecting a different filter</p>
          </div>
        ) : (
        filtered.map((player, i) => {
          const alerts = getPlayerAlerts(player.name);
          return (
            <button
              key={player.id}
              type="button"
              onClick={() => onSelectPlayer?.(player)}
              className="flex w-full items-center gap-3 border-b border-[var(--light-gray)] px-4 py-3 text-left transition-colors hover:bg-[var(--very-light-gray)] active:bg-[var(--light-gray)] animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--very-light-green)] text-sm font-semibold text-[var(--light-green)]">
                {player.name.split(" ").map((n) => n[0]).join("")}
                <span className={`absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${getRiskColor(player.name)}`} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-[var(--text-primary)] truncate">{player.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{player.position} · {player.group}</p>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  player.availability === "Available" ? "bg-[var(--very-light-green)] text-[var(--light-green)]"
                    : player.availability === "Limited" ? "bg-[#fffbeb] text-[#d97706]"
                    : "bg-[#fef2f2] text-[#dc2626]"
                }`}>
                  {player.availability}
                </span>
                <span className={`text-[11px] font-medium ${
                  player.loadStatus === "Normal" ? "text-[var(--text-muted)]"
                    : player.loadStatus === "High" ? "text-[#dc2626]"
                    : "text-[#d97706]"
                }`}>
                  Load: {player.loadStatus}
                </span>
                {alerts.length > 0 && (
                  <span className="text-[11px] text-[var(--text-muted)]">{alerts.length} alert{alerts.length > 1 ? "s" : ""}</span>
                )}
              </div>
              {alerts.length > 0 && <ChevronRight size={16} className="shrink-0 text-[var(--text-muted)]" />}
            </button>
          );
        })
        )}
      </div>
    </div>
  );
}

/* ═══════════════════ T7: Executive Summary ═══════════════════ */

function ExecutiveSummary() {
  const [dismissed, setDismissed] = useState(false);

  const highAlerts = PLAYER_ALERTS.filter((a) => a.severity === "High");
  const topRisks = highAlerts.length > 0 ? highAlerts.slice(0, 3) : PLAYER_ALERTS.slice(0, 3);

  const summaryText = `${PLAYER_ALERTS.length} alerts active across ${new Set(PLAYER_ALERTS.map((a) => a.name)).size} athletes. ${highAlerts.length} high-severity alerts require immediate attention. Load imbalance patterns detected in ${PLAYER_ALERTS.filter((a) => a.state === "load-imbalance").length} players. Focus on At Risk group today.`;

  if (dismissed) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4">
        <CheckCircle size={32} className="text-[var(--light-green)]" />
        <p className="text-base font-semibold text-[var(--text-primary)]">Briefing dismissed</p>
        <button type="button" onClick={() => setDismissed(false)} className="text-sm font-medium text-[var(--light-green)] underline underline-offset-2">
          View again
        </button>
      </div>
    );
  }

  const alertCount = PLAYER_ALERTS.length;
  const athleteCount = new Set(PLAYER_ALERTS.map((a) => a.name)).size;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-baseline gap-3">
          <p className="text-5xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums">{alertCount}</p>
          <p className="text-sm text-[var(--text-muted)]">alerts today</p>
        </div>
        <p className="mt-1 text-xs text-[var(--text-muted)]">Across {athleteCount} athletes</p>
      </div>

      {/* AI Summary */}
      <div className="mx-4 rounded-2xl border border-[var(--light-green)] bg-[var(--very-light-green)] p-4 animate-fade-up">
        <p className="text-sm leading-6 text-[var(--brand-primary)]">{summaryText}</p>
      </div>

      {/* Top 3 risks */}
      <div className="px-4 mt-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)] mb-2">Top risks</p>
        <div className="flex flex-col gap-2">
          {topRisks.map((alert, i) => (
            <div key={alert.id} className="flex items-center gap-3 rounded-xl border border-[var(--light-gray)] bg-white p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fef2f2] text-xs font-bold text-[#dc2626]">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{alert.name}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{alert.shortReason}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                alert.severity === "High" ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#fffbeb] text-[#d97706]"
              }`}>
                {alert.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cohort trends */}
      <div className="px-4 mt-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)] mb-2">Cohort trends</p>
        <div className="grid grid-cols-3 gap-2">
          {ALERT_STATES.map((s) => {
            const count = PLAYER_ALERTS.filter((a) => a.state === s.key).length;
            return (
              <div key={s.key} className={`rounded-xl ${s.bgColor} p-4 text-center`}>
                <p className="text-4xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums">{count}</p>
                <p className="text-[10px] uppercase tracking-wider font-medium text-[var(--text-muted)] mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggested focus */}
      <div className="mx-4 mt-4 rounded-2xl border border-[var(--light-gray)] bg-white p-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)] mb-2">Suggested focus areas</p>
        <ul className="flex flex-col gap-2">
          <li className="flex items-start gap-2 text-sm text-[var(--medium-gray)]">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-[#dc2626]" />
            Review At Risk players before next training session
          </li>
          <li className="flex items-start gap-2 text-sm text-[var(--medium-gray)]">
            <Activity size={16} className="shrink-0 mt-0.5 text-[#d97706]" />
            Address load imbalance trends in forwards
          </li>
          <li className="flex items-start gap-2 text-sm text-[var(--medium-gray)]">
            <TrendingUp size={16} className="shrink-0 mt-0.5 text-[#2563eb]" />
            Monitor late-game speed patterns across squad
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 px-4 mt-4 mb-6 animate-fade-up" style={{ animationDelay: "400ms" }}>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--light-gray)] bg-white py-3 text-sm font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--very-light-gray)] active:scale-[0.98]"
        >
          <X size={16} />
          Dismiss
        </button>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(summaryText)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] py-3 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-[0.98]"
        >
          <Share2 size={16} />
          Share
        </button>
        <button
          type="button"
          onClick={() => {
            const content = `AI Performance Alerts — Executive Summary\n${new Date().toLocaleDateString()}\n\n${summaryText}\n\nTop risks:\n${topRisks.map((a, i) => `${i + 1}. ${a.name} — ${a.shortReason} (${a.severity})`).join("\n")}\n\nCohort trends:\n${ALERT_STATES.map((s) => `${s.label}: ${PLAYER_ALERTS.filter((a) => a.state === s.key).length}`).join("\n")}`;
            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `alerts-summary-${new Date().toISOString().slice(0, 10)}.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--light-gray)] bg-white py-3 text-sm font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--very-light-gray)] active:scale-[0.98]"
        >
          <Download size={16} />
          Export
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════ T8: Settings & AI Control ═══════════════════ */

function SettingsView() {
  const [sensitivity, setSensitivity] = useState<SensitivityMode>("Balanced");
  const [modules, setModules] = useState<AIModule[]>([
    { id: "injury_risk", name: "Injury & Risk Detection", description: "Monitors acute:chronic ratios, load spikes, and overload signals", enabled: true },
    { id: "load_analysis", name: "Load Analysis", description: "Tracks training load trends and imbalance patterns", enabled: true },
    { id: "performance", name: "Performance Monitoring", description: "Detects speed drops, work rate changes, and output outliers", enabled: true },
    { id: "planning", name: "Planning & Compliance", description: "Compares actual load to planned targets", enabled: false },
    { id: "recovery", name: "Recovery Monitoring", description: "Monitors recovery metrics and readiness indicators", enabled: true },
  ]);

  function toggleModule(id: string) {
    setModules((prev) => prev.map((m) => m.id === id ? { ...m, enabled: !m.enabled } : m));
  }

  const configHistory = [
    { action: "Sensitivity changed to Balanced", by: "Admin", time: "Today 08:15" },
    { action: "Planning module disabled", by: "Admin", time: "Yesterday 14:30" },
    { action: "Recovery module enabled", by: "Admin", time: "Mar 10, 09:00" },
  ];

  const enabledCount = modules.filter((m) => m.enabled).length;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-baseline gap-3">
          <p className="text-5xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums">{enabledCount}</p>
          <p className="text-sm text-[var(--text-muted)]">modules active</p>
        </div>
        <p className="mt-1 text-xs text-[var(--text-muted)]">of {modules.length} total</p>
      </div>

      {/* Sensitivity selector */}
      <div className="mx-4 rounded-2xl border border-[var(--light-gray)] bg-white p-4 animate-fade-up">
        <div className="flex items-center gap-2 mb-3">
          <Sliders size={16} className="text-[var(--text-primary)]" />
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)]">Detection sensitivity</p>
        </div>
        <div className="flex rounded-xl border border-[var(--light-gray)] overflow-hidden">
          {(["Conservative", "Balanced", "Aggressive"] as SensitivityMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSensitivity(mode)}
              className={`flex-1 py-3 text-[13px] font-medium transition-colors ${
                sensitivity === mode
                  ? "bg-[var(--very-light-green)] text-[var(--light-green)]"
                  : "bg-white text-[var(--medium-gray)] hover:bg-[var(--very-light-gray)]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          {sensitivity === "Conservative" && "Fewer alerts, higher confidence thresholds. Best for reducing noise."}
          {sensitivity === "Balanced" && "Standard thresholds. Good balance of sensitivity and specificity."}
          {sensitivity === "Aggressive" && "More alerts, lower thresholds. Best for catching early signals."}
        </p>
      </div>

      {/* AI Modules */}
      <div className="px-4 mt-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} className="text-[var(--text-primary)]" />
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)]">AI modules</p>
        </div>
        <div className="flex flex-col gap-2">
          {modules.map((mod) => (
            <div key={mod.id} className="flex items-center gap-3 rounded-xl border border-[var(--light-gray)] bg-white p-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)]">{mod.name}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{mod.description}</p>
              </div>
              <button type="button" aria-label={`Toggle ${mod.name}`} onClick={() => toggleModule(mod.id)} className="shrink-0">
                {mod.enabled
                  ? <ToggleRight size={28} className="text-[var(--light-green)]" />
                  : <ToggleLeft size={28} className="text-[var(--light-gray)]" />
                }
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Threshold info */}
      <div className="mx-4 mt-4 rounded-2xl border border-[var(--light-gray)] bg-[var(--very-light-gray)] p-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)] mb-2">Active thresholds</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white p-3">
            <p className="text-[10px] uppercase tracking-wider font-medium text-[var(--text-muted)]">AC ratio limit</p>
            <p className="text-xl font-bold tracking-tight text-[var(--text-primary)] mt-0.5">1.20</p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-[10px] uppercase tracking-wider font-medium text-[var(--text-muted)]">Load deviation</p>
            <p className="text-xl font-bold tracking-tight text-[var(--text-primary)] mt-0.5">±20%</p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-[10px] uppercase tracking-wider font-medium text-[var(--text-muted)]">Speed drop</p>
            <p className="text-xl font-bold tracking-tight text-[var(--text-primary)] mt-0.5">-8%</p>
          </div>
          <div className="rounded-lg bg-white p-3">
            <p className="text-[10px] uppercase tracking-wider font-medium text-[var(--text-muted)]">Total rules</p>
            <p className="text-xl font-bold tracking-tight text-[var(--text-primary)] mt-0.5">{ALERT_STATES.reduce((a, s) => a + s.rules.length, 0)}</p>
          </div>
        </div>
      </div>

      {/* Configuration history */}
      <div className="px-4 mt-4 mb-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={16} className="text-[var(--text-primary)]" />
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)]">Configuration history</p>
        </div>
        <div className="flex flex-col gap-2">
          {configHistory.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 rounded-xl border border-[var(--light-gray)] bg-white p-3">
              <div className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-muted)]" />
              <div>
                <p className="text-sm text-[var(--text-primary)]">{item.action}</p>
                <p className="text-xs text-[var(--text-muted)]">{item.by} · {item.time}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">All changes are logged. Role-based permissions apply.</p>
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
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--very-light-green)] text-[var(--light-green)]">
        <Zap size={16} />
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
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--very-light-green)] text-[var(--light-green)]">
          <Zap size={16} />
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
        <h2 className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-primary)]">Chat history</h2>
        <button type="button" aria-label="Close history" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--very-light-gray)]">
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
        {messages.length > 0 ? (
          <div className="flex flex-col gap-1 py-3">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} msg={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--very-light-green)]">
              <Zap size={28} className="text-[var(--light-green)]" />
            </div>
            <p className="mt-4 text-lg font-semibold text-[var(--text-primary)]">AI Chat</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Ask about players, metrics, and performance. Try a suggestion below or type your own question.
            </p>
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
            className="flex cursor-grab gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory animate-slide-down leading-[18px]"
          >
            {SUGGESTIONS.map((text, i) => (
              <button
                key={i}
                type="button"
                className="min-w-[42%] max-w-[45%] snap-start rounded-2xl bg-[var(--very-light-green)] px-2.5 py-2 text-left hover:opacity-90 active:scale-[0.98] transition-transform animate-slide-in-right"
                style={{ animationDelay: `${i * 80}ms` }}
                onClick={() => { sendMessage(text); setShowSuggestions(false); }}
              >
                <span className="text-[13px] font-medium leading-[18px] text-[var(--brand-primary)]">
                  {text}
                </span>
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2 rounded-2xl border border-[var(--light-green)] bg-white p-2.5 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.06)]">
          <div className="px-1.5">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type # to browse Drills, Sessions, and Timeframes, @ for Participants, and ! for Metrics."
              rows={2}
              className="w-full resize-none bg-transparent text-base leading-6 text-[var(--text-primary)] placeholder:text-[#999] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 mt-0 mb-0">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <span className="rounded-2xl bg-[var(--very-light-green)] px-1.5 py-[3px] text-sm font-medium tracking-[0.14px] text-[var(--medium-gray)]">
                GPS data
              </span>
              <button type="button" className="flex items-center gap-0.5 rounded-2xl bg-[var(--very-light-gray)] px-1.5 py-[3px] text-sm font-medium tracking-[0.14px] text-[var(--medium-gray)]">
                Metrics
                <ChevronDown size={16} className="text-[var(--medium-gray)]" />
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
                <ChevronDown size={16} />
              </button>
            </div>
            <button
              type="button"
              aria-label="Send message"
              onClick={handleSubmit}
              disabled={!hasText}
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
                hasText ? "bg-[var(--light-green)] active:scale-95" : "bg-[var(--text-muted)]"
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
        <button type="button" aria-label="Menu" className="flex h-11 w-11 items-center justify-center rounded-full hover:opacity-80">
          <MenuIcon />
        </button>
        <div className="flex items-center gap-2 py-[3px]">
          <span className="text-base font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap">
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
        <div className="flex h-[47px] shrink-0 items-center justify-between border-b border-[var(--very-light-gray)] px-4">
          <div className="flex h-full gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("alerts")}
              className="flex h-full flex-col items-center gap-[10px]"
            >
              <div className="flex flex-1 items-center justify-center">
                <span className={`text-[13px] font-semibold leading-5 uppercase tracking-wider ${activeTab === "alerts" ? "text-[var(--brand-primary)]" : "text-[var(--medium-gray)]"}`}>
                  AI alerts
                </span>
              </div>
              <div className={`h-[3px] w-full ${activeTab === "alerts" ? "bg-[var(--light-green)]" : "bg-transparent"}`} />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className="flex h-full flex-col items-center gap-[10px]"
            >
              <div className="flex flex-1 items-center justify-center">
                <span className={`text-[13px] font-semibold leading-5 uppercase tracking-wider ${activeTab === "chat" ? "text-[var(--brand-primary)]" : "text-[var(--medium-gray)]"}`}>
                  AI chat
                </span>
              </div>
              <div className={`h-[3px] w-full ${activeTab === "chat" ? "bg-[var(--light-green)]" : "bg-transparent"}`} />
            </button>
          </div>

          {activeTab === "alerts" ? (
            <div />
          ) : (
            <div className="flex items-center gap-2">
              <button type="button" aria-label="New chat" onClick={handleNewChat} className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--light-gray)] text-[var(--text-primary)] hover:bg-[var(--very-light-gray)] active:scale-95 transition-all">
                <Edit size={16} />
              </button>
              <button
                type="button"
                aria-label="Chat history"
                onClick={() => setShowChatHistory(!showChatHistory)}
                className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-all active:scale-95 ${
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
