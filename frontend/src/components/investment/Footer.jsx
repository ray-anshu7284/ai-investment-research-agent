import { ArrowRight, Check, Github, Linkedin, Mail, Twitter, BarChart2, Shield, Globe, Zap, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/services/api";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Enter your email to subscribe" })
  .max(255, { message: "Email is too long" })
  .email({ message: "Enter a valid email address" });

function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? "Invalid email";
      setError(msg);
      toast.error(msg);
      return;
    }
    setError(null);
    setStatus("loading");
    try {
      await subscribeToNewsletter(result.data);
      setSubscriberEmail(result.data);
      setStatus("success");
      setSuccessOpen(true);
      setEmail("");
      setTimeout(() => setStatus("idle"), 3200);
    } catch (err) {
      setStatus("idle");
      const errMsg = err.message || "Subscription failed. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div
      className="relative mb-16 overflow-hidden rounded-2xl p-8 sm:p-10"
      style={{
        background: "linear-gradient(135deg, oklch(0.65 0.25 255 / 0.08) 0%, oklch(0.55 0.22 280 / 0.05) 100%)",
        border: "1px solid oklch(0.65 0.25 255 / 0.2)",
        boxShadow: "0 0 60px oklch(0.65 0.25 255 / 0.08)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.25 255 / 0.4), transparent 70%)", filter: "blur(40px)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.22 280 / 0.4), transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{
              background: "oklch(0.65 0.25 255 / 0.1)",
              border: "1px solid oklch(0.65 0.25 255 / 0.25)",
              color: "oklch(0.72 0.22 255)",
            }}
          >
            <Mail className="h-3 w-3" />
            Weekly Research Digest
          </div>
          <h3
            className="text-xl font-bold tracking-tight sm:text-2xl mb-2"
            style={{ color: "oklch(0.92 0.01 255)" }}
          >
            Institutional intelligence, delivered every Monday
          </h3>
          <p className="max-w-lg text-sm leading-relaxed" style={{ color: "oklch(0.52 0.02 255)" }}>
            Curated company deep-dives, risk signals, and analyst-grade thesis breakdowns.
            No spam — unsubscribe anytime.
          </p>
        </div>

        <form onSubmit={submit} noValidate className="w-full lg:w-auto">
          <div className="flex w-full flex-col gap-2.5 lg:w-[420px]">
            <div
              className={`relative flex items-center gap-2 rounded-xl p-1.5 transition-all ${error ? "" : ""}`}
              style={{
                background: "oklch(0.08 0.01 260 / 0.8)",
                border: error
                  ? "1px solid oklch(0.58 0.22 25 / 0.6)"
                  : "1px solid oklch(1 0 0 / 0.1)",
                boxShadow: "0 4px 20px oklch(0 0 0 / 0.3)",
              }}
            >
              <Mail className="ml-2 h-4 w-4 shrink-0" style={{ color: "oklch(0.52 0.02 255)" }} />
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                maxLength={255}
                disabled={status === "loading" || status === "success"}
                placeholder="you@company.com"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "newsletter-error" : undefined}
                suppressHydrationWarning={true}
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none disabled:opacity-60 placeholder:opacity-40"
                style={{ color: "oklch(0.88 0.01 255)" }}
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                suppressHydrationWarning={true}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                style={{
                  background:
                    status === "success"
                      ? "linear-gradient(135deg, oklch(0.62 0.18 155), oklch(0.55 0.15 170))"
                      : "linear-gradient(135deg, oklch(0.65 0.25 255), oklch(0.60 0.22 280))",
                  boxShadow:
                    status === "success"
                      ? "0 4px 16px oklch(0.62 0.18 155 / 0.35)"
                      : "0 4px 16px oklch(0.65 0.25 255 / 0.35)",
                }}
              >
                {status === "loading" ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    <span className="hidden sm:inline">Subscribing...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Subscribe</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
            {error ? (
              <p id="newsletter-error" className="pl-1 text-xs" style={{ color: "oklch(0.65 0.22 25)" }}>
                {error}
              </p>
            ) : (
              <p className="pl-1 text-[11px]" style={{ color: "oklch(0.38 0.01 255)" }}>
                By subscribing you agree to our Privacy Policy. Join 12,000+ institutional investors.
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setSuccessOpen}>
        <DialogContent
          className="max-w-[420px] p-6 rounded-2xl"
          style={{
            background: "oklch(0.09 0.01 260)",
            border: "1px solid oklch(0.62 0.18 155 / 0.3)",
            boxShadow: "0 24px 80px oklch(0 0 0 / 0.8), 0 0 60px oklch(0.62 0.18 155 / 0.1)",
          }}
        >
          <DialogHeader className="flex flex-col items-center justify-center text-center pb-2">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl mb-4"
              style={{
                background: "oklch(0.62 0.18 155 / 0.1)",
                border: "1px solid oklch(0.62 0.18 155 / 0.3)",
                boxShadow: "0 0 30px oklch(0.62 0.18 155 / 0.2)",
              }}
            >
              <Check className="h-7 w-7" style={{ color: "oklch(0.62 0.18 155)" }} />
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight" style={{ color: "oklch(0.92 0.01 255)" }}>
              Welcome to the Team!
            </DialogTitle>
            <span
              className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full mt-1.5"
              style={{
                color: "oklch(0.62 0.18 155)",
                background: "oklch(0.62 0.18 155 / 0.1)",
              }}
            >
              Subscription Confirmed
            </span>
          </DialogHeader>
          <div className="py-3 text-center space-y-3">
            <p className="text-sm leading-relaxed" style={{ color: "oklch(0.72 0.01 255)" }}>
              We're so excited to have you on board! A confirmation email was sent to{" "}
              <span className="font-semibold" style={{ color: "oklch(0.92 0.01 255)" }}>
                {subscriberEmail}
              </span>.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "oklch(0.48 0.02 255)" }}>
              Get ready to receive premium, analyst-grade investment insights every Monday morning.
            </p>
          </div>
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => setSuccessOpen(false)}
              className="w-full font-semibold cursor-pointer text-white border-none rounded-xl"
              style={{
                background: "linear-gradient(135deg, oklch(0.62 0.18 155), oklch(0.55 0.15 170))",
                boxShadow: "0 4px 20px oklch(0.62 0.18 155 / 0.4)",
              }}
            >
              Let's Explore
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const LINKS = [
  {
    heading: "Product",
    items: [
      { label: "Research Terminal", href: "#" },
      { label: "Financial Metrics", href: "#" },
      { label: "Risk Analysis", href: "#" },
      { label: "API Access", href: "#" },
    ],
  },
  {
    heading: "Data Sources",
    items: [
      { label: "SEC Filings", href: "#" },
      { label: "Yahoo Finance", href: "#" },
      { label: "Alpha Vantage", href: "#" },
      { label: "News Feed", href: "#" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Disclaimer", href: "#" },
      { label: "Compliance", href: "#" },
    ],
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: "SOC2 Compliant" },
  { icon: Globe, label: "180+ Markets" },
  { icon: Zap, label: "Real-time Data" },
  { icon: BarChart2, label: "Institutional Grade" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        background: "oklch(0.06 0.01 260)",
        borderColor: "oklch(1 0 0 / 0.06)",
      }}
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.025) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Top ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 opacity-20"
        style={{
          background: "radial-gradient(ellipse at center top, oklch(0.65 0.25 255 / 0.5), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <NewsletterCta />

        {/* Separator */}
        <div className="separator-glow mb-14" />

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.25 255 / 0.15), oklch(0.55 0.22 280 / 0.08))",
                  border: "1px solid oklch(0.65 0.25 255 / 0.3)",
                  boxShadow: "0 0 20px oklch(0.65 0.25 255 / 0.15)",
                }}
              >
                <img src="/logo.png" alt="Apex Research" className="h-6 w-6 object-contain" />
              </div>
              <div>
                <div
                  className="text-sm font-black tracking-[0.12em] uppercase"
                  style={{ color: "oklch(0.92 0.01 255)" }}
                >
                  Apex Research
                </div>
                <div
                  className="text-[10px] font-medium uppercase tracking-wider"
                  style={{ color: "oklch(0.42 0.01 255)" }}
                >
                  Investment Terminal
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "oklch(0.45 0.02 255)" }}>
              Institutional-grade AI investment research platform. Analyze any company with quantitative
              financial reasoning and real-time intelligence.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium"
                  style={{
                    background: "oklch(1 0 0 / 0.03)",
                    border: "1px solid oklch(1 0 0 / 0.07)",
                    color: "oklch(0.48 0.02 255)",
                  }}
                >
                  <Icon className="h-3 w-3" style={{ color: "oklch(0.65 0.25 255)" }} />
                  {label}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "oklch(1 0 0 / 0.04)",
                    border: "1px solid oklch(1 0 0 / 0.08)",
                    color: "oklch(0.48 0.02 255)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "oklch(0.65 0.25 255 / 0.35)";
                    e.currentTarget.style.color = "oklch(0.65 0.25 255)";
                    e.currentTarget.style.boxShadow = "0 0 12px oklch(0.65 0.25 255 / 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "oklch(1 0 0 / 0.08)";
                    e.currentTarget.style.color = "oklch(0.48 0.02 255)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {LINKS.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-[10px] font-bold uppercase tracking-[0.15em] mb-4"
                style={{ color: "oklch(0.65 0.25 255)" }}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center gap-1 text-sm transition-all group"
                      style={{ color: "oklch(0.45 0.02 255)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "oklch(0.72 0.01 255)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "oklch(0.45 0.02 255)";
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="separator-glow my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs" style={{ color: "oklch(0.38 0.01 255)" }}>
              © {new Date().getFullYear()} Apex Research. All rights reserved.
            </p>
            <p className="text-[10px] mt-1 max-w-lg leading-relaxed" style={{ color: "oklch(0.30 0.01 255)" }}>
              Apex Research provides AI-generated content for informational purposes only. This is not financial
              advice. Always conduct your own research before making investment decisions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {["Privacy Policy", "Terms", "Disclaimer"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] transition-colors"
                style={{ color: "oklch(0.38 0.01 255)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "oklch(0.65 0.25 255)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "oklch(0.38 0.01 255)";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
