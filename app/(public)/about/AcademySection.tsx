// components/about/AcademySection.tsx
'use client';

import { motion } from 'framer-motion';
import { School, Lightbulb, Heart, Rocket,  } from 'lucide-react';
import Image from 'next/image';

export const AcademySection: React.FC = () => {
  const features = [
    {
      icon: School,
      title: "Leadership Laboratory",
      description: "A dynamic environment where students engage in real-world leadership challenges, developing critical thinking and decision-making skills.",
      color: "from-slate-500 to-gray-400"
    },
    {
      icon: Heart,
      title: "Values Foundation",
      description: "A nurturing space for character development, where ethical principles and moral values are integrated into daily learning.",
        color: "from-slate-600 to-gray-400"
    },
    {
      icon: Rocket,
      title: "Future Launchpad",
      description: "Preparing students for global success through cutting-edge technology, innovative pedagogy, and holistic development programs.",
        color: "from-slate-800 to-gray-300"
    }
  ];

  return (
    <section className="py-16   lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6  ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl lg:text-4xl md:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
            AILT Global Academy
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-6" />
          <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            AILT is not just a school — it&apos;s a <strong>leadership laboratory</strong>, a <strong>values foundation</strong>, 
            and a <strong>launchpad</strong> for youth from across India.
          </p>
        </motion.div>

        {/* Academy Overview */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src="/images/campus.jpeg"
                  alt="AILT Global Academy Campus"
                  className="w-full h-full object-cover rounded-3xl"
                  fill
                />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-3 lg:-right-8 bg-white p-3 lg:p-6 rounded-2xl shadow-xl border-l-4 border-slate-400"
              >
                <div className="text-lg lg:text-2xl font-bold text-gray-600 mb-1">2010</div>
                <div className="text-sm text-gray-600">Established</div>
                <div className="lg:text-lg font-semibold text-gray-900 mt-2">Gujarat, India</div>
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
            <h3 className="text-2xl mt-5 lg:mt-0 lg:text-3xl font-bold text-gray-900 mb-6">
              Where Values Meet Innovation
            </h3>
            
            <p className="lg:text-lg text-gray-700 leading-relaxed">
              We integrate <strong>traditional values</strong>, <strong>modern technology</strong>, 
              and <strong>holistic development</strong> to prepare future-ready leaders who excel 
              in both personal character and professional competence.
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-4 lg:p-6 rounded-2xl border-l-4 border-slate-400">
              <h4 className="font-bold text-gray-900 mb-3">Educational Philosophy</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">📚</span>
                  Strong values foundation for all learning
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">💻</span>
                  Modern technology integrated thoughtfully
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">🌱</span>
                  Holistic development of mind, body, and character
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">🌍</span>
                  Global perspective with strong cultural roots
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r  mt-4 lg:mt-0  from-slate-300 to-black/80 text-white px-8 py-4 rounded-xl font-bold hover:from-red-700 hover:to-gray-700 transition-all duration-300 shadow-lg"
            >
              Explore AILT Academy
            </motion.button>
          </motion.div>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                <div className={`w-14 lg:w-16 h-14 lg:h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                </div>
                
                <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-4 group-hover:text-gray-600 transition-colors">
                  {feature.title}
                </h4>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Student Community */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-slate-900 via-black to-gray-800 rounded-3xl p-6 lg:p-12 text-white text-center"
        >
          <Lightbulb className="w-16 h-16 text-lime-700 mx-auto mb-6" />
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">Pan-India Student Community</h3>
          <p className="text-lg lg:text-xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Students from across India come to AILT to embark on a transformative journey that shapes them into 
            confident leaders, principled individuals, and compassionate global citizens.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "15+", label: "States Represented", description: "Diverse student body" },
              { number: "24/7", label: "Holistic Care", description: "Residential excellence" },
              { number: "100%", label: "Values Integration", description: "Character development focus" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-200 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-100">{stat.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};