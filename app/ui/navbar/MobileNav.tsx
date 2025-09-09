import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Home, Users, Target, Play, FileText, 
  MessageCircle, ArrowRight,   ChevronRight,BookOpen,Camera
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigationLinks = [
    { name: 'Home', href: '/', icon: Home, description: 'Welcome & Overview' },
    { name: 'About', href: '/about', icon: Users, description: 'Our Story & Mission' },
    { name: 'Initiatives', href: '/initiatives', icon: Target, description: 'Key Programs' },
  
    { name: 'Articles', href: '/articles', icon: FileText, description: 'Latest Insights' },
    { name: 'Publications', href: '/publications', icon: BookOpen, description: 'Educational Content' },
    { name: 'Updates', href: '/updates', icon: FileText, description: 'Latest Insights' },
    { name: 'Videos', href: '/videos', icon: Play, description: 'Educational Content' },
     { name: 'Photos', href: '/gallery', icon: Camera, description: 'Educational Content' },
     { name: 'Contact', href: '/contact', icon: MessageCircle, description: 'Get in Touch' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    // Here you would handle navigation
    // console.log(`Navigating to: ${href}`);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <nav 
      // className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      //   isScrolled || isMenuOpen 
      //     ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
      //     : 'bg-white/80 backdrop-blur-sm'
      // }`}
       className={`fixed bg-gradient-to-r from-slate-900 to-gray-800 top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen 
          ? '  backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : ' backdrop-blur-sm'
      }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
               
              <div className=" h-11 w-34 relative rounded mt-1">
                <Link passHref href="/">
                  <Image src={"/images/name-4.png"} alt="" layout="fill" />
                </Link>
              </div>
            </div>

            {/* Menu Button */}
            <button
              onClick={toggleMenu}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isMenuOpen 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg' 
                  : 'bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-700 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <X className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`} onClick={toggleMenu} />

      {/* Slide-out Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-all duration-500 ease-out ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Menu Header */}
        <div className="bg-gradient-to-r from-slate-800 to-gray-700 px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              
              <div>
                {/* <div className="text-xl font-bold text-white">EduVision</div> */}
                {/* <div className="text-white/80 text-sm">Islamic Education</div> */}
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
             
            <a 
            href='https://ailtacademy.com/'
              // onClick={() => handleLinkClick('#invite')}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <span>AILT ACADEMY</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {navigationLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
              <Link href={link.href} passHref
              onClick={() => handleLinkClick(link.href)}
              key={link.name}>
                <button
                
                  
                  className={`w-full group flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-300 transform hover:scale-[1.02] ${
                    index === 0 ? 'bg-blue-50 border border-blue-100' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    index === 0 
                      ? 'bg-gradient-to-r from-slate-800 to-gray-600 text-white' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-r group-hover:from-gray-600 group-hover:to-black group-hover:text-white'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`font-semibold transition-colors ${
                      index === 0 ? 'text-gray-700' : 'text-gray-900 group-hover:text-slate-700'
                    }`}>
                      {link.name}
                    </div>
                    {/* <div className="text-sm text-gray-500 group-hover:text-slate-600 transition-colors">
                      {link.description}
                    </div> */}
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                    index === 0 ? 'text-blue-600' : 'text-gray-400 group-hover:text-slate-600 group-hover:translate-x-1'
                  }`} />
                </button></Link>
              );
            })}
          </div>
        </div>

        {/* Menu Footer */}
        {/* <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-3">
              Transforming Education Through Excellence
            </div>
            <div className="flex justify-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}