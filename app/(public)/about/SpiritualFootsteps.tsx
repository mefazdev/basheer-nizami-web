// components/about/SpiritualFootstepsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Star, Book, Users, Heart, Award, Globe } from 'lucide-react';

export const SpiritualFootstepsSection: React.FC = () => {
  const inspirations = [
    {
      icon: Star,
      title: "Prophetic Guidance",
      description: "Drawing inspiration from the ultimate teacher and guide, whose principles of education, character, and service illuminate our path.",
      quote: "Seek knowledge from the cradle to the grave"
    },
    {
      icon: Book,
      title: "Kerala Scholars",
      description: "Traditional scholars from my homeland who preserved and transmitted knowledge through generations with dedication and wisdom.",
      quote: "Knowledge is the heritage of the wise"
    },
    {
      icon: Users,
      title: "Spiritual Mentors",
      description: "Guidance from revered spiritual teachers who emphasize inclusive education, compassion, and service to humanity.",
      quote: "Love all, serve all"
    },
    {
      icon: Globe,
      title: "Contemporary Educators",
      description: "Modern educational leaders who bridge traditional wisdom with contemporary teaching methodologies and global perspectives.",
      quote: "Wisdom is the treasure of humanity"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-black to-gray-800 text-white overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="spiritual-pattern" width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="12.5" cy="12.5" r="8" fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="12.5" cy="12.5" r="3" fill="white" fillOpacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#spiritual-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-gray-400 to-stone-300 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
              Guided by Wisdom
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl md:text-5xl font-bold mb-2 lg:mb-4">
            Spiritual Footsteps
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-600 to-stone-800 mx-auto rounded-full mb-6" />
          <p className="text-lg lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Inspired by prophetic teachings and under the mentorship of scholars from Kerala to Gujarat, 
            I walk the path of service, patience, and sincerity.
          </p>
        </motion.div>

        {/* Central Inspiration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 bg-gradient-to-t from-zinc-500 via-slate-600 to-lime-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <Heart className="w-16 h-16 text-white" />
            </motion.div>
            <p className="text-2xl font-bold text-gray-300 mb-2">The Light of Service</p>
            <p className="text-slate-300 max-w-md mx-auto">
              illuminates every lesson I deliver, every decision I make, and every dream I nurture for our students.
            </p>
          </div>
        </motion.div>

        {/* Spiritual Inspirations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {inspirations.map((inspiration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-lime-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <inspiration.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4 text-center group-hover:text-lime-100 transition-colors">
                  {inspiration.title}
                </h4>
                
                <p className="text-slate-300 leading-relaxed mb-6 text-center">
                  {inspiration.description}
                </p>
                
                <div className="bg-white/5 rounded-2xl p-4 border-l-4 border-gray-200">
                  <p className="text-sm text-gray-100 italic text-center">
                  &quot;{inspiration.quote}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Guiding Principles</h3>
            <p className="text-slate-300 max-w-3xl mx-auto">
              Every aspect of our educational journey is guided by these fundamental values that shape character and inspire excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Service",
                description: "Serving humanity with dedication, humility, and unconditional commitment to making a positive difference",
                subtitle: "Dedicated Service"
              },
              {
                icon: Award,
                title: "Patience",
                description: "Persevering through challenges with wisdom, resilience, and trust in the journey of growth",
                subtitle: "Patient Perseverance"
              },
              {
                icon: Heart,
                title: "Sincerity",
                description: "Pure intention in all actions, seeking truth, excellence, and the betterment of all",
                subtitle: "Sincere Purpose"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {value.title}
                </h4>
                
                <div className="text-lg font-semibold text-gray-200 mb-4">
                  {value.subtitle}
                </div>
                
                <p className="text-slate-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us on this transformative journey of educational excellence, where every lesson builds character, 
            every student receives dedicated care, and every achievement serves a greater purpose.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl"
          >
            Begin Your Journey
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};