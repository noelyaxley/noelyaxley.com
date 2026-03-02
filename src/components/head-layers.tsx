"use client";

import { motion, type MotionValue } from "framer-motion";

interface HeadLayersProps {
  lidRotation: MotionValue<number>;
}

export function HeadLayers({ lidRotation }: HeadLayersProps) {
  return (
    <div className="relative w-[312px] sm:w-[384px] lg:w-[480px] pb-6 overflow-visible">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/head-bottom.webp"
        alt="Noel Yaxley"
        className="w-full h-auto block"
        draggable={false}
      />

      <motion.div
        className="absolute top-0 left-0 w-full z-10"
        style={{ transformOrigin: "0% 55%", rotateZ: lidRotation }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/head-top.webp"
          alt=""
          className="w-full h-auto block"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
