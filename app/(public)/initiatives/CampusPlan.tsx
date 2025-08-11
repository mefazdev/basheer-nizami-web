// components/initiatives/CampusPlanSection.tsx
'use client';

import { motion } from 'framer-motion';
import { MapPin, Building, TreePine, Users, Lightbulb, Zap } from 'lucide-react';
import Image from 'next/image';

export const CampusPlan : React.FC = () => {
  const facilities = [
    { icon: Building, name: "Academic Complex", description: "State-of-the-art classrooms and laboratories" },
    { icon: Users, name: "Residential Halls", description: "Modern dormitories for 2000+ students" },
    { icon: Lightbulb, name: "Innovation Center", description: "Research labs and maker spaces" },
    { icon: TreePine, name: "Green Spaces", description: "Sustainable landscaping and recreation areas" },
    { icon: Zap, name: "Sports Complex", description: "Olympic-standard athletic facilities" },
    { icon: MapPin, name: "Cultural Center", description: "Auditorium, mosque, and community spaces" }
  ];

  const phases = [
    { phase: "Phase 1", timeline: "2025-2026", area: "25 Acres", focus: "Core Academic Buildings" },
    { phase: "Phase 2", timeline: "2027-2028", area: "35 Acres", focus: "Residential & Sports Complex" },
    { phase: "Phase 3", timeline: "2029-2030", area: "40 Acres", focus: "Innovation & Cultural Centers" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 via-black to-slate-800">
      <div className="max-w-7xl mx-auto px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <div className="inline-block p-4 bg-red-500/10 rounded-2xl mb-6">
            <Building className="w-12 h-12 text-red-400" />
          </div> */}
          <h2 className="text-4xl lg:text-4xl md:text-5xl font-bold text-white mb-2 lg:mb-4">
            100-Acre Campus Plan
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-gray-700 mx-auto rounded-full mb-6" />
          <p className="lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            An ambitious vision to create a world-class educational campus that integrates modern infrastructure 
            with sustainable design, fostering innovation and character development.
          </p>
        </motion.div>

        {/* Master Plan Visualization */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30">
                <Image
                  src="/images/ai-campus.jpg"
                  alt="100-Acre Campus Master Plan"
                  className="w-full h-full object-cover   rounded-3xl"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Master Plan Badge */}
                {/* <div className="absolute top-6 left-6">
                  <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    🏗️ Master Plan 2025-2030
                  </div>
                </div> */}
              </div>
              
              {/* Campus Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 lg:-bottom-8 -right-2 lg:-right-8    border border-gray-400 lg:border-gray-600   p-6 rounded-2xl shadow-3xl"
              >
                <div className="text-2xl font-bold text-gray-200 mb-1">100</div>
                <div className="text-white font-semibold mb-2">Acres</div>
                <div className="text-sm text-gray-300">World-Class Campus</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
              Future-Ready Infrastructure
            </h3>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Our campus plan represents a <strong>₹500+ crore investment</strong> in creating 
              an educational environment that seamlessly blends <strong>traditional values</strong> 
              with <strong>cutting-edge facilities</strong>.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-600/30 border border-gray-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-100 mb-1">2000+</div>
                <div className="text-sm text-gray-300">Student Capacity</div>
              </div>
              <div className="bg-gray-600/30 border border-gray-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-100 mb-1">50+</div>
                <div className="text-sm text-gray-300">World-Class Facilities</div>
              </div>
            </div>
            
            <div className="bg-gray-600/30 border border-gray-500/20 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-4">Sustainability Features</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">🌱</span>
                  <span>100% renewable energy infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">💧</span>
                  <span>Advanced water conservation systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">🌳</span>
                  <span>40% green space with native vegetation</span>
                </li>
              </ul>
            </div>

            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
            >
              View Master Plan Details
            </motion.button> */}
          </motion.div>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-gradient-to-b from-gray-600   border border-gray-500/20 rounded-2xl p-8 h-full hover:border-gray-500/40 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-gray-800/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <facility.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-gray-400 transition-colors">
                  {facility.name}
                </h4>
                
                <p className="text-gray-300 leading-relaxed text-sm">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Development Phases */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-slate-800 border border-red-500/20 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Development Timeline</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < phases.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-red-500/30 transform -translate-y-1/2 z-0" />
                )}
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                    <div className="absolute -inset-2 bg-red-500/20 rounded-full animate-pulse" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-2">{phase.phase}</h4>
                  <p className="text-red-400 font-semibold mb-2">{phase.timeline}</p>
                  <p className="text-gray-300 text-sm mb-4">{phase.area}</p>
                  
                  <div className="bg-red-500/10 rounded-lg py-3 px-4">
                    <p className="text-white font-medium text-sm">{phase.focus}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};
