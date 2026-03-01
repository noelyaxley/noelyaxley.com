"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface VentureCardProps {
  name: string;
  tagline: string;
  url: string;
  screenshot: string;
  index: number;
  visible: boolean;
}

// Per-venture brand colors: [accent (border/thumbnail), text (readable on white)]
const BRAND_COLORS: [string, string][] = [
  ["#FF8C00", "#D27400"], // UpScale PM — orange
  ["#E65C00", "#B84A00"], // UpScale.build — deeper orange
  ["#333333", "#1A1A1A"], // Yaxley Studio — black
  ["#2196F3", "#1976D2"], // Turnz — blue
  ["#4CAF50", "#2E7D32"], // Age Lab — green
  ["#A0522D", "#7A3E22"], // Fabulr — brown
  ["#E53935", "#C62828"], // Fynx — red
  ["#F9C800", "#A68500"], // Future Scan — yellow
];

// Live iframe thumbnail: renders the real site at 1200×1600 (3:4) then
// scales it down to fit a 48×64 box. pointer-events-none prevents interaction.
const IFRAME_W = 1200;
const IFRAME_H = 1600;
const THUMB_W = 48;
const THUMB_H = 64;
const SCALE = THUMB_W / IFRAME_W; // 0.04

function SiteThumbnail({ url, name, accent }: { url: string; name: string; accent: string }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-lg overflow-hidden"
      style={{
        width: THUMB_W,
        height: THUMB_H,
        backgroundColor: accent,
      }}
    >
      {/* Fallback letter — visible while iframe loads */}
      <span className="absolute inset-0 flex items-center justify-center font-body font-semibold text-white text-sm select-none z-0">
        {name[0]}
      </span>
      <iframe
        src={url}
        title={`${name} preview`}
        loading="lazy"
        tabIndex={-1}
        className="absolute top-0 left-0 pointer-events-none border-0 z-10"
        style={{
          width: IFRAME_W,
          height: IFRAME_H,
          transform: `scale(${SCALE})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

export function VentureCard({
  name,
  tagline,
  url,
  screenshot,
  index,
  visible,
}: VentureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rawRotateX = useTransform(y, [0, 1], [6, -6]);
  const rawRotateY = useTransform(x, [0, 1], [-6, 6]);
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  const [accent, textColor] = BRAND_COLORS[index % BRAND_COLORS.length];

  return (
    <motion.div ref={cardRef} style={{ perspective: 800, scale: scrollScale, opacity: scrollOpacity }}>
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-2.5 w-full no-underline cursor-pointer rounded-[14px] transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-2 focus:ring-offset-blush"
        style={{
          backgroundColor: "#FFFFFF",
          border: `1.5px solid ${accent}`,
          boxShadow:
            "4px 4px 0 rgba(0,0,0,0.1), 2px 2px 0 rgba(0,0,0,0.06)",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ x: -300, opacity: 0, scale: 0.85 }}
        animate={
          visible
            ? { x: 0, opacity: 1, scale: 1 }
            : { x: -300, opacity: 0, scale: 0.85 }
        }
        transition={{
          type: "spring",
          stiffness: 160,
          damping: 16,
          delay: index * 0.06,
        }}
        whileHover={{
          y: -3,
          boxShadow: "6px 8px 0 rgba(0,0,0,0.12), 3px 4px 0 rgba(0,0,0,0.08)",
          transition: { duration: 0.2 },
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Live site thumbnail — 3:4 ratio */}
        <SiteThumbnail url={url} name={name} accent={accent} />

        {/* Name + Tagline + URL — bold, colored, 15% size steps */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-body font-bold text-base leading-tight truncate"
            style={{ letterSpacing: "-0.3px", color: textColor }}
          >
            {name}
          </h3>
          <p className="font-body font-bold text-[14px] truncate mt-0.5" style={{ color: textColor, opacity: 0.8 }}>
            {tagline}
          </p>
          <p className="font-body font-bold text-[12px] truncate mt-0.5" style={{ color: textColor, opacity: 0.6 }}>
            {url.replace(/^https?:\/\//, "")}
          </p>
        </div>

        {/* Arrow — accent colored */}
        <div
          className="w-7 h-7 flex-shrink-0 rounded-md border flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
          style={{ borderColor: accent, color: accent }}
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
        </div>
      </motion.a>
    </motion.div>
  );
}
