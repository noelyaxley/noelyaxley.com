"use client";

import { useState, useEffect } from "react";
import { HeadLayers } from "./head-layers";
import { Squiggles } from "./squiggles";
import { VentureCard } from "./venture-card";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";

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
  const { scrollY, scrollYProgress } = useScroll();
  const [scrollMode, setScrollMode] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lid + squiggles: progress-based so they scale with page height
  const scrollLidRotation = useTransform(scrollYProgress, [0, isDesktop ? 0.6 : 0.25], [-45, 0]);
  const scrollSquiggleOpacity = useTransform(scrollYProgress, [0, isDesktop ? 0.4 : 0.18], [1, 0]);

  // Title: responsive pixel thresholds (desktop has less scroll range)
  const titleStart = isDesktop ? 80 : 350;
  const titleEnd = isDesktop ? 220 : 550;
  const titleY = useTransform(scrollY, [titleStart, titleEnd], [0, -60]);
  const titleOpacity = useTransform(scrollY, [titleStart, titleEnd], [1, 0]);

  // Motion values controlled first by initial animation, then by scroll
  const lidRotation = useMotionValue(0);
  const squiggleOpacity = useMotionValue(0);

  // Phase 1: Initial entrance — lid springs open, then squiggles + cards appear
  useEffect(() => {
    const controls = animate(lidRotation, -45, {
      delay: 1.3,
      type: "spring",
      mass: 1.5,
      stiffness: 100,
      damping: 12,
    });

    controls.then(() => {
      setCardsVisible(true);
      animate(squiggleOpacity, 1, { duration: 0.4 }).then(() => {
        setScrollMode(true);
      });
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Phase 2: Bind motion values to scroll position
  useEffect(() => {
    if (!scrollMode) return;

    lidRotation.set(scrollLidRotation.get());
    squiggleOpacity.set(scrollSquiggleOpacity.get());

    const unsubLid = scrollLidRotation.on("change", (v) =>
      lidRotation.set(v)
    );
    const unsubSquiggle = scrollSquiggleOpacity.on("change", (v) =>
      squiggleOpacity.set(v)
    );

    return () => {
      unsubLid();
      unsubSquiggle();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollMode]);

  return (
    <main className="relative min-h-screen flex flex-col items-center px-6 lg:px-10 pb-20">
      {/* Fixed Title — scrolls away with nav */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-30 text-center pointer-events-none"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <motion.h1
          className="font-display text-[12.5vw] sm:text-7xl lg:text-[8rem] xl:text-[10rem] font-black italic uppercase text-black leading-none"
          style={{
            letterSpacing: "-0.04em",
            paddingLeft: 2,
            paddingRight: 2,
            WebkitTextStroke: "6px white",
            paintOrder: "stroke fill",
            textShadow:
              "4px 4px 0 rgba(0,0,0,0.12), 2px 2px 0 rgba(0,0,0,0.08)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Noel Yaxley
        </motion.h1>
      </motion.div>

      {/* Spacer to push content below fixed title + nav bar */}
      <div className="pt-64 sm:pt-72 lg:pt-88" />

      {/* Main content: Head + Ventures */}
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-center gap-4 lg:gap-1">
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
            <HeadLayers lidRotation={lidRotation} />
            <Squiggles opacity={squiggleOpacity} started={cardsVisible} />
          </div>
        </motion.div>

        {/* Right: Venture cards */}
        <div className="flex flex-col gap-3 w-full lg:w-[340px] lg:mr-[8%] flex-shrink-0">
          {VENTURES.map((venture, i) => (
            <VentureCard
              key={venture.name}
              {...venture}
              index={i}
              visible={cardsVisible}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
