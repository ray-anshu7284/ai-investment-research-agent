import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Loader2, Activity, Database, Brain, BarChart2, Search, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const STEPS = [
  { label: "Fetching Financial Data", icon: Database },
  { label: "Parsing News & Sentiment", icon: Search },
  { label: "Evaluating Risk Vectors", icon: Activity },
  { label: "Comparing Competitors", icon: BarChart2 },
  { label: "Running Quantitative Models", icon: Brain },
  { label: "Compiling Final Verdict", icon: CheckCircle2 },
];

export function LoadingScreen() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 950);
    return () => clearInterval(t);
  }, []);

  const CurrentIcon = STEPS[step].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
    >
      <div
        className="relative overflow-hidden rounded-3xl p-10 sm:p-14"
        style={{
          background: "oklch(0.115 0.012 260)",
          border: "1px solid oklch(1 0 0 / 0.08)",
          boxShadow: "0 24px 80px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(1 0 0 / 0.04) inset",
        }}
      >
        {/* Ambient top glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.25 255 / 0.6), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative flex flex-col items-center gap-8">
          {/* Animated CPU Ring */}
          <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, oklch(0.65 0.25 255), oklch(0.55 0.22 280), transparent 60%)",
                padding: "2px",
              }}
            >
              <div className="h-full w-full rounded-full" style={{ background: "oklch(0.115 0.012 260)" }} />
            </motion.div>
            {/* Inner counter-spinning ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full"
              style={{
                background: "conic-gradient(from 90deg, oklch(0.75 0.22 300 / 0.5), transparent 50%)",
                padding: "1px",
              }}
            >
              <div className="h-full w-full rounded-full" style={{ background: "oklch(0.115 0.012 260)" }} />
            </motion.div>
            {/* Center icon */}
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: "linear-gradient(135deg, oklch(0.65 0.25 255 / 0.2), oklch(0.55 0.22 280 / 0.1))",
                border: "1px solid oklch(0.65 0.25 255 / 0.3)",
                boxShadow: "0 0 20px oklch(0.65 0.25 255 / 0.2)",
              }}
            >
              <Cpu className="h-7 w-7" style={{ color: "oklch(0.65 0.25 255)" }} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h3 className="text-xl font-bold sm:text-2xl mb-1.5" style={{ color: "oklch(0.92 0.01 255)" }}>
              Compiling Market Intelligence
            </h3>
            <p className="text-sm" style={{ color: "oklch(0.45 0.02 255)" }}>
              Executing multi-factor AI modeling across global financial databases
            </p>
          </div>

          {/* Current Step */}
          <div className="h-10 w-full max-w-md overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-2.5 text-sm font-medium"
                style={{ color: "oklch(0.65 0.25 255)" }}
              >
                <CurrentIcon className="h-4 w-4 shrink-0" />
                {STEPS[step].label}
                <span className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.22 }}
                      className="inline-block h-1 w-1 rounded-full"
                      style={{ background: "oklch(0.65 0.25 255)" }}
                    />
                  ))}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bars */}
          <div className="flex w-full max-w-md gap-1.5">
            {STEPS.map((s, i) => (
              <div key={i} className="h-1 flex-1 overflow-hidden rounded-full" style={{ background: "oklch(1 0 0 / 0.06)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: i < step
                      ? "oklch(0.62 0.18 155)"
                      : "linear-gradient(90deg, oklch(0.65 0.25 255), oklch(0.72 0.22 300))",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: i <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="grid w-full max-w-md grid-cols-3 gap-y-2 text-center">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div
                  className="text-[10px] font-medium uppercase tracking-wide transition-colors"
                  style={{
                    color: i <= step
                      ? "oklch(0.65 0.25 255)"
                      : "oklch(0.30 0.01 255)",
                  }}
                >
                  {i < step ? "✓ " : `${i + 1}. `}
                  {s.label.split(" ")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
