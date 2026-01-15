import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'news', label: 'Industry News' },
    { id: 'guides', label: 'eSIM Guides' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'updates', label: 'Platform Updates' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'eSIM Myanmar 4th Anniversary Celebration',
      excerpt: 'Join us in celebrating 4 years of innovation and excellence in eSIM technology across Myanmar and ASEAN.',
      category: 'news',
      date: '2026-01-15',
      author: 'eSIM Myanmar Team',
      image: 'https://i.ibb.co/qL00rsqJ/Colored.png',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Complete Guide to eSIM Activation on iPhone',
      excerpt: 'Step-by-step tutorial for activating your eSIM profile on iPhone devices with iOS Quick Transfer.',
      category: 'guides',
      date: '2026-01-10',
      author: 'Technical Team',
      image: 'https://i.ibb.co/qL00rsqJ/Colored.png',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: '5G Network Expansion Across Myanmar',
      excerpt: 'ESIM MYANMAR COMPANY LIMITED announces major 5G infrastructure expansion with MPT, ATOM, U9, and MYTEL.',
      category: 'news',
      date: '2026-01-05',
      author: 'Network Operations',
      image: 'https://i.ibb.co/qL00rsqJ/Colored.png',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'How to Transfer eSIM from Android to iPhone',
      excerpt: 'Learn the seamless process of transferring your eSIM profile between Android and Apple devices.',
      category: 'tutorials',
      date: '2025-12-28',
      author: 'Support Team',
      image: 'https://i.ibb.co/qL00rsqJ/Colored.png',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'New Enterprise Dashboard Features Released',
      excerpt: 'Introducing advanced analytics, bulk provisioning, and real-time monitoring for enterprise customers.',
      category: 'updates',
      date: '2025-12-20',
      author: 'Product Team',
      image: 'https://i.ibb.co/qL00rsqJ/Colored.png',
      readTime: '4 min read'
    },
    {
      id: 6,
      title: 'Understanding VoLTE and Its Benefits',
      excerpt: 'Comprehensive guide to Voice over LTE technology and how it enhances your mobile experience.',
      category: 'guides',
      date: '2025-12-15',
      author: 'Technical Team',
      image: 'https://i.ibb.co/qL00rsqJ/Colored.png',
      readTime: '6 min read'
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'eSIM Myanmar Blog',
    'description': 'Latest news, guides, and updates from ESIM MYANMAR COMPANY LIMITED',
    'url': 'https://esim.com.mm/blog',
    'publisher': {
      '@type': 'Organization',
      'name': 'ESIM MYANMAR COMPANY LIMITED',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://i.ibb.co/qL00rsqJ/Colored.png'
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Blog - News and Updates | eSIM Myanmar</title>
        <meta name="description" content="Stay updated with the latest eSIM news, guides, tutorials, and platform updates from ESIM MYANMAR COMPANY LIMITED." />
        <meta name="keywords" content="eSIM news, Myanmar telecom, 5G updates, eSIM guides, tutorials, industry news" />
        <link rel="canonical" href="https://esim.com.mm/blog" />
        <meta property="og:title" content="Blog - eSIM Myanmar" />
        <meta property="og:description" content="Latest news and updates from ESIM MYANMAR COMPANY LIMITED" />
        <meta property="og:url" content="https://esim.com.mm/blog" />
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen py-12 sm:py-16 lg:py-20" style={{ background: '#1e2f3c' }}>
        <div className="container">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#F8F9FA' }}>
              Blog & <span style={{ color: '#00FFFF' }}>News</span>
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'rgba(248, 249, 250, 0.8)' }}>
              Stay informed with the latest updates, guides, and insights from eSIM Myanmar
            </p>
          </motion.header>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-6 py-3 rounded-lg font-medium transition-all"
                style={{
                  background: selectedCategory === cat.id 
                    ? 'linear-gradient(135deg, #00FFFF 0%, #008B9C 100%)' 
                    : 'rgba(248, 249, 250, 0.1)',
                  color: selectedCategory === cat.id ? '#1e2f3c' : '#F8F9FA',
                  border: selectedCategory === cat.id ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                  minHeight: '44px'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(248, 249, 250, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(0, 255, 255, 0.2)', color: '#00FFFF' }}
                    >
                      {categories.find(c => c.id === post.category)?.label}
                    </span>
                    <span style={{ color: 'rgba(248, 249, 250, 0.6)', fontSize: '14px' }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3" style={{ color: '#F8F9FA' }}>
                    {post.title}
                  </h2>
                  <p className="mb-4" style={{ color: 'rgba(248, 249, 250, 0.7)', fontSize: '15px', lineHeight: '1.6' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ color: 'rgba(248, 249, 250, 0.6)', fontSize: '13px' }}>
                        {post.author}
                      </p>
                      <p style={{ color: 'rgba(248, 249, 250, 0.5)', fontSize: '12px' }}>
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="px-4 py-2 rounded-lg font-medium transition-all"
                      style={{
                        background: 'rgba(0, 255, 255, 0.1)',
                        color: '#00FFFF',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        minHeight: '40px'
                      }}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl" style={{ color: 'rgba(248, 249, 250, 0.6)' }}>
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
