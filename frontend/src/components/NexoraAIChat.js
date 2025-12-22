/**
 * NexoraAIChat.js - Full Screen AI Assistant with Christmas Santa
 * ESIM MYANMAR COMPANY LIMITED
 * Seasonal Design with Loading Flow UI
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = 'https://i.ibb.co/qL00rsqJ/Colored.png';

const isSeasonalActive = () => {
  const now = new Date();
  const start = new Date('2025-12-15T00:00:00');
  const end = new Date('2026-02-01T00:00:00');
  return now >= start && now < end;
};

const MiniSanta = ({ size = 32 }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    animate={{ y: [0, -3, 0], rotate: [0, 5, 0, -5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <defs>
      <linearGradient id="asSantaBody" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#1a2632"/>
        <stop offset="100%" stopColor="#2a3f52"/>
      </linearGradient>
      <linearGradient id="asSantaCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFFF"/>
        <stop offset="100%" stopColor="#6495ED"/>
      </linearGradient>
    </defs>
    <ellipse cx="20" cy="28" rx="10" ry="10" fill="url(#asSantaBody)" stroke="#00FFFF" strokeWidth="0.5" strokeOpacity="0.5"/>
    <rect x="10" y="26" width="20" height="4" rx="1" fill="#141f28"/>
    <rect x="17" y="25" width="6" height="6" rx="1.5" fill="url(#asSantaCyan)"/>
    <circle cx="20" cy="14" r="8" fill="#F8E6D9"/>
    <path d="M12 13 Q16 8 18 5 Q20 0 22 5 Q24 8 28 13" fill="url(#asSantaBody)" stroke="#00FFFF" strokeWidth="0.5" strokeOpacity="0.5"/>
    <ellipse cx="20" cy="13" rx="9" ry="2.5" fill="white"/>
    <circle cx="27" cy="3" r="3" fill="white"/>
    <circle cx="17" cy="13" r="1.2" fill="#1a2632"/>
    <circle cx="23" cy="13" r="1.2" fill="#1a2632"/>
    <ellipse cx="20" cy="16" rx="1.5" ry="1" fill="#E8B89D"/>
    <path d="M17 18 Q20 21 23 18" stroke="#1a2632" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    <path d="M12 16 Q16 18 20 22 Q24 18 28 16" fill="white"/>
    <motion.g
      animate={{ rotate: [0, 20, 0, -15, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '30px 24px' }}
    >
      <ellipse cx="32" cy="22" rx="4" ry="3" fill="#F8E6D9"/>
      <ellipse cx="30" cy="24" rx="3" ry="2" fill="white"/>
    </motion.g>
  </motion.svg>
);

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const seasonal = isSeasonalActive();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #0a1520 0%, #1e2f3c 50%, #0a1520 100%)',
        zIndex: 10
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(100, 149, 237, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      {/* Logo with Santa */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'backOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', position: 'relative' }}
      >
        <img
          src={LOGO_URL}
          alt="eSIM Myanmar"
          style={{ width: '72px', height: '72px', objectFit: 'contain', borderRadius: '12px', filter: 'drop-shadow(0 8px 24px rgba(0, 255, 255, 0.4))' }}
        />
        {seasonal && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ position: 'absolute', top: '-20px', right: '-40px' }}
          >
            <MiniSanta size={48} />
          </motion.div>
        )}
        <div>
          <h2 style={{ color: '#F8F9FA', fontSize: '28px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
            Nexora AI
          </h2>
          <p style={{ color: '#00FFFF', fontSize: '14px', margin: 0, fontWeight: '500' }}>
            eSIM Assistant
          </p>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '280px', opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          height: '6px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '16px'
        }}
      >
        <motion.div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #00FFFF 0%, #6495ED 100%)',
            borderRadius: '3px',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
          }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ color: '#8B9CAF', fontSize: '13px' }}
      >
        {progress < 30 ? 'Initializing AI...' : progress < 60 ? 'Loading knowledge base...' : progress < 90 ? 'Preparing assistant...' : 'Ready!'}
      </motion.p>

      {seasonal && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ color: '#00FFFF', fontSize: '12px', marginTop: '24px', fontWeight: '600' }}
        >
          Season Greetings from eSIM Myanmar
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
    if (matchCount >= 2 || lowerQuery.includes(faq.q.toLowerCase().substring(0, 15))) {
      return { type: 'faq', content: faq.a };
    }
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
  const [messages, setMessages] = useState([{ id: 1, type: 'ai', content: 'Hello! I am Nexora AI, your eSIM assistant.\n\nI can help with:\nMPT, ATOM, U9, MYTEL eSIM\nPricing and activation\nDevice compatibility\nPayment methods', timestamp: new Date() }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const seasonal = isSeasonalActive();

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);
  useEffect(() => {
    if (isOpen && !isLoading && inputRef.current) inputRef.current.focus();
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
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

  const handleQuickAction = (query) => {
    setInputValue(query);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), type: 'user', content: query, timestamp: new Date() }]);
      setIsTyping(true);
      setTimeout(() => {
        const response = generateAIResponse(query);
        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', content: response.content, responseType: response.type, provider: response.provider, timestamp: new Date() }]);
        setIsTyping(false);
        setInputValue('');
      }, 600);
    }, 100);
  };

  const providers = [{ id: 'MPT', color: '#FFD700' }, { id: 'ATOM', color: '#FF6B35' }, { id: 'U9', color: '#9B59B6' }, { id: 'MYTEL', color: '#00A651' }];
  const quickQuestions = ['What is eSIM?', 'How much does it cost?', 'Supported devices', 'How to activate?', 'Payment methods'];


  return (
    <>
      {/* Toggle Button with Logo and Santa */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          padding: '12px 16px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(22, 36, 48, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          border: isOpen ? '2px solid #00FFFF' : '1px solid rgba(0, 255, 255, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 255, 255, 0.2)',
          zIndex: 9999
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <img src={LOGO_URL} alt="eSIM" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '8px' }} />
          {seasonal && (
            <div style={{ position: 'absolute', top: '-14px', right: '-18px' }}>
              <MiniSanta size={28} />
            </div>
          )}
        </div>
        <span style={{ color: '#00FFFF', fontWeight: '700', fontSize: '14px' }}>
          {isOpen ? 'Close' : 'Ask AI'}
        </span>
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
              inset: 0,
              background: 'linear-gradient(180deg, #0a1520 0%, #1e2f3c 50%, #0a1520 100%)',
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Loading Screen */}
            <AnimatePresence>
              {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            {/* Background Pattern */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(100, 149, 237, 0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />

            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: isLoading ? 0 : 1 }}
              transition={{ delay: 0.1 }}
              style={{ padding: '20px 24px', background: 'linear-gradient(180deg, rgba(0, 255, 255, 0.08) 0%, transparent 100%)', borderBottom: '1px solid rgba(0, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <img src={LOGO_URL} alt="eSIM Myanmar" style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '14px', boxShadow: '0 8px 32px rgba(0, 255, 255, 0.4)' }} />
                  {seasonal && (
                    <div style={{ position: 'absolute', top: '-16px', right: '-24px' }}>
                      <MiniSanta size={40} />
                    </div>
                  )}
                </div>
                <div>
                  <h1 style={{ color: '#F8F9FA', fontSize: '24px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>Nexora AI</h1>
                  <p style={{ color: '#00FFFF', fontSize: '14px', margin: 0, fontWeight: '500' }}>eSIM Assistant - Always Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(0, 255, 255, 0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </motion.div>


            {/* Main Content */}
            {!isLoading && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '900px', width: '100%', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages.map((msg) => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{ maxWidth: '75%', padding: '16px 20px', borderRadius: msg.type === 'user' ? '20px 20px 6px 20px' : '20px 20px 20px 6px', background: msg.type === 'user' ? 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)' : 'rgba(255, 255, 255, 0.06)', color: msg.type === 'user' ? '#1e2f3c' : '#F8F9FA', fontSize: '15px', lineHeight: '1.6', whiteSpace: 'pre-wrap', border: msg.type === 'ai' ? '1px solid rgba(0, 255, 255, 0.15)' : 'none', boxShadow: msg.type === 'user' ? '0 8px 32px rgba(0, 255, 255, 0.25)' : '0 4px 20px rgba(0, 0, 0, 0.2)', fontWeight: msg.type === 'user' ? '600' : '400' }}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '8px', padding: '16px 20px' }}>
                      {[0, 1, 2].map((i) => (<motion.div key={i} animate={{ y: [0, -8, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }} style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00FFFF' }} />))}
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ padding: '16px 0', borderTop: '1px solid rgba(0, 255, 255, 0.1)', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                  {quickQuestions.map((q, i) => (
                    <button key={i} onClick={() => handleQuickAction(q)} style={{ padding: '10px 18px', borderRadius: '12px', background: 'rgba(0, 255, 255, 0.08)', border: '1px solid rgba(0, 255, 255, 0.2)', color: '#00FFFF', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{q}</button>
                  ))}
                </motion.div>

                {/* Provider Buttons */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ padding: '16px 0', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  {providers.map((p) => (
                    <button key={p.id} onClick={() => handleQuickAction(`Tell me about ${p.id} eSIM`)} style={{ padding: '12px 24px', borderRadius: '14px', background: `${p.color}15`, border: `2px solid ${p.color}60`, color: p.color, fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: `0 4px 20px ${p.color}20` }}>{p.id}</button>
                  ))}
                </motion.div>

                {/* Input */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ padding: '20px 0 24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask about eSIM, providers, pricing..." style={{ flex: 1, padding: '18px 24px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.06)', border: '2px solid rgba(0, 255, 255, 0.2)', color: '#F8F9FA', fontSize: '16px', outline: 'none' }} />
                  <button onClick={handleSend} disabled={!inputValue.trim()} style={{ width: '60px', height: '60px', borderRadius: '16px', background: inputValue.trim() ? 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)' : 'rgba(255, 255, 255, 0.1)', border: 'none', cursor: inputValue.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: inputValue.trim() ? '0 8px 32px rgba(0, 255, 255, 0.4)' : 'none' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={inputValue.trim() ? '#1e2f3c' : '#666'} strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </motion.div>
              </div>
            )}

            {/* Footer */}
            {!isLoading && (
              <div style={{ padding: '12px 24px', textAlign: 'center', borderTop: '1px solid rgba(0, 255, 255, 0.1)', position: 'relative', zIndex: 1 }}>
                <p style={{ color: '#8B9CAF', fontSize: '12px', margin: 0 }}>ESIM MYANMAR COMPANY LIMITED - esim.com.mm</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NexoraAIChat;