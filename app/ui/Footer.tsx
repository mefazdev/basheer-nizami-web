// components/Footer.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
 
  Send,
  Linkedin,
  Twitter,
  Youtube,
 
  Globe,
  ArrowUp
} from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  contactInfo?: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  showNewsletter?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  contactInfo = {
    email: 'drbasheernizami@gmail.com',
    phone: '+91 9913 848333',
    address: 'India'
  },
  socialLinks = {
    linkedin: 'https://linkedin.com/in/educational-leader',
    twitter: 'https://twitter.com/educational_leader',
    youtube: 'https://youtube.com/c/educational-leader',
    website: 'https://educationalleader.com'
  },
  showNewsletter = true
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showScrollTop,  ] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubscribing(false);
    setEmail('');
    // You would typically show a success message here
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigationLinks = [
    {
      title: 'About',
      links: [
        { label: 'Biography', href: '/about' },
            { label: 'Ailt Global Academy', href: 'https://ailtacademy.com/' },
         { label: 'Spiritual Footsteps', href: '/about' },
            { label: 'Vision & Mission', href: '/about' },
      
    
      ]
    },
    {
      title: 'Work',
      links: [
        { label: 'Initiatives', href: '/initiatives' },
        { label: 'Media & Lutures', href: '/videos' },
        { label: 'Books & Publications', href: '/publications' },
        { label: 'Gallery', href: '/gallery' }
      ]
    },
    // {
    //   title: 'Resources',
    //   links: [
    //     { label: 'Latest News', href: '/updates' },
    //     { label: 'Research Papers', href: '#research' },
    //     { label: 'Speaking Topics', href: '#speaking' },
    //     { label: 'Media Kit', href: '#media-kit' }
    //   ]
    // },
    // {
    //   title: 'Connect',
    //   links: [
    //     { label: 'Speaking Requests', href: '#speaking-requests' },
    //     { label: 'Collaboration', href: '#collaborate' },
    //     { label: 'Interview Requests', href: '#interviews' },
    //     { label: 'Contact', href: '#contact' }
    //   ]
    // }
  ];

//   const achievements = [
//     { icon: Award, label: '25+ Awards', description: 'Professional Recognition' },
//     { icon: BookOpen, label: '40+ Publications', description: 'Research Papers & Books' },
//     { icon: Users, label: '50K+ Students', description: 'Lives Impacted' },
//     { icon: Globe, label: '60+ Partnerships', description: 'Global Collaborations' }
//   ];

  // const legalLinks = [
  //   { label: 'Privacy Policy', href: '/privacy' },
  //   // { label: 'Terms of Service', href: '/terms' },
  //   { label: 'Cookie Policy', href: '/cookies' },
  //   // { label: 'Accessibility', href: '/accessibility' }
  // ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="footer-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gray-300/10 rounded-full blur-xl"
        />
      </div> */}

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          <div className="grid lg:grid-cols-11 gap-12">
            {/* Brand & Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {/* Logo/Brand */}
              <div className="  ">
                {/* <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Educational Leadership
                </h3> */}
                {/* <p className="text-gray-300 leading-relaxed">
                  Transforming education through innovative leadership, cutting-edge research, and unwavering commitment to student success and educational equity.
                </p> */}
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-start text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400 mt-1 flex-shrink-0" />
                  <span>{contactInfo.address}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.linkedin && (
                  <motion.a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                )}
                {socialLinks.twitter && (
                  <motion.a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/10 hover:bg-blue-400 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                )}
                {socialLinks.youtube && (
                  <motion.a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Youtube className="w-5 h-5" />
                  </motion.a>
                )}
                {socialLinks.website && (
                  <motion.a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white/10 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <Globe className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Navigation Links */}
            <div className="lg:col-span-5">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 ">
                {navigationLinks.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                 
                  >
                    <h4 className="text-lg font-semibold text-white mb-6">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <motion.a
                            href={link.href}
                            whileHover={{ x: 5 }}
                            className="text-gray-300 hover:text-white transition-colors duration-200 fle items-center justify-start group  "
                          >
                            {/* <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
                            {link.label}
                          </motion.a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {/* Newsletter Signup */}
              {showNewsletter && (
                <div className="mb-12">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Stay Updated
                  </h4>
                  <p className="text-gray-300 mb-6 text-sm">
                    Get the latest insights on educational innovation and leadership directly to your inbox.
                  </p>
                  
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition-all duration-300"
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubscribing}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-gray-800 hover:from-rede-700 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                      {isSubscribing ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Subscribe
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </motion.button>

           

                  </form>

                  <Link href='/admin'><button className='border border-gray-600  mt-6 rounded-xl w-full p-1 cursor-pointer'>ADMIN</button></Link>
                </div>
              )}

              {/* Achievement Stats */}
              {/* <div>
                <h4 className="text-lg font-semibold text-white mb-6">
                  Impact by Numbers
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <achievement.icon className="w-6 h-6 text-blue-400 mb-2" />
                      <div className="text-lg font-bold text-white mb-1">
                        {achievement.label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {achievement.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm mb-4 md:mb-0"
              >
                © {new Date().getFullYear()} |  All rights reserved.
              </motion.div>
<motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm mb-4 md:mb-0"
              >
                Powered By <a href="https://www.instagram.com/cogentux_ai/">Cogentux</a>
              </motion.div>
              {/* Legal Links */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center space-x-6"
              >
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div> */}
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: showScrollTop ? 1 : 0,
            scale: showScrollTop ? 1 : 0
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-red-600 to-gray-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  );
};