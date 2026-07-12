import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import React from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Activity, AlertTriangle, ArrowUpRight, Bookmark, Brain, Building2,
  Check, CheckCircle2, ChevronDown, Copy, Cpu, Download, ExternalLink,
  FileText, Globe, Info, Lightbulb, MinusCircle, Newspaper, Radar, RotateCcw,
  Share2, Shield, TrendingDown, TrendingUp, Users, XCircle, Zap,
} from "lucide-react";

const S = { color: "#9394A8" };
const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

const CHART_TOOLTIP = {
  contentStyle: {
    background: "#0D0E14",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    fontSize: 11,
    color: "#E8E8F0",
  },
  itemStyle: { color: "#E8E8F0" },
  labelStyle: { color: "#5A5B72" },
  cursor: { stroke: "rgba(16,185,129,0.3)" },
};

// ==============================
// SUB-NAV
// ==============================
function ReportSubNavbar({ activeTab, setActiveTab }) {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "workflow", label: "Workflow" },
    { id: "financials", label: "Financials" },
    { id: "swot", label: "SWOT" },
    { id: "news", label: "News" },
    { id: "competitors", label: "Competitors" },
    { id: "thesis", label: "Thesis" },
    { id: "risk", label: "Risk" },
  ];
  return (
    <div
      className="report-subnav sticky z-45 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8"
      style={{ top: 74 }}
    >
      <div className="mx-auto max-w-7xl flex items-center gap-1 overflow-x-auto scrollbar-thin py-2 select-none">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveTab(sec.id)}
            suppressHydrationWarning
            className={`subnav-tab ${activeTab === sec.id ? "active" : ""}`}
          >
            {sec.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ==============================
// MAIN RESULTS COMPONENT
// ==============================
export function Results({ report, onReset }) {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [isComingSoonOpen, setComingSoonOpen] = React.useState(false);
  const [comingSoonFeature, setComingSoonFeature] = React.useState("");

  const handleActionClick = (featureName) => {
    setComingSoonFeature(featureName);
    setComingSoonOpen(true);
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-4 pb-10 sm:px-6 md:px-8">
      <ReportSubNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ActionBar onReset={onReset} onActionClick={handleActionClick} />

      {activeTab === "overview" && (
        <div className="space-y-5">
          <DecisionBanner report={report} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-5">
              <OverviewCard report={report} />
            </div>
            <div className="space-y-5">
              <SentimentCard report={report} />
              <AnalystCard report={report} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "workflow" && (
        <div className="space-y-5">
          <WorkflowTimeline report={report} />
          <ReasoningCard report={report} />
        </div>
      )}

      {activeTab === "financials" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <FinancialMetrics report={report} />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <RevenueChart report={report} />
              <ProfitChart report={report} />
            </div>
            <StockChart report={report} />
            <HealthBars report={report} />
          </div>
          <div>
            <ScoreGauge report={report} />
          </div>
        </div>
      )}

      {activeTab === "swot" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SwotGrid report={report} />
          </div>
          <ProsConsPanel report={report} />
        </div>
      )}

      {activeTab === "news" && (
        <div className="max-w-4xl mx-auto w-full">
          <NewsPanel report={report} />
        </div>
      )}

      {activeTab === "competitors" && <CompetitorTable report={report} />}

      {activeTab === "thesis" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ThesisCard report={report} />
          </div>
          <SourcesPanel report={report} />
        </div>
      )}

      {activeTab === "risk" && (
        <div className="max-w-3xl mx-auto w-full">
          <RiskPanel report={report} />
        </div>
      )}

      {/* Coming Soon Modal */}
      <Dialog open={isComingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent
          className="max-w-[380px] p-6 rounded-xl"
          style={{ background: "#0D0E14", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <DialogHeader className="flex flex-col items-center text-center pb-3">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}>
              <Cpu className="h-5 w-5" style={{ color: "#10B981" }} />
            </div>
            <DialogTitle className="text-base font-bold" style={{ color: "#E8E8F0" }}>
              Module Offline
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-center leading-relaxed" style={{ color: "#5A5B72" }}>
            <span className="font-semibold" style={{ color: "#9394A8" }}>{comingSoonFeature}</span>{" "}
            is under development and will be available in the next terminal release.
          </p>
          <div className="mt-5">
            <Button
              onClick={() => setComingSoonOpen(false)}
              className="w-full font-bold text-sm cursor-pointer border-none"
              style={{ background: "linear-gradient(135deg, #10B981, #059669)", color: "#050508" }}
            >
              Got It
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ==============================
// ACTION BAR
// ==============================
function ActionBar({ onReset, onActionClick }) {
  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  return (
    <motion.div {...fade} className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold cursor-pointer transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#5A5B72" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#9394A8"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#5A5B72"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
        >
          <RotateCcw className="h-3.5 w-3.5" /> New Analysis
        </button>
        <div className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#3D4060", letterSpacing: "0.08em" }}>
            DATA AS OF {date.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { icon: <Download className="h-3.5 w-3.5" />, label: "PDF", action: "PDF Export" },
          { icon: <Copy className="h-3.5 w-3.5" />, label: "Copy", action: "Copy Report" },
          { icon: <Share2 className="h-3.5 w-3.5" />, label: "Share", action: "Share" },
          { icon: <Bookmark className="h-3.5 w-3.5" />, label: "Save", action: "Save Report" },
        ].map(({ icon, label, action }) => (
          <button
            key={label}
            onClick={() => onActionClick(action)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs cursor-pointer transition-all"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#5A5B72" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#10B981"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#5A5B72"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ==============================
// BASE CARD
// ==============================
function Panel({ children, className = "", accentColor }) {
  return (
    <motion.div
      {...fade}
      className={`apex-card p-5 sm:p-6 ${className}`}
      style={accentColor ? { borderLeft: `3px solid ${accentColor}` } : {}}
    >
      {children}
    </motion.div>
  );
}

function PanelTitle({ icon, label, sub }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
        <span style={{ color: "#10B981" }}>{icon}</span>
      </div>
      <div>
        <div className="text-sm font-bold" style={{ color: "#E8E8F0" }}>{label}</div>
        {sub && <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#3D4060", letterSpacing: "0.1em", textTransform: "uppercase" }}>{sub}</div>}
      </div>
    </div>
  );
}

// ==============================
// DECISION BANNER
// ==============================
function getDecisionReason(report, verdict) {
  const thesis = report.thesis || "";
  const paragraphs = thesis.split("\n").map(p => p.trim()).filter(p => p && !p.startsWith("#") && !p.startsWith("-") && !p.startsWith("*") && !p.startsWith(">"));
  if (paragraphs.length > 0) {
    const sentences = paragraphs[0].match(/[^.!?]+[.!?]+(\s|$)/g);
    if (sentences && sentences.length > 0) return sentences.slice(0, 2).join("").trim();
    return paragraphs[0];
  }
  return verdict === "INVEST"
    ? "Strong investment potential supported by positive financial indicators and robust competitive positioning."
    : "Caution advised due to elevated risk concerns and lower composite financial metrics.";
}

function DecisionBanner({ report }) {
  const { verdict, confidence, score } = report.decision;
  const isInvest = verdict === "BUY";
  const decision = isInvest ? "INVEST" : "PASS";
  const riskScore = report.risk?.score || 50;
  const riskLevel = riskScore <= 35 ? "LOW" : riskScore > 65 ? "HIGH" : "MED";
  const shortReason = getDecisionReason(report, decision);

  const color = isInvest ? "#10B981" : "#EF4444";
  const bg = isInvest
    ? "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.04) 100%)"
    : "linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(185,28,28,0.04) 100%)";
  const border = isInvest ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)";
  const leftBorder = isInvest ? "#10B981" : "#EF4444";

  return (
    <motion.div
      {...fade}
      className="rounded-xl overflow-hidden p-5 sm:p-6"
      style={{ background: bg, border: `1px solid ${border}`, borderLeft: `4px solid ${leftBorder}` }}
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Left: Decision */}
        <div className="space-y-3 flex-grow">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
              {isInvest ? <CheckCircle2 className="h-5 w-5" style={{ color }} /> : <XCircle className="h-5 w-5" style={{ color }} />}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#3D4060", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                AI Investment Decision
              </div>
              <div
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-black tracking-widest mt-0.5"
                style={{ background: `${color}15`, color, border: `1px solid ${color}30`, fontFamily: "var(--font-mono)" }}
              >
                {decision}
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#9394A8", fontStyle: "italic" }}>
            "{shortReason}"
          </p>
        </div>

        {/* Divider */}
        <div className="hidden h-16 w-px md:block" style={{ background: "rgba(255,255,255,0.07)" }} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 shrink-0 md:w-[300px]">
          {[
            { label: "Confidence", value: `${confidence}%`, bar: confidence },
            { label: "Score", value: score, sub: "/ 100" },
            { label: "Risk", value: riskLevel, badge: true, riskScore },
          ].map(({ label, value, bar, sub, badge, riskScore: rs }) => (
            <div key={label} className="text-center rounded-lg p-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#3D4060", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {label}
              </div>
              <div className="mt-1.5 text-lg font-black" style={{ color: "#E8E8F0" }}>{value}</div>
              {sub && <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#3D4060" }}>{sub}</div>}
              {bar !== undefined && (
                <div className="mt-1.5 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-full rounded-full" style={{ width: `${bar}%`, background: "#10B981" }} />
                </div>
              )}
              {badge && (
                <div className="mt-1"
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 700,
                    color: rs <= 35 ? "#10B981" : rs > 65 ? "#EF4444" : "#F59E0B",
                  }}
                >
                  {rs}/100
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ==============================
// OVERVIEW CARD
// ==============================
function OverviewCard({ report }) {
  const o = report.overview;
  const rows = [
    ["Sector", o.sector], ["Industry", o.industry], ["Market Cap", o.marketCap],
    ["Headquarters", o.headquarters], ["Founded", o.founded], ["CEO", o.ceo],
    ["Employees", o.employees], ["Website", o.website],
  ];
  return (
    <Panel>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl font-black"
            style={{ background: "linear-gradient(135deg, #10B981, #059669)", color: "#050508" }}>
            {o.logo || o.name?.[0]}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-xl font-black" style={{ color: "#E8E8F0" }}>{o.name}</h2>
              <span className="cmd-badge" style={{ background: "rgba(16,185,129,0.08)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                {o.ticker}
              </span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "#5A5B72", marginTop: "0.15rem" }}>
              {o.sector} · {o.industry}
            </p>
          </div>
        </div>
        {o.website && (
          <a
            href={o.website.startsWith("http") ? o.website : `https://${o.website}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-all"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#5A5B72" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#10B981"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#5A5B72"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            <Globe className="h-3.5 w-3.5" /> {o.website} <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Data rows */}
      <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        {rows.map(([k, v], idx) => (
          <div key={k} className="cmd-row px-4" style={{ background: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
            <span className="cmd-label">{k}</span>
            <span className="cmd-value text-right">{v || "N/A"}</span>
          </div>
        ))}
      </div>

      {o.summary && (
        <p className="mt-4 text-sm leading-relaxed" style={{ color: "#5A5B72" }}>{o.summary}</p>
      )}
    </Panel>
  );
}

// ==============================
// SENTIMENT CARD
// ==============================
function SentimentCard({ report }) {
  const { positive, neutral, negative } = report.sentiment;
  const data = [
    { name: "Positive", value: positive, color: "#10B981" },
    { name: "Neutral", value: neutral, color: "#F59E0B" },
    { name: "Negative", value: negative, color: "#EF4444" },
  ];
  return (
    <Panel>
      <PanelTitle icon={<Info className="h-4 w-4" />} label="Market Sentiment" sub="AI Scored" />
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} dataKey="value" stroke="none">
              {data.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie>
            <Tooltip {...CHART_TOOLTIP} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {data.map((d) => (
          <div key={d.name} className="text-center rounded-lg p-2" style={{ background: `${d.color}0D`, border: `1px solid ${d.color}25` }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: d.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>{d.name}</div>
            <div className="text-sm font-black mt-0.5" style={{ color: "#E8E8F0" }}>{d.value}%</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ==============================
// ANALYST CARD
// ==============================
function AnalystCard({ report }) {
  const a = report.analyst;
  const buyVal = Number(a.buy) || 0;
  const holdVal = Number(a.hold) || 0;
  const sellVal = Number(a.sell) || 0;
  let consensus = "Neutral";
  if (a.consensus) {
    const c = a.consensus.toLowerCase();
    if (c.includes("buy") || c.includes("positive") || c.includes("outperform")) consensus = "Positive";
    else if (c.includes("sell") || c.includes("negative") || c.includes("underperform")) consensus = "Negative";
  } else {
    if (buyVal > holdVal && buyVal > sellVal) consensus = "Positive";
    else if (sellVal > buyVal && sellVal > holdVal) consensus = "Negative";
  }
  const cColor = consensus === "Positive" ? "#10B981" : consensus === "Negative" ? "#EF4444" : "#F59E0B";

  return (
    <Panel>
      <PanelTitle icon={<Users className="h-4 w-4" />} label="Analyst Ratings" sub="Wall Street Coverage" />
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[["Positive", a.buy, "#10B981"], ["Neutral", a.hold, "#F59E0B"], ["Negative", a.sell, "#EF4444"]].map(([l, v, c]) => (
          <div key={l} className="text-center rounded-lg p-3" style={{ background: `${c}0D`, border: `1px solid ${c}20` }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: c, letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
            <div className="text-2xl font-black mt-1" style={{ color: "#E8E8F0" }}>{v}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg p-3" style={{ background: `${cColor}0A`, border: `1px solid ${cColor}20` }}>
        <div className="flex items-center justify-between">
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#3D4060", letterSpacing: "0.1em", textTransform: "uppercase" }}>Consensus</div>
            <div className="text-base font-black mt-0.5" style={{ color: cColor }}>{consensus}</div>
          </div>
          <div className="text-right">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#3D4060", letterSpacing: "0.1em", textTransform: "uppercase" }}>12M Target</div>
            <div className="text-sm font-bold mt-0.5" style={{ color: "#E8E8F0" }}>{a.priceTarget}</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

// ==============================
// WORKFLOW TIMELINE
// ==============================
function WorkflowTimeline({ report }) {
  const { verdict } = report.decision;
  const isInvest = verdict === "BUY";
  const decision = isInvest ? "INVEST" : "PASS";
  const riskScore = report.risk?.score || 50;
  const riskLevel = riskScore <= 35 ? "Low" : riskScore > 65 ? "High" : "Medium";
  const steps = [
    { num: "01", title: "Company Identified", detail: `${report.overview?.ticker || "N/A"} · ${report.overview?.name || "N/A"} · Founded ${report.overview?.founded || "N/A"}` },
    { num: "02", title: "Business Overview", detail: `Sector: ${report.overview?.sector || "N/A"} · Industry: ${report.overview?.industry || "N/A"}` },
    { num: "03", title: "Financial Metrics", detail: `${report.metrics?.length || 0} valuation & health indicators processed` },
    { num: "04", title: "Revenue & Profit Trends", detail: `${report.revenue?.length || 0} fiscal years analyzed` },
    { num: "05", title: "Competitor Benchmarking", detail: `${(report.competitors?.length || 1) - 1} peers evaluated` },
    { num: "06", title: "News Sentiment", detail: `${report.sentiment?.positive || 0}% positive news signal` },
    { num: "07", title: "Risk Assessment", detail: `Risk score: ${riskScore}/100 · Level: ${riskLevel}` },
    { num: "08", title: "SWOT Analysis", detail: `${report.swot?.strengths?.length || 0}S / ${report.swot?.weaknesses?.length || 0}W / ${report.swot?.opportunities?.length || 0}O / ${report.swot?.threats?.length || 0}T` },
    { num: "09", title: "Final Verdict", detail: `${decision} · Confidence: ${report.decision?.confidence || 0}% · Score: ${report.decision?.score || 0}/100` },
  ];

  return (
    <Panel>
      <PanelTitle icon={<Radar className="h-4 w-4" />} label="Research Execution Log" sub="Step-by-step analysis" />
      <div className="space-y-0">
        {steps.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06, duration: 0.35 }}
            className="relative flex items-start gap-4 py-3"
            style={{ borderBottom: idx < steps.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
          >
            {/* Connector */}
            {idx < steps.length - 1 && (
              <div className="absolute left-[17px] top-9 bottom-0 w-px" style={{ background: "rgba(255,255,255,0.04)" }} />
            )}
            {/* Step circle */}
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <CheckCircle2 className="h-4 w-4" style={{ color: "#10B981" }} />
            </div>
            <div className="flex-grow min-w-0 pt-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#10B981", letterSpacing: "0.1em" }}>{step.num}</span>
                <span className="text-sm font-semibold" style={{ color: "#C8C9D8" }}>{step.title}</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: "#3D4060" }}>{step.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

// ==============================
// REASONING CARD
// ==============================
function ReasoningCard({ report }) {
  const isInvest = report.decision.verdict === "BUY";
  const decision = isInvest ? "INVEST" : "PASS";
  const color = isInvest ? "#10B981" : "#EF4444";
  const bullets = [];
  if (isInvest) {
    (report.pros || []).forEach(p => bullets.push(p));
    (report.swot?.strengths || []).forEach(s => { if (!bullets.includes(s)) bullets.push(s); });
  } else {
    (report.cons || []).forEach(c => bullets.push(c));
    (report.swot?.weaknesses || []).forEach(w => { if (!bullets.includes(w)) bullets.push(w); });
  }

  return (
    <Panel accentColor={color}>
      <PanelTitle
        icon={isInvest ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
        label={`Why ${decision}?`}
        sub="AI Reasoning"
      />
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {bullets.slice(0, 6).map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-2.5 rounded-lg p-3"
            style={{ background: `${color}08`, border: `1px solid ${color}20` }}
          >
            {isInvest
              ? <Check className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color }} />
              : <XCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color }} />
            }
            <span className="text-xs leading-relaxed" style={{ color: "#9394A8" }}>{b}</span>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

// ==============================
// FINANCIAL METRICS
// ==============================
function FinancialMetrics({ report }) {
  const sanitize = (v) => (!v || v === "0" || v === "0.0" || v === "0%" || v === "N/A" || v === "-") ? "N/A" : v;
  return (
    <Panel>
      <PanelTitle icon={<Activity className="h-4 w-4" />} label="Financial Metrics" sub="Trailing Twelve Months" />
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {report.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="rounded-lg p-3.5 group cursor-default transition-all"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; e.currentTarget.style.background = "rgba(16,185,129,0.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#3D4060", letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.label}</div>
            <div className="mt-2 text-lg font-black" style={{ color: "#E8E8F0" }}>{sanitize(m.value)}</div>
            {m.delta && (
              <div className="mt-1 inline-flex items-center gap-1 text-xs" style={{ color: m.positive ? "#10B981" : "#EF4444" }}>
                {m.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {m.delta}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

// ==============================
// CHARTS
// ==============================
function RevenueChart({ report }) {
  return (
    <Panel>
      <PanelTitle icon={<TrendingUp className="h-4 w-4" />} label="Revenue Trend" sub="Billions USD · 6Y" />
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={report.revenue}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="year" stroke="#3D4060" fontSize={10} fontFamily="var(--font-mono)" />
            <YAxis stroke="#3D4060" fontSize={10} fontFamily="var(--font-mono)" />
            <Tooltip {...CHART_TOOLTIP} />
            <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#revGrad)" animationDuration={1200} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

function ProfitChart({ report }) {
  return (
    <Panel>
      <PanelTitle icon={<TrendingUp className="h-4 w-4" />} label="Profit Growth" sub="Net Income · Billions" />
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={report.revenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="year" stroke="#3D4060" fontSize={10} fontFamily="var(--font-mono)" />
            <YAxis stroke="#3D4060" fontSize={10} fontFamily="var(--font-mono)" />
            <Tooltip {...CHART_TOOLTIP} />
            <Line type="monotone" dataKey="profit" stroke="#34D399" strokeWidth={2} dot={{ fill: "#34D399", r: 3 }} animationDuration={1200} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

function StockChart({ report }) {
  return (
    <Panel>
      <PanelTitle icon={<Activity className="h-4 w-4" />} label="Stock Performance" sub="12-Month Share Price" />
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={report.stock}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" stroke="#3D4060" fontSize={10} fontFamily="var(--font-mono)" />
            <YAxis stroke="#3D4060" fontSize={10} fontFamily="var(--font-mono)" />
            <Tooltip {...CHART_TOOLTIP} />
            <Bar dataKey="price" fill="url(#barGrad)" radius={[4, 4, 0, 0]} animationDuration={1200} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

function HealthBars({ report }) {
  return (
    <Panel>
      <PanelTitle icon={<Shield className="h-4 w-4" />} label="Financial Health" sub="Composite Indicators" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {report.health.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs" style={{ color: "#5A5B72" }}>{h.label}</span>
              <span className="text-xs font-bold" style={{ color: "#E8E8F0" }}>{h.value}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #10B981, #34D399)" }}
                initial={{ width: 0 }}
                whileInView={{ width: `${h.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

// ==============================
// SCORE GAUGE
// ==============================
function ScoreGauge({ report }) {
  const score = report.decision.score;
  const R = 68, C = 2 * Math.PI * R;
  const offset = C - (score / 100) * C;
  const color = score >= 70 ? "#10B981" : "#EF4444";
  return (
    <Panel>
      <PanelTitle icon={<Activity className="h-4 w-4" />} label="Investment Score" sub="AI-weighted composite" />
      <div className="relative mx-auto grid h-48 w-48 place-items-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          <motion.circle
            cx="80" cy="80" r={R} fill="none" stroke={color} strokeWidth="10"
            strokeLinecap="round" strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
        <div className="text-center">
          <div className="text-4xl font-black" style={{ color }}>{score}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#3D4060", letterSpacing: "0.1em" }}>OUT OF 100</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg p-2.5 text-center" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#EF4444", letterSpacing: "0.08em" }}>0–70 · PASS</div>
        </div>
        <div className="rounded-lg p-2.5 text-center" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#10B981", letterSpacing: "0.08em" }}>70–100 · INVEST</div>
        </div>
      </div>
    </Panel>
  );
}

// ==============================
// SWOT GRID
// ==============================
function SwotGrid({ report }) {
  const quadrants = [
    { key: "strengths", label: "S · Strengths", items: report.swot.strengths, color: "#10B981", cls: "swot-s" },
    { key: "weaknesses", label: "W · Weaknesses", items: report.swot.weaknesses, color: "#EF4444", cls: "swot-w" },
    { key: "opportunities", label: "O · Opportunities", items: report.swot.opportunities, color: "#3B82F6", cls: "swot-o" },
    { key: "threats", label: "T · Threats", items: report.swot.threats, color: "#F59E0B", cls: "swot-t" },
  ];
  return (
    <Panel>
      <PanelTitle icon={<Radar className="h-4 w-4" />} label="SWOT Analysis" sub="Strategic Framework" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {quadrants.map((q, qi) => (
          <motion.div
            key={q.key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: qi * 0.08 }}
            className={`rounded-lg p-4 ${q.cls}`}
          >
            <div className="mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, color: q.color, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {q.label}
            </div>
            <ul className="space-y-2">
              {q.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "#9394A8" }}>
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: q.color }} />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

// ==============================
// PROS/CONS PANEL
// ==============================
function ProsConsPanel({ report }) {
  return (
    <div className="space-y-4">
      {[
        { label: "Pros", items: report.pros, color: "#10B981", icon: <Check className="h-3.5 w-3.5" /> },
        { label: "Cons", items: report.cons, color: "#EF4444", icon: <XCircle className="h-3.5 w-3.5" /> },
      ].map(({ label, items, color, icon }) => (
        <Panel key={label} accentColor={color}>
          <PanelTitle icon={icon} label={label} />
          <ul className="space-y-2">
            {items.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2.5 rounded-lg p-2.5 text-xs leading-relaxed"
                style={{ background: `${color}08`, border: `1px solid ${color}15`, color: "#9394A8" }}
              >
                <span style={{ color, marginTop: "0.1rem", flexShrink: 0 }}>{icon}</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </Panel>
      ))}
    </div>
  );
}

// ==============================
// NEWS PANEL
// ==============================
function NewsPanel({ report }) {
  const sentColors = { positive: "#10B981", neutral: "#F59E0B", negative: "#EF4444" };
  return (
    <Panel>
      <PanelTitle icon={<Newspaper className="h-4 w-4" />} label="Latest News" sub="AI-Scored Sentiment" />
      <div className="space-y-0">
        {report.news.map((n, i) => (
          <motion.article
            key={n.headline}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="news-item"
          >
            <div className="pt-1">
              <div
                className="cmd-badge"
                style={{ background: `${sentColors[n.sentiment]}0D`, color: sentColors[n.sentiment], border: `1px solid ${sentColors[n.sentiment]}25` }}
              >
                {n.sentiment}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#3D4060", marginTop: "0.4rem" }}>
                {n.time}
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm leading-snug mb-1" style={{ color: "#C8C9D8" }}>{n.headline}</div>
              <div className="text-xs leading-relaxed" style={{ color: "#5A5B72" }}>{n.summary}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#3D4060", marginTop: "0.4rem" }}>{n.source}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </Panel>
  );
}

// ==============================
// COMPETITOR TABLE
// ==============================
function CompetitorTable({ report }) {
  const cols = ["Company", "Revenue", "Growth", "Market Cap", "P/E Ratio", "Margins"];
  const sanitize = (v) => (!v || v === "0" || v === "0.0" || v === "0%" || v === "N/A" || v === "-") ? "—" : v;
  return (
    <Panel>
      <PanelTitle icon={<Building2 className="h-4 w-4" />} label="Competitor Comparison" sub="Peer Benchmark" />
      <div className="overflow-x-auto scrollbar-thin rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <table className="w-full" style={{ minWidth: 600 }}>
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c} className="comp-table-head text-left" style={{ fontFamily: "var(--font-mono)" }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {report.competitors.map((c, i) => (
              <tr key={c.name} className="comp-table-row" style={{ background: i === 0 ? "rgba(16,185,129,0.04)" : "transparent" }}>
                <td className="comp-table-cell font-semibold">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black"
                      style={{ background: i === 0 ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)", color: i === 0 ? "#10B981" : "#5A5B72", border: `1px solid ${i === 0 ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)"}` }}>
                      {c.name[0]}
                    </div>
                    <span style={{ color: "#C8C9D8" }}>{c.name}</span>
                    {i === 0 && (
                      <span className="cmd-badge" style={{ background: "rgba(16,185,129,0.08)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                        TARGET
                      </span>
                    )}
                  </div>
                </td>
                <td className="comp-table-cell">{sanitize(c.revenue)}</td>
                <td className="comp-table-cell" style={{ color: "#10B981" }}>{sanitize(c.growth)}</td>
                <td className="comp-table-cell">{sanitize(c.marketCap)}</td>
                <td className="comp-table-cell">{sanitize(c.pe)}</td>
                <td className="comp-table-cell">{sanitize(c.margins)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

// ==============================
// THESIS CARD
// ==============================
function ThesisCard({ report }) {
  const sanitize = (t) => {
    if (!t) return "";
    return t
      .replace(/\bBUY recommendation\b/gi, "INVEST recommendation")
      .replace(/\bHOLD recommendation\b/gi, "PASS recommendation")
      .replace(/\bSELL recommendation\b/gi, "PASS recommendation")
      .replace(/\ba BUY\b/g, "an INVEST").replace(/\bA BUY\b/g, "An INVEST")
      .replace(/\bBUY\b/g, "INVEST").replace(/\bbuy\b/g, "invest")
      .replace(/\bHOLD\b/g, "PASS").replace(/\bhold\b/g, "pass")
      .replace(/\bSELL\b/g, "PASS").replace(/\bsell\b/g, "pass");
  };
  return (
    <Panel>
      <PanelTitle icon={<FileText className="h-4 w-4" />} label="AI Investment Thesis" sub="Generated Report · Markdown" />
      <div className="markdown-body rounded-lg p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <ReactMarkdown>{sanitize(report.thesis)}</ReactMarkdown>
      </div>
    </Panel>
  );
}

// ==============================
// SOURCES PANEL
// ==============================
function SourcesPanel({ report }) {
  const getCleanUrl = (s) => {
    const url = s.url || "";
    const name = (s.name || "").toLowerCase();
    const ticker = report.overview?.ticker || "";
    if (name.includes("sec") || name.includes("10-k")) return `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${ticker}`;
    if (name.includes("yahoo") || name.includes("finance")) return ticker ? `https://finance.yahoo.com/quote/${ticker}` : "https://finance.yahoo.com";
    if (name.includes("alpha") || name.includes("vantage")) return "https://www.alphavantage.co";
    if (!url || url === "#" || url === "/") {
      const w = report.overview?.website || "";
      return w ? (w.startsWith("http") ? w : `https://${w}`) : `https://www.google.com/search?q=${encodeURIComponent((report.overview?.name || "") + " investor relations")}`;
    }
    return url;
  };
  const sources = (report.sources || []).filter(s => {
    const n = (s.name || "").toLowerCase();
    return !n.includes("mongodb") && !n.includes("langchain") && !n.includes("groq") && !n.includes("react") && !n.includes("node");
  });
  return (
    <Panel>
      <PanelTitle icon={<FileText className="h-4 w-4" />} label="Data Sources" sub="Verified Providers" />
      <div className="space-y-2">
        {sources.map((s, i) => (
          <motion.a
            key={s.name}
            href={getCleanUrl(s)}
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="group flex items-center justify-between rounded-lg p-3 transition-all"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; e.currentTarget.style.background = "rgba(16,185,129,0.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}
          >
            <div>
              <div className="text-sm font-semibold" style={{ color: "#C8C9D8" }}>{s.name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#3D4060", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.15rem" }}>{s.type}</div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: "#3D4060" }} />
          </motion.a>
        ))}
      </div>
    </Panel>
  );
}

// ==============================
// RISK PANEL
// ==============================
function RiskPanel({ report }) {
  const levelColor = { low: "#10B981", medium: "#F59E0B", high: "#EF4444" };
  const score = report.risk.score;
  const level = score <= 35 ? "low" : score > 65 ? "high" : "medium";
  return (
    <Panel accentColor={levelColor[level]}>
      <PanelTitle icon={<Shield className="h-4 w-4" />} label="Risk Analysis" sub="Composite Exposure" />

      {/* Overall Score */}
      <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#3D4060", letterSpacing: "0.1em", textTransform: "uppercase" }}>Composite Risk Score</span>
          <span className="font-black text-sm" style={{ color: levelColor[level] }}>{score} / 100</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #10B981, #F59E0B, #EF4444)" }}
            initial={{ width: 0 }}
            whileInView={{ width: `${score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </div>

      {/* Risk Factors */}
      <div className="grid grid-cols-2 gap-2">
        {report.risk.factors.map((f) => (
          <div
            key={f.name}
            className="flex items-center justify-between rounded-lg px-3 py-2.5"
            style={{
              background: `${levelColor[f.level]}08`,
              border: `1px solid ${levelColor[f.level]}20`,
            }}
          >
            <span className="text-xs" style={{ color: "#9394A8" }}>{f.name}</span>
            <span
              className="cmd-badge"
              style={{ background: `${levelColor[f.level]}15`, color: levelColor[f.level] }}
            >
              {f.level}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
