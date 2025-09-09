'use client'
import React, { useState,   } from 'react';
import { 
  Mail, Phone,     Send, MessageSquare, Calendar, 
  Linkedin, Twitter, Globe,  
  CheckCircle, ArrowRight,   Building
} from 'lucide-react';
type FormDataType = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
  urgency: string;
  preferredContact: string;
};
export default function ContactPage() {
   const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    organization: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'consultation',
    urgency: 'standard',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, ] = useState<'contact' | 'services' | 'schedule'>('contact');
  const [focusedField, setFocusedField] = useState<string>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        organization: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'consultation',
        urgency: 'standard',
        preferredContact: 'email'
      });
    }, 4000);
  };
 

//   const services = [
//     {
//       title: 'Educational Consulting',
//       description: 'Strategic guidance for institutional development and curriculum design',
//       features: ['Curriculum Development', 'Assessment Design', 'Quality Assurance']
//     },
//     {
//       title: 'Research Collaboration',
//       description: 'Joint research initiatives and academic partnerships',
//       features: ['Grant Applications', 'Publication Support', 'Data Analysis']
//     },
//     {
//       title: 'Speaking Engagements',
//       description: 'Keynote presentations and conference participation',
//       features: ['Keynote Speeches', 'Panel Discussions', 'Workshop Facilitation']
//     }
//   ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-black to-gray-900 py-16 lg:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
       
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
               
              <span className="text-white/90 text-sm font-medium">Distinguished Educator & Scholar</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Let&apos;s Shape the Future
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-300">
                of Education
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto  leading-relaxed">
              Connecting with visionary educators, researchers, and institutions to advance 
              educational excellence through innovative pedagogy and collaborative research.
            </p>

            
          </div>

         
           
        </div>
      </div>

      {/* Navigation Tabs */}
      {/* <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'contact', label: 'Contact Information', icon: Mail },
              
              { id: 'schedule', label: 'Schedule Meeting', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'contact' | 'services' | 'schedule')}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:mt-20">
        
        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            
            {/* Contact Information */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Primary Contact Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-gray-800 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                   
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group cursor-pointer">
                    <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 group-hover:bg-blue-50">
                      <div className="bg-gray-100 group-hover:bg-gray-200 p-3 rounded-xl transition-colors">
                        <Mail className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Email Address</h3>
                        <p className="text-gray-700 font-medium">dr.education@university.edu</p>
                        {/* <p className="text-sm text-gray-500 mt-1">Response within 24 hours • Preferred method</p> */}
                      </div>
                      {/* <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" /> */}
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 group-hover:bg-green-50">
                      <div className="bg-gray-100 group-hover:bg-gray-200 p-3 rounded-xl transition-colors">
                        <Phone className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                        <p className="text-gray-700 font-medium">+1 (555) 123-4567</p>
                        {/* <p className="text-sm text-gray-500 mt-1">Office hours • Appointments preferred</p> */}
                      </div>
                      {/* <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" /> */}
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 group-hover:bg-purple-50">
                      <div className="bg-gray-100 group-hover:bg-gray-200 p-3 rounded-xl transition-colors">
                        <Building className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Office Location</h3>
                        <p className="text-gray-700 font-medium">AILT Global Academy, Rajkot, Gujarat</p>
                        {/* <p className="text-gray-600">AILT Global Academy, Rajkot, Gujarat</p> */}
                        {/* <p className="text-sm text-gray-500 mt-1">By appointment only</p> */}
                      </div>
                      {/* <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" /> */}
                    </div>
                  </div>

                  {/* <div className="group cursor-pointer">
                    <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 group-hover:bg-orange-50">
                      <div className="bg-orange-100 group-hover:bg-orange-200 p-3 rounded-xl transition-colors">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Availability</h3>
                        <p className="text-gray-700 font-medium">Monday - Friday, 9:00 AM - 5:00 PM</p>
                        <p className="text-sm text-gray-500 mt-1">Eastern Time • Flexible for international calls</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                  </div> */}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  {/* <h3 className="font-semibold text-gray-900 mb-4">Professional Networks</h3> */}
                  <div className="flex space-x-4">
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-4 rounded-xl text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 p-4 rounded-xl text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 p-4 rounded-xl text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                      <Globe className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-gray-800 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
                    {/* <p className="text-gray-600">I'll respond within 24 hours</p> */}
                  </div>
                </div>

                {submitted ? (
                  <div className="text-center py-16">
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Thank you for reaching out. I&apos;ll review your message and respond within 24-48 hours.
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirmation sent to your email
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    
                    {/* Inquiry Type & Urgency */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Type of Inquiry *
                        </label>
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                        >
                          <option value="consultation">Educational Consultation</option>
                          <option value="speaking">Speaking Engagement</option>
                          <option value="research">Research Collaboration</option>
                          <option value="partnership">Institutional Partnership</option>
                          <option value="media">Media Interview</option>
                          <option value="mentorship">Mentorship Opportunity</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Priority Level
                        </label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                        >
                          <option value="standard">Standard (3-5 days)</option>
                          <option value="priority">Priority (1-2 days)</option>
                          <option value="urgent">Urgent (24 hours)</option>
                        </select>
                      </div>
                    </div> */}

                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-gray-50 focus:bg-white ${
                            focusedField === 'name' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                          }`}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-gray-50 focus:bg-white ${
                            focusedField === 'email' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                          }`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    {/* Organization and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Organization/Institution
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('organization')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-gray-50 focus:bg-white ${
                            focusedField === 'organization' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                          }`}
                          placeholder="Your organization"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-gray-50 focus:bg-white ${
                            focusedField === 'phone' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                          }`}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField('')}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-gray-50 focus:bg-white ${
                          focusedField === 'subject' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                        }`}
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        rows={6}
                        className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-gray-50 focus:bg-white resize-none ${
                          focusedField === 'message' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                        }`}
                        placeholder="Please provide detailed information about your inquiry, including any specific requirements, timelines, or questions you may have..."
                      />
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Preferred Response Method
                      </label>
                      <div className="flex flex-wrap gap-3 space-x-4">
                        {[
                          { value: 'email', label: 'Email', icon: Mail },
                          { value: 'phone', label: 'Phone Call', icon: Phone },
                          { value: 'meeting', label: 'Video Meeting', icon: Calendar }
                        ].map(method => (
                          <label key={method.value} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="preferredContact"
                              value={method.value}
                              checked={formData.preferredContact === method.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                              formData.preferredContact === method.value
                                ? 'border-gray-400 bg-blue-50 text-gray-700'
                                : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                            }`}>
                              <method.icon className="w-4 h-4" />
                              <span className="text-sm font-medium">{method.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-red-600 via-black to-gray-800 hover:from-red-700 hover:via-gray-800 hover:to-black text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            <span className="text-lg">Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-6 h-6" />
                            <span className="text-lg">Send Message</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {/* {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive educational services backed by years of research and practical experience
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-6 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-50 hover:to-purple-50 text-gray-700 hover:text-blue-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Schedule Tab */}
        {/* {activeTab === 'schedule' && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Schedule a Meeting</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Book a personalized consultation to discuss your educational goals and explore collaboration opportunities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-blue-50 rounded-2xl">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">30-60 Minutes</h4>
                  <p className="text-gray-600 text-sm">Flexible duration based on your needs</p>
                </div>
                <div className="p-6 bg-blue-50  rounded-2xl">
                  <Globe className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Virtual or In-Person</h4>
                  <p className="text-gray-600 text-sm">Choose your preferred meeting format</p>
                </div>
                <div className="p-6 bg-blue-50  rounded-2xl">
                  <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Free Consultation</h4>
                  <p className="text-gray-600 text-sm">Initial discussion at no charge</p>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab('contact')}
                className="bg-gradient-to-r from-red-600 to-black hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Contact Me to Schedule
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}