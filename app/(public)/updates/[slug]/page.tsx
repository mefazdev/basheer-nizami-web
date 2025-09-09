"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  Share2,
  User,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// IMPORTANT: Use the config.ts client, not client.ts
import { urlFor } from "@/lib/sanity/config";
import CustomPortableText from "@/components/PortableText";
import { SubscriptionBox } from "@/components/SubscriptionBox";

import { getArticleBySlug } from "@/lib/sanity/api";
import { useUpdateDetail } from "@/hooks/sanity/useUpdateDetails";

const ArticleDetailsPage: React.FC = () => {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

 
  const slug = params?.slug as string;
  const { update, relatedUpdates } = useUpdateDetail(slug);

  useEffect(() => {
    setIsMounted(true);
  }, [slug]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const updateReadingProgress = () => {
      const updateContent = document.getElementById("update-content");
      if (updateContent) {
        const rect = updateContent.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(
            100,
            ((window.innerHeight - rect.top) /
              (rect.height + window.innerHeight)) *
              100
          )
        );
        setReadingProgress(progress);
      }
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = update?.title || "";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "copy":
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        break;
    }
    setShareDropdownOpen(false);
  };

  const updateDate = update?.publishedAt
    ? new Date(update.publishedAt)
    : new Date();

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-black"
          style={{ scaleX: readingProgress / 100 }}
          initial={{ scaleX: 0 }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <motion.div
          style={isMounted ? { y: backgroundY } : {}}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 mt-10"
          >
            <Link
              href="/updates"
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Updates
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Category Badge */}
            {update?.category&& (
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-800 border border-red-200">
                  {update.category.toUpperCase()}
                </span>
              </div>
            )}

            {/* Title */}
            <h1
              onClick={() => getArticleBySlug(slug)}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {update?.title}  
            </h1>

            {/* Excerpt */}
            {update?.excerpt && (
              <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
                {update.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
              
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {updateDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {/* {typeof article?.views === 'number' && (
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  {article.views.toLocaleString()} views
                </div>
              )} */}
            </div>

            {/* Share Button */}
            <div className="relative inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShareDropdownOpen(!shareDropdownOpen)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-black text-white font-semibold rounded-full hover:from-red-700 hover:to-gray-900 transition-all duration-300 shadow-lg"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </motion.button>

              {shareDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-20"
                >
                  <div className="py-2">
                    {[
                      {
                        platform: "facebook",
                        label: "Facebook",
                        icon: Facebook,
                        color: "hover:text-blue-600",
                      },
                      {
                        platform: "twitter",
                        label: "Twitter",
                        icon: Twitter,
                        color: "hover:text-blue-400",
                      },
                      {
                        platform: "linkedin",
                        label: "LinkedIn",
                        icon: Linkedin,
                        color: "hover:text-blue-700",
                      },
                      {
                        platform: "email",
                        label: "Email",
                        icon: Mail,
                        color: "hover:text-red-600",
                      },
                      {
                        platform: "copy",
                        label: "Copy Link",
                        icon: LinkIcon,
                        color: "hover:text-gray-700",
                      },
                    ].map((item) => (
                      <button
                        key={item.platform}
                        onClick={() => handleShare(item.platform)}
                        className={`w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors ${item.color}`}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Image - Using urlFor for proper Sanity image handling */}
      {update?.image && (
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                fill
                src={
                  update.image ||
                  urlFor(update.image).width(800).height(400).url()
                }
                alt={   update.title || "Article image"}
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      {update?.content && (
        <section className="py-10 lg:py-20">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              id="article-content"
              className="prose prose-lg max-w-none"
            >
              <CustomPortableText content={update?.content} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter Subscription */}
      <SubscriptionBox />

      {/* Related Articles */}
      {relatedUpdates && relatedUpdates.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Related Articles
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mb-6" />
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Continue exploring insights in {update?.category }
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedUpdates.map((relatedUpdate) => (
                <motion.div
                  key={relatedUpdate._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {relatedUpdate.image && (
                    <div className="relative aspect-[16/10]">
                      <Image
                        fill
                        src={
                          relatedUpdate.image ||
                          urlFor(relatedUpdate.image)
                            .width(400)
                            .height(250)
                            .url()
                        }
                        alt={relatedUpdate.title}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {relatedUpdate.title}
                    </h3>
                    {relatedUpdate.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {relatedUpdate.excerpt}
                      </p>
                    )}
                    <Link
                      href={`/updates/${relatedUpdate.slug }`}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {shareDropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShareDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default ArticleDetailsPage;
