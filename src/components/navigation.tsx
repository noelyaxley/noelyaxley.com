"use client";

import { Linkedin, Instagram } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { INSTAGRAM_URL, LINKEDIN_URL } from "@/lib/site";

const iconClass =
  "inline-flex items-center justify-center w-11 h-11 text-[#3D3A38] rounded-full cursor-pointer transition-colors duration-200 hover:text-black";

const iconStyle = {
  backgroundColor: "rgba(255,255,255,0.7)",
  border: "1px solid #ddd",
  backdropFilter: "blur(8px)",
};

export function Navigation() {
  const reduceMotion = useReducedMotion();

  return (
    <nav
      className="fixed top-4 left-0 right-0 z-50 flex items-center justify-center gap-4 px-4"
      aria-label="Social links"
    >
      <motion.a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Noel Yaxley on Instagram"
        className={iconClass}
        style={iconStyle}
        initial={false}
        whileHover={reduceMotion ? undefined : { y: -1, transition: { duration: 0.2 } }}
      >
        <Instagram className="w-4 h-4" strokeWidth={2} />
      </motion.a>

      <motion.span
        className="inline-flex items-center px-3.5 py-1.5 font-body text-[#1F1C1A] text-sm sm:text-base font-light rounded-full"
        style={{
          letterSpacing: "-0.5px",
          backgroundColor: "rgba(255,255,255,0.7)",
          border: "1px solid #ddd",
          backdropFilter: "blur(8px)",
        }}
        initial={false}
      >
        8 ventures. One builder.
      </motion.span>

      <motion.a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Noel Yaxley on LinkedIn"
        className={iconClass}
        style={iconStyle}
        initial={false}
        whileHover={reduceMotion ? undefined : { y: -1, transition: { duration: 0.2 } }}
      >
        <Linkedin className="w-4 h-4" strokeWidth={2} />
      </motion.a>
    </nav>
  );
}
