import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SettingsModal({ isOpen, onClose }) {
  const [groqApiKey, setGroqApiKey] = useState("");
  const [tavilyApiKey, setTavilyApiKey] = useState("");
  const [model, setModel] = useState("llama-3.3-70b-versatile");
  const [temperature, setTemperature] = useState(0.2);

  useEffect(() => {
    if (isOpen) {
      const DECOMMISSIONED = ["llama-3.1-70b-versatile", "llama-2-70b-4096", "mixtral-8x7b-32768"];
      const saved = localStorage.getItem("groq_model") || "llama-3.3-70b-versatile";
      const validModel = DECOMMISSIONED.includes(saved) ? "llama-3.3-70b-versatile" : saved;
      if (DECOMMISSIONED.includes(saved)) localStorage.setItem("groq_model", "llama-3.3-70b-versatile");
      setGroqApiKey(localStorage.getItem("groq_api_key") || "");
      setTavilyApiKey(localStorage.getItem("tavily_api_key") || "");
      setModel(validModel);
      setTemperature(parseFloat(localStorage.getItem("groq_temperature") || "0.2"));
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem("groq_api_key", groqApiKey.trim());
    localStorage.setItem("tavily_api_key", tavilyApiKey.trim());
    localStorage.setItem("groq_model", model);
    localStorage.setItem("groq_temperature", temperature.toString());
    toast.success("Configuration saved", { description: "Engine parameters updated for your next analysis." });
    onClose();
  };

  const inputStyle = {
    background: "#050508",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#E8E8F0",
    fontFamily: "var(--font-mono)",
    fontSize: "0.78rem",
  };

  const labelStyle = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.65rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#5A5B72",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[480px] p-6 rounded-xl"
        style={{ background: "#0D0E14", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 80px rgba(0,0,0,0.8)" }}
      >
        {/* Header */}
        <DialogHeader className="pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 700, color: "#10B981" }}>⚙</span>
            </div>
            <div>
              <DialogTitle className="text-sm font-bold" style={{ color: "#E8E8F0" }}>Analysis Engine Parameters</DialogTitle>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#3D4060", letterSpacing: "0.1em", marginTop: "0.1rem" }}>
                APEX RESEARCH · CONFIGURATION
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Groq API Key */}
          <div>
            <label style={labelStyle}>Groq API Key</label>
            <Input
              type="password"
              placeholder="gsk_..."
              value={groqApiKey}
              onChange={(e) => setGroqApiKey(e.target.value)}
              style={inputStyle}
              className="w-full"
            />
            <p className="mt-1.5 text-xs" style={{ color: "#3D4060" }}>
              Powers the AI LLM engine.{" "}
              <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer"
                style={{ color: "#10B981" }}>Get a free key →</a>
            </p>
          </div>

          {/* Tavily Key */}
          <div>
            <label style={labelStyle}>
              Tavily Search Key
              <span className="ml-2" style={{ background: "rgba(16,185,129,0.08)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)", padding: "0.1rem 0.4rem", borderRadius: "0.25rem", fontWeight: 700 }}>
                LIVE SEARCH
              </span>
            </label>
            <Input
              type="password"
              placeholder="tvly-..."
              value={tavilyApiKey}
              onChange={(e) => setTavilyApiKey(e.target.value)}
              style={inputStyle}
              className="w-full"
            />
            <p className="mt-1.5 text-xs" style={{ color: "#3D4060" }}>
              Powers real-time news & market data.{" "}
              <a href="https://app.tavily.com" target="_blank" rel="noopener noreferrer"
                style={{ color: "#10B981" }}>Get a free key →</a>
            </p>
          </div>

          {/* Model */}
          <div>
            <label style={labelStyle}>Inference Model</label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-full" style={{ ...inputStyle, height: 38 }}>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent style={{ background: "#0D0E14", border: "1px solid rgba(255,255,255,0.1)" }}>
                <SelectItem value="llama-3.3-70b-versatile" style={{ color: "#C8C9D8", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
                  Llama 3.3 70B · Versatile
                </SelectItem>
                <SelectItem value="llama-3.1-8b-instant" style={{ color: "#C8C9D8", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
                  Llama 3.3 8B · Instant
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Temperature */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label style={labelStyle}>Temperature</label>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, color: "#10B981" }}>
                {temperature.toFixed(1)}
              </span>
            </div>
            <Slider
              value={[temperature]}
              min={0} max={1} step={0.1}
              onValueChange={(val) => setTemperature(val[0])}
              className="py-2"
            />
            <div className="flex justify-between mt-1.5" style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "#2A2B3A" }}>
              <span>PRECISE (0.0)</span>
              <span>CREATIVE (1.0)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2.5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Button
            variant="ghost"
            onClick={onClose}
            className="flex-1 cursor-pointer font-semibold text-sm border-none"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "#5A5B72" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 cursor-pointer font-bold text-sm border-none"
            style={{ background: "linear-gradient(135deg, #10B981, #059669)", color: "#050508" }}
          >
            Save Config
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
