"use client";

import { motion } from "framer-motion";
import { GripHorizontal, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils"; // Replace with your classnames helper if needed

export const Skiper4 = () => {
  const [scale, setScale] = useState(0);
  const [gap, setGap] = useState(0);
  const [flexDirection, setFlexDirection] = useState("row");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      {/* Theme Toggle Buttons */}
      <motion.div
        className="relative flex items-center justify-center gap-1"
        animate={{
          gap: gap ? `${gap}px` : "4px",
          scale: scale ? `${scale / 20}` : "1",
        }}
        style={{
          flexDirection: flexDirection === "column" ? "column" : "row",
        }}
        transition={{ duration: 0.35 }}
      >
        <motion.div layout>
          <ThemeToggleButton1 className={cn("size-12")} />
        </motion.div>
        <motion.div layout>
          <ThemeToggleButton2 className={cn("size-12 p-2")} />
        </motion.div>
        <motion.div layout>
          <ThemeToggleButton3 className={cn("size-12 p-2")} />
        </motion.div>
        <motion.div layout>
          <ThemeToggleButton4 className={cn("size-12 p-2")} />
        </motion.div>
        <motion.div layout>
          <ThemeToggleButton5 className={cn("size-12 p-3")} />
        </motion.div>
      </motion.div>

      {/* Options Panel */}
      <Options
        scale={scale}
        setScale={setScale}
        gap={gap}
        setGap={setGap}
        setFlexDirection={setFlexDirection}
      />
    </div>
  );
};

// ---------------- OPTIONS PANEL ----------------
type OptionsProps = {
  scale: number;
  setScale: (value: number) => void;
  gap: number;
  setGap: (value: number) => void;
  setFlexDirection: (value: string) => void;
};

const Options = ({ scale, setScale, gap, setGap, setFlexDirection }: OptionsProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className="top-30 border-foreground/10 bg-muted2 absolute right-1/2 flex w-[245px] translate-x-1/2 flex-col gap-3 rounded-3xl border p-3 backdrop-blur-sm lg:right-4 lg:translate-x-0"
      drag={isDragging}
      dragMomentum={false}
    >
      <div className="flex items-center justify-between">
        <span
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          className="size-4 cursor-grab active:cursor-grabbing"
        >
          <GripHorizontal className="size-4 opacity-50" />
        </span>

        <p
          onClick={() => {
            setScale(0);
            setGap(0);
            setFlexDirection("row");
          }}
          className="hover:bg-foreground/10 group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm opacity-50"
        >
          Options
          <span className="group-active:-rotate-360 rotate-0 cursor-pointer transition-all duration-300 group-hover:rotate-90">
            <RefreshCcw className="size-4 opacity-50" />
          </span>
        </p>
      </div>

      <div className="flex flex-col">
        {/* Scale */}
        <div className="flex items-center justify-between py-1">
          <p className="text-sm opacity-50">Scale</p>
          <input
            type="range"
            min={0}
            max={100}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="h-1.5 w-[150px] cursor-pointer rounded-lg bg-muted"
          />
        </div>

        {/* Gap */}
        <div className="flex items-center justify-between py-1">
          <p className="text-sm opacity-50">Gap</p>
          <input
            type="range"
            min={0}
            max={100}
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            className="h-1.5 w-[150px] cursor-pointer rounded-lg bg-muted"
          />
        </div>

        {/* Flex Direction */}
        <div className="mt-1 flex items-center justify-between py-1">
          <p className="text-sm opacity-50">Flex</p>
          <div className="flex items-center justify-end gap-2">
            <button
              className="cursor-pointer text-sm opacity-50 hover:opacity-100"
              onClick={() => setFlexDirection("column")}
            >
              Column
            </button>
            <button
              className="cursor-pointer text-sm opacity-50 hover:opacity-100"
              onClick={() => setFlexDirection("row")}
            >
              Row
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ---------------- THEME TOGGLE BUTTONS ----------------

export const ThemeToggleButton1 = ({ className = "" }: { className?: string }) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn("rounded-full bg-black text-white transition-all duration-300 active:scale-95", className)}
      onClick={() => setIsDark(!isDark)}
    >
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.g animate={{ rotate: isDark ? -180 : 0 }} transition={{ ease: "easeInOut", duration: 0.35 }}>
          <path d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5" fill="white" />
          <path d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5" fill="black" />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.35 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export const ThemeToggleButton2 = ({ className = "" }: { className?: string }) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn("rounded-full transition-all duration-300 active:scale-95", isDark ? "bg-black text-white" : "bg-white text-black", className)}
      onClick={() => setIsDark(!isDark)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" strokeLinecap="round" viewBox="0 0 32 32">
        <motion.circle animate={{ r: isDark ? 10 : 8 }} cx="16" cy="16" transition={{ duration: 0.35 }} />
      </svg>
    </button>
  );
};

export const ThemeToggleButton3 = ({ className = "" }: { className?: string }) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn("rounded-full transition-all duration-300 active:scale-95", isDark ? "bg-black text-white" : "bg-white text-black", className)}
      onClick={() => setIsDark(!isDark)}
    >
      <svg viewBox="0 0 32 32">
        <motion.circle animate={{ r: isDark ? 10 : 8 }} cx="16" cy="16" transition={{ duration: 0.35 }} />
      </svg>
    </button>
  );
};

export const ThemeToggleButton4 = ({ className = "" }: { className?: string }) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn("rounded-full transition-all duration-300 active:scale-95", isDark ? "bg-black text-white" : "bg-white text-black", className)}
      onClick={() => setIsDark(!isDark)}
    >
      <svg viewBox="0 0 32 32">
        <motion.rect width="16" height="16" x="8" y="8" rx="4" animate={{ rotate: isDark ? 45 : 0 }} transition={{ duration: 0.35 }} />
      </svg>
    </button>
  );
};

export const ThemeToggleButton5 = ({ className = "" }: { className?: string }) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn("rounded-full transition-all duration-300 active:scale-95", isDark ? "bg-black text-white" : "bg-white text-black", className)}
      onClick={() => setIsDark(!isDark)}
    >
      <svg viewBox="0 0 32 32">
        <motion.polygon points="16,4 28,28 4,28" animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.35 }} />
      </svg>
    </button>
  );
};
