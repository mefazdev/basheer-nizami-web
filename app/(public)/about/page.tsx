// pages/AboutPage.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { JourneySection } from "./JourneySection";
import { MissionVisionSection } from "./MissionVision";
import { AcademySection } from "./AcademySection";
import { SpiritualFootstepsSection } from "./SpiritualFootsteps";

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Advanced Background Elements */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>

        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="professional-grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#professional-grid)"
              className="text-slate-600"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            {/* <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
                Educational Leadership
              </span>
            </div> */}

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {/* About */}
              <span className="block bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                {/* My Journey */}      About
              </span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-8"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
          >
            A transformative journey from Kerala to Gujarat, building bridges
            between traditional values and modern educational excellence to
            nurture tomorrow&apos;s leaders.
          </motion.p>
        </div>
      </section>

      {/* Journey Section */}
      <JourneySection />

      {/* Mission & Vision Section */}
      <MissionVisionSection />

      {/* AILT Global Academy Section */}
      <AcademySection />

      {/* Spiritual Footsteps Section */}
      <SpiritualFootstepsSection />
    </div>
  );
};

export default AboutPage;
