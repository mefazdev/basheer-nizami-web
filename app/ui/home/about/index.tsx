"use client";

import { motion } from "framer-motion";
 
import { Biography } from "./Biography";
import { Portrait } from "./Portrait";
 

interface AboutSectionProps {
  biography?: {
    title: string;
    content: string[];
  };
  portrait?: {
    image: string;
    alt: string;
  };
  milestones?: {
    year: string;
    title: string;
    description: string;
    category: "education" | "leadership" | "award" | "achievement";
  }[];
  values?: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const About: React.FC<AboutSectionProps> = ({
  biography = {
    title: "A Visionary Leader in Education",
    content: [
      "From a student in Kerala to the founder of a transformative Islamic value-based school in Gujarat, my story is built on a deep love for education, spirituality, and the youth of tomorrow. Every hardship became a lesson. Every student, a responsibility. And every opportunity, a platform to serve",
       ],
  },
  portrait = {
    image: "/images/leader-portrait.jpg",
    alt: "Educational Leader Portrait",
  },
 
}) => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center  mb-6 lg:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-1 lg:mb-4">
            About
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full" />
        </motion.div>

        {/* Biography and Portrait */}
        <div className="grid lg:grid-cols-2  gap-8 lg:gap-16 items-center ">
        <div className=" order-1 "> <Biography {...biography} /></div>

             <div className=" order-first lg:order-"> <Portrait {...portrait} /></div>  
        </div>

        {/* Timeline */}
        {/* <Timeline milestones={milestones} /> */}

        {/* Core Values */}
        {/* <CoreValues values={values} /> */}
      </div>
    </section>
  );
};

 