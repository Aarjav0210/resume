"use client";
import React, { useState, useEffect, useCallback } from "react";
import DarkVeil from "@/components/DarkVeil";
import TerminalHeader from "@/app/components/TerminalHeader";
import { personaOptions, type Persona } from "@/app/types/Persona";

interface ProfileSelectViewProps {
  onSelect: (persona: Persona, minimal: boolean) => void;
  isTransitioning: boolean;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function ProfileSelectView({ onSelect, isTransitioning, theme, onToggleTheme }: ProfileSelectViewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [minimal, setMinimal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      if (selectedIndex !== -1) return;
      setSelectedIndex(index);
      setInputText(personaOptions[index].key);
      setTimeout(() => onSelect(personaOptions[index].id, minimal), 600);
    },
    [onSelect, selectedIndex, minimal]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex !== -1) return;

      if (e.key === "m" || e.key === "M") {
        setMinimal((prev) => !prev);
        return;
      }

      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        handleSelect(num - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleSelect]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center theme-bg transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="landing-darkveil" style={{ opacity: 0.7 }}>
          <DarkVeil
            hueShift={120}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.4}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-8">
        <div className="mb-10">
          <TerminalHeader
            username="aarjav_jain"
            text="whoami --viewer"
            className="text-2xl md:text-3xl lg:text-4xl"
          />
        </div>

        <p
          className={`mb-8 text-gray-400 text-sm md:text-base font-mono transition-all duration-500 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          Select your context to tailor this experience:
        </p>

        {/* Persona cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {personaOptions.map((option, i) => (
            <button
              key={option.id}
              onClick={() => handleSelect(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(-1)}
              disabled={selectedIndex !== -1}
              className={`
                group relative text-left font-mono px-5 py-4 rounded-lg border cursor-pointer
                transition-all duration-300
                ${
                  selectedIndex === i
                    ? "border-[var(--color-green)] bg-[var(--color-green)]/10 scale-[1.02] shadow-[0_0_24px_var(--color-green-shadow,0.15)]"
                    : selectedIndex !== -1
                      ? "border-white/5 bg-white/[0.02] opacity-30 scale-[0.98]"
                      : "border-white/10 bg-white/[0.04] hover:border-[var(--color-cyan)]/40 hover:bg-[var(--color-cyan)]/[0.06] hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_0_20px_var(--color-cyan-shadow,0.12),0_4px_16px_rgba(0,0,0,0.3)]"
                }
                ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
              `}
              style={{
                transitionDelay: showContent && selectedIndex === -1 ? `${i * 80}ms` : "0ms",
              }}
            >
              <span
                className={`text-xs transition-colors duration-300 ${
                  selectedIndex === i
                    ? "text-[var(--color-green)]"
                    : hoveredIndex === i
                      ? "text-[var(--color-cyan)]"
                      : "text-white/40"
                }`}
              >
                [{option.key}]
              </span>

              <p
                className={`text-base mt-1 transition-colors duration-300 ${
                  selectedIndex === i
                    ? "text-[var(--color-green)]"
                    : hoveredIndex === i
                      ? "text-[var(--color-cyan)]"
                      : "text-white"
                }`}
              >
                {option.label}
              </p>

              <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>

              {selectedIndex === i && (
                <span className="absolute top-3 right-4 text-[var(--color-green)] text-xs animate-pulse">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mode toggle */}
        <div
          className={`mt-6 flex items-center gap-3 font-mono text-sm transition-all duration-500 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          style={{ transitionDelay: showContent ? "320ms" : "0ms" }}
        >
          <span className="text-gray-500 text-xs">mode:</span>
          <button
            onClick={() => setMinimal(false)}
            disabled={selectedIndex !== -1}
            className={`px-3 py-1.5 rounded border text-xs cursor-pointer transition-all duration-200 ${
              !minimal
                ? "border-[var(--color-cyan)]/40 bg-[var(--color-cyan)]/10 text-[var(--color-cyan)]"
                : "border-white/10 bg-white/[0.03] text-white/40 hover:text-white/70 hover:border-white/20"
            }`}
          >
            animated
          </button>
          <button
            onClick={() => setMinimal(true)}
            disabled={selectedIndex !== -1}
            className={`px-3 py-1.5 rounded border text-xs cursor-pointer transition-all duration-200 ${
              minimal
                ? "border-[var(--color-cyan)]/40 bg-[var(--color-cyan)]/10 text-[var(--color-cyan)]"
                : "border-white/10 bg-white/[0.03] text-white/40 hover:text-white/70 hover:border-white/20"
            }`}
          >
            minimal
          </button>
          <span className="text-gray-600 text-[10px] hidden sm:inline ml-1">press [m] to toggle</span>
        </div>

        {/* Theme toggle */}
        <div
          className={`mt-4 flex items-center gap-3 font-mono text-sm transition-all duration-500 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          style={{ transitionDelay: showContent ? "360ms" : "0ms" }}
        >
          <span className="text-gray-500 text-xs">theme:</span>
          <button
            onClick={() => onToggleTheme()}
            disabled={selectedIndex !== -1}
            className="px-3 py-1.5 rounded border text-xs cursor-pointer transition-all duration-200 border-white/10 bg-white/[0.03] text-white/40 hover:text-white/70 hover:border-white/20"
          >
            {theme === "dark" ? "☀ light" : "🌙 dark"}
          </button>
        </div>

        {/* Terminal prompt */}
        <div
          className={`mt-6 font-mono text-sm transition-all duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: showContent ? "400ms" : "0ms" }}
        >
          <span className="text-white/50">&gt; </span>
          <span className="text-[var(--color-green)]">{inputText}</span>
          <span className="animate-pulse text-white/60">▋</span>
        </div>
      </div>
    </div>
  );
}
