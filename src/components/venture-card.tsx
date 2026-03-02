"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useAnimationControls,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface VentureCardProps {
  name: string;
  tagline: string;
  url: string;
  screenshot?: string;
  index: number;
  visible: boolean;
  headOrigin?: { x: number; y: number } | null;
  scrollMode: boolean;
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

const THUMB_W = 48;
const THUMB_H = 64;

function SiteThumbnail({ screenshot, name, accent }: { screenshot?: string; name: string; accent: string }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-lg overflow-hidden"
      style={{ width: THUMB_W, height: THUMB_H, backgroundColor: accent }}
    >
      {screenshot ? (
        <img
          src={screenshot}
          alt={`${name} preview`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-body font-semibold text-white text-sm select-none">
          {name[0]}
        </span>
      )}
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
  headOrigin,
  scrollMode,
}: VentureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const thumbControls = useAnimationControls();
  const [landed, setLanded] = useState(false);

  // Scroll-linked scale/opacity
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  const rawScrollScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const rawScrollOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  // Gate scroll effects behind scrollMode + landed
  const applyScroll = scrollMode && landed;
  const scrollScale = useTransform(rawScrollScale, (v) => (applyScroll ? v : 1));
  const scrollOpacity = useTransform(rawScrollOpacity, (v) => (applyScroll ? v : 1));

  // Mouse tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rawRotateX = useTransform(my, [0, 1], [6, -6]);
  const rawRotateY = useTransform(mx, [0, 1], [-6, 6]);
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  // Thumbnail fly-from-head animation
  useEffect(() => {
    if (!visible || !headOrigin || !thumbRef.current) return;

    const rect = thumbRef.current.getBoundingClientRect();
    const dx = headOrigin.x - (rect.left + rect.width / 2);
    const dy = headOrigin.y - (rect.top + rect.height / 2);

    // Instantly position at the head opening, small and rotated
    thumbControls.set({
      x: dx,
      y: dy,
      scale: 0.5,
      rotate: (index % 2 === 0 ? 1 : -1) * (10 + index * 3),
    });

    // Spring to natural card position — different stiffness for x/y creates an arc
    const delay = index * 0.1;
    thumbControls
      .start({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          x: { type: "spring", stiffness: 70, damping: 14, delay },
          y: { type: "spring", stiffness: 45, damping: 12, delay },
          scale: { type: "spring", stiffness: 100, damping: 15, delay },
          rotate: { type: "spring", stiffness: 120, damping: 18, delay },
        },
      })
      .then(() => setLanded(true));
  }, [visible, headOrigin, index, thumbControls]);

  const [accent, textColor] = BRAND_COLORS[index % BRAND_COLORS.length];

  return (
    <motion.div
      ref={cardRef}
      style={{ perspective: 800, scale: scrollScale, opacity: scrollOpacity }}
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-2.5 w-full no-underline cursor-pointer rounded-[14px] border-[1.5px] border-solid border-transparent focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-2 focus:ring-offset-blush"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "rgba(0,0,0,0)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        }}
        animate={{
          backgroundColor: landed ? "#FFFFFF" : "rgba(255,255,255,0)",
          borderColor: landed ? accent : "rgba(0,0,0,0)",
          boxShadow: landed
            ? "4px 4px 0 rgba(0,0,0,0.1), 2px 2px 0 rgba(0,0,0,0.06)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={
          landed
            ? {
                y: -3,
                boxShadow:
                  "6px 8px 0 rgba(0,0,0,0.12), 3px 4px 0 rgba(0,0,0,0.08)",
                transition: { duration: 0.2 },
              }
            : undefined
        }
        onMouseMove={landed ? handleMouseMove : undefined}
        onMouseLeave={landed ? handleMouseLeave : undefined}
      >
        {/* Thumbnail — flies from head opening to card position */}
        <motion.div
          ref={thumbRef}
          animate={thumbControls}
          className="flex-shrink-0 relative z-10"
        >
          <SiteThumbnail screenshot={screenshot} name={name} accent={accent} />
        </motion.div>

        {/* Card content — fades in after thumbnail lands */}
        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: landed ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className="font-body font-bold text-base leading-tight truncate"
            style={{ letterSpacing: "-0.3px", color: textColor }}
          >
            {name}
          </h3>
          <p
            className="font-body font-bold text-[14px] truncate mt-0.5"
            style={{ color: textColor, opacity: 0.8 }}
          >
            {tagline}
          </p>
          <p
            className="font-body font-bold text-[12px] truncate mt-0.5"
            style={{ color: textColor, opacity: 0.6 }}
          >
            {url.replace(/^https?:\/\//, "")}
          </p>
        </motion.div>

        {/* Arrow — fades in after thumbnail lands */}
        <motion.div
          className="w-7 h-7 flex-shrink-0 rounded-md border flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
          style={{ borderColor: accent, color: accent }}
          initial={{ opacity: 0 }}
          animate={{ opacity: landed ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
        </motion.div>
      </motion.a>
    </motion.div>
  );
}
