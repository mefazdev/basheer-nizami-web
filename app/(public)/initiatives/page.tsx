// pages/InitiativesPage.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react'; 
// import { LeadershipCourse  } from './LeadershipCourse';
// import { CampusPlan } from './CampusPlan';
// import { YouthTalkShow } from './TalkShow';
import { QuranCircle } from './QuranCircle';

  const Initiatives: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-slate-900  ">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Advanced Background Elements */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-300 to-slate-800 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-zinc-600 to-slate-800 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-stone-400 to-gray-600 rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>

        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 opacity-50">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1D293D" strokeWidth="0.5"/>
                {/* <circle cx="10" cy="10" r="1" fill="#ef4444" fillOpacity="0.3"/> */}
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" className="text-white" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
                Transformative Programs
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl md:text-7xl font-bold text-white mb-6">
              Our
              <span className="block text-gray-200 bg-clip-text ">
                Initiatives
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
            className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
          >
            Pioneering educational programs that shape leaders, build character, and create lasting impact 
            through innovative approaches to learning and development.
          </motion.p>

          {/* Stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid md:grid-cols-4 gap-8"
          >
            {[
              { number: "4", label: "Major Initiatives", description: "Transformative Programs" },
              { number: "1000+", label: "Lives Impacted", description: "Students & Community" },
              { number: "100", label: "Acres Planned", description: "Future Campus" },
              { number: "24/7", label: "Commitment", description: "Dedicated Service" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-all duration-300"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </section>

      {/* Initiatives Sections */}
      {/* <LeadershipCourse /> */}
      {/* <CampusPlan  /> */}
      {/* <YouthTalkShow  /> */}
      <QuranCircle  />
    </div>
  );
};
 
export default Initiatives;


 


