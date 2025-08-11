"use client";

import { motion } from "framer-motion";
// import { Biography } from './about/Biography';

import { Biography } from "./Biography";
import { Portrait } from "./Portrait";
 

interface AboutSectionProps {
  biography?: {
    title: string;
    content: string[];
  };
  portrait?: {
    image: string;
    alt: string;
  };
  milestones?: {
    year: string;
    title: string;
    description: string;
    category: "education" | "leadership" | "award" | "achievement";
  }[];
  values?: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const About: React.FC<AboutSectionProps> = ({
  biography = {
    title: "A Visionary Leader in Education",
    content: [
      "From a student in Kerala to the founder of a transformative Islamic value-based school in Gujarat, my story is built on a deep love for education, spirituality, and the youth of tomorrow. Every hardship became a lesson. Every student, a responsibility. And every opportunity, a platform to serve",
       ],
  },
  portrait = {
    image: "/images/leader-portrait.jpg",
    alt: "Educational Leader Portrait",
  },
  // milestones = [
  //   {
  //     year: "2003",
  //     title: "Started Teaching Career",
  //     description:
  //       "Began as a mathematics teacher at Lincoln High School, introducing innovative problem-solving techniques.",
  //     category: "education",
  //   },
  //   {
  //     year: "2008",
  //     title: "Curriculum Development Leadership",
  //     description:
  //       "Led the development of integrated STEM curriculum adopted by 15+ schools in the district.",
  //     category: "leadership",
  //   },
  //   {
  //     year: "2012",
  //     title: "Principal Appointment",
  //     description:
  //       "Appointed as Principal of Metropolitan Academy, turning around a struggling institution.",
  //     category: "leadership",
  //   },
  //   {
  //     year: "2016",
  //     title: "Education Excellence Award",
  //     description:
  //       "Received the National Education Excellence Award for outstanding contributions to student achievement.",
  //     category: "award",
  //   },
  //   {
  //     year: "2019",
  //     title: "District Superintendent",
  //     description:
  //       "Promoted to District Superintendent, overseeing 50+ schools and 25,000+ students.",
  //     category: "leadership",
  //   },
  //   {
  //     year: "2022",
  //     title: "International Recognition",
  //     description:
  //       "Featured as one of the 'Top 100 Global Education Leaders' by Education World Magazine.",
  //     category: "achievement",
  //   },
  // ],
  // values = [
  //   {
  //     title: "Excellence in Education",
  //     description:
  //       "Commitment to providing the highest quality education that prepares students for future success.",
  //     icon: "🎓",
  //   },
  //   {
  //     title: "Inclusive Leadership",
  //     description:
  //       "Creating environments where every voice is heard and every individual can contribute meaningfully.",
  //     icon: "🤝",
  //   },
  //   {
  //     title: "Innovation & Growth",
  //     description:
  //       "Embracing new technologies and methodologies to continuously improve educational outcomes.",
  //     icon: "🚀",
  //   },
  //   {
  //     title: "Community Impact",
  //     description:
  //       "Building strong partnerships with families and communities to support holistic student development.",
  //     icon: "🏘️",
  //   },
  // ],
}) => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center  mb-6 lg:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-1 lg:mb-4">
            About
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full" />
        </motion.div>

        {/* Biography and Portrait */}
        <div className="grid lg:grid-cols-2  gap-8 lg:gap-16 items-center ">
        <div className=" order-1 "> <Biography {...biography} /></div>

             <div className=" order-first lg:order-2"> <Portrait {...portrait} /></div>  
        </div>

        {/* Timeline */}
        {/* <Timeline milestones={milestones} /> */}

        {/* Core Values */}
        {/* <CoreValues values={values} /> */}
      </div>
    </section>
  );
};

 