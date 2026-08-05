"use client";

import { useState, useEffect, useRef } from "react";
import { HeadLayers } from "./head-layers";
import { Squiggles } from "./squiggles";
import { VentureCard } from "./venture-card";
import { CONTACT_EMAIL } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
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

// The two UpScale ventures lead; the rest sit under a quieter label.
const FLAGSHIP_COUNT = 2;

export function HeroSection() {
  const { scrollY, scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const [scrollMode, setScrollMode] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);
  const [headOrigin, setHeadOrigin] = useState<{ x: number; y: number } | null>(null);

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
  const titleEnd = isDesktop ? 220 : 500;
  const titleY = useTransform(scrollY, [titleStart, titleEnd], [0, -60]);
  const titleOpacity = useTransform(scrollY, [titleStart, titleEnd], [1, 0]);

  // Motion values controlled first by initial animation, then by scroll
  const lidRotation = useMotionValue(0);
  const squiggleOpacity = useMotionValue(0);

  // Phase 1: Initial entrance — lid springs open, then squiggles + thumbnails fly
  useEffect(() => {
    if (reduceMotion) {
      lidRotation.set(-45);
      squiggleOpacity.set(1);
      setCardsVisible(true);
      return;
    }

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;

      // Measure head position for thumbnail emission point
      if (headRef.current) {
        const rect = headRef.current.getBoundingClientRect();
        setHeadOrigin({
          x: rect.left + rect.width * 0.55,
          y: rect.top + rect.height * 0.15,
        });
      }
      setCardsVisible(true);
      animate(squiggleOpacity, 1, { duration: 0.4 }).then(() => {
        setScrollMode(true);
      });
    };

    const controls = animate(lidRotation, -45, {
      delay: 0.3,
      type: "spring",
      mass: 1.5,
      stiffness: 100,
      damping: 12,
    });

    controls.then(reveal);
    // Fallback: never let a dropped spring callback strand the entrance
    const fallback = window.setTimeout(reveal, 1000);

    return () => {
      controls.stop();
      window.clearTimeout(fallback);
    };
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
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        >
          Noel Yaxley
        </motion.h1>
      </motion.div>

      {/* Spacer to push content below fixed title + nav bar */}
      <div className="pt-44 sm:pt-56 lg:pt-80" />

      {/* What he does, and the one way in.
          The bottom margin clears the head lid, which swings up out of its box —
          sized to the lid's peak reach (the entrance spring overshoots to ~-54deg),
          plus the same ~40-50px of breathing room the desktop row gets. */}
      <div className="w-full max-w-[34rem] flex flex-col items-center text-center gap-4 mb-40 sm:mb-44 lg:mb-10">
        <p
          className="font-body font-medium text-[17px] sm:text-lg lg:text-xl text-black leading-snug text-balance"
          style={{ letterSpacing: "-0.3px" }}
        >
          Construction project management, property development and architecture
          in Sydney. Here&rsquo;s everything I&rsquo;m building.
        </p>
        <motion.a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 sm:py-2.5 font-body font-semibold text-sm sm:text-base text-white no-underline"
          style={{ letterSpacing: "-0.3px" }}
          whileHover={reduceMotion ? undefined : { y: -2 }}
          transition={{ duration: 0.2 }}
        >
          Work with me
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
        </motion.a>
      </div>

      {/* Main content: Head + Ventures */}
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-center gap-4 lg:gap-1">
        {/* Left: Head graphic + Squiggles — 65% width */}
        <motion.div
          className="relative flex-shrink-0 lg:w-[65%] flex justify-center overflow-visible pointer-events-none"
          initial={{ x: -700 }}
          animate={{ x: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  mass: 1,
                }
          }
        >
          <div className="relative">
            <div ref={headRef}>
              <HeadLayers lidRotation={lidRotation} />
            </div>
            <Squiggles opacity={squiggleOpacity} started={cardsVisible} />
          </div>
        </motion.div>

        {/* Right: Venture cards */}
        <div className="flex flex-col gap-3 w-full lg:w-[340px] lg:mr-[8%] flex-shrink-0">
          {VENTURES.slice(0, FLAGSHIP_COUNT).map((venture, i) => (
            <VentureCard
              key={venture.name}
              {...venture}
              index={i}
              visible={cardsVisible}
              headOrigin={headOrigin}
            />
          ))}

          <p
            className="font-body font-semibold text-[12px] uppercase text-[#57524F] mt-3 mb-0.5"
            style={{ letterSpacing: "0.08em" }}
          >
            Also building
          </p>

          {VENTURES.slice(FLAGSHIP_COUNT).map((venture, i) => (
            <VentureCard
              key={venture.name}
              {...venture}
              index={i + FLAGSHIP_COUNT}
              visible={cardsVisible}
              headOrigin={headOrigin}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
