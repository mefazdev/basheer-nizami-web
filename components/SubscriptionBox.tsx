// components/SubscriptionBox.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface SubscriptionBoxProps {
  variant?: 'default' | 'compact';
  title?: string;
  description?: string;
}

export const SubscriptionBox: React.FC<SubscriptionBoxProps> = ({
  variant = 'default',
  title = "Stay Updated with Latest Insights",
  description = "Subscribe to our newsletter and never miss out on thoughtful articles about leadership, education, spirituality, and personal growth."
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Replace with your actual subscription API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      setStatus('success');
      setMessage('Thank you for subscribing! Check your email to confirm your subscription.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStatus = () => {
    setStatus('idle');
    setMessage('');
  };

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-red-600 to-black rounded-2xl p-6 text-white"
      >
        <div className="flex items-center mb-4">
          <Mail className="w-6 h-6 mr-3" />
          <h3 className="text-lg font-bold">Subscribe for Updates</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              resetStatus();
            }}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
            disabled={isSubmitting}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </motion.button>
        </form>

        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-sm ${status === 'success' ? 'text-green-200' : 'text-red-200'}`}
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="newsletter-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect x="2" y="8" width="16" height="4" fill="currentColor" rx="2" />
                    <circle cx="6" cy="4" r="1" fill="currentColor" />
                    <circle cx="10" cy="4" r="1" fill="currentColor" />
                    <circle cx="14" cy="4" r="1" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#newsletter-pattern)" className="text-red-600" />
              </svg>
            </div>

            <div className="relative z-10 p-8 lg:p-12">
              <div className="text-center mb-8">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-black text-white rounded-full mb-6"
                >
                  <Mail className="w-8 h-8" />
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {title}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Subscription Form */}
              <div className="max-w-md mx-auto">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Successfully Subscribed!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {message}
                    </p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setMessage('');
                      }}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Subscribe Another Email
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          resetStatus();
                        }}
                        placeholder="Enter your email address"
                        className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          status === 'error' 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-200 focus:ring-red-500 focus:border-red-500'
                        }`}
                        disabled={isSubmitting}
                      />
                      
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </motion.div>
                      )}
                    </div>

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-sm"
                      >
                        {message}
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-red-600 to-black text-white font-bold rounded-xl hover:from-red-700 hover:to-gray-900 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Subscribing...
                        </div>
                      ) : (
                        'Subscribe to Newsletter'
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
 
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};