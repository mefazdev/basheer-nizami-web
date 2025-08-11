// components/about/MissionVisionSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Users, Globe, Award, TrendingUp } from 'lucide-react';

export const MissionVisionSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-black to-gray-800 text-white overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="mission-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
              <circle cx="10" cy="10" r="8" fill="none" stroke="white" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mission-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl md:text-5xl font-bold mb-4">
            Mission & Vision
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-gray-800 mx-auto rounded-full mb-6" />
          <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Driven by a clear purpose and guided by ambitious goals, our mission and vision 
            shape every aspect of our educational approach.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className=" bg-gradient-to-b from-slate-800 rounded-3xl p-4 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-black rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">Our Mission</h3>
              </div>
              
              <div className="mb-8">
                <p className="text-lg lg:text-xl text-blue-100 leading-relaxed mb-6">
                  My mission is to nurture <span className="font-bold text-white">social change-makers</span> through 
                  spiritual strength and academic excellence.
                </p>
                
                <div className="bg-white/5 rounded-2xl p-3 lg:p-6 border-l-4 border-gray-500">
                  <h4 className="font-bold text-white mb-3">Core Objectives:</h4>
                  <ul className="space-y-2 text-blue-100">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      Integrate spiritual values with modern education
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      Develop character alongside academic excellence
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      Prepare youth to be positive change agents
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      Foster critical thinking with ethical foundations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-gradient-to-b from-slate-800 rounded-3xl p-4 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-black rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">Our Vision</h3>
              </div>
              
              <div className="mb-8">
                <p className="text-lg lg:text-xl   leading-relaxed mb-6">
                  My vision is to build <span className="font-bold text-white">100+ leaders every year</span> who 
                  can carry strong values in their hearts and the world on their shoulders.
                </p>
                
                <div className="bg-white/5 rounded-2xl p-3 lg:p-6 border-l-4 border-gray-500">
                  <h4 className="font-bold text-white mb-3">Vision Pillars:</h4>
                  <ul className="space-y-2  ">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      Values in their hearts - Strong moral foundation
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      World on their shoulders - Global responsibility
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      100+ leaders annually - Measurable impact
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      Future-ready mindset - Modern competencies
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-4 gap-8"
        >
          {[
            { icon: Users, number: "500+", label: "Students Impacted", description: "Across all programs" },
            { icon: Globe, number: "15+", label: "States Reached", description: "Pan-India presence" },
            { icon: Award, number: "95%", label: "Success Rate", description: "Academic & Character" },
            { icon: TrendingUp, number: "100+", label: "Annual Leaders", description: "Vision target" }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <metric.icon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">{metric.number}</div>
              <div className="text-lg font-semibold text-slate-100 mb-1">{metric.label}</div>
              <div className="text-sm text-white/70">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};