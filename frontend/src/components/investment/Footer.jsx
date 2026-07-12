import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Github, Twitter, Linkedin, CheckCircle2, ArrowRight, Shield, Database, Globe, Zap } from "lucide-react";
import { toast } from "sonner";

const LINKS = {
  "Product": ["Terminal", "Analysis Engine", "API Access", "Pricing"],
  "Company": ["About", "Blog", "Careers", "Press"],
  "Legal": ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const TRUST = [
  { icon: <Shield className="h-3.5 w-3.5" />, label: "SOC2 Compliant" },
  { icon: <Zap className="h-3.5 w-3.5" />, label: "Groq Powered" },
  { icon: <Database className="h-3.5 w-3.5" />, label: "10K+ Companies" },
  { icon: <Globe className="h-3.5 w-3.5" />, label: "180+ Markets" },
];

const SOCIALS = [
  { icon: <Github className="h-4 w-4" />, label: "GitHub", href: "https://github.com/ray-anshu7284/ai-investment-research-agent" },
  { icon: <Twitter className="h-4 w-4" />, label: "Twitter", href: "#" },
  { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@") || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setSubscribed(true);
      toast.success("Subscribed!", { description: "You'll receive research updates." });
    } catch {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="apex-footer">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
                <img src="/logo.png" alt="Apex" className="h-5 w-5 object-contain" />
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", color: "#E8E8F0" }}>
                  APEX <span style={{ color: "#10B981" }}>RESEARCH</span>
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#3D4060" }}>
              Institutional-grade AI investment research for every market on earth. Quantitative analysis meets real-time intelligence.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {TRUST.map(({ icon, label }) => (
                <div key={label} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ color: "#10B981" }}>{icon}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#3D4060", letterSpacing: "0.08em" }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-lg transition-all"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#3D4060" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#10B981"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#3D4060"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#3D4060", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
                {category}
              </div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-colors"
                      style={{ color: "#3D4060" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#10B981"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#3D4060"; }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="apex-sep my-10" />

        {/* Newsletter + copyright */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Newsletter */}
          <div className="flex-grow max-w-sm">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#3D4060", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
              Research Updates
            </div>
            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle2 className="h-4 w-4" style={{ color: "#10B981" }} />
                  <span className="text-sm font-semibold" style={{ color: "#10B981" }}>Subscribed successfully!</span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  className="flex gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#E8E8F0",
                      fontFamily: "var(--font-mono)",
                      caretColor: "#10B981",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold cursor-pointer transition-all disabled:opacity-50"
                    style={{ background: "linear-gradient(135deg, #10B981, #059669)", color: "#050508" }}
                  >
                    {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-green-900 border-t-green-200" /> : <Send className="h-3.5 w-3.5" />}
                    Join
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#2A2B3A", letterSpacing: "0.08em" }}>
              © {new Date().getFullYear()} APEX RESEARCH
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#1A1B26", marginTop: "0.2rem" }}>
              NOT FINANCIAL ADVICE · FOR EDUCATIONAL USE ONLY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
