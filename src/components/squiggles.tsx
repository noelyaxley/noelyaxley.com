"use client";

import { motion, type MotionValue } from "framer-motion";

const SQUIGGLES = [
  { d: "M 0,0 C 20,-5 40,-22 65,-38 C 85,-48 95,-32 120,-58 C 140,-68 155,-52 185,-80 C 205,-90 215,-75 245,-105", color: "#FF8C00" },
  { d: "M 0,0 C 25,4 50,-14 80,-28 C 105,-35 112,-18 145,-38 C 170,-46 180,-30 215,-50 C 240,-58 250,-42 280,-60", color: "#E65C00" },
  { d: "M 0,0 C 32,7 62,-6 95,-10 C 120,-12 128,4 160,-6 C 188,-12 198,2 230,-10 C 258,-15 265,0 295,-12", color: "#333333" },
  { d: "M 0,0 C 32,-7 62,6 95,10 C 120,12 128,-4 160,6 C 188,12 198,-2 230,10 C 258,15 265,0 295,12", color: "#2196F3" },
  { d: "M 0,0 C 25,-4 50,14 80,28 C 105,35 112,18 145,38 C 170,46 180,30 215,50 C 240,58 250,42 280,60", color: "#4CAF50" },
  { d: "M 0,0 C 20,5 40,22 65,38 C 85,48 95,32 120,58 C 140,68 155,52 185,80 C 205,90 215,75 245,105", color: "#A0522D" },
  { d: "M 0,0 C 28,2 55,-10 85,-20 C 110,-25 118,-10 150,-22 C 178,-28 188,-14 220,-28 C 248,-34 255,-20 285,-35", color: "#E53935" },
  { d: "M 0,0 C 28,-2 55,10 85,20 C 110,25 118,10 150,22 C 178,28 188,14 220,28 C 248,34 255,20 285,35", color: "#F9C800" },
];

interface SquigglesProps {
  opacity: MotionValue<number>;
  started: boolean;
}

export function Squiggles({ opacity, started }: SquigglesProps) {
  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{ top: "-10%", left: "50%", opacity }}
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
              started
                ? { pathLength: 1, opacity: [0, 1, 1, 0.5] }
                : {}
            }
            transition={{
              pathLength: {
                duration: 0.6,
                delay: i * 0.05,
                ease: "easeOut",
              },
              opacity: {
                duration: 2.5,
                delay: i * 0.05,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}
