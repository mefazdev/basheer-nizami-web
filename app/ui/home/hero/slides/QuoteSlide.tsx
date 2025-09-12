"use client";
 
import { motion } from "framer-motion";
import Image from "next/image";
import { NewsTicker } from "../NewsTicker";
// import { NewsTicker } from '../NewsTicker';
type NewsTickers={
  id: string;
  text: string;
    published: boolean;
    sort_order: number;
    starts_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at:string
 }
interface QuoteSlideProps {
quote: string;
description: string;
backgroundImage: string;
tickerItems?: NewsTickers[];
}

export const QuoteSlide: React.FC<QuoteSlideProps> = ({
  quote,
description,
  backgroundImage,
  tickerItems,
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 ">
        <Image
          src={backgroundImage}
          alt="Leader portrait"
          fill
          className="object-cover  "
          priority
        />

        <div className="absolute inset-0 bg-black/50 bg-opacity-70  " />
      </div>

      {/* Quote Content */}
      <div className="relative z-10 md:max-w-3xl mx-auto px-6 text-center text-white mt-32 md:mt-[5%]">
        <motion.blockquote
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl lg:text-5xl font-semibold  md:leading-relaxed mb-4"
        >
          {quote} 
        </motion.blockquote>

        <motion.cite
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-md md:text-xl text-gray-300 font-mediu not-italic opacity-90"
        >
         {description}
        </motion.cite>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center gap-6 mt-6"
        >
          <a
            href="https://twitter.com/leader"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6 hover:text-blue-400 transition-colors duration-300" />
          </a>
          <a
            href="https://facebook.com/leader"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 hover:text-blue-500 transition-colors duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/leader"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 hover:text-blue-300 transition-colors duration-300" />
          </a>
          <a
            href="https://youtube.com/@leader"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="w-6 h-6 hover:text-red-500 transition-colors duration-300" />
          </a>
        </motion.div> */}
      </div>
      <div className="absolute bottom-0 w-full ">
        <NewsTicker  data= {tickerItems} />
      </div>
    </div>
  );
};
