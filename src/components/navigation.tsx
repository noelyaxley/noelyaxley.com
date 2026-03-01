"use client";

import { useState, useEffect } from "react";
import { Linkedin, Instagram } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const iconClass =
  "inline-flex items-center justify-center w-9 h-9 text-[#555] rounded-full cursor-pointer transition-all duration-200 hover:text-[#222] focus:outline-none focus:ring-2 focus:ring-black/10 focus:ring-offset-2 focus:ring-offset-blush";

const iconStyle = {
  backgroundColor: "rgba(255,255,255,0.7)",
  border: "1px solid #ddd",
  backdropFilter: "blur(8px)",
};

export function Navigation() {
  const { scrollY } = useScroll();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navStart = isDesktop ? 80 : 350;
  const navEnd = isDesktop ? 220 : 500;
  const navOpacity = useTransform(scrollY, [navStart, navEnd], [1, 0]);
  const navY = useTransform(scrollY, [navStart, navEnd], [0, -30]);

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
        className="inline-flex items-center px-3.5 py-1.5 font-body text-muted text-sm sm:text-base font-light rounded-full"
        style={{
          letterSpacing: "-0.5px",
          backgroundColor: "rgba(255,255,255,0.7)",
          border: "1px solid #ddd",
          backdropFilter: "blur(8px)",
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
