/**
 * NexoraAIChat.js - Full Screen AI Assistant
 * ESIM MYANMAR COMPANY LIMITED
 * iOS/Safari Compatible - 4th Anniversary Edition
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = 'https://i.ibb.co/qL00rsqJ/Colored.png';

const isSeasonalActive = () => {
  return true; // Always active for 4th Anniversary
};

const MiniAnniversary = ({ size = 32 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    animate={{ y: [0, -3, 0], rotate: [0, 5, 0, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    style={{ display: 'block' }}
  >
    <defs>
      <linearGradient id="annivGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="100%" stopColor="#6495ED"/>
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="16" fill="url(#annivGrad)" opacity="0.2"/>
    <text x="20" y="26" fontSize="20" fontWeight="bold" fill="#00FFFF" textAnchor="middle">4</text>
    <motion.circle
      cx="20" cy="20" r="18"
      stroke="#00FFFF" strokeWidth="2" fill="none"
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
);


const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const seasonal = isSeasonalActive();

  useEffect(() => {
    let mounted = true;
    const timer = setInterval(() => {
      if (!mounted) return;
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => mounted && onComplete(), 300);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => { mounted = false; clearInterval(timer); };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #0a1520 0%, #1e2f3c 50%, #0a1520 100%)',
        zIndex: 10,
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(100, 149, 237, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'backOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', position: 'relative' }}
      >
        <img
          src={LOGO_URL}
          alt="eSIM Myanmar"
          style={{ width: '72px', height: '72px', objectFit: 'contain', borderRadius: '12px', WebkitFilter: 'drop-shadow(0 8px 24px rgba(0, 255, 255, 0.4))', filter: 'drop-shadow(0 8px 24px rgba(0, 255, 255, 0.4))' }}
        />
        {seasonal && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ position: 'absolute', top: '-20px', right: '-40px' }}
          >
            <MiniAnniversary size={48} />
          </motion.div>
        )}
        <div>
          <h2 style={{ color: '#F8F9FA', fontSize: '28px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>Nexora AI</h2>
          <p style={{ color: '#00FFFF', fontSize: '14px', margin: 0, fontWeight: '500' }}>eSIM Assistant</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '280px', opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}
      >
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #00FFFF 0%, #6495ED 100%)', borderRadius: '3px', boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)', transition: 'width 0.1s ease-out' }} />
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ color: '#8B9CAF', fontSize: '13px', margin: 0 }}>
        {progress < 30 ? 'Initializing AI...' : progress < 60 ? 'Loading knowledge base...' : progress < 90 ? 'Preparing assistant...' : 'Ready!'}
      </motion.p>

      {seasonal && (
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ color: '#00FFFF', fontSize: '12px', marginTop: '24px', fontWeight: '600' }}>
          4th Anniversary - Free eSIM for iOS & Android
        </motion.p>
      )}
    </motion.div>
  );
};


const AI_KNOWLEDGE = {
  providers: {
    MPT: { name: 'MPT', fullName: 'Myanma Posts and Telecommunications', esimPrice: '120,000 MMK', supports5G: true, supportsVoLTE: true, maxEsim: 3, transferCooldown: '30 days', coverage: 'Nationwide coverage with 5G in major cities', prefixes: ['09', '097', '098'], color: '#FFD700' },
    ATOM: { name: 'ATOM', fullName: 'ATOM (Ooredoo Myanmar)', esimPrice: '120,000 MMK', supports5G: true, supportsVoLTE: true, maxEsim: 2, transferCooldown: '14 days', coverage: 'Urban and suburban coverage', prefixes: ['094', '0944', '0945'], color: '#FF6B35' },
    U9: { name: 'U9', fullName: 'U9 Mobile (Youth Network)', esimPrice: '120,000 MMK', supports5G: true, supportsVoLTE: true, maxEsim: 2, transferCooldown: '14 days', coverage: 'Urban areas with youth-focused plans', prefixes: ['094', '0943'], color: '#9B59B6' },
    MYTEL: { name: 'MYTEL', fullName: 'Mytel (Telecom International Myanmar)', esimPrice: '120,000 MMK', supports5G: true, supportsVoLTE: true, maxEsim: 3, transferCooldown: '7 days', coverage: 'Expanding nationwide coverage', prefixes: ['096', '0966', '0967', '0968', '0969'], color: '#00A651' }
  },
  faqs: [
    { q: 'What is eSIM?', a: 'eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan without using a physical SIM card. It is built into your device and can store multiple carrier profiles.' },
    { q: 'How much does eSIM cost?', a: 'eSIM activation costs 120,000 MMK for all providers (MPT, ATOM, U9, MYTEL). This is a one-time activation fee.' },
    { q: 'Which devices support eSIM?', a: 'eSIM is supported on iPhone XS and newer, Samsung Galaxy S20 and newer, Google Pixel 3 and newer, and many other modern smartphones, tablets, and wearables.' },
    { q: 'How do I activate eSIM?', a: 'After purchase, you will receive a QR code. Go to your device settings, select "Add Cellular Plan" or "Add eSIM", and scan the QR code to activate.' },
    { q: 'Can I transfer eSIM between devices?', a: 'Yes, you can transfer your eSIM between devices. The transfer cooldown period varies by provider: MPT (30 days), ATOM/U9 (14 days), MYTEL (7 days).' },
    { q: 'What payment methods are accepted?', a: 'We accept MMQR payments from all major Myanmar banks and mobile wallets including KBZ Pay, Wave Money, and AYA Pay.' }
  ]
};

const generateAIResponse = (query) => {
  const lowerQuery = query.toLowerCase();
  for (const [key, provider] of Object.entries(AI_KNOWLEDGE.providers)) {
    if (lowerQuery.includes(key.toLowerCase()) || lowerQuery.includes(provider.name.toLowerCase())) {
      return { type: 'provider', provider: key, content: `${provider.fullName}\n\neSIM Price: ${provider.esimPrice}\n5G Support: ${provider.supports5G ? 'Yes' : 'No'}\nVoLTE Support: ${provider.supportsVoLTE ? 'Yes' : 'No'}\nMax eSIM: ${provider.maxEsim}\nTransfer Cooldown: ${provider.transferCooldown}\nCoverage: ${provider.coverage}\nPhone Prefixes: ${provider.prefixes.join(', ')}` };
    }
  }
  for (const faq of AI_KNOWLEDGE.faqs) {
    const keywords = faq.q.toLowerCase().split(' ').filter(w => w.length > 3);
    const matchCount = keywords.filter(kw => lowerQuery.includes(kw)).length;
    if (matchCount >= 2 || lowerQuery.includes(faq.q.toLowerCase().substring(0, 15))) return { type: 'faq', content: faq.a };
  }
  if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('how much')) return { type: 'info', content: 'eSIM activation costs 120,000 MMK for all providers (MPT, ATOM, U9, MYTEL). This includes instant activation and QR code delivery.' };
  if (lowerQuery.includes('device') || lowerQuery.includes('iphone') || lowerQuery.includes('samsung') || lowerQuery.includes('android')) return { type: 'info', content: 'eSIM Supported Devices:\n\niPhone XS and newer\niPad Pro (3rd gen+), iPad Air (3rd gen+)\nApple Watch Series 3+\nSamsung Galaxy S20+, Z Fold, Z Flip\nGoogle Pixel 3+\nHuawei P40+\nXiaomi 12+\nOnePlus 9+' };
  if (lowerQuery.includes('activate') || lowerQuery.includes('how to') || lowerQuery.includes('setup')) return { type: 'steps', content: 'eSIM Activation Steps:\n\n1. Go to /esim-register\n2. Select provider (MPT, ATOM, U9, MYTEL)\n3. Enter phone number\n4. Verify device compatibility\n5. Complete MMQR payment (120,000 MMK)\n6. Receive eSIM QR code\n7. Scan QR in device settings\n8. eSIM activated' };
  if (lowerQuery.includes('transfer') || lowerQuery.includes('move') || lowerQuery.includes('new phone')) return { type: 'info', content: 'eSIM Transfer Cooldowns:\n\nMPT: 30 days\nATOM: 14 days\nU9: 14 days\nMYTEL: 7 days\n\nTransfer between Android and iOS supported.' };
  if (lowerQuery.includes('payment') || lowerQuery.includes('pay') || lowerQuery.includes('mmqr')) return { type: 'info', content: 'Payment Methods:\n\nMMQR (Myanmar QR Payment)\nKBZ Pay\nWave Money\nAYA Pay\n\nAll payments processed securely with instant QR code delivery.' };
  return { type: 'default', content: 'I can help you with:\n\neSIM pricing and activation\nProvider info (MPT, ATOM, U9, MYTEL)\nDevice compatibility\nPayment methods\neSIM transfer\n\nAsk a specific question or tap a provider below.' };
};


const NexoraAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([{ id: 1, type: 'ai', content: 'Hello! I am Nexora AI, your eSIM assistant.\n\nCelebrating 4th Anniversary - Get Free eSIM!\n\nI can help with:\nMPT, ATOM, U9, MYTEL eSIM\nPricing and activation\nDevice compatibility\nPayment methods', timestamp: new Date() }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const seasonal = isSeasonalActive();

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isLoading && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen, isLoading]);

  useEffect(() => {
    if (isOpen) setIsLoading(true);
  }, [isOpen]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;
    const userMessage = { id: Date.now(), type: 'user', content: inputValue.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const response = generateAIResponse(userMessage.content);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', content: response.content, responseType: response.type, provider: response.provider, timestamp: new Date() }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  }, [inputValue]);

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  const handleQuickAction = useCallback((query) => {
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', content: query, timestamp: new Date() }]);
    setIsTyping(true);
    setTimeout(() => {
      const response = generateAIResponse(query);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', content: response.content, responseType: response.type, provider: response.provider, timestamp: new Date() }]);
      setIsTyping(false);
    }, 600);
  }, []);

  const providers = [{ id: 'MPT', color: '#FFD700' }, { id: 'ATOM', color: '#FF6B35' }, { id: 'U9', color: '#9B59B6' }, { id: 'MYTEL', color: '#00A651' }];
  const quickQuestions = ['What is eSIM?', 'How much does it cost?', 'Supported devices', 'How to activate?', 'Payment methods'];


  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
          left: '24px',
          padding: '12px 16px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(22, 36, 48, 0.98) 100%)',
          WebkitBackdropFilter: 'blur(20px)',
          backdropFilter: 'blur(20px)',
          border: isOpen ? '2px solid #00FFFF' : '1px solid rgba(0, 255, 255, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)',
          zIndex: 9999,
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <img src={LOGO_URL} alt="eSIM" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '8px' }} />
          {seasonal && (
            <div style={{ position: 'absolute', top: '-14px', right: '-18px' }}>
              <MiniAnniversary size={28} />
            </div>
          )}
        </div>
        <span style={{ color: '#00FFFF', fontWeight: '700', fontSize: '14px' }}>{isOpen ? 'Close' : 'Ask AI'}</span>
      </motion.button>

      {/* Full Screen Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(180deg, #0a1520 0%, #1e2f3c 50%, #0a1520 100%)',
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <AnimatePresence>
              {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(100, 149, 237, 0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />

            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: isLoading ? 0 : 1 }}
              transition={{ delay: 0.1 }}
              style={{
                padding: 'max(20px, env(safe-area-inset-top, 20px)) 24px 20px',
                background: 'linear-gradient(180deg, rgba(0, 255, 255, 0.08) 0%, transparent 100%)',
                borderBottom: '1px solid rgba(0, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 1,
                flexShrink: 0
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <img src={LOGO_URL} alt="eSIM Myanmar" style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0, 255, 255, 0.4)' }} />
                  {seasonal && (
                    <div style={{ position: 'absolute', top: '-12px', right: '-18px' }}>
                      <MiniAnniversary size={32} />
                    </div>
                  )}
                </div>
                <div>
                  <h1 style={{ color: '#F8F9FA', fontSize: '20px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>Nexora AI</h1>
                  <p style={{ color: '#00FFFF', fontSize: '12px', margin: 0, fontWeight: '500' }}>4th Anniversary Edition</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(0, 255, 255, 0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', WebkitTapHighlightColor: 'transparent' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </motion.div>


            {/* Main Content */}
            {!isLoading && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '900px', width: '100%', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 1, minHeight: 0 }}>
                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px', WebkitOverflowScrolling: 'touch' }}>
                  {messages.map((msg) => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ maxWidth: '80%', padding: '14px 18px', borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: msg.type === 'user' ? 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)' : 'rgba(255, 255, 255, 0.06)', color: msg.type === 'user' ? '#1e2f3c' : '#F8F9FA', fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-wrap', border: msg.type === 'ai' ? '1px solid rgba(0, 255, 255, 0.15)' : 'none', boxShadow: msg.type === 'user' ? '0 4px 16px rgba(0, 255, 255, 0.25)' : '0 2px 12px rgba(0, 0, 0, 0.2)', fontWeight: msg.type === 'user' ? '600' : '400' }}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '6px', padding: '14px 18px' }}>
                      {[0, 1, 2].map((i) => (<motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00FFFF' }} />))}
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                <div style={{ padding: '12px 0', borderTop: '1px solid rgba(0, 255, 255, 0.1)', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', flexShrink: 0 }}>
                  {quickQuestions.map((q, i) => (
                    <button key={i} onClick={() => handleQuickAction(q)} style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(0, 255, 255, 0.08)', border: '1px solid rgba(0, 255, 255, 0.2)', color: '#00FFFF', fontSize: '12px', fontWeight: '600', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>{q}</button>
                  ))}
                </div>

                {/* Provider Buttons */}
                <div style={{ padding: '12px 0', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
                  {providers.map((p) => (
                    <button key={p.id} onClick={() => handleQuickAction(`Tell me about ${p.id} eSIM`)} style={{ padding: '10px 20px', borderRadius: '12px', background: `${p.color}15`, border: `2px solid ${p.color}60`, color: p.color, fontSize: '13px', fontWeight: '700', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>{p.id}</button>
                  ))}
                </div>

                {/* Input */}
                <div style={{ padding: '16px 0', paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))', display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
                  <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask about eSIM..." style={{ flex: 1, padding: '16px 20px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.06)', border: '2px solid rgba(0, 255, 255, 0.2)', color: '#F8F9FA', fontSize: '16px', outline: 'none', WebkitAppearance: 'none', appearance: 'none' }} />
                  <button onClick={handleSend} disabled={!inputValue.trim()} style={{ width: '52px', height: '52px', borderRadius: '14px', background: inputValue.trim() ? 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)' : 'rgba(255, 255, 255, 0.1)', border: 'none', cursor: inputValue.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: inputValue.trim() ? '0 4px 20px rgba(0, 255, 255, 0.4)' : 'none', WebkitTapHighlightColor: 'transparent', flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={inputValue.trim() ? '#1e2f3c' : '#666'} strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            {!isLoading && (
              <div style={{ padding: '10px 24px', textAlign: 'center', borderTop: '1px solid rgba(0, 255, 255, 0.1)', position: 'relative', zIndex: 1, flexShrink: 0 }}>
                <p style={{ color: '#8B9CAF', fontSize: '11px', margin: 0 }}>ESIM MYANMAR COMPANY LIMITED - esim.com.mm</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NexoraAIChat;