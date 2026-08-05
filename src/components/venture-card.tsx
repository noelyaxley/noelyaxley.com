"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
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
}

// Per-venture accent — border, thumbnail backing and arrow only. Never text.
const BRAND_COLORS: string[] = [
  "#FF8C00", // UpScale PM — orange
  "#E65C00", // UpScale.build — deeper orange
  "#333333", // Yaxley Studio — black
  "#2196F3", // Turnz — blue
  "#4CAF50", // Age Lab — green
  "#A0522D", // Fabulr — brown
  "#E53935", // Fynx — red
  "#F9C800", // Future Scan — yellow
];

// Text sits in near-black on white so every card reads at the same strength.
const TITLE_COLOR = "#111111";
const TAGLINE_COLOR = "#3F3A37";
const URL_COLOR = "#615A56";

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
}: VentureCardProps) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const thumbControls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  // Mouse tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rawRotateX = useTransform(my, [0, 1], [6, -6]);
  const rawRotateY = useTransform(mx, [0, 1], [-6, 6]);
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  // Reduced motion, or no measured origin to fly from: the thumbnail just sits
  // in place. Declarative, so it paints without waiting on the animation loop.
  const restingThumb = reduceMotion || (visible && !headOrigin);

  // Thumbnail fly-from-head animation — the only thing the entrance gates.
  useEffect(() => {
    if (!visible || reduceMotion) return;
    if (!headOrigin || !thumbRef.current) return;

    const rect = thumbRef.current.getBoundingClientRect();
    const dx = headOrigin.x - (rect.left + rect.width / 2);
    const dy = headOrigin.y - (rect.top + rect.height / 2);

    // Instantly position at the head opening, small and rotated, then reveal
    thumbControls.set({
      x: dx,
      y: dy,
      scale: 0.5,
      rotate: (index % 2 === 0 ? 1 : -1) * (10 + index * 3),
      opacity: 1,
    });

    // Spring to natural card position — different stiffness for x/y creates an arc
    const delay = index * 0.08;
    thumbControls.start({
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
    });

    return () => {
      thumbControls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, headOrigin, index, reduceMotion]);

  const accent = BRAND_COLORS[index % BRAND_COLORS.length];

  return (
    <motion.div
      className="relative"
      style={{ perspective: 800 }}
      // Card content is legible from first paint; the reveal only settles it.
      initial={{ y: 10 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-2.5 w-full no-underline cursor-pointer rounded-[14px] border-[1.5px] border-solid"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: "#FFFFFF",
          borderColor: accent,
          boxShadow: "4px 4px 0 rgba(0,0,0,0.1), 2px 2px 0 rgba(0,0,0,0.06)",
        }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -3,
                boxShadow:
                  "6px 8px 0 rgba(0,0,0,0.12), 3px 4px 0 rgba(0,0,0,0.08)",
                transition: { duration: 0.2 },
              }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnail — flies from the head opening once the lid is up */}
        <motion.div
          ref={thumbRef}
          initial={{ opacity: 0 }}
          animate={
            restingThumb
              ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
              : thumbControls
          }
          transition={restingThumb ? { duration: 0 } : undefined}
          className="flex-shrink-0 relative z-10"
        >
          <SiteThumbnail screenshot={screenshot} name={name} accent={accent} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3
            className="font-body font-bold text-base leading-tight truncate"
            style={{ letterSpacing: "-0.3px", color: TITLE_COLOR }}
          >
            {name}
          </h3>
          <p
            className="font-body font-bold text-[14px] truncate mt-0.5"
            style={{ color: TAGLINE_COLOR }}
          >
            {tagline}
          </p>
          <p
            className="font-body font-bold text-[12px] truncate mt-0.5"
            style={{ color: URL_COLOR }}
          >
            {url.replace(/^https?:\/\//, "")}
          </p>
        </div>

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
