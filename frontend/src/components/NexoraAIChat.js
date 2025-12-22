/**
 * NexoraAIChat.js - Premium AI Assistant Interface
 * 2026 UI/UX Glassmorphism Design
 * MPT, ATOM, U9, MYTEL eSIM Support
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// AI Knowledge Base - 4 Providers
const AI_KNOWLEDGE = {
  providers: {
    MPT: {
      name: 'MPT',
      fullName: 'Myanma Posts and Telecommunications',
      esimPrice: '120,000 MMK',
      supports5G: true,
      supportsVoLTE: true,
      maxEsim: 3,
      transferCooldown: '30 days',
      coverage: 'Nationwide coverage with 5G in major cities',
      prefixes: ['09', '097', '098'],
      color: '#FFD700'
    },
    ATOM: {
      name: 'ATOM',
      fullName: 'ATOM (Ooredoo Myanmar)',
      esimPrice: '120,000 MMK',
      supports5G: true,
      supportsVoLTE: true,
      maxEsim: 2,
      transferCooldown: '14 days',
      coverage: 'Urban and suburban coverage',
      prefixes: ['094', '0944', '0945'],
      color: '#FF6B35'
    },
    U9: {
      name: 'U9',
      fullName: 'U9 Mobile (Youth Network)',
      esimPrice: '120,000 MMK',
      supports5G: true,
      supportsVoLTE: true,
      maxEsim: 2,
      transferCooldown: '14 days',
      coverage: 'Urban areas with youth-focused plans',
      prefixes: ['094', '0943'],
      color: '#9B59B6'
    },
    MYTEL: {
      name: 'MYTEL',
      fullName: 'Mytel (Telecom International Myanmar)',
      esimPrice: '120,000 MMK',
      supports5G: true,
      supportsVoLTE: true,
      maxEsim: 3,
      transferCooldown: '7 days',
      coverage: 'Expanding nationwide coverage',
      prefixes: ['096', '0966', '0967', '0968', '0969'],
      color: '#00A651'
    }
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
      return {
        type: 'provider',
        provider: key,
        content: `${provider.fullName}\n\neSIM Price: ${provider.esimPrice}\n5G Support: ${provider.supports5G ? 'Yes' : 'No'}\nVoLTE Support: ${provider.supportsVoLTE ? 'Yes' : 'No'}\nMax eSIM: ${provider.maxEsim}\nTransfer Cooldown: ${provider.transferCooldown}\nCoverage: ${provider.coverage}\nPhone Prefixes: ${provider.prefixes.join(', ')}`
      };
    }
  }
  
  for (const faq of AI_KNOWLEDGE.faqs) {
    const keywords = faq.q.toLowerCase().split(' ').filter(w => w.length > 3);
    const matchCount = keywords.filter(kw => lowerQuery.includes(kw)).length;
    if (matchCount >= 2 || lowerQuery.includes(faq.q.toLowerCase().substring(0, 15))) {
      return { type: 'faq', content: faq.a };
    }
  }
  
  if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('how much')) {
    return { type: 'info', content: 'eSIM activation costs 120,000 MMK for all providers (MPT, ATOM, U9, MYTEL). This includes instant activation and QR code delivery.' };
  }
  
  if (lowerQuery.includes('device') || lowerQuery.includes('iphone') || lowerQuery.includes('samsung') || lowerQuery.includes('android')) {
    return { type: 'info', content: 'eSIM Supported Devices:\n\niPhone XS and newer\niPad Pro (3rd gen+), iPad Air (3rd gen+)\nApple Watch Series 3+\nSamsung Galaxy S20+, Z Fold, Z Flip\nGoogle Pixel 3+\nHuawei P40+\nXiaomi 12+\nOnePlus 9+' };
  }
  
  if (lowerQuery.includes('activate') || lowerQuery.includes('how to') || lowerQuery.includes('setup')) {
    return { type: 'steps', content: 'eSIM Activation Steps:\n\n1. Go to /esim-register\n2. Select provider (MPT, ATOM, U9, MYTEL)\n3. Enter phone number\n4. Verify device compatibility\n5. Complete MMQR payment (120,000 MMK)\n6. Receive eSIM QR code\n7. Scan QR in device settings\n8. eSIM activated' };
  }
  
  if (lowerQuery.includes('transfer') || lowerQuery.includes('move') || lowerQuery.includes('new phone')) {
    return { type: 'info', content: 'eSIM Transfer Cooldowns:\n\nMPT: 30 days\nATOM: 14 days\nU9: 14 days\nMYTEL: 7 days\n\nTransfer between Android and iOS supported.' };
  }
  
  if (lowerQuery.includes('payment') || lowerQuery.includes('pay') || lowerQuery.includes('mmqr')) {
    return { type: 'info', content: 'Payment Methods:\n\nMMQR (Myanmar QR Payment)\nKBZ Pay\nWave Money\nAYA Pay\n\nAll payments processed securely with instant QR code delivery.' };
  }
  
  return { 
    type: 'default', 
    content: 'I can help you with:\n\neSIM pricing and activation\nProvider info (MPT, ATOM, U9, MYTEL)\nDevice compatibility\nPayment methods\neSIM transfer\n\nAsk a specific question or tap a provider below.' 
  };
};

const NexoraAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'ai', 
      content: 'Hello! I am Nexora AI, your eSIM assistant.\n\nI can help with:\nMPT, ATOM, U9, MYTEL eSIM\nPricing and activation\nDevice compatibility\nPayment methods',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(userMessage.content);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.content,
        responseType: response.type,
        provider: response.provider,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  }, [inputValue]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (query) => {
    setInputValue(query);
    setTimeout(() => {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: query,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const response = generateAIResponse(query);
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: response.content,
          responseType: response.type,
          provider: response.provider,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        setInputValue('');
      }, 600);
    }, 100);
  };

  const providers = [
    { id: 'MPT', color: '#FFD700' },
    { id: 'ATOM', color: '#FF6B35' },
    { id: 'U9', color: '#9B59B6' },
    { id: 'MYTEL', color: '#00A651' }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(22, 36, 48, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          border: isOpen ? '2px solid #00FFFF' : '1px solid rgba(0, 255, 255, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 255, 255, 0.15)',
          zIndex: 1000
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00FFFF" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        )}
      </motion.button>

      {/* Badge */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            position: 'fixed',
            bottom: '88px',
            left: '20px',
            background: 'linear-gradient(135deg, rgba(30, 47, 60, 0.95) 0%, rgba(22, 36, 48, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            color: '#00FFFF',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 999,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          Ask Nexora AI
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: '90px',
              left: '20px',
              width: '380px',
              maxWidth: 'calc(100vw - 40px)',
              height: '520px',
              maxHeight: 'calc(100vh - 120px)',
              background: 'linear-gradient(180deg, rgba(30, 47, 60, 0.98) 0%, rgba(22, 36, 48, 0.99) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(0, 255, 255, 0.25)',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(0, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1001
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                background: 'linear-gradient(90deg, rgba(0, 255, 255, 0.1) 0%, transparent 100%)',
                borderBottom: '1px solid rgba(0, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0, 255, 255, 0.3)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e2f3c" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              </div>
              <div>
                <h3 style={{ color: '#F8F9FA', fontSize: '16px', fontWeight: '700', margin: 0 }}>
                  Nexora AI
                </h3>
                <p style={{ color: '#00FFFF', fontSize: '11px', margin: 0 }}>
                  eSIM Assistant - Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '12px 16px',
                      borderRadius: msg.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.type === 'user' 
                        ? 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)'
                        : 'rgba(255, 255, 255, 0.06)',
                      color: msg.type === 'user' ? '#1e2f3c' : '#F8F9FA',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap',
                      border: msg.type === 'ai' ? '1px solid rgba(0, 255, 255, 0.15)' : 'none',
                      boxShadow: msg.type === 'user' ? '0 4px 15px rgba(0, 255, 255, 0.2)' : 'none'
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', gap: '6px', padding: '12px 16px' }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#00FFFF'
                      }}
                    />
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Provider Quick Actions */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(0, 255, 255, 0.1)',
                display: 'flex',
                gap: '8px',
                justifyContent: 'center'
              }}
            >
              {providers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleQuickAction(`Tell me about ${p.id} eSIM`)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: `${p.color}20`,
                    border: `1px solid ${p.color}50`,
                    color: p.color,
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {p.id}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              style={{
                padding: '12px 16px 16px',
                borderTop: '1px solid rgba(0, 255, 255, 0.1)',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about eSIM..."
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(0, 255, 255, 0.2)',
                  color: '#F8F9FA',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: inputValue.trim() ? '0 4px 15px rgba(0, 255, 255, 0.3)' : 'none'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={inputValue.trim() ? '#1e2f3c' : '#666'} strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NexoraAIChat;
