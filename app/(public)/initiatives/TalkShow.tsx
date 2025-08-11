
'use client';

import { motion } from 'framer-motion';
import { Mic,  Play,   } from 'lucide-react';
import Image from 'next/image';

export const YouthTalkShow : React.FC = () => {
  // const shows = [
  //   {
  //     title: "Future Leaders Forum",
  //     description: "Weekly discussions on leadership, innovation, and youth empowerment",
  //     episodes: "24 Episodes",
  //     viewers: "50K+ Views",
  //     format: "Live & Interactive"
  //   },
  //   {
  //     title: "Values & Vision",
  //     description: "Deep conversations about character development and spiritual growth",
  //     episodes: "18 Episodes",
  //     viewers: "35K+ Views",
  //     format: "Panel Discussion"
  //   },
  //   {
  //     title: "Success Stories",
  //     description: "Inspiring journeys of young achievers and their transformative experiences",
  //     episodes: "30 Episodes",
  //     viewers: "75K+ Views",
  //     format: "Interview Style"
  //   }
  // ];

  const topics = [
    { icon: "💡", topic: "Innovation & Entrepreneurship", description: "Inspiring young minds to create solutions" },
    { icon: "🎯", topic: "Goal Setting & Achievement", description: "Strategic planning for personal success" },
    { icon: "🌟", topic: "Character & Values", description: "Building strong moral foundations" },
    { icon: "🤝", topic: "Community Leadership", description: "Service and social responsibility" },
    { icon: "📚", topic: "Education & Career", description: "Academic excellence and career guidance" },
    { icon: "🌍", topic: "Global Perspectives", description: "Understanding diverse cultures and ideas" }
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
          <div className="inline-block p-4 bg-gray-100 rounded-2xl mb-6">
            <Mic className="w-12 h-12 text-gray-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl md:text-5xl font-bold   mb-4">
            Youth Talk Shows
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-6" />
          <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Engaging multimedia platform featuring inspiring conversations, thought-provoking discussions, 
            and empowering content designed specifically for the next generation of leaders.
          </p>
        </motion.div>

        {/* Show Format Overview */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 ">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-black/20 to-gray-600/20 border border-gray-500/30">
                <Image
                  src="/images/talk.jpeg"
                  alt="Youth Talk Show Recording"
                  className="w-full h-full object-cover rounded-3xl"
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 lg:w-20 h-16 lg:h-20 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors duration-300"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.div>
                </div>
                
                {/* Live Badge */}
                 
              </div>
              
              {/* View Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-4 lg:-right-8 bg-slate-800 border border-gray-300/30 p-3 lg:p-6 rounded-2xl shadow-xl"
              >
                <div className="text-xl lg:text-2xl font-bold text-gray-100 mb-1">160K+</div>
                <div className="text-white lg:font-semibold mb-2">Total Views</div>
                {/* <div className="text-sm text-gray-400">Across All Shows</div> */}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 "
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-6">
              Inspiring the Next Generation
            </h3>
            
            <p className="lg:text-lg text-gray-800 leading-relaxed ">
              Our talk shows create a <strong>dynamic platform</strong> for meaningful conversations 
              that inspire, educate, and empower young minds to pursue excellence while 
              staying true to their values.
            </p>
            
            <div className="bg-gray-50 border border-gray-500/20 rounded-2xl p-4 lg:p-6">
              {/* <h4 className="font-bold text-white mb-4">Show Features</h4> */}
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  
                  <span>Startup Sparks – young innovators</span>
                </li>
                <li className="flex items-start">
                  
                  <span>Talent Spot – showcase skills</span>
                </li>
                <li className="flex items-start">
                   
                  <span>Real Talks – honest life stories</span>
                </li>
                <li className="flex items-start">
                  {/* <span className="text-red-400 mr-3">📚</span> */}
                  <span>Future Buzz – careers & innovation</span>
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-600 to-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
            >
              Watch Latest Episodes
            </motion.button>
          </motion.div>
        </div>

        {/* Show Series */}
        {/* <div className="grid md:grid-cols-3 gap-8 mb-16">
          {shows.map((show, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="bg-slate-800 border border-red-500/20 rounded-2xl p-8 h-full hover:border-red-500/40 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">
                  {show.title}
                </h4>
                
                <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                  {show.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Episodes:</span>
                    <span className="text-red-400 font-semibold">{show.episodes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Views:</span>
                    <span className="text-red-400 font-semibold">{show.viewers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Format:</span>
                    <span className="text-white font-semibold">{show.format}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div> */}

        {/* Popular Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-900 via-black to-gray-800 border border-red-500/20 rounded-3xl p-6 lg:p-12"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white text-center mb-12">Popular Discussion Topics</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-500/10 border border-gray-500/20 rounded-2xl p-3 lg:p-6 text-center hover:border-gray-500/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h4 className="text-lg font-bold text-white mb-3">{topic.topic}</h4>
                <p className="text-gray-300 text-sm">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};