import { motion, AnimatePresence } from "framer-motion";
import { Database, Search, Activity, BarChart2, Brain, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const STEPS = [
  { label: "INIT · Fetching financial data", icon: Database },
  { label: "PROC · Parsing news & sentiment", icon: Search },
  { label: "CALC · Evaluating risk vectors", icon: Activity },
  { label: "COMP · Benchmarking competitors", icon: BarChart2 },
  { label: "MODL · Running quantitative models", icon: Brain },
  { label: "DONE · Compiling final verdict", icon: CheckCircle2 },
];

export function LoadingScreen() {
  const [step, setStep] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % STEPS.length;
        return next;
      });
    }, 950);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Add line to terminal output
    setVisibleLines((prev) => {
      const newLine = { ...STEPS[step], id: Date.now(), stepIdx: step };
      return [...prev.slice(-8), newLine]; // keep last 8 lines
    });
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-2xl px-4 py-16 sm:px-6"
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(16,185,129,0.2)", background: "#050508" }}
      >
        {/* Terminal Header Bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#0D0E14", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#EF4444" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#F59E0B" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#10B981" }} />
          <span
            className="ml-3"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#3D4060", letterSpacing: "0.1em" }}
          >
            apex-research · analysis-engine · v2.1.0
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 min-h-[280px]">
          <div className="space-y-0.5">
            {/* Header line */}
            <p className="terminal-line" style={{ color: "#10B981" }}>
              $ apex analyze --deep --institutional --groq llama-3.3-70b
            </p>
            <p className="terminal-line" style={{ color: "#2A2B3A" }}>
              Initializing Apex Research Engine...
            </p>
            <p className="terminal-line" style={{ color: "#2A2B3A", marginBottom: "0.75rem" }}>
              ─────────────────────────────────────
            </p>

            {/* Dynamic lines */}
            <AnimatePresence>
              {visibleLines.map((line, i) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="terminal-line flex items-center gap-2"
                  style={{
                    color: i === visibleLines.length - 1
                      ? "#10B981"
                      : "#3D5A50",
                  }}
                >
                  <span style={{ color: i === visibleLines.length - 1 ? "#10B981" : "#1A3028" }}>
                    {i === visibleLines.length - 1 ? "▶" : "✓"}
                  </span>
                  {line.label}
                  {i === visibleLines.length - 1 && (
                    <span className="terminal-cursor" />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Footer */}
        <div
          className="px-6 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0D0E14" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#3D4060", letterSpacing: "0.1em" }}>
              PROGRESS
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#10B981", letterSpacing: "0.1em" }}>
              {Math.round((step / (STEPS.length - 1)) * 100)}%
            </span>
          </div>
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="h-0.5 flex-1 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: i < step ? "#059669" : "linear-gradient(90deg, #10B981, #34D399)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: i <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
