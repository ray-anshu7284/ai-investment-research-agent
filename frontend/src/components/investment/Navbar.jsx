import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, User, Bell, Cpu, ChevronDown } from "lucide-react";
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
  { symbol: "BABA", price: "84.20", change: "-1.42%", positive: false },
];

export function Navbar() {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isComingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState("");
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [activeTab, setActiveTab] = useState("terminal");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setHasCustomKey(!!localStorage.getItem("groq_api_key"));
  }, [isSettingsOpen]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "America/New_York",
        }) + " EST"
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: "terminal", label: "Research Terminal" },
    { id: "market", label: "Market Analytics" },
    { id: "watchlists", label: "Watchlists" },
    { id: "intelligence", label: "Institutional Insights" },
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
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 glass-navbar"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Live Stock Ticker Marquee */}
      <div
        className="w-full overflow-hidden select-none py-1.5"
        style={{
          background: "linear-gradient(90deg, oklch(0.05 0.01 260), oklch(0.08 0.015 260), oklch(0.05 0.01 260))",
          borderBottom: "1px solid oklch(1 0 0 / 0.06)",
        }}
      >
        <div className="flex w-max animate-marquee whitespace-nowrap gap-0">
          {Array(4)
            .fill(TICKER_ITEMS)
            .flat()
            .map((item, idx) => (
              <span key={idx} className="mx-5 inline-flex items-center gap-2 text-[10px] font-mono">
                <span
                  className="font-bold tracking-widest"
                  style={{ color: "oklch(0.60 0.02 255)" }}
                >
                  {item.symbol}
                </span>
                <span style={{ color: "oklch(0.82 0.01 255)" }}>${item.price}</span>
                <span
                  className="font-semibold"
                  style={{
                    color: item.positive
                      ? "oklch(0.62 0.18 155)"
                      : "oklch(0.60 0.20 25)",
                  }}
                >
                  {item.positive ? "▲" : "▼"} {item.change}
                </span>
                <span style={{ color: "oklch(1 0 0 / 0.15)" }}>│</span>
              </span>
            ))}
        </div>
      </div>

      {/* Main Nav Row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3.5 shrink-0">
          <div
            className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.65 0.25 255 / 0.15), oklch(0.55 0.22 280 / 0.08))",
              border: "1px solid oklch(0.65 0.25 255 / 0.3)",
              boxShadow: "0 0 20px oklch(0.65 0.25 255 / 0.15), inset 0 1px 0 oklch(1 0 0 / 0.1)",
            }}
          >
            <img src="/logo.png" alt="Apex Research" className="h-6 w-6 object-contain" />
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-sm font-black tracking-[0.12em] uppercase"
                style={{ color: "oklch(0.92 0.01 255)" }}
              >
                Apex
              </span>
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase px-1.5 py-0.5 rounded"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.25 255), oklch(0.60 0.22 280))",
                  color: "oklch(0.99 0 0)",
                }}
              >
                Research
              </span>
            </div>
            <span
              className="text-[9px] font-medium tracking-[0.15em] uppercase"
              style={{ color: "oklch(0.48 0.02 255)" }}
            >
              Institutional Terminal
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-0.5 rounded-full p-1"
          style={{
            background: "oklch(1 0 0 / 0.03)",
            border: "1px solid oklch(1 0 0 / 0.07)",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.label)}
              suppressHydrationWarning={true}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                activeTab === item.id
                  ? ""
                  : "hover:bg-white/5"
              }`}
              style={
                activeTab === item.id
                  ? {
                      background: "linear-gradient(135deg, oklch(0.65 0.25 255 / 0.15), oklch(0.55 0.22 280 / 0.1))",
                      color: "oklch(0.72 0.22 255)",
                      border: "1px solid oklch(0.65 0.25 255 / 0.25)",
                      boxShadow: "0 0 12px oklch(0.65 0.25 255 / 0.1)",
                    }
                  : {
                      color: "oklch(0.52 0.02 255)",
                      border: "1px solid transparent",
                    }
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Area */}
        <div className="flex items-center gap-2.5">
          {/* Live Clock */}
          <div
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[11px]"
            style={{
              background: "oklch(1 0 0 / 0.03)",
              border: "1px solid oklch(1 0 0 / 0.07)",
              color: "oklch(0.52 0.02 255)",
            }}
          >
            <span
              className="relative flex h-1.5 w-1.5 rounded-full"
              style={{ background: "oklch(0.62 0.18 155)" }}
            >
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                style={{ background: "oklch(0.62 0.18 155)" }}
              />
            </span>
            <span style={{ color: "oklch(0.72 0.01 255)" }}>{currentTime}</span>
          </div>

          {/* Terminal Status */}
          <div
            className="hidden md:flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "oklch(1 0 0 / 0.03)",
              border: "1px solid oklch(1 0 0 / 0.07)",
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                style={{ background: "oklch(0.62 0.18 155)" }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "oklch(0.62 0.18 155)" }}
              />
            </span>
            <span className="text-[10px] font-medium" style={{ color: "oklch(0.48 0.02 255)" }}>
              Terminal{" "}
              <span style={{ color: "oklch(0.62 0.18 155)" }} className="font-bold">
                Online
              </span>
              {hasCustomKey && (
                <span
                  className="ml-1.5 text-[9px] font-bold tracking-wider uppercase px-1 py-0.5 rounded"
                  style={{
                    color: "oklch(0.65 0.25 255)",
                    background: "oklch(0.65 0.25 255 / 0.1)",
                  }}
                >
                  Custom Key
                </span>
              )}
            </span>
          </div>

          {/* Notifications */}
          <IconButton label="Notifications" onClick={() => toast.success("No new system alerts.")}>
            <Bell className="h-4 w-4" />
          </IconButton>

          {/* Settings */}
          <IconButton onClick={() => setSettingsOpen(true)} label="Settings">
            <Settings className="h-4 w-4" />
          </IconButton>

          {/* User Profile */}
          <div
            className="flex items-center gap-2 rounded-full p-1 pl-3 cursor-pointer transition-all hover:scale-[1.02]"
            style={{
              background: "oklch(1 0 0 / 0.04)",
              border: "1px solid oklch(1 0 0 / 0.08)",
            }}
          >
            <span
              className="hidden sm:block text-xs font-semibold tracking-tight"
              style={{ color: "oklch(0.72 0.01 255)" }}
            >
              Analyst
            </span>
            <div
              className="grid h-7 w-7 place-items-center rounded-full text-white text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, oklch(0.65 0.25 255), oklch(0.60 0.22 280))",
                boxShadow: "0 0 12px oklch(0.65 0.25 255 / 0.4)",
              }}
            >
              <User className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Coming Soon Modal */}
      <Dialog open={isComingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent
          className="max-w-[400px] p-6 rounded-2xl"
          style={{
            background: "oklch(0.11 0.01 260)",
            border: "1px solid oklch(1 0 0 / 0.1)",
            boxShadow: "0 24px 80px oklch(0 0 0 / 0.8), 0 0 0 1px oklch(0.65 0.25 255 / 0.1)",
          }}
        >
          <DialogHeader className="flex flex-col items-center justify-center text-center pb-2">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl mb-4"
              style={{
                background: "linear-gradient(135deg, oklch(0.65 0.25 255 / 0.15), oklch(0.55 0.22 280 / 0.1))",
                border: "1px solid oklch(0.65 0.25 255 / 0.25)",
                boxShadow: "0 0 30px oklch(0.65 0.25 255 / 0.15)",
              }}
            >
              <Cpu className="h-6 w-6" style={{ color: "oklch(0.65 0.25 255)" }} />
            </div>
            <DialogTitle
              className="text-lg font-bold tracking-tight"
              style={{ color: "oklch(0.92 0.01 255)" }}
            >
              Module Synchronizing
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 text-center">
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.52 0.02 255)" }}>
              The{" "}
              <span className="font-semibold" style={{ color: "oklch(0.72 0.01 255)" }}>
                {comingSoonFeature}
              </span>{" "}
              panel is currently offline for system upgrades. It will be available in the next terminal release.
            </p>
          </div>
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setComingSoonOpen(false)}
              className="w-full font-semibold cursor-pointer text-white"
              style={{
                background: "linear-gradient(135deg, oklch(0.65 0.25 255), oklch(0.60 0.22 280))",
                boxShadow: "0 4px 20px oklch(0.65 0.25 255 / 0.35)",
                border: "none",
              }}
            >
              Acknowledge
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.header>
  );
}

function IconButton({ children, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      suppressHydrationWarning={true}
      className="grid h-9 w-9 place-items-center rounded-xl transition-all cursor-pointer hover:scale-105"
      style={{
        background: "oklch(1 0 0 / 0.04)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        color: "oklch(0.52 0.02 255)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "oklch(0.65 0.25 255 / 0.35)";
        e.currentTarget.style.color = "oklch(0.72 0.22 255)";
        e.currentTarget.style.boxShadow = "0 0 12px oklch(0.65 0.25 255 / 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "oklch(1 0 0 / 0.08)";
        e.currentTarget.style.color = "oklch(0.52 0.02 255)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </button>
  );
}
