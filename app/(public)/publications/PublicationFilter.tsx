// components/DynamicPublicationFilter.tsx
'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface  FilterProps {
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const PublicationFilter: React.FC<FilterProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.id === selectedValue);

  const handleOptionClick = (optionId: string) => {
    onValueChange(optionId);
    setIsOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="relative">
        {/* Selected Value Display */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-left flex items-center justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-gray-900 font-medium">
              {selectedOption?.label || 'Select option'}
            </span>
            <div className="flex items-center gap-2">
              {selectedOption && (
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                  {selectedOption.count}
                </span>
              )}
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </div>
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto">
              {options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => handleOptionClick(option.id)}
                  className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 flex items-center justify-between ${
                    selectedValue === option.id 
                      ? 'bg-red-50 text-red-700 border-l-4 border-red-500' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedValue === option.id 
                      ? 'bg-red-200 text-red-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Overlay to close dropdown */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-5"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </motion.div>
  );
};