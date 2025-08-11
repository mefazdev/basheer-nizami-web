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
// import { AboutSection } from "./ui/home/about";

export default function Home() {
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
      <HeroSection />

     
      <About />

      <VisionMissionSection />
      <KeyInitiativesSection/>
 

      <MediaSpeechesSection />
      <NewsHighlightsSection />
      <PublicationsSection />
      <GallerySection />

 
      {/* Call to Action Section */}
    </>
  );
}
