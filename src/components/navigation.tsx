"use client";

import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  return (
    <nav className="fixed top-6 right-6 z-50">
      <motion.a
        href="https://linkedin.com/in/noelyaxley"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 text-white text-[15px] font-medium rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-blush"
        style={{
          backgroundImage: "linear-gradient(#444, #000)",
          border: "1px solid #000",
          boxShadow:
            "0 1px 2px #0000004d, inset 1px 1px 0.25px #ffffff4d, inset 0 2px 1px #ffffff80",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{
          y: -2,
          boxShadow:
            "0 9px 8px #0003, 0 1px 2px #0000004d, inset 1px 1px 0.25px #ffffff4d, inset 0 2px 1px #ffffff80",
          transition: { duration: 0.2 },
        }}
      >
        <Linkedin className="w-4 h-4" strokeWidth={2} />
        Annotated CV
      </motion.a>
    </nav>
  );
}
