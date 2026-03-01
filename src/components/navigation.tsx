"use client";

import { Linkedin, Instagram } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const iconClass =
  "inline-flex items-center justify-center w-8 h-8 text-[#555] rounded-full cursor-pointer transition-all duration-200 hover:text-[#222] focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-2 focus:ring-offset-blush";

const iconStyle = {
  backgroundColor: "rgba(255,255,255,0.7)",
  border: "1px solid #ddd",
  backdropFilter: "blur(8px)",
};

export function Navigation() {
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [150, 350], [1, 0]);
  const navY = useTransform(scrollY, [150, 350], [0, -30]);

  return (
    <motion.nav
      className="fixed top-4 left-0 right-0 z-50 flex items-center justify-center gap-4 px-4"
      style={{ opacity: navOpacity, y: navY }}
    >
      <motion.a
        href="https://instagram.com/noelyaxley"
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        style={iconStyle}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{ y: -1, transition: { duration: 0.2 } }}
      >
        <Instagram className="w-4 h-4" strokeWidth={2} />
      </motion.a>

      <motion.span
        className="font-body text-muted text-sm sm:text-base font-light"
        style={{
          letterSpacing: "-0.5px",
          textShadow: "2px 2px 0 rgba(0,0,0,0.06)",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        8 ventures. One builder.
      </motion.span>

      <motion.a
        href="https://linkedin.com/in/noelyaxley"
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        style={iconStyle}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileHover={{ y: -1, transition: { duration: 0.2 } }}
      >
        <Linkedin className="w-4 h-4" strokeWidth={2} />
      </motion.a>
    </motion.nav>
  );
}
