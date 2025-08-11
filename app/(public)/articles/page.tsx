// pages/ArticlesPage.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { SearchBar } from './SearchBar';
import { ArticleFilters } from './ArticleFilters';
import { FeaturedArticle } from './FeaturedArticle';
import { ArticleGrid } from './ArticleGrid';
 

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: 'leadership' | 'spirituality' | 'education' | 'personal-growth' | 'innovation';
  tags: string[];
  featured?: boolean;
  image: string;
  views: number;
}

 const Articles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const articles: Article[] = [
    {
      id: 'leadership-prophet',
      title: 'Leadership Lessons from the Prophet ﷺ',
      excerpt: 'Timeless principles of leadership derived from the exemplary character and guidance of Prophet Muhammad ﷺ, applicable to modern educational institutions and organizational management.',
      content: 'Detailed exploration of prophetic leadership principles...',
      author: 'Educational Leader',
      publishDate: '2024-03-15',
      readTime: '8 min read',
      category: 'leadership',
      tags: ['Leadership', 'Prophet Muhammad', 'Management', 'Character'],
      featured: true,
      image: '/images/islam.jpg',
      views: 15400
    },
    {
      id: 'islamic-schools-ceos',
      title: 'How Islamic Schools Can Raise Future CEOs & Scholars',
      excerpt: 'A comprehensive framework for integrating entrepreneurial thinking and scholarly excellence within Islamic educational institutions to produce well-rounded leaders.',
      content: 'Detailed analysis of educational methodologies...',
      author: 'Educational Leader',
      publishDate: '2024-03-10',
      readTime: '12 min read',
      category: 'education',
      tags: ['Islamic Education', 'Leadership Development', 'Entrepreneurship', 'Scholarship'],
      featured: true,
      image: '/images/islam.jpg',
      views: 12800
    },
    {
      id: 'digital-age-spirituality',
      title: 'Nurturing Spirituality in the Digital Age',
      excerpt: 'Practical strategies for maintaining spiritual connection and growth while navigating the challenges and opportunities of modern technology.',
      content: 'In-depth discussion on balancing technology and spirituality...',
      author: 'Educational Leader',
      publishDate: '2024-02-28',
      readTime: '10 min read',
      category: 'spirituality',
      tags: ['Spirituality', 'Technology', 'Digital Balance', 'Modern Life'],
          image: '/images/islam.jpg',
      views: 9600
    },
    {
      id: 'character-building',
      title: 'Character Building in Modern Education: A Holistic Approach',
      excerpt: 'Exploring comprehensive methods to integrate character development into contemporary educational curricula while maintaining academic excellence.',
      content: 'Comprehensive guide to character education...',
      author: 'Educational Leader',
      publishDate: '2024-02-20',
      readTime: '9 min read',
      category: 'education',
      tags: ['Character Building', 'Holistic Education', 'Values', 'Curriculum'],
      image: '/images/islam.jpg',
      views: 11200
    },
    {
      id: 'youth-empowerment',
      title: 'Empowering Youth: From Vision to Action',
      excerpt: 'A strategic framework for empowering young people to become confident, capable, and purpose-driven leaders in their communities and beyond.',
      content: 'Strategic guide to youth empowerment...',
      author: 'Educational Leader',
      publishDate: '2024-02-15',
      readTime: '7 min read',
      category: 'personal-growth',
      tags: ['Youth Empowerment', 'Leadership', 'Vision', 'Action'],
          image: '/images/islam.jpg',
      views: 8900
    },
    {
      id: 'ai-islamic-education',
      title: 'Artificial Intelligence in Islamic Education: Opportunities and Ethics',
      excerpt: 'Examining how AI technology can enhance Islamic educational practices while maintaining ethical standards and spiritual values.',
      content: 'Comprehensive analysis of AI in Islamic education...',
      author: 'Educational Leader',
      publishDate: '2024-02-10',
      readTime: '11 min read',
      category: 'innovation',
      tags: ['AI', 'Islamic Education', 'Technology', 'Ethics'],
       image: '/images/islam.jpg',
      views: 13500
    },
     
    
    
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const categories = [
    { id: 'all', label: 'All Articles', count: articles.length },
    { id: 'leadership', label: 'Leadership', count: articles.filter(a => a.category === 'leadership').length },
    { id: 'spirituality', label: 'Spirituality', count: articles.filter(a => a.category === 'spirituality').length },
    { id: 'education', label: 'Education', count: articles.filter(a => a.category === 'education').length },
    { id: 'personal-growth', label: 'Personal Growth', count: articles.filter(a => a.category === 'personal-growth').length },
    { id: 'innovation', label: 'Innovation', count: articles.filter(a => a.category === 'innovation').length }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Advanced Background Elements */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>

        {/* Article Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="article-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="2" y="4" width="12" height="8" fill="none" stroke="currentColor" strokeWidth="0.5" rx="1"/>
                <line x1="4" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="0.3"/>
                <line x1="4" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="0.3"/>
                <line x1="4" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#article-pattern)" className="text-blue-600" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="inline-block mb-6 mt-10">
              <span className="bg-gradient-to-r from-red-600 to-gray-600 bg-clip-text text-transparent text-lg font-semibold tracking-wider uppercase">
                Thoughtful Insights
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Latest
              <span className="block bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                Articles
              </span>
            </h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-red-600 to-gray-600 mx-auto rounded-full mb-8"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            Explore insights on leadership, spirituality, modern education, and personal growth. 
            Discover thoughtful perspectives that bridge timeless wisdom with contemporary challenges.
          </motion.p>

          {/* Article Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { number: `${articles.length}+`, label: "Published Articles", description: "Growing Collection" },
              { number: "100K+", label: "Total Reads", description: "Global Readership" },
              { number: "5", label: "Categories", description: "Diverse Topics" },
              { number: "Weekly", label: "New Content", description: "Regular Publishing" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-slate-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                placeholder="Search articles by title, content, or tags..."
              />
            </div>
            <div className="lg:col-span-1">
              <ArticleFilters 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 lg:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
                Featured Articles
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-gray-600 mx-auto rounded-full mb-6" />
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                Highlighted insights that have resonated most with our readers
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {featuredArticles.map((article, index) => (
                <FeaturedArticle key={article.id} article={article} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
              {searchTerm ? 'Search Results' : selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.label}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-gray-800 mx-auto rounded-full mb-6" />
            
          </motion.div>

          <ArticleGrid articles={selectedCategory === 'all' && searchTerm === '' ? regularArticles : filteredArticles} />
        </div>
      </section>
    </div>
  );
};


export default Articles;



