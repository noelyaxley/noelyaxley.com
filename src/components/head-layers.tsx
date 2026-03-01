"use client";

import { motion } from "framer-motion";

interface HeadLayersProps {
  onLidOpen: () => void;
}

export function HeadLayers({ onLidOpen }: HeadLayersProps) {
  // Both images are 1400×1800 on the same canvas.
  // The forehead split line sits at roughly 55% from the top.
  // Pivot: left edge (0%) at the split line (55%) — the lid hinges open from there.
  return (
    <div className="relative w-[312px] sm:w-[384px] lg:w-[480px] pb-6 overflow-visible">
      {/* Head bottom — defines the container height via natural aspect ratio */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/head-bottom.png"
        alt="Noel Yaxley"
        className="w-full h-auto block"
        draggable={false}
      />

      {/* Head top / Lid — hinges at left side of forehead split */}
      <motion.div
        className="absolute top-0 left-0 w-full z-10"
        style={{ transformOrigin: "0% 55%" }}
        initial={{ rotateZ: 0 }}
        animate={{ rotateZ: -45 }}
        transition={{
          delay: 1.3,
          type: "spring",
          mass: 1.5,
          stiffness: 100,
          damping: 12,
        }}
        onAnimationComplete={() => onLidOpen()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/head-top.png"
          alt=""
          className="w-full h-auto block"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
