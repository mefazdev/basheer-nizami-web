// components/HeroCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { QuoteSlide } from "./slides/QuoteSlide";
import { NewsSlide } from "./slides/NewsSlider";
// import { QuoteSlide } from './slides/QuoteSlide';
// import { NewsSlide } from './slides/NewsSlider';

interface HeroCarouselProps {
  quote?: {
    text: string;
    description: string;
    image: string;
  };
  video?: {
    url: string;
    thumbnail: string;
    title: string;
  };
  news?: {
    title: string;
    summary: string;
    image: string;
    date: string;
  };
  news2?: {
    title: string;
    summary: string;
    image: string;
    date: string;
  };
  newsTickerItems?: string[];
}

  const HeroSection: React.FC<HeroCarouselProps> = ({
  quote = {
    text: "Lighting Minds. Lifting Futures.",
    description: "Discover the journey of Dr. Basheer Nizami — a visionary educator, spiritual mentor, and founder of AILT Global Academy.",
    image: "/images/7.jpeg",
  },
  // video = {
  //   url: "/videos/1.mp4",
  //   thumbnail: "/1.jpg",
  //   title: "Inspiring Leadership Speech"
  // },

  news = {
    title: "Groundbreaking Educational Initiative Launched",
    summary:
      "A new program aimed at transforming educational outcomes has been successfully implemented across multiple institutions.",
    image: "/images/9.jpeg",
    date: "2024-12-15",
  },
  news2 = {
    title: "Global Education Alliance",
    summary:
      "A new program aimed at transforming educational outcomes has been successfully implemented across multiple institutions.",
    image: "/images/8.jpeg",
    date: "2024-12-15",
  },
  newsTickerItems = [
    "Breaking: New educational funding approved for 2024",
    "Research shows 40% improvement in student outcomes",
    "International conference on education leadership announced",
    "Innovation in digital learning platforms continues to grow",
  ],
}) => {
  return (
    <div className="relative w-full h-[85vh] md:h-screen overflow-hidden pt-10 md:pt-0">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={2000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        // navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop
        className="h-full w-full"
      >
        <SwiperSlide>
          <QuoteSlide
            quote={quote.text}
           description={quote.description}
            backgroundImage={quote.image}
            tickerItems={newsTickerItems}
          />
        </SwiperSlide>

        {/* <SwiperSlide>
          <VideoSlide 
            videoUrl={video.url}
            thumbnail={video.thumbnail}
            title={video.title}
          />
        </SwiperSlide> */}

     <SwiperSlide>
          <NewsSlide
            title={news.title}
            summary={news.summary}
            image={news.image}
            date={news.date}
            tickerItems={newsTickerItems}
          />
        </SwiperSlide>
       <SwiperSlide>
          <NewsSlide
            title={news2.title}
            summary={news2.summary}
            image={news2.image}
            date={news2.date}
            tickerItems={newsTickerItems}
          />
        </SwiperSlide>  
      </Swiper>
    </div>
  );
};

export default HeroSection
 