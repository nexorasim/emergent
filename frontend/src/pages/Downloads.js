import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Downloads = () => {
  const [downloading, setDownloading] = useState(null);
  const canvasRef = useRef(null);

  const assets = [
    {
      id: 'hd-1080p',
      title: 'HD Wallpaper 1080p',
      description: 'Full HD desktop wallpaper/banner',
      filename: 'christmas-profile-hd-1080p',
      path: '/assets/christmas-profile-hd-1080p.svg',
      dimensions: '1920 x 1080',
      category: 'Desktop'
    },
    {
      id: 'linkedin-cover',
      title: 'LinkedIn Cover',
      description: 'LinkedIn profile background',
      filename: 'christmas-linkedin-cover',
      path: '/assets/christmas-linkedin-cover.svg',
      dimensions: '1584 x 396',
      category: 'Social'
    },
    {
      id: 'facebook-cover',
      title: 'Facebook Cover',
      description: 'Facebook page cover photo',
      filename: 'christmas-facebook-cover',
      path: '/assets/christmas-facebook-cover.svg',
      dimensions: '820 x 312',
      category: 'Social'
    },
    {
      id: 'twitter-header',
      title: 'Twitter/X Header',
      description: 'Twitter profile header',
      filename: 'christmas-twitter-header',
      path: '/assets/christmas-twitter-header.svg',
      dimensions: '1500 x 500',
      category: 'Social'
    },
    {
      id: 'instagram-post',
      title: 'Instagram Post',
      description: 'Square post for Instagram feed',
      filename: 'christmas-instagram-post',
      path: '/assets/christmas-instagram-post.svg',
      dimensions: '1080 x 1080',
      category: 'Social'
    },
    {
      id: 'instagram-story',
      title: 'Instagram Story',
      description: 'Vertical story format',
      filename: 'christmas-instagram-story',
      path: '/assets/christmas-instagram-story.svg',
      dimensions: '1080 x 1920',
      category: 'Social'
    },
    {
      id: 'youtube-thumbnail',
      title: 'YouTube Thumbnail',
      description: 'Video thumbnail 16:9',
      filename: 'christmas-youtube-thumbnail',
      path: '/assets/christmas-youtube-thumbnail.svg',
      dimensions: '1280 x 720',
      category: 'Video'
    },
    {
      id: 'profile-picture',
      title: 'Profile Picture',
      description: 'Square profile avatar',
      filename: 'christmas-profile-picture',
      path: '/assets/christmas-profile-picture.svg',
      dimensions: '400 x 400',
      category: 'Profile'
    },
    {
      id: 'social-cover',
      title: 'Social Media Cover',
      description: 'Universal social cover (OG)',
      filename: 'christmas-profile-esim-myanmar',
      path: '/assets/christmas-profile-esim-myanmar.svg',
      dimensions: '1200 x 630',
      category: 'Social'
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
            Christmas 2025 Assets
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
          <p className="mt-1">Christmas 2025 Brand Assets</p>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
