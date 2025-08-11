// components/VisionMissionSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { VisionStatement } from "./VisionStatement";
// import { MissionGoals } from "./MissionGoals";

interface VisionMissionSectionProps {
  vision?: {
    title: string;
    statement: string;
    subtitle?: string;
  };
   mission?: {
    title: string;
    statement: string;
    subtitle?: string;
  };
  // mission?: {
  //   title: string;
  //   subtitle: string;
  //   goals: {
  //     icon: string;
  //     title: string;
  //     description: string;
  //     metric?: string;
  //   }[];
  // };
}

export const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({
  vision = {
    title: "The Vision",
    subtitle: "Transforming Education Through Visionary Leadership",
    statement:
      "My vision is to build 100+ leaders every year who can carry the Qur’an in their hearts and the world on their shoulders",
  },
  mission = {
     title: "The Mission",
    subtitle: "Driving Educational Excellence Through Strategic Leadership & Innovation",
    statement:
      "My mission is to nurture  social change-makers through spiritual strength and academic excellence.",

  }
  // mission = {
  //   title: "The Mission",
  //   subtitle:
  //     "Driving Educational Excellence Through Strategic Leadership & Innovation",
  //   goals: [
  //     {
  //       icon: "🎯",
  //       title: "Strategic Educational Leadership",
  //       description:
  //         "Spearheading transformational change in educational institutions through data-driven decision making and innovative policy development.",
  //       metric: "50+ Institutions Transformed",
  //     },
  //     {
  //       icon: "🌟",
  //       title: "Excellence in Pedagogy",
  //       description:
  //         "Advancing cutting-edge teaching methodologies that integrate technology, personalized learning, and holistic student development.",
  //       metric: "40% Improvement in Outcomes",
  //     },
  //     {
  //       icon: "🤝",
  //       title: "Collaborative Innovation",
  //       description:
  //         "Building strategic partnerships with educators, researchers, and technology leaders to pioneer the future of education.",
  //       metric: "25+ Strategic Partnerships",
  //     },
  //     {
  //       icon: "📈",
  //       title: "Sustainable Impact",
  //       description:
  //         "Creating lasting educational reforms that ensure long-term positive outcomes for students, educators, and communities.",
  //       metric: "25,000+ Lives Impacted",
  //     },
  //     {
  //       icon: "🔬",
  //       title: "Research & Development",
  //       description:
  //         "Conducting groundbreaking research in educational psychology, learning analytics, and institutional effectiveness.",
  //       metric: "15+ Published Studies",
  //     },
  //     {
  //       icon: "🌍",
  //       title: "Global Educational Advocacy",
  //       description:
  //         "Championing educational equity and access on international platforms, influencing policy at the highest levels.",
  //       metric: "Global Recognition",
  //     },
  //   ],
  // },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 lg:py-32 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Advanced Background Elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-slate-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000" />
      </motion.div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-5"
      >
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-4 rounded-2xl bg-gradient-to-r from-black/60 to-gray-900 backdrop-blur-sm border border-gray-700 mb-3`"
          >
            <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-400 to-gray-200 bg-clip-text text-transparent">
              Vision & Mission
            </h2>
          </motion.div>

          {/* <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-gray-900 to-gray-400 mx-auto rounded-full mb-6"
          /> */}

          {/* <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Driving transformational change in education through strategic
            leadership, innovation, and unwavering commitment to excellence
          </motion.p> */}
        </motion.div>

        {/* Vision Statement */}
        <VisionStatement {...vision} />
   <VisionStatement {...mission} />
        {/* Mission Goals */}
        {/* <MissionGoals {...mission} /> */}
      </motion.div>
    </section>
  );
};
