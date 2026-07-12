import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SettingsModal({ isOpen, onClose }) {
  const [groqApiKey, setGroqApiKey] = useState("");
  const [tavilyApiKey, setTavilyApiKey] = useState("");
  const [model, setModel] = useState("llama-3.3-70b-versatile");
  const [temperature, setTemperature] = useState(0.2);

  // Load configuration from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      // Migrate: remove any decommissioned Groq model IDs from localStorage
      const DECOMMISSIONED_MODELS = ["llama-3.1-70b-versatile", "llama-2-70b-4096", "mixtral-8x7b-32768"];
      const savedModel = localStorage.getItem("groq_model") || "llama-3.3-70b-versatile";
      const validModel = DECOMMISSIONED_MODELS.includes(savedModel)
        ? "llama-3.3-70b-versatile"
        : savedModel;
      if (DECOMMISSIONED_MODELS.includes(savedModel)) {
        localStorage.setItem("groq_model", "llama-3.3-70b-versatile");
      }

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

    toast.success("Configuration saved successfully", {
      description: "Engine parameters updated for your next analysis.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[500px] p-6 rounded-2xl"
        style={{
          background: "oklch(0.10 0.01 260)",
          border: "1px solid oklch(1 0 0 / 0.1)",
          boxShadow: "0 24px 80px oklch(0 0 0 / 0.8), 0 0 0 1px oklch(0.65 0.25 255 / 0.08)",
        }}
      >
        <DialogHeader
          className="flex flex-row items-center justify-between space-y-0 pb-4"
          style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}
        >
          <DialogTitle
            className="text-xl font-bold tracking-tight"
            style={{ color: "oklch(0.92 0.01 255)" }}
          >
            Analysis Engine Parameters
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Groq API Key */}
          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-tight" style={{ color: "oklch(0.72 0.01 255)" }}>
              Groq API Key
            </label>
            <Input
              type="password"
              placeholder="gsk_... (Enter your Groq API Key)"
              value={groqApiKey}
              onChange={(e) => setGroqApiKey(e.target.value)}
              className="font-mono"
              style={{
                background: "oklch(0.08 0.01 260)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                color: "oklch(0.88 0.01 255)",
              }}
            />
            <p className="text-[11px]" style={{ color: "oklch(0.40 0.01 255)" }}>
              Powers the AI language model (LLM). Leave blank to use the server default key.{" "}
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(0.65 0.25 255)" }}
                className="underline underline-offset-2 hover:opacity-80"
              >
                Get a free key →
              </a>
            </p>
          </div>

          {/* Tavily API Key */}
          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-tight flex items-center gap-2" style={{ color: "oklch(0.72 0.01 255)" }}>
              Tavily Search Key
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.65 0.25 255 / 0.1)",
                  color: "oklch(0.65 0.25 255)",
                  border: "1px solid oklch(0.65 0.25 255 / 0.2)",
                }}
              >
                Real-time Search
              </span>
            </label>
            <Input
              type="password"
              placeholder="tvly-... (Enter your Tavily API Key)"
              value={tavilyApiKey}
              onChange={(e) => setTavilyApiKey(e.target.value)}
              className="font-mono"
              style={{
                background: "oklch(0.08 0.01 260)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                color: "oklch(0.88 0.01 255)",
              }}
            />
            <p className="text-[11px]" style={{ color: "oklch(0.40 0.01 255)" }}>
              Powers live web search for real-time news & financial data.{" "}
              <a
                href="https://app.tavily.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(0.65 0.25 255)" }}
                className="underline underline-offset-2 hover:opacity-80"
              >
                Get a free key →
              </a>
            </p>
          </div>

          {/* LangChain Inference Model */}
          <div className="space-y-2">
            <label className="text-sm font-semibold tracking-tight" style={{ color: "oklch(0.72 0.01 255)" }}>
              Inference Analysis Model
            </label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger
                className="w-full"
                style={{
                  background: "oklch(0.08 0.01 260)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                  color: "oklch(0.88 0.01 255)",
                }}
              >
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "oklch(0.11 0.01 260)",
                  border: "1px solid oklch(1 0 0 / 0.12)",
                }}
              >
                <SelectItem value="llama-3.3-70b-versatile" className="cursor-pointer" style={{ color: "oklch(0.82 0.01 255)" }}>
                  Llama 3.3 70B (Versatile)
                </SelectItem>
                <SelectItem value="llama-3.1-8b-instant" className="cursor-pointer" style={{ color: "oklch(0.82 0.01 255)" }}>
                  Llama 3.3 8B (Instant)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Temperature */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold tracking-tight" style={{ color: "oklch(0.72 0.01 255)" }}>
                Temperature (Creativity vs. Precision)
              </label>
              <span className="text-sm font-bold font-mono" style={{ color: "oklch(0.65 0.25 255)" }}>
                {temperature.toFixed(1)}
              </span>
            </div>

            <Slider
              value={[temperature]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={(val) => setTemperature(val[0])}
              className="py-2"
            />

            <div className="flex justify-between text-[10px] font-medium tracking-wide" style={{ color: "oklch(0.38 0.01 255)" }}>
              <span>Precise / Analytical (0.0)</span>
              <span>Creative / Synthetic (1.0)</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          className="flex justify-end gap-3 pt-4"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
        >
          <Button
            variant="ghost"
            onClick={onClose}
            className="px-5 cursor-pointer font-medium"
            style={{
              background: "oklch(1 0 0 / 0.04)",
              border: "1px solid oklch(1 0 0 / 0.09)",
              color: "oklch(0.52 0.02 255)",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-5 text-white cursor-pointer font-bold border-none"
            style={{
              background: "linear-gradient(135deg, oklch(0.65 0.25 255), oklch(0.60 0.22 280))",
              boxShadow: "0 4px 20px oklch(0.65 0.25 255 / 0.35)",
            }}
          >
            Save Parameters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
