import React, { useState } from 'react';
import { 
  Users, Building2, BookOpen,  
  
} from 'lucide-react';
import { motion } from "framer-motion";
import Link from 'next/link';
export default function KeyInitiativesSection() {
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const initiatives = [
    {
      id: 1,
      title: "Leadership Course",
      subtitle: "Grades 6–12",
      description: "A 3-month model to build confident, conscious, change-making students.",
      duration: "3 Months",
      target: "Grades 6-12",
      icon: Users,
   
      features: [
        "Leadership Skills Development",
        "Confidence Building",
        "Change-Making Mindset",
        "Character Formation"
      ],
      status: "Active Program",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      title: "100-Acre Future Campus",
      subtitle: "Landmark Project",
      description: "A landmark Islamic educational project under development.",
      area: "100 Acres",
      target: "All Levels",
      icon: Building2,
      
      features: [
        "State-of-the-Art Facilities",
        "Comprehensive Education",
        "Islamic Values Integration",
        "Modern Learning Spaces"
      ],
      status: "In Development",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      title: "Quran Circle Training",
      subtitle: "Peer Mentorship",
      description: "Enabling student mentors to lead Tajweed & Tafsir-based Quran circles.",
      duration: "Ongoing",
      target: "Student Mentors",
      icon: BookOpen,
 
      features: [
        "Tajweed Excellence",
        "Tafsir Understanding",
        "Peer Mentorship",
        "Spiritual Development"
      ],
      status: "Active Training",
      statusColor: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-purple-100 rounded-full mb-6">
        
            <span className="text-gray-800 text-sm font-semibold tracking-wide uppercase">Our Vision in Action</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Key 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-gray-800"> Initiatives</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transformative programs and projects that shape the future of Islamic education, 
            building leaders and fostering spiritual excellence in our community.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {initiatives.map((initiative) => {
            const IconComponent = initiative.icon;
            
            return (
              <div
                key={initiative.id}
                className={`group relative bg-white rounded-3xl shadow-xl border lg:border-2 border-gray-300 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer`}
             
              >
                
                {/* Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Status Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className={`px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold`}>
                    {initiative.status}
                  </span>
                </div>

                <div className="relative p-8 h-full flex flex-col">
                  
                  {/* Icon and Header */}
                  <div className="mb-3 lg:mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r  from-red-600 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {initiative.title}
                      </h3>
                      {/* <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-sm font-semibold text-gray-600">{initiative.subtitle}</span>
                      </div> */}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {initiative.description}
                  </p>

                  {/* Key Details */}
                  {/* <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{initiative.duration || initiative.area}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{initiative.target}</span>
                    </div>
                  </div> */}

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {initiative.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r  from-gray-800 mt-2 flex-shrink-0`}></div>
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  {/* <div className="mt-auto">
                    <button className={`w-full bg-gradient-to-r ${initiative.gradient} hover:opacity-90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg transform group-hover:scale-[1.02]`}>
                      <span>Learn More</span>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredCard === initiative.id ? 'translate-x-1' : ''}`} />
                    </button>
                  </div> */}

                  {/* Decorative Elements */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>

                {/* Animated Border Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r  opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join Our Educational Journey?
            </h3>
            
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover how these transformative initiatives can benefit your educational experience. 
              Connect with us to learn more about enrollment opportunities and program details.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contact Us Today
              </button>
              <button className="border-2 border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-700 font-semibold py-3 px-8 rounded-xl transition-all duration-300 bg-white hover:bg-blue-50">
                View All Programs
              </button>
            </div>
          </div>
        </div> */}
          <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className=" w-fit mt-10 h-fit px-16 lg:px-20 mx-auto bg-gradient-to-r from-red-600 to-gray-900 text-white font-semibold py-3 lg:py-4 rounded-3xl hover:from-red-700 hover:to-gray-700 transition-all duration-300 flex items-center justify-center group"
                  >
                 <Link href='/initiatives' className='whitespace-nowrap flex items-center'> View More
                    <motion.svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg></Link>
                  </motion.button>
                  
      </div>
    </section>
  );
}