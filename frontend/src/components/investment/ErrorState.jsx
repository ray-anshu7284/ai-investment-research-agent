import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Search } from "lucide-react";

export function ErrorState({ error, company, onRetry, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-2xl px-4 py-16 sm:px-6"
    >
      <div
        className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
        style={{
          background: "oklch(0.115 0.012 260)",
          border: "1px solid oklch(0.58 0.22 25 / 0.25)",
          boxShadow: "0 24px 80px oklch(0 0 0 / 0.6), 0 0 60px oklch(0.58 0.22 25 / 0.08)",
        }}
      >
        {/* Ambient error glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, oklch(0.58 0.22 25 / 0.5), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative flex flex-col items-center text-center">
          {/* Error icon */}
          <div
            className="grid h-16 w-16 place-items-center rounded-2xl mb-6"
            style={{
              background: "oklch(0.58 0.22 25 / 0.1)",
              border: "1px solid oklch(0.58 0.22 25 / 0.3)",
              boxShadow: "0 0 24px oklch(0.58 0.22 25 / 0.15)",
            }}
          >
            <AlertTriangle className="h-7 w-7" style={{ color: "oklch(0.65 0.22 25)" }} />
          </div>

          <h3 className="text-xl font-bold sm:text-2xl mb-2" style={{ color: "oklch(0.92 0.01 255)" }}>
            Analysis Couldn't Complete
          </h3>
          <p className="max-w-md text-sm leading-relaxed mb-4" style={{ color: "oklch(0.52 0.02 255)" }}>
            {error.message}
          </p>

          {/* Error code badge */}
          {(error.status || error.code) && (
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] mb-6"
              style={{
                background: "oklch(0.58 0.22 25 / 0.08)",
                border: "1px solid oklch(0.58 0.22 25 / 0.2)",
                color: "oklch(0.65 0.22 25)",
              }}
            >
              {error.status && <span>HTTP {error.status}</span>}
              {error.status && error.code && <span style={{ color: "oklch(1 0 0 / 0.2)" }}>·</span>}
              {error.code && <span>{error.code}</span>}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {error.retryable && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.25 255), oklch(0.60 0.22 280))",
                  boxShadow: "0 4px 20px oklch(0.65 0.25 255 / 0.35)",
                }}
              >
                <RotateCcw className="h-4 w-4" />
                Retry Analysis
              </button>
            )}
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                background: "oklch(1 0 0 / 0.04)",
                border: "1px solid oklch(1 0 0 / 0.09)",
                color: "oklch(0.55 0.02 255)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.65 0.25 255 / 0.3)";
                e.currentTarget.style.color = "oklch(0.72 0.01 255)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(1 0 0 / 0.09)";
                e.currentTarget.style.color = "oklch(0.55 0.02 255)";
              }}
            >
              <Search className="h-4 w-4" />
              Try Different Company
            </button>
          </div>

          {company && (
            <p className="mt-6 text-xs" style={{ color: "oklch(0.35 0.01 255)" }}>
              Failed while analyzing{" "}
              <span className="font-semibold" style={{ color: "oklch(0.52 0.02 255)" }}>
                {company}
              </span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
