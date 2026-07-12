import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Search } from "lucide-react";

export function ErrorState({ error, company, onRetry, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-xl px-4 py-16 sm:px-6"
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(239,68,68,0.25)", background: "#050508" }}
      >
        {/* Terminal Header */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#0D0E14", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#EF4444" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          <span
            className="ml-3"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#EF4444", letterSpacing: "0.1em" }}
          >
            apex-research · ERROR · ANALYSIS FAILED
          </span>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-1.5 mb-6">
            <p className="terminal-line" style={{ color: "#EF4444" }}>
              $ apex analyze {company ? `"${company}"` : ""}
            </p>
            <p className="terminal-line" style={{ color: "#3D4060" }}>
              Initializing analysis engine...
            </p>
            <p className="terminal-line" style={{ color: "#EF4444" }}>
              ✗ FATAL: {error.message}
            </p>
            {(error.status || error.code) && (
              <p className="terminal-line" style={{ color: "#3D4060" }}>
                {error.status && `HTTP_STATUS=${error.status}`}
                {error.code && ` · CODE=${error.code}`}
              </p>
            )}
            <p className="terminal-line" style={{ color: "#3D4060" }}>
              Process exited with code 1
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {error.retryable && (
              <button
                onClick={onRetry}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold cursor-pointer transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                  color: "#050508",
                  boxShadow: "0 4px 16px rgba(16,185,129,0.3)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.06em",
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" /> RETRY
              </button>
            )}
            <button
              onClick={onReset}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#5A5B72",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#9394A8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#5A5B72"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <Search className="h-3.5 w-3.5" /> NEW SEARCH
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
