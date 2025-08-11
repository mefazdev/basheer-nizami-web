"use client";

import { motion } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  description: string;
  category: "education" | "leadership" | "award" | "achievement";
}

interface TimelineProps {
  milestones: Milestone[];
}

const categoryStyles = {
  education: "bg-green-100 text-green-800 border-green-200",
  leadership: "bg-blue-100 text-blue-800 border-blue-200",
  award: "bg-yellow-100 text-yellow-800 border-yellow-200",
  achievement: "bg-purple-100 text-purple-800 border-purple-200",
};

const categoryIcons = {
  education: "📚",
  leadership: "👑",
  award: "🏆",
  achievement: "⭐",
};

export const Timeline: React.FC<TimelineProps> = ({ milestones }) => {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Journey of Excellence
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Key milestones that have shaped our leader&apos;s remarkable career in
          education and leadership
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden md:block" />

        {/* Timeline items */}
        <div className="space-y-10">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden md:block z-10" />

              {/* Content card */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-600">
                      {milestone.year}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        categoryStyles[milestone.category]
                      }`}
                    >
                      {categoryIcons[milestone.category]}{" "}
                      {milestone.category.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {milestone.title}
                  </h4>

                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Mobile timeline indicator */}
              <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg md:hidden absolute left-4 top-6" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
