"use client";
import Head from "next/head";
import { VisionMissionSection } from "../ui/home/vission";
// import { ProjectsInitiativesSection } from "../ui/home/projects";
import { NewsHighlightsSection } from "../ui/home/news-higlight";
import { MediaSpeechesSection } from "../ui/home/media";
import { PublicationsSection } from "../ui/home/publications";
import { GallerySection } from "../ui/home/gallery";

import HeroSection from "../ui/home/hero";
import { About } from "../ui/home/about";
import KeyInitiativesSection from "../ui/home/initiatives";
import { HomeArticles } from "../ui/home/articles";
import { useNewsTickersData } from "@/hooks";
import { useFeaturedUpdates } from "@/hooks/sanity/useUpdates";
// import { AboutSection } from "./ui/home/about";

export default function Home() {
  const { data } = useNewsTickersData({
    page: 1,
    limit: 10, // fewer items on homepage
    status: "active", // only show published/active tickers
  });

  const { featuredUpdates } = useFeaturedUpdates();
  // const data = featuredUpdates?.slice(0, 3);
  return (
    <>
      <Head>
        <title>
          Basheer Ahmed Nizami | Educator, Researcher, and Thought Leader
        </title>
        <meta
          name="description"
          content="Official website of Dr. John Doe featuring publications, speeches, articles, and educational resources"
        />
      </Head>

      {/* Hero Section */}
      <HeroSection
        newsTickers={data?.data}
        featuredNewses={featuredUpdates.slice(0, 3)}
      />

      <About />

      <VisionMissionSection />
      <KeyInitiativesSection />

      <MediaSpeechesSection />
      <HomeArticles />
      <NewsHighlightsSection
        featuredUpdates={featuredUpdates}
        newsTickers={data?.data}
      />
      <PublicationsSection />
      <GallerySection />

      {/* Call to Action Section */}
    </>
  );
}
