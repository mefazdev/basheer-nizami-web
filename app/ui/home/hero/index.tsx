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
import { UpdateItem } from "@/lib/types/updates";
// import { QuoteSlide } from './slides/QuoteSlide';
// import { NewsSlide } from './slides/NewsSlider';

type NewsTickers = {
  id: string;
  text: string;
  published: boolean;
  sort_order: number;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
};
interface HeroCarouselProps {
  quote?: {
    text: string;
    description: string;
    image: string;
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
  newsTickers?: NewsTickers[];
  featuredNewses?: UpdateItem[];
}

const HeroSection: React.FC<HeroCarouselProps> = ({
  quote = {
    text: "Lighting Minds. Lifting Futures.",
    description:
      "Discover the journey of Dr. Basheer Nizami — a visionary educator, spiritual mentor, and founder of AILT Global Academy.",
    image: "/images/9.jpeg",
  },
   
  //   "Meeladunnabi celebrations announced",
  //   "Research shows 40% improvement in student outcomes",
  //   "Youth talk shows to be heled on next month",
  //   "Innovation in digital learning platforms continues to grow",
  // ],
  newsTickers,
  featuredNewses,
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
            tickerItems={newsTickers}
          />
        </SwiperSlide>

        {/* <SwiperSlide>
          <VideoSlide 
            videoUrl={video.url}
            thumbnail={video.thumbnail}
            title={video.title}
          />
        </SwiperSlide> */}
        {/* {featuredNewses?.map((news) => (
          <SwiperSlide key={news._id}>
            <NewsSlide
              key={news._id}
              title={news.title}
              summary={news.excerpt}
              image={news?.image || ""}
              date={news.publishedAt}
              slug={news?.slug}
              tickerItems={newsTickers}
            />
          </SwiperSlide>
        ))}   */}

        {/* <SwiperSlide>
          <NewsSlide
            title={news2.title}
            summary={news2.summary}
            image={news2.image}
            date={news2.date}
            tickerItems={newsTickerItems}
          />
        </SwiperSlide>   */}
      </Swiper>
    </div>
  );
};

export default HeroSection;
