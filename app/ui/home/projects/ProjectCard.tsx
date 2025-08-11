// components/projects/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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

interface ProjectCardProps {
  project: Project;
  index: number;
}

const statusStyles = {
  completed: "bg-green-100 text-green-800 border-green-200",
  ongoing: "bg-blue-100 text-blue-800 border-blue-200",
  upcoming: "bg-purple-100 text-purple-800 border-purple-200",
};

const statusIcons = {
  completed: "✅",
  ongoing: "🔄",
  upcoming: "🚀",
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      className="group cursor-pointer"
      style={{ willChange: "transform" }}
    >
      {/* <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"> */}
      <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden border border-gray-100">
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            // className="object-cover transition-transform duration-700 group-hover:scale-110"

            className="object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                statusStyles[project.status]
              }`}
            >
              {statusIcons[project.status]}{" "}
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>

          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
            <span className="text-white text-sm font-semibold">
              {project.year}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex space-x-2">
              {project.impact.slice(0, 2).map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 flex-1"
                >
                  <div className="text-white text-xs font-medium">
                    {metric.metric}
                  </div>
                  <div className="text-white text-sm font-bold">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-8">
          <div className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2">
            {project.category}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* {project.technologies && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )} */}

          {/* <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Outcomes:</h4>
            <ul className="space-y-1">
              {project.outcomes.slice(0, 3).map((outcome, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div> */}

          {/* CTA Button */}
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group"
          >
            Explore More
            <motion.svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.button> */}
        </div>

        {/* Hover Effect Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.05 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 pointer-events-none"
        />
      </div>
    </motion.div>
  );
};
