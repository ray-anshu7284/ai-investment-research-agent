import { motion } from "framer-motion";
import { ArrowRight, Search, TrendingUp, Zap, Shield, BarChart2, Globe } from "lucide-react";
import { useState } from "react";

const POPULAR = [
  "Apple", "Microsoft", "Google", "NVIDIA", "Amazon",
  "Tesla", "Meta", "Netflix", "OpenAI", "Reliance", "TCS", "Infosys",
];

const COMPANY_LOGOS = {
  "Apple": (
    <svg className="h-3.5 w-3.5 fill-current shrink-0" viewBox="0 0 24 24" style={{ color: "#A3AAAE" }}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
    </svg>
  ),
  "Microsoft": (
    <svg className="h-3 w-3 shrink-0" viewBox="0 0 23 23">
      <path fill="#F25022" d="M0 0h11v11H0z" />
      <path fill="#7FBA00" d="M12 0h11v11H12z" />
      <path fill="#01A6F0" d="M0 12h11v11H0z" />
      <path fill="#FFB900" d="M12 12h11v11H12z" />
    </svg>
  ),
  "Google": (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.1-.28-.19-.57-.25-.87z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  ),
  "NVIDIA": (
    <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#76B900" }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5c1.47 0 2.77.72 3.59 1.83l-1.42 1.42C14.52 10.28 13.83 10 13 10c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.83 0 1.52-.28 2.05-.75l1.42 1.42c-1 .92-2.18 1.33-3.47 1.33z" />
    </svg>
  ),
  "Amazon": (
    <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#FF9900" }}>
      <path d="M18.7 18c-1.5 1.2-3.8 1.9-6.2 1.9-3.2 0-6.1-1.3-8.1-3.4-.3-.3-.1-.6.3-.5 2.4.9 5.2 1.4 8 1.4 2.2 0 4.5-.3 6.6-1 .5-.2.7.2.4.6zm.9-2.3c-.1-.3-.4-.2-.6-.1-.9.4-2 .7-3.1.9-.3.1-.4.3-.2.5.8.7 1.9 1 3 .6.3-.1.4-.4.3-.6.1-.2-.1-.9-.4-1.3z" />
    </svg>
  ),
  "Tesla": (
    <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#E82127" }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  ),
  "Meta": (
    <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#0064E0" }}>
      <path d="M16.5 6C14.36 6 12.63 7.23 12 9c-.63-1.77-2.36-3-4.5-3C4.46 6 2 8.46 2 11.5S4.46 17 7.5 17c2.14 0 3.87-1.23 4.5-3 .63 1.77 2.36 3 4.5 3 3.04 0 5.5-2.46 5.5-5.5S19.54 6 16.5 6z" />
    </svg>
  ),
  "Netflix": (
    <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#E50914" }}>
      <path d="M5.5 2h3l3.5 10V2h3v20h-3l-3.5-10v10h-3V2z" />
    </svg>
  ),
  "OpenAI": (
    <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#10A37F" }}>
      <path d="M21.5 10.7a4.2 4.2 0 0 0-2.1-3.6 4.3 4.3 0 0 0-.2-4.9 4.3 4.3 0 0 0-4.4-1.5 4.3 4.3 0 0 0-3.8-2.2 4.3 4.3 0 0 0-3.8 2.2 4.3 4.3 0 0 0-4.4 1.5 4.3 4.3 0 0 0-.2 4.9 4.2 4.2 0 0 0-2.1 3.6 4.2 4.2 0 0 0 2.1 3.6c.1.5.3 1 .6 1.3a4.3 4.3 0 0 0 4 3.6 4.3 4.3 0 0 0 3.8 2.2 4.3 4.3 0 0 0 3.8-2.2 4.3 4.3 0 0 0 4.4-1.5 4.3 4.3 0 0 0 .2-4.9 4.3 4.3 0 0 0-2.1-3.6z" />
    </svg>
  ),
  "Reliance": (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20V4h6a4 4 0 0 1 0 8H6" />
      <path d="M12 12l6 8" />
    </svg>
  ),
  "TCS": (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#007CC3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M12 6v14" />
    </svg>
  ),
  "Infosys": (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#007CC3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 16v-4M12 8h.01" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};

const STATS = [
  { value: "10K+", label: "Companies Analyzed", icon: BarChart2 },
  { value: "98%", label: "AI Accuracy", icon: Zap },
  { value: "180+", label: "Global Markets", icon: Globe },
  { value: "SOC2", label: "Compliance", icon: Shield },
];

export function Hero({ onAnalyze, loading }) {
  const [value, setValue] = useState("");
  const submit = (v) => {
    const q = (v ?? value).trim();
    if (!q || loading) return;
    setValue(q);
    onAnalyze(q);
  };
  const handleKey = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <section className="relative overflow-hidden grid-bg">
      {/* Ambient background layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.65 0.25 255 / 0.12), transparent),
            radial-gradient(ellipse 50% 40% at 80% 80%, oklch(0.55 0.20 300 / 0.07), transparent),
            radial-gradient(ellipse 40% 30% at 10% 60%, oklch(0.50 0.18 220 / 0.05), transparent)
          `,
        }}
      />

      {/* Animated orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.25 255 / 0.5), transparent 70%)",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 flex w-fit items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium"
          style={{
            background: "oklch(0.65 0.25 255 / 0.08)",
            border: "1px solid oklch(0.65 0.25 255 / 0.2)",
            color: "oklch(0.72 0.22 255)",
            boxShadow: "0 0 20px oklch(0.65 0.25 255 / 0.1)",
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: "oklch(0.62 0.18 155)" }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: "oklch(0.62 0.18 155)" }}
            />
          </span>
          <TrendingUp className="h-3.5 w-3.5" />
          AI-Powered Institutional Research &bull; Powered by Groq
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-center mb-6"
        >
          <h1
            className="text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl xl:text-8xl"
            style={{ color: "oklch(0.93 0.01 255)" }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, oklch(0.72 0.25 255) 0%, oklch(0.78 0.20 290) 50%, oklch(0.68 0.22 230) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Apex Research
            </span>
            <br />
            <span style={{ color: "oklch(0.88 0.01 255)" }}>
              Investment Terminal
            </span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-center text-base sm:text-lg"
          style={{ color: "oklch(0.52 0.02 255)" }}
        >
          Analyze any company using quantitative financial reasoning, real-time news intelligence,
          and institutional-grade AI investment insights.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mx-auto mt-10 flex flex-wrap justify-center gap-6 max-w-3xl"
        >
          {STATS.map(({ value: val, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2.5 px-4 py-2 rounded-xl"
              style={{
                background: "oklch(1 0 0 / 0.03)",
                border: "1px solid oklch(1 0 0 / 0.07)",
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background: "oklch(0.65 0.25 255 / 0.1)",
                  border: "1px solid oklch(0.65 0.25 255 / 0.2)",
                }}
              >
                <Icon className="h-4 w-4" style={{ color: "oklch(0.65 0.25 255)" }} />
              </div>
              <div>
                <div className="text-sm font-black" style={{
                  background: "linear-gradient(135deg, oklch(0.72 0.25 255), oklch(0.75 0.22 300))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}>
                  {val}
                </div>
                <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "oklch(0.42 0.01 255)" }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div
            className="flex gap-2.5 rounded-2xl p-2.5 glass-searchbar"
          >
            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 shrink-0" style={{ color: "oklch(0.52 0.02 255)" }} />
              <input
                type="text"
                placeholder="Search any company... e.g. Apple, Tesla, NVIDIA"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
                className="w-full bg-transparent py-2 text-base outline-none disabled:opacity-50 placeholder-muted-foreground"
                style={{ color: "oklch(0.92 0.01 255)" }}
              />
            </div>
            <button
              onClick={() => submit()}
              disabled={loading || !value.trim()}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, oklch(0.65 0.25 255), oklch(0.60 0.22 280))",
                color: "oklch(0.99 0 0)",
                boxShadow: "0 4px 20px oklch(0.65 0.25 255 / 0.4)",
              }}
            >
              {loading ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"
                    style={{ borderColor: "oklch(0.99 0 0 / 0.4)", borderTopColor: "transparent" }}
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
          {/* Input hint */}
          <p className="mt-3 text-center text-xs" style={{ color: "oklch(0.38 0.01 255)" }}>
            Press <kbd
              className="px-1.5 py-0.5 rounded text-[10px] font-mono mx-0.5"
              style={{
                background: "oklch(1 0 0 / 0.06)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                color: "oklch(0.52 0.02 255)",
              }}
            >Enter</kbd> to search • Supports stocks, ETFs &amp; private companies globally
          </p>
        </motion.div>

        {/* Popular Companies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div
            className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ color: "oklch(0.38 0.01 255)" }}
          >
            Popular Companies
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {POPULAR.map((c, i) => (
              <motion.button
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.03 }}
                onClick={() => {
                  setValue(c);
                  submit(c);
                }}
                className="glass-chip rounded-full px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
                style={{ color: "oklch(0.58 0.02 255)" }}
              >
                {COMPANY_LOGOS[c]}
                <span>{c}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "linear-gradient(to bottom, transparent, oklch(0.08 0.01 260))",
        }}
      />
    </section>
  );
}
