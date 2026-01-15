import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Downloads = () => {
  const [downloading, setDownloading] = useState(null);
  const canvasRef = useRef(null);

  const assets = [
    // Christmas Assets
    {
      id: 'christmas-facebook-cover',
      category: '4th Anniversary Christmas',
      title: 'Facebook Cover',
      description: 'Festive Facebook cover for 4th anniversary celebration',
      dimensions: '1200 x 630',
      path: '/assets/christmas-facebook-cover.svg',
      filename: 'esim-myanmar-christmas-facebook-cover'
    },
    {
      id: 'christmas-instagram-post',
      category: '4th Anniversary Christmas',
      title: 'Instagram Post',
      description: 'Square Instagram post for anniversary celebration',
      dimensions: '1080 x 1080',
      path: '/assets/christmas-instagram-post.svg',
      filename: 'esim-myanmar-christmas-instagram-post'
    },
    {
      id: 'christmas-instagram-story',
      category: '4th Anniversary Christmas',
      title: 'Instagram Story',
      description: 'Vertical Instagram story for anniversary celebration',
      dimensions: '1080 x 1920',
      path: '/assets/christmas-instagram-story.svg',
      filename: 'esim-myanmar-christmas-instagram-story'
    },
    {
      id: 'christmas-linkedin-cover',
      category: '4th Anniversary Christmas',
      title: 'LinkedIn Cover',
      description: 'Professional LinkedIn cover for anniversary celebration',
      dimensions: '1584 x 396',
      path: '/assets/christmas-linkedin-cover.svg',
      filename: 'esim-myanmar-christmas-linkedin-cover'
    },
    {
      id: 'christmas-profile-picture',
      category: '4th Anniversary Christmas',
      title: 'Profile Picture',
      description: 'Circular profile picture for anniversary celebration',
      dimensions: '400 x 400',
      path: '/assets/christmas-profile-picture.svg',
      filename: 'esim-myanmar-christmas-profile-picture'
    },
    {
      id: 'christmas-twitter-header',
      category: '4th Anniversary Christmas',
      title: 'Twitter Header',
      description: 'Twitter/X header banner for anniversary celebration',
      dimensions: '1500 x 500',
      path: '/assets/christmas-twitter-header.svg',
      filename: 'esim-myanmar-christmas-twitter-header'
    },
    {
      id: 'christmas-youtube-thumbnail',
      category: '4th Anniversary Christmas',
      title: 'YouTube Thumbnail',
      description: 'YouTube video thumbnail for anniversary celebration',
      dimensions: '1280 x 720',
      path: '/assets/christmas-youtube-thumbnail.svg',
      filename: 'esim-myanmar-christmas-youtube-thumbnail'
    },
    {
      id: 'christmas-profile-hd',
      category: '4th Anniversary Christmas',
      title: 'HD Profile Picture',
      description: 'High definition profile picture for anniversary celebration',
      dimensions: '1080 x 1080',
      path: '/assets/christmas-profile-hd-1080p.svg',
      filename: 'esim-myanmar-christmas-profile-hd-1080p'
    },
    {
      id: 'christmas-profile-esim-myanmar',
      category: '4th Anniversary Christmas',
      title: 'eSIM Myanmar Profile',
      description: 'Branded profile picture for eSIM Myanmar anniversary',
      dimensions: '400 x 400',
      path: '/assets/christmas-profile-esim-myanmar.svg',
      filename: 'esim-myanmar-christmas-profile-esim-myanmar'
    },
    // Social Media Templates
    {
      id: 'social-facebook-cover',
      category: 'Social Media Templates',
      title: 'Facebook Cover',
      description: 'Standard Facebook cover template',
      dimensions: '1200 x 630',
      path: '/assets/social/facebook-cover-1200x630.svg',
      filename: 'esim-myanmar-facebook-cover'
    },
    {
      id: 'social-instagram-post',
      category: 'Social Media Templates',
      title: 'Instagram Post',
      description: 'Square Instagram post template',
      dimensions: '1080 x 1080',
      path: '/assets/social/instagram-post-1080x1080.svg',
      filename: 'esim-myanmar-instagram-post'
    },
    {
      id: 'social-instagram-story',
      category: 'Social Media Templates',
      title: 'Instagram Story',
      description: 'Vertical Instagram story template',
      dimensions: '1080 x 1920',
      path: '/assets/social/instagram-story-1080x1920.svg',
      filename: 'esim-myanmar-instagram-story'
    },
    {
      id: 'social-linkedin-cover',
      category: 'Social Media Templates',
      title: 'LinkedIn Cover',
      description: 'Professional LinkedIn cover template',
      dimensions: '1584 x 396',
      path: '/assets/social/linkedin-cover-1584x396.svg',
      filename: 'esim-myanmar-linkedin-cover'
    },
    {
      id: 'social-profile-picture',
      category: 'Social Media Templates',
      title: 'Profile Picture',
      description: 'Circular profile picture template',
      dimensions: '400 x 400',
      path: '/assets/social/profile-picture-400x400.svg',
      filename: 'esim-myanmar-profile-picture'
    },
    {
      id: 'social-twitter-header',
      category: 'Social Media Templates',
      title: 'Twitter Header',
      description: 'Twitter/X header banner template',
      dimensions: '1500 x 500',
      path: '/assets/social/twitter-header-1500x500.svg',
      filename: 'esim-myanmar-twitter-header'
    },
    {
      id: 'social-youtube-thumbnail',
      category: 'Social Media Templates',
      title: 'YouTube Thumbnail',
      description: 'YouTube video thumbnail template',
      dimensions: '1280 x 720',
      path: '/assets/social/youtube-thumbnail-1280x720.svg',
      filename: 'esim-myanmar-youtube-thumbnail'
    }
  ];

  const downloadSVG = async (asset) => {
    setDownloading(`${asset.id}-svg`);
    try {
      const response = await fetch(asset.path);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${asset.filename}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
    setTimeout(() => setDownloading(null), 500);
  };

  const downloadPNG = async (asset) => {
    setDownloading(`${asset.id}-png`);
    try {
      const [width, height] = asset.dimensions.split(' x ').map(Number);
      const response = await fetch(asset.path);
      const svgText = await response.text();
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        
        canvas.toBlob((blob) => {
          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = `${asset.filename}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
          setDownloading(null);
        }, 'image/png', 1.0);
      };
      
      img.src = url;
    } catch (error) {
      console.error('PNG conversion failed:', error);
      setDownloading(null);
    }
  };

  const downloadJPG = async (asset) => {
    setDownloading(`${asset.id}-jpg`);
    try {
      const [width, height] = asset.dimensions.split(' x ').map(Number);
      const response = await fetch(asset.path);
      const svgText = await response.text();
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // Fill with background color for JPG
      ctx.fillStyle = '#1e2f3c';
      ctx.fillRect(0, 0, width, height);
      
      const img = new Image();
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        
        canvas.toBlob((blob) => {
          const jpgUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = jpgUrl;
          link.download = `${asset.filename}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(jpgUrl);
          setDownloading(null);
        }, 'image/jpeg', 0.95);
      };
      
      img.src = url;
    } catch (error) {
      console.error('JPG conversion failed:', error);
      setDownloading(null);
    }
  };

  const categories = [...new Set(assets.map(a => a.category))];

  return (
    <div className="min-h-screen py-20 px-4" style={{ background: '#1e2f3c' }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            4th Anniversary Assets
          </h1>
          <p className="text-lg text-gray-400 mb-2">
            eSIM Myanmar branded social media profiles and covers
          </p>
          <p className="text-sm text-gray-500">
            Download in SVG, PNG, or JPG format
          </p>
        </motion.div>

        {/* Color Palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Color Palette (Strict)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-14 rounded-lg mb-2" style={{ background: '#1e2f3c', border: '1px solid rgba(255,255,255,0.2)' }} />
              <p className="text-sm text-gray-400">Dark Blue</p>
              <p className="text-xs font-mono" style={{ color: '#00FFFF' }}>#1e2f3c</p>
            </div>
            <div className="text-center">
              <div className="w-full h-14 rounded-lg mb-2" style={{ background: '#00FFFF' }} />
              <p className="text-sm text-gray-400">Cyan</p>
              <p className="text-xs font-mono" style={{ color: '#00FFFF' }}>#00FFFF</p>
            </div>
            <div className="text-center">
              <div className="w-full h-14 rounded-lg mb-2" style={{ background: '#F8F9FA' }} />
              <p className="text-sm text-gray-400">Pearl</p>
              <p className="text-xs font-mono" style={{ color: '#00FFFF' }}>#F8F9FA</p>
            </div>
            <div className="text-center">
              <div className="w-full h-14 rounded-lg mb-2" style={{ background: 'linear-gradient(135deg, rgba(248,249,250,0.15), rgba(248,249,250,0.05))', border: '1px solid rgba(255,255,255,0.1)' }} />
              <p className="text-sm text-gray-400">Glass</p>
              <p className="text-xs font-mono" style={{ color: '#00FFFF' }}>Transparent</p>
            </div>
          </div>
        </motion.div>

        {/* Assets by Category */}
        {categories.map((category, catIndex) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span style={{ color: '#00FFFF' }}>{'// '}</span> {category}
            </h2>
            <div className="grid gap-4">
              {assets.filter(a => a.category === category).map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Preview */}
                    <div 
                      className="w-full lg:w-48 h-28 rounded-lg overflow-hidden flex-shrink-0"
                      style={{ background: '#0f1a24' }}
                    >
                      <img 
                        src={asset.path} 
                        alt={asset.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {asset.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {asset.description}
                      </p>
                      <span 
                        className="inline-block px-2 py-1 rounded text-xs"
                        style={{ background: 'rgba(0,255,255,0.1)', color: '#00FFFF' }}
                      >
                        {asset.dimensions}
                      </span>
                    </div>

                    {/* Download Buttons */}
                    <div className="flex flex-wrap gap-2 flex-shrink-0">
                      <button
                        onClick={() => downloadSVG(asset)}
                        disabled={downloading === `${asset.id}-svg`}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                        style={{
                          background: downloading === `${asset.id}-svg` ? '#00CCCC' : '#00FFFF',
                          color: '#1e2f3c'
                        }}
                      >
                        {downloading === `${asset.id}-svg` ? (
                          <span className="animate-pulse">...</span>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            SVG
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => downloadPNG(asset)}
                        disabled={downloading === `${asset.id}-png`}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                        style={{
                          background: downloading === `${asset.id}-png` ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
                          color: '#F8F9FA',
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        {downloading === `${asset.id}-png` ? (
                          <span className="animate-pulse">...</span>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            PNG
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => downloadJPG(asset)}
                        disabled={downloading === `${asset.id}-jpg`}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-all"
                        style={{
                          background: downloading === `${asset.id}-jpg` ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
                          color: '#F8F9FA',
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        {downloading === `${asset.id}-jpg` ? (
                          <span className="animate-pulse">...</span>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            JPG
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* PSD Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-xl p-6 text-center"
          style={{
            background: 'rgba(0,255,255,0.05)',
            border: '1px solid rgba(0,255,255,0.2)'
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">Need PSD Files?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Open any SVG file in Adobe Photoshop to edit as vector smart objects and save as PSD.
          </p>
          <p className="text-xs text-gray-500">
            File &gt; Open &gt; Select SVG &gt; Edit &gt; Save As PSD
          </p>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>ESIM MYANMAR COMPANY LIMITED - esim.com.mm</p>
          <p className="mt-1">4th Anniversary Brand Assets</p>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
