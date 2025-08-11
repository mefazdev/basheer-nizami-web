// components/initiatives/QuranCircleSection.tsx
'use client';

import { motion } from 'framer-motion';
import { BookOpen, Users, Heart, Star, Clock, Award } from 'lucide-react';
import Image from 'next/image';

export const QuranCircle : React.FC = () => {
  const programs = [
    {
      level: "Beginner",
      duration: "3 Months",
      focus: "Basic Recitation & Tajweed",
      students: "50+ Students",
      sessions: "2x/week"
    },
    {
      level: "Intermediate", 
      duration: "6 Months",
      focus: "Memorization & Understanding",
      students: "35+ Students",
      sessions: "3x/week"
    },
    {
      level: "Advanced",
      duration: "12 Months",
      focus: "Tafseer & Application",
      students: "20+ Students", 
      sessions: "4x/week"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Spiritual Development",
      description: "Deepening connection with divine guidance through regular study and reflection."
    },
    {
      icon: BookOpen,
      title: "Arabic Proficiency",
      description: "Developing language skills for better understanding of classical texts."
    },
    {
      icon: Users,
      title: "Community Bonding",
      description: "Building lasting friendships through shared learning experiences."
    },
    {
      icon: Star,
      title: "Character Building",
      description: "Implementing Quranic teachings in daily life and decision-making."
    },
    {
      icon: Clock,
      title: "Discipline & Routine",
      description: "Establishing consistent study habits and time management skills."
    },
    {
      icon: Award,
      title: "Achievement Recognition",
      description: "Celebrating milestones and progress through formal certification."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 bg-gray-700/60 rounded-2xl mb-6">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl md:text-5xl font-bold text-white mb-2 lg:mb-4">
            Quran Circle Training
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-gray-400 mx-auto rounded-full mb-6" />
          <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive Quranic education program designed to nurture spiritual growth, 
            linguistic proficiency, and practical application of divine guidance in modern life.
          </p>
        </motion.div>

        {/* Program Overview */}
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
                  src="/images/quran.jpg"
                  alt="Quran Circle Training Session"
                  className="w-full h-full object-cover opacity-80"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
        
                <div className="absolute top-3 lg:top-6 left-0 lg:left-6">
                  <div className=" bg-gradient-to-r from-gray-800 to-gray-600 text-white px-4 py-2 rounded-full text-sm lg:font-bold">
                 Sacred Learning
                  </div>
                </div>
              </div>
              
            
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 lg:-bottom-8   lg:-right-8 bg-slate-800 border border-gray-500/30 p-4 lg:p-6 rounded-2xl shadow-xl"
              >
                <div className="text-xl lg:text-2xl font-bold text-gray-100 mb-1">105+</div>
                <div className="text-white font-semibold mb-2">Active Participants</div>
                <div className="text-sm text-gray-400">Across All Levels</div>
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
              Holistic Quranic Education
            </h3>
            
            <p className="lg:text-lg text-gray-300 leading-relaxed">
              Our Quran Circle program combines <strong>traditional scholarship</strong> with 
              <strong>modern pedagogical approaches</strong>, creating an environment where 
              students develop both spiritual connection and practical understanding.
            </p>
            
            <div className="bg-gray-500/10 border border-gray-500/20 rounded-2xl p-4 lg:p-6">
              <h4 className="font-bold text-white mb-4">Program Methodology</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">📚</span>
                  <span>Structured curriculum with progressive learning stages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">👨‍🏫</span>
                  <span>Expert instructors with traditional and modern training</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">🎯</span>
                  <span>Personalized attention and individualized progress tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3">🌟</span>
                  <span>Integration of Quranic values with contemporary life</span>
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-8 py-4 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
            >
              Join Quran Circle
            </motion.button>
          </motion.div>
        </div>

        {/* Program Levels */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-gradient-to-b from-slate-800 border border-gray-500/20 rounded-2xl p-4 lg:p-8 h-full hover:border-gray-500/40 transition-all duration-300 relative overflow-hidden">
            
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div className="w-full h-full bg-gray-50 rounded-full transform translate-x-16 -translate-y-16" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-600  0 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-300 transition-colors">
                    {program.level}
                  </h4>
                  
                  <p className="text-gray-300 mb-6">{program.focus}</p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-gray-100 font-semibold">{program.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Students:</span>
                      <span className="text-white font-semibold">{program.students}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Sessions:</span>
                      <span className="text-gray-100 font-semibold">{program.sessions}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Program Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-slate-800 border border-gray-500/20 rounded-3xl p-8 lg:p-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Program Benefits</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-gray-300 transition-colors">
                  {benefit.title}
                </h4>
                
                <p className="text-gray-300 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

      
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {[
              { number: "95%", label: "Completion Rate", description: "Student Success" },
              { number: "150+", label: "Graduates", description: "Since Launch" },
              { number: "12", label: "Expert Instructors", description: "Qualified Teachers" },
              { number: "100%", label: "Satisfaction", description: "Parent Feedback" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-gray-400/10 border border-gray-500/20 rounded-xl p-6"
              >
                <div className="text-2xl font-bold text-gray-100 mb-2">{stat.number}</div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};