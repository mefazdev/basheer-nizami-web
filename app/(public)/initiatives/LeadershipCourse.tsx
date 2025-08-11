'use client';

import { motion } from 'framer-motion';
import { Crown, Users, TrendingUp, Award, BookOpen, Target } from 'lucide-react';
import Image from 'next/image';

export const LeadershipCourse: React.FC = () => {
  const features = [
    {
      icon: Crown,
      title: "Executive Leadership",
      description: "Advanced leadership principles, decision-making frameworks, and executive presence development."
    },
    {
      icon: Users,
      title: "Team Building",
      description: "Collaborative leadership strategies, team dynamics, and effective communication skills."
    },
    {
      icon: TrendingUp,
      title: "Strategic Thinking",
      description: "Long-term vision development, strategic planning, and innovative problem-solving approaches."
    },
    {
      icon: Award,
      title: "Character Excellence",
      description: "Values-based leadership, ethical decision-making, and moral courage development."
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Growth mindset cultivation, adaptive learning, and knowledge management systems."
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Performance optimization, accountability systems, and results-driven methodologies."
    }
  ];

  const curriculum = [
    { module: "Foundation", weeks: "1-2", topics: ["Leadership Principles", "Self-Assessment", "Vision Development"] },
    { module: "Communication", weeks: "3-4", topics: ["Public Speaking", "Interpersonal Skills", "Digital Presence"] },
    { module: "Strategy", weeks: "5-6", topics: ["Strategic Planning", "Innovation Methods", "Change Management"] },
    { module: "Implementation", weeks: "7-8", topics: ["Project Management", "Team Leadership", "Performance Metrics"] }
  ];

  return (
    <section className="py-20  bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           
          <h2 className="text-3xl md:text-5xl font-bold   mb-4">
            Leadership Course
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-6" />
          <p className="text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            A comprehensive 8-week intensive program designed to develop the next generation of 
            visionary leaders through practical training, mentorship, and real-world application.
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
              <div className="aspect-[4/3] rounded-3xl overflow-hidden  ">
               
                <Image
                  src="/images/leadership.jpg"
                  alt="Leadership Course Training"
                  className="w-full h-full object-cover  rounded-3xl"
               fill />
                
                {/* Floating Badge */}
                <div className="absolute top-3 lg:top-6 left-3 lg:left-6">
                  <div className=" bg-gradient-to-r from-red-500 to-black text-white px-4 py-2 rounded-full text-sm lg:font-bold">
                   Premium Program
                  </div>
                </div>
              </div>
              
            
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800  mb-2 lg:mb-6">
              Develop Visionary Leaders
            </h3>
            
            <p className="lg:text-lg text-gray-800 leading-relaxed">
              Our leadership course combines <strong>traditional wisdom</strong> with 
              <strong>modern methodologies</strong> to create leaders who can navigate 
              complex challenges while maintaining strong moral foundations.
            </p>
            
            <div className="  bg-slate-100 rounded-2xl p-4 lg:p-6">
              <h4 className="font-bold t  mb-4">Program Highlights</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>One-on-one mentorship with industry leaders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Real-world project implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>International case study analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Leadership certification upon completion</span>
                </li>
              </ul>
            </div>

            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
            >
              Apply for Leadership Course
            </motion.button> */}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-slate-100      rounded-2xl p-8 h-full hover:border-red-500/40 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-700 transition-colors">
                  {feature.title}
                </h4>
                
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Curriculum Timeline */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-slate-800 border border-red-500/20 rounded-3xl p-12"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Course Curriculum</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {curriculum.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2">{module.module}</h4>
                <p className="text-red-400 font-semibold mb-4">Weeks {module.weeks}</p>
                
                <ul className="space-y-2 text-sm text-gray-300">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="bg-red-500/10 rounded-lg py-2 px-3">
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};