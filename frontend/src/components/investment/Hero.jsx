import { motion } from "framer-motion";
import { ArrowRight, Search, TrendingUp, BarChart2, Globe, Zap, Shield } from "lucide-react";
import { useState } from "react";

const COMPANY_LOGOS = {
  "Apple": <svg className="h-3.5 w-3.5 fill-current shrink-0" viewBox="0 0 24 24" style={{ color: "#A3AAAE" }}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" /></svg>,
  "Microsoft": <svg className="h-3 w-3 shrink-0" viewBox="0 0 23 23"><path fill="#F25022" d="M0 0h11v11H0z" /><path fill="#7FBA00" d="M12 0h11v11H12z" /><path fill="#01A6F0" d="M0 12h11v11H0z" /><path fill="#FFB900" d="M12 12h11v11H12z" /></svg>,
  "Google": <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.1-.28-.19-.57-.25-.87z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>,
  "NVIDIA": <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#76B900" }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5c1.47 0 2.77.72 3.59 1.83l-1.42 1.42C14.52 10.28 13.83 10 13 10c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.83 0 1.52-.28 2.05-.75l1.42 1.42c-1 .92-2.18 1.33-3.47 1.33z" /></svg>,
  "Amazon": <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#FF9900" }}><path d="M18.7 18c-1.5 1.2-3.8 1.9-6.2 1.9-3.2 0-6.1-1.3-8.1-3.4-.3-.3-.1-.6.3-.5 2.4.9 5.2 1.4 8 1.4 2.2 0 4.5-.3 6.6-1 .5-.2.7.2.4.6z" /></svg>,
  "Tesla": <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#E82127" }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>,
  "Meta": <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#0064E0" }}><path d="M16.5 6C14.36 6 12.63 7.23 12 9c-.63-1.77-2.36-3-4.5-3C4.46 6 2 8.46 2 11.5S4.46 17 7.5 17c2.14 0 3.87-1.23 4.5-3 .63 1.77 2.36 3 4.5 3 3.04 0 5.5-2.46 5.5-5.5S19.54 6 16.5 6z" /></svg>,
  "Netflix": <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#E50914" }}><path d="M5.5 2h3l3.5 10V2h3v20h-3l-3.5-10v10h-3V2z" /></svg>,
  "Reliance": <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20V4h6a4 4 0 0 1 0 8H6" /><path d="M12 12l6 8" /></svg>,
  "TCS": <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#007CC3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M12 6v14" /></svg>,
  "Infosys": <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#007CC3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16v-4M12 8h.01" /><circle cx="12" cy="12" r="10" /></svg>,
  "OpenAI": <svg className="h-3.5 w-3.5 shrink-0 fill-current" viewBox="0 0 24 24" style={{ color: "#10A37F" }}><path d="M21.5 10.7a4.2 4.2 0 0 0-2.1-3.6 4.3 4.3 0 0 0-.2-4.9 4.3 4.3 0 0 0-4.4-1.5 4.3 4.3 0 0 0-3.8-2.2 4.3 4.3 0 0 0-3.8 2.2 4.3 4.3 0 0 0-4.4 1.5 4.3 4.3 0 0 0-.2 4.9 4.2 4.2 0 0 0-2.1 3.6 4.2 4.2 0 0 0 2.1 3.6c.1.5.3 1 .6 1.3a4.3 4.3 0 0 0 4 3.6 4.3 4.3 0 0 0 3.8 2.2 4.3 4.3 0 0 0 3.8-2.2 4.3 4.3 0 0 0 4.4-1.5 4.3 4.3 0 0 0 .2-4.9 4.3 4.3 0 0 0-2.1-3.6z" /></svg>,
};

const POPULAR = ["Apple", "Microsoft", "Google", "NVIDIA", "Amazon", "Tesla", "Meta", "Netflix", "OpenAI", "Reliance", "TCS", "Infosys"];

const DATA_POINTS = [
  { icon: BarChart2, value: "10K+", label: "Companies" },
  { icon: Globe, value: "180+", label: "Markets" },
  { icon: Zap, value: "<3s", label: "Analysis" },
  { icon: Shield, value: "SOC2", label: "Compliance" },
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
    <section className="relative overflow-hidden apex-grid">
      {/* Background ambient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.1), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.5), transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full px-4 py-1.5"
          style={{
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <span className="status-dot" style={{ width: 5, height: 5 }} />
          <span
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#10B981" }}
          >
            AI RESEARCH ENGINE ONLINE · GROQ POWERED
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-center font-black tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.0, color: "#E8E8F0" }}
        >
          RESEARCH.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #34D399 50%, #059669 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            ANALYZE.
          </span>
          <br />
          DECIDE.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-5 max-w-xl text-center text-base"
          style={{ color: "#5A5B72", lineHeight: 1.7 }}
        >
          Institutional-grade AI investment research. Quantitative analysis, real-time
          news intelligence &amp; structured investment thesis for any company on earth.
        </motion.p>

        {/* Data Points Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 flex flex-wrap justify-center gap-3 max-w-2xl"
        >
          {DATA_POINTS.map(({ icon: Icon, value: val, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#10B981" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#10B981", fontWeight: 700 }}>
                {val}
              </span>
              <span style={{ fontSize: "0.68rem", color: "#3D4060", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="apex-search flex items-center gap-3 p-2 pl-4">
            <Search className="h-4 w-4 shrink-0" style={{ color: "#3D4060" }} />
            <input
              type="text"
              placeholder="Search any company, ticker, or market..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              className="flex-1 bg-transparent text-sm outline-none disabled:opacity-50"
              style={{ fontFamily: "var(--font-mono)", color: "#E8E8F0", caretColor: "#10B981" }}
            />
            <button
              onClick={() => submit()}
              disabled={loading || !value.trim()}
              className="flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold cursor-pointer disabled:opacity-40 disabled:pointer-events-none transition-all hover:opacity-90 active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #10B981, #059669)",
                color: "#050508",
                boxShadow: "0 4px 20px rgba(16,185,129,0.35)",
              }}
            >
              {loading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-green-900 border-t-green-200" />
                  Analyzing
                </>
              ) : (
                <>Analyze <ArrowRight className="h-3.5 w-3.5" /></>
              )}
            </button>
          </div>
          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-center" style={{ fontSize: "0.68rem", color: "#2A2B3A" }}>
            <kbd style={{
              fontFamily: "var(--font-mono)", fontSize: "0.6rem", padding: "0.1rem 0.4rem",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "0.25rem", color: "#3D4060",
            }}>Enter</kbd>
            <span>to analyze · Stocks, ETFs, private companies globally</span>
          </div>
        </motion.div>

        {/* Company Tags Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-10 max-w-4xl overflow-hidden"
        >
          <div
            className="mb-3 text-center"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#2A2B3A", textTransform: "uppercase" }}
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
                onClick={() => { setValue(c); submit(c); }}
                className="company-tag"
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
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-12"
        style={{ background: "linear-gradient(to bottom, transparent, #050508)" }}
      />
    </section>
  );
}
