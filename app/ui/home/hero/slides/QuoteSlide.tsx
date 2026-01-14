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
    <div className="relative w-full h-full flex flex-col md:flex-row items-center md:justify-between bg-black">
      {/* Image - Top/Right Side */}
      <div className="relative w-full md:w-1/2 h-[70%] md:h-full md:order-2">
        {/* Gradient overlays for seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent pointer-events-none z-10" />

        {/* Image with blend mode */}
        <div className="absolute inset-0 mix-blend-lighten mt-6">
          <Image
            src={backgroundImage}
            alt="Leader portrait"
            fill
            className="object-contain object-top"
            priority
          />
        </div>

        {/* Strong bottom gradient for text overlap area on mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent md:hidden z-20" />
      </div>

      {/* Quote Content - Overlapping/Left Side */}
      <div className="relative z-30 w-full md:w-1/2 px-6 md:px-12 text-left text-white md:order-1 -mt-20 md:mt-0">
        <motion.blockquote
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-semibold md:font-bold md:leading-relaxed mb-4"
        >
          {quote}
        </motion.blockquote>

        <motion.cite
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-md md:text-xl text-gray-300 font-medium not-italic opacity-90"
        >
         {description}
        </motion.cite>
      </div>

      <div className="absolute bottom-0 w-full z-50">
        <NewsTicker data={tickerItems} />
      </div>
    </div>
  );
};
