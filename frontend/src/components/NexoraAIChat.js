/**
 * NexoraAIChat.js - Nexora AI Assistant Chat Interface
 * Premium UI/UX floating chat widget for eSIM support
 * Supports MPT, ATOM, U9, MYTEL queries
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// AI Knowledge Base
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
      prefixes: ['09', '097', '098']
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
      prefixes: ['094', '0944', '0945']
    },
    U9: {
      name: 'U9',
      fullName: 'ATOM U9 (Youth Plan)',
      esimPrice: '120,000 MMK',
      supports5G: true,
      supportsVoLTE: true,
      maxEsim: 2,
      transferCooldown: '14 days',
      coverage: 'Same as ATOM network',
      prefixes: ['094']
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
      prefixes: ['096', '0966', '0967', '0968', '0969']
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

// AI Response Generator
const generateAIResponse = (query) => {
  const lowerQuery = query.toLowerCase();
  
  // Check for provider-specific queries
  for (const [key, provider] of Object.entries(AI_KNOWLEDGE.providers)) {
    if (lowerQuery.includes(key.toLowerCase()) || lowerQuery.includes(provider.name.toLowerCase())) {
      return {
        type: 'provider',
        content: `Here is information about ${provider.fullName}:\n\n` +
          `- eSIM Price: ${provider.esimPrice}\n` +
          `- 5G Support: ${provider.supports5G ? 'Yes' : 'No'}\n` +
          `- VoLTE Support: ${provider.supportsVoLTE ? 'Yes' : 'No'}\n` +
          `- Max eSIM per user: ${provider.maxEsim}\n` +
          `- Transfer Cooldown: ${provider.transferCooldown}\n` +
          `- Coverage: ${provider.coverage}\n` +
          `- Phone Prefixes: ${provider.prefixes.join(', ')}`
      };
    }
  }
  
  // Check for FAQ matches
  for (const faq of AI_KNOWLEDGE.faqs) {
    const keywords = faq.q.toLowerCase().split(' ').filter(w => w.length > 3);
    const matchCount = keywords.filter(kw => lowerQuery.includes(kw)).length;
    if (matchCount >= 2 || lowerQuery.includes(faq.q.toLowerCase().substring(0, 15))) {
      return { type: 'faq', content: faq.a };
    }
  }
  
  // Price query
  if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('how much')) {
    return { type: 'info', content: 'eSIM activation costs 120,000 MMK for all providers (MPT, ATOM, U9, MYTEL). This includes instant activation and QR code delivery.' };
  }
  
  // Device query
  if (lowerQuery.includes('device') || lowerQuery.includes('iphone') || lowerQuery.includes('samsung') || lowerQuery.includes('android')) {
    return { type: 'info', content: 'eSIM is supported on:\n\n- iPhone XS and newer\n- iPad Pro (3rd gen+), iPad Air (3rd gen+)\n- Apple Watch Series 3+\n- Samsung Galaxy S20+, Z Fold, Z Flip\n- Google Pixel 3+\n- Huawei P40+\n- Xiaomi 12+\n- OnePlus 9+\n\nCheck your device settings for eSIM compatibility.' };
  }
  
  // Activation query
  if (lowerQuery.includes('activate') || lowerQuery.includes('how to') || lowerQuery.includes('setup')) {
    return { type: 'steps', content: 'To activate your eSIM:\n\n1. Complete registration at /esim-register\n2. Select your provider (MPT, ATOM, U9, or MYTEL)\n3. Enter your phone number\n4. Verify device compatibility\n5. Complete MMQR payment (120,000 MMK)\n6. Receive your eSIM QR code\n7. Scan QR code in device settings\n8. Your eSIM is now active' };
  }
  
  // Transfer query
  if (lowerQuery.includes('transfer') || lowerQuery.includes('move') || lowerQuery.includes('new phone')) {
    return { type: 'info', content: 'eSIM Transfer Information:\n\n- MPT: 30-day cooldown between transfers\n- ATOM/U9: 14-day cooldown\n- MYTEL: 7-day cooldown\n\nTo transfer, log into your dashboard and select "Transfer eSIM". You can transfer between Android and iOS devices.' };
  }
  
  // Payment query
  if (lowerQuery.includes('payment') || lowerQuery.includes('pay') || lowerQuery.includes('mmqr')) {
    return { type: 'info', content: 'Payment Methods:\n\n- MMQR (Myanmar QR Payment)\n- KBZ Pay\n- Wave Money\n- AYA Pay\n\nAll payments are processed securely. After payment verification, your eSIM QR code will be generated instantly.' };
  }
  
  // Default response
  return { 
    type: 'default', 
    content: 'I can help you with:\n\n- eSIM pricing and activation\n- Provider information (MPT, ATOM, U9, MYTEL)\n- Device compatibility\n- Payment methods\n- eSIM transfer between devices\n\nPlease ask a specific question or type "help" for more options.' 
  };
};

const NexoraAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'ai', 
      content: 'Hello! I am Nexora AI, your eSIM assistant. How can I help you today?\n\nYou can ask me about:\n- MPT, ATOM, U9, MYTEL eSIM\n- Pricing and activation\n- Device compatibility\n- Payment methods',
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

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateAIResponse(userMessage.content);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.content,
        responseType: response.type,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  }, [inputValue]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'MPT eSIM', query: 'Tell me about MPT eSIM' },
    { label: 'ATOM/U9', query: 'What is ATOM U9?' },
    { label: 'MYTEL', query: 'MYTEL eSIM info' },
    { label: 'Pricing', query: 'How much does eSIM cost?' }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="nexora-chat-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 255, 255, 0.4)',
          zIndex: 1000
        }}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e2f3c" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e2f3c" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="10" r="1" fill="#1e2f3c"/>
            <circle cx="8" cy="10" r="1" fill="#1e2f3c"/>
            <circle cx="16" cy="10" r="1" fill="#1e2f3c"/>
          </svg>
        )}
      </motion.button>

      {/* Badge */}
      {!isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '85px',
            left: '20px',
            background: '#1e2f3c',
            color: '#00FFFF',
            padding: '6px 12px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '600',
            zIndex: 999,
            border: '1px solid rgba(0, 255, 255, 0.3)'
          }}
        >
          Ask Nexora AI
        </div>
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
              height: '500px',
              maxHeight: 'calc(100vh - 120px)',
              background: 'linear-gradient(180deg, #1e2f3c 0%, #162430 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
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
                borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e2f3c" strokeWidth="2">
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
                        : 'rgba(255, 255, 255, 0.05)',
                      color: msg.type === 'user' ? '#1e2f3c' : '#F8F9FA',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap',
                      border: msg.type === 'ai' ? '1px solid rgba(0, 255, 255, 0.1)' : 'none'
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
                  style={{ display: 'flex', gap: '4px', padding: '12px 16px' }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
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

            {/* Quick Actions */}
            <div
              style={{
                padding: '8px 16px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                borderTop: '1px solid rgba(0, 255, 255, 0.1)'
              }}
            >
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputValue(action.query);
                    setTimeout(() => handleSend(), 100);
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '12px',
                    background: 'rgba(0, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 255, 255, 0.2)',
                    color: '#00FFFF',
                    fontSize: '11px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(0, 255, 255, 0.2)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(0, 255, 255, 0.1)'}
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              style={{
                padding: '12px 16px',
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
                onKeyDown={handleKeyPress}
                placeholder="Ask about eSIM..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
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
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #00FFFF 0%, #0099CC 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={inputValue.trim() ? '#1e2f3c' : '#666'} strokeWidth="2">
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
