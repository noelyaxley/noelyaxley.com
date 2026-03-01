"use client";

import { useState } from "react";
import { HeadLayers } from "./head-layers";
import { Squiggles } from "./squiggles";
import { VentureCard } from "./venture-card";
import { motion } from "framer-motion";

const VENTURES = [
  {
    name: "UpScale PM",
    tagline: "Construction Project Management",
    url: "https://upscalepm.com.au",
    screenshot: "/screenshots/upscalepm.png",
  },
  {
    name: "UpScale.build",
    tagline: "Project Delivery App",
    url: "https://upscale.build",
    screenshot: "/screenshots/upscalebuild.png",
  },
  {
    name: "Yaxley Studio",
    tagline: "Architecture Office",
    url: "https://yaxleystudio.com.au",
    screenshot: "/screenshots/yaxleystudio.png",
  },
  {
    name: "Turnz",
    tagline: "Airbnb Cleaning Service",
    url: "https://turnz.com.au",
    screenshot: "/screenshots/turnz.png",
  },
  {
    name: "Age Lab",
    tagline: "Longevity Supplements",
    url: "https://agelab.com.au",
    screenshot: "/screenshots/agelab.png",
  },
  {
    name: "Fabulr",
    tagline: "Home Prefabrication",
    url: "https://fabulr.com.au",
    screenshot: "/screenshots/fabulr.png",
  },
  {
    name: "Fynx",
    tagline: "Construction Finance",
    url: "https://fynx.com.au",
    screenshot: "/screenshots/fynx.png",
  },
  {
    name: "Future Scan",
    tagline: "Preventative MRI",
    url: "https://futurescan.com.au",
    screenshot: "/screenshots/futurescan.png",
  },
];

export function HeroSection() {
  const [lidOpen, setLidOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-10 pt-28 pb-20">
      {/* Title */}
      <motion.h1
        className="font-display text-5xl sm:text-7xl lg:text-[8rem] xl:text-[10rem] font-black italic uppercase text-black mb-4 leading-none text-center"
        style={{ letterSpacing: "-0.04em", textShadow: "0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Noel Yaxley
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="font-body text-muted text-lg sm:text-xl font-light mb-14 lg:mb-20 text-center"
        style={{ letterSpacing: "-0.5px", textShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        8 ventures. One builder.
      </motion.p>

      {/* Main content: Head + Ventures */}
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-center gap-12 lg:gap-4">
        {/* Left: Head graphic + Squiggles — 65% width */}
        <motion.div
          className="relative flex-shrink-0 lg:w-[65%] flex justify-center overflow-visible"
          initial={{ x: -700 }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            mass: 1,
          }}
        >
          <div className="relative">
            <HeadLayers onLidOpen={() => setLidOpen(true)} />
            <Squiggles visible={lidOpen} />
          </div>
        </motion.div>

        {/* Right: Venture cards — fixed width, generous right margin */}
        <div className="flex flex-col gap-3 w-full lg:w-[340px] lg:mr-[8%] flex-shrink-0">
          {VENTURES.map((venture, i) => (
            <VentureCard
              key={venture.name}
              {...venture}
              index={i}
              visible={lidOpen}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
