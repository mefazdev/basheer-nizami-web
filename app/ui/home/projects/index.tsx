// components/ProjectsInitiativesSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// import { ImpactMetrics } from './ImpactMetrics';
import { ProjectCard } from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
  status: "completed" | "ongoing" | "upcoming";
  impact: {
    metric: string;
    value: string;
  }[];
  technologies?: string[];
  outcomes: string[];
}

interface ProjectsInitiativesSectionProps {
  projects?: Project[];
  impactMetrics?: {
    label: string;
    value: string;
    icon: string;
  }[];
}

export const ProjectsInitiativesSection: React.FC<
  ProjectsInitiativesSectionProps
> = ({
  projects = [
    {
      id: "stem-academy",
      title: "STEM Excellence Academy",
      category: "Educational Program",
      description:
        "Pioneered a comprehensive STEM education program that integrates cutting-edge technology with hands-on learning experiences, preparing students for 21st-century careers.",
      image: "/images/edu.jpg",
      year: "2019",
      status: "ongoing",
      impact: [
        { metric: "Students Enrolled", value: "2,500+" },
        { metric: "Success Rate", value: "94%" },
        { metric: "University Placements", value: "98%" },
      ],
      technologies: [
        "AI Integration",
        "Virtual Labs",
        "Collaborative Platforms",
      ],
      outcomes: [
        "Increased STEM enrollment by 300%",
        "Partnered with 15+ tech companies",
        "National recognition for innovation",
        "Featured in Education Week",
      ],
    },
    {
      id: "digital-equity",
      title: "Digital Equity Initiative",
      category: "Community Impact",
      description:
        "Launched a district-wide initiative to bridge the digital divide, providing technology access and digital literacy training to underserved communities.",
      image: "/images/edu.jpg",
      year: "2020",
      status: "completed",
      impact: [
        { metric: "Devices Distributed", value: "5,000+" },
        { metric: "Families Served", value: "12,000+" },
        { metric: "Training Hours", value: "25,000+" },
      ],
      technologies: [
        "Device Management",
        "Remote Learning",
        "Family Engagement",
      ],
      outcomes: [
        "Eliminated homework gap for 95% of students",
        "Improved parent engagement by 250%",
        "Secured $2.3M in funding",
        "Model adopted by 20+ districts",
      ],
    },
    {
      id: "teacher-innovation",
      title: "Educator Innovation Lab",
      category: "Professional Development",
      description:
        "Established a cutting-edge professional development center where educators collaborate, experiment with new pedagogies, and develop innovative teaching solutions.",
      image: "/images/edu.jpg",
      year: "2021",
      status: "ongoing",
      impact: [
        { metric: "Teachers Trained", value: "800+" },
        { metric: "Innovation Projects", value: "150+" },
        { metric: "Student Impact", value: "15,000+" },
      ],
      technologies: ["VR/AR Learning", "Data Analytics", "Collaborative Tools"],
      outcomes: [
        "Teacher retention increased by 35%",
        "Student engagement up 60%",
        "Published 25+ research papers",
        "International speaking engagements",
      ],
    },
  ],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
              Portfolio of Impact
            </span>
          </motion.div>

          <h2 className="text-5xl  font-bold text-gray-900 mb-6">
            Key Projects &
            <span className="block bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
              Initiatives
            </span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-8"
          />

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transforming education through innovative programs, strategic
            initiatives, and impactful solutions that create lasting change in
            communities worldwide
          </p>
        </motion.div>

        {/* Impact Metrics */}
        {/* <ImpactMetrics metrics={impactMetrics} /> */}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
