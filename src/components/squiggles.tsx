"use client";

import { motion } from "framer-motion";

// 8 squiggles radiating from a single origin, fanning out at ~45° total spread.
// Each matches a venture card's accent color.
// All start at (0,0) and fan outward — top ones go up-right, bottom ones go down-right.
const SQUIGGLES = [
  // UpScale PM — orange
  { d: "M 0,0 C 20,-5 40,-22 65,-38 C 85,-48 95,-32 120,-58 C 140,-68 155,-52 185,-80 C 205,-90 215,-75 245,-105", color: "#FF8C00" },
  // UpScale.build — deeper orange
  { d: "M 0,0 C 25,4 50,-14 80,-28 C 105,-35 112,-18 145,-38 C 170,-46 180,-30 215,-50 C 240,-58 250,-42 280,-60", color: "#E65C00" },
  // Yaxley Studio — black
  { d: "M 0,0 C 32,7 62,-6 95,-10 C 120,-12 128,4 160,-6 C 188,-12 198,2 230,-10 C 258,-15 265,0 295,-12", color: "#333333" },
  // Turnz — blue
  { d: "M 0,0 C 32,-7 62,6 95,10 C 120,12 128,-4 160,6 C 188,12 198,-2 230,10 C 258,15 265,0 295,12", color: "#2196F3" },
  // Age Lab — green
  { d: "M 0,0 C 25,-4 50,14 80,28 C 105,35 112,18 145,38 C 170,46 180,30 215,50 C 240,58 250,42 280,60", color: "#4CAF50" },
  // Fabulr — brown
  { d: "M 0,0 C 20,5 40,22 65,38 C 85,48 95,32 120,58 C 140,68 155,52 185,80 C 205,90 215,75 245,105", color: "#A0522D" },
  // Fynx — red
  { d: "M 0,0 C 28,2 55,-10 85,-20 C 110,-25 118,-10 150,-22 C 178,-28 188,-14 220,-28 C 248,-34 255,-20 285,-35", color: "#E53935" },
  // Future Scan — yellow
  { d: "M 0,0 C 28,-2 55,10 85,20 C 110,25 118,10 150,22 C 178,28 188,14 220,28 C 248,34 255,20 285,35", color: "#F9C800" },
];

interface SquigglesProps {
  visible: boolean;
}

export function Squiggles({ visible }: SquigglesProps) {
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{ top: "0%", left: "50%" }}
    >
      <svg
        width="300"
        height="250"
        viewBox="-5 -120 310 250"
        fill="none"
        className="overflow-visible"
        aria-hidden="true"
      >
        {SQUIGGLES.map(({ d, color }, i) => (
          <motion.path
            key={i}
            d={d}
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              visible
                ? {
                    pathLength: 1,
                    opacity: [0, 1, 1, 0.5],
                  }
                : {}
            }
            transition={{
              pathLength: {
                duration: 0.9,
                delay: i * 0.08,
                ease: "easeOut",
              },
              opacity: {
                duration: 2.5,
                delay: i * 0.08,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
}
