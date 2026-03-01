"use client";

import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  return (
    <nav className="fixed top-4 right-4 z-50">
      <motion.a
        href="https://linkedin.com/in/noelyaxley"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[#555] text-[12px] font-semibold rounded-md cursor-pointer transition-all duration-200 hover:text-[#222] focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-2 focus:ring-offset-blush"
        style={{
          backgroundColor: "rgba(255,255,255,0.7)",
          border: "1px solid #ddd",
          backdropFilter: "blur(8px)",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{
          y: -1,
          transition: { duration: 0.2 },
        }}
      >
        <Linkedin className="w-3.5 h-3.5" strokeWidth={2} />
        CV
      </motion.a>
    </nav>
  );
}
