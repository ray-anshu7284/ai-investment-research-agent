import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Cpu, Activity } from "lucide-react";
import { SettingsModal } from "./SettingsModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TICKER_ITEMS = [
  { symbol: "AAPL", price: "240.25", change: "+1.25%", positive: true },
  { symbol: "MSFT", price: "415.10", change: "+0.48%", positive: true },
  { symbol: "NVDA", price: "128.50", change: "+3.42%", positive: true },
  { symbol: "TSLA", price: "195.80", change: "-0.78%", positive: false },
  { symbol: "AMZN", price: "185.30", change: "+2.11%", positive: true },
  { symbol: "META", price: "502.40", change: "-1.15%", positive: false },
  { symbol: "GOOGL", price: "178.60", change: "+0.92%", positive: true },
  { symbol: "NFLX", price: "680.15", change: "+1.65%", positive: true },
  { symbol: "INFY", price: "22.40", change: "-0.35%", positive: false },
  { symbol: "TCS", price: "48.20", change: "+0.80%", positive: true },
  { symbol: "RELIANCE", price: "2840.60", change: "+0.55%", positive: true },
  { symbol: "SPY", price: "541.20", change: "+0.33%", positive: true },
  { symbol: "QQQ", price: "462.80", change: "+0.61%", positive: true },
  { symbol: "BTC", price: "67420.00", change: "+2.14%", positive: true },
];

export function Navbar() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isComingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState("");
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [activeTab, setActiveTab] = useState("terminal");
  const [mktStatus] = useState("OPEN");

  useEffect(() => {
    setHasCustomKey(!!localStorage.getItem("groq_api_key"));
  }, [isSettingsOpen]);

  const navItems = [
    { id: "terminal", label: "Terminal" },
    { id: "market", label: "Markets" },
    { id: "watchlists", label: "Watchlists" },
    { id: "intelligence", label: "Insights" },
  ];

  const handleNavClick = (id, label) => {
    if (id === "terminal") {
      setActiveTab(id);
    } else {
      setComingSoonFeature(label);
      setComingSoonOpen(true);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 apex-navbar"
    >
      {/* Ticker Bar */}
      <div className="ticker-wrap select-none py-1.5 overflow-hidden">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "marquee 50s linear infinite" }}
        >
          {Array(4).fill(TICKER_ITEMS).flat().map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 mx-5">
              <span className="ticker-symbol">{item.symbol}</span>
              <span className="ticker-price">{item.price}</span>
              <span className={item.positive ? "ticker-pos" : "ticker-neg"}>
                {item.positive ? "+" : ""}{item.change}
              </span>
              <span style={{ color: "rgba(255,255,255,0.08)", fontSize: 10 }}>│</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Nav */}
      <div
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6"
        style={{ height: 52 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.1))",
              border: "1px solid rgba(16,185,129,0.3)",
            }}
          >
            <img src="/logo.png" alt="Apex" className="h-5 w-5 object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#E8E8F0",
              }}
            >
              APEX
              <span
                style={{
                  color: "#10B981",
                  marginLeft: "0.35rem",
                  fontSize: "0.65rem",
                }}
              >
                RESEARCH
              </span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                color: "#3D4060",
                letterSpacing: "0.12em",
              }}
            >
              INSTITUTIONAL TERMINAL
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.label)}
              suppressHydrationWarning
              className="subnav-tab"
              style={
                activeTab === item.id
                  ? { color: "#10B981", background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.2)" }
                  : {}
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Market Status */}
          <div
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md"
            style={{
              background: "rgba(16,185,129,0.07)",
              border: "1px solid rgba(16,185,129,0.15)",
            }}
          >
            <span className="status-dot" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                color: "#10B981",
              }}
            >
              MKT {mktStatus}
            </span>
          </div>

          {/* API Key Indicator */}
          {hasCustomKey && (
            <span
              className="hidden sm:inline-flex cmd-badge"
              style={{ background: "rgba(16,185,129,0.08)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              CUSTOM KEY
            </span>
          )}

          {/* Icons */}
          <NavIconBtn label="Notifications" onClick={() => toast.success("No new alerts.")}>
            <Bell className="h-3.5 w-3.5" />
          </NavIconBtn>
          <NavIconBtn onClick={() => setSettingsOpen(true)} label="Settings">
            <Settings className="h-3.5 w-3.5" />
          </NavIconBtn>

          {/* Profile */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="h-5 w-5 rounded-md flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #10B981, #059669)", color: "#050508" }}
            >
              A
            </div>
            <span
              className="hidden sm:block text-xs font-semibold"
              style={{ color: "#9394A8" }}
            >
              Analyst
            </span>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Coming Soon Modal */}
      <Dialog open={isComingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent
          className="max-w-[380px] p-6 rounded-xl"
          style={{ background: "#0D0E14", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <DialogHeader className="flex flex-col items-center text-center pb-3">
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
            >
              <Cpu className="h-5 w-5" style={{ color: "#10B981" }} />
            </div>
            <DialogTitle className="text-base font-bold" style={{ color: "#E8E8F0" }}>
              Module Offline
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-center leading-relaxed" style={{ color: "#5A5B72" }}>
            <span className="font-semibold" style={{ color: "#9394A8" }}>{comingSoonFeature}</span>{" "}
            is under development and will be available in the next release.
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
    </motion.header>
  );
}

function NavIconBtn({ children, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      suppressHydrationWarning
      className="grid h-8 w-8 place-items-center rounded-lg cursor-pointer transition-all"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#5A5B72" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
        e.currentTarget.style.color = "#10B981";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.color = "#5A5B72";
      }}
    >
      {children}
    </button>
  );
}
