
// components/about/JourneySection.tsx
'use client';

import { motion } from 'framer-motion';
import { MapPin, BookOpen, Heart, Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export const JourneySection: React.FC = () => {
  const milestones = [
    {
      icon: MapPin,
      title: "Kerala Roots",
      description: "Born and raised in Kerala, where educational excellence is deeply valued. The foundation of my passion for learning was built in classrooms that emphasized both academic rigor and character development."
    },
    {
      icon: BookOpen,
      title: "Student Life",
      description: "Every challenge became a lesson in resilience and determination. The journey through higher education taught me that true learning extends beyond textbooks to encompass life experiences and personal growth."
    },
    {
      icon: Heart,
      title: "Vision Awakens",
      description: "Recognizing the gap between traditional values and modern educational needs, I envisioned an institution that could bridge this divide and create well-rounded, values-driven leaders."
    },
    {
      icon: TrendingUp,
      title: "Gujarat Foundation",
      description: "In Gujarat's dynamic environment, AILT Global Academy was established as a testament to innovative education that combines academic excellence with strong moral foundations."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
            My Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-6" />
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From a student in Kerala to the founder of a transformative value-based school in Gujarat, 
            my story is built on a deep love for education, spirituality, and the youth of tomorrow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Personal Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5]  rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src="/images/3.jpeg"
                alt="Educational Leader"
                className="w-full h-full object-cover "
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
            </div>
            
            {/* Professional Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute hidde lg:block -bottom-6 -right-6 bg-white p-3 lg:p-6 rounded-2xl shadow-xl max-w-64 border-l-4 border-gray-300"
            >
              <p className="text-sm text-gray-700 italic mb-2">
                &quot;Every hardship became a lesson. Every student, a responsibility. Every opportunity, a platform to serve.&quot;
              </p>
              <div className="text-xs text-gray-600 font-semibold">— Personal Philosophy</div>
            </motion.div>
          </motion.div>

          {/* Journey Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="lg:flex items-start space-x-4 group"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <milestone.icon className="w-7 h-7 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mt-3 lg:mt-0 lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {[
            { icon: Heart, title: "Love for Education", description: "Passionate commitment to learning excellence" },
            { icon: BookOpen, title: "Values Integration", description: "Blending traditional wisdom with modern knowledge" },
            { icon: Users, title: "Youth Empowerment", description: "Developing confident, capable leaders" },
            { icon: MapPin, title: "Community Impact", description: "Creating positive change in society" }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-50 to-gray-200 p-6 rounded-2xl text-center border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <value.icon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
              <p className="text-sm text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};