"use client";

import { Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const pillClass =
  "inline-flex items-center justify-center w-8 h-8 text-[#555] rounded-full cursor-pointer transition-all duration-200 hover:text-[#222] focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-2 focus:ring-offset-blush";

const pillStyle = {
  backgroundColor: "rgba(255,255,255,0.7)",
  border: "1px solid #ddd",
  backdropFilter: "blur(8px)",
};

export function Navigation() {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 flex justify-between">
      <motion.a
        href="https://instagram.com/noelyaxley"
        target="_blank"
        rel="noopener noreferrer"
        className={pillClass}
        style={pillStyle}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{ y: -1, transition: { duration: 0.2 } }}
      >
        <Instagram className="w-4 h-4" strokeWidth={2} />
      </motion.a>

      <motion.a
        href="https://linkedin.com/in/noelyaxley"
        target="_blank"
        rel="noopener noreferrer"
        className={pillClass}
        style={pillStyle}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{ y: -1, transition: { duration: 0.2 } }}
      >
        <Linkedin className="w-4 h-4" strokeWidth={2} />
      </motion.a>
    </nav>
  );
}
