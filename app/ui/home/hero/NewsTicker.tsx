// components/NewsTicker.tsx
"use client";

 
import { motion } from "framer-motion";
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
 
interface NewsTickerProps {
  data?: NewsTickers[];
}

export const NewsTicker:React.FC<NewsTickerProps> = ({data} ) => {
  // const duplicatedItems = [...items, ...items]; // Duplicate for seamless loop

  

  return (
    <div className="relative bg-gradient-to-l from-red-600 to-black/50 text-white py-2 overflow-hidden">
      <div className="flex items-center">
        {/* Breaking News Label */}
        <div className="bg-red-700 hidden lg:block px-4 py-1 text-sm font-bold uppercase tracking-wider flex-shrink-0">
          Updates
        </div>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: "-100%",
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {data?.map((item, index) => (
              <span
                key={index}
                className="inline-block px-8 text-sm md:text-base font-medium"
              >
                {item.text}
                {/* {index < duplicatedItems.length - 1 && (
                  <span className="mx-4 text-red-300">•</span>
                )} */}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
