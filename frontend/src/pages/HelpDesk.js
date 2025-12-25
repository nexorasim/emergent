/**
 * HelpDesk.js - Enterprise Help Desk Portal
 * ESIM MYANMAR COMPANY LIMITED
 * Full ticketing system with knowledge base
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const CATEGORIES = [
  { id: 'activation', label: 'eSIM Activation', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'billing', label: 'Billing & Payments', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'technical', label: 'Technical Support', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  { id: 'transfer', label: 'Device Transfer', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { id: 'roaming', label: 'International Roaming', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'account', label: 'Account & Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'other', label: 'Other Inquiries', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
];

const PRIORITIES = [
  { id: 'low', label: 'Low', color: '#6B7280' },
  { id: 'medium', label: 'Medium', color: '#F59E0B' },
  { id: 'high', label: 'High', color: '#EF4444' },
  { id: 'urgent', label: 'Urgent', color: '#DC2626' }
];

const STATUS_COLORS = {
  open: { bg: 'rgba(59, 130, 246, 0.2)', text: '#3B82F6', label: 'Open' },
  in_progress: { bg: 'rgba(245, 158, 11, 0.2)', text: '#F59E0B', label: 'In Progress' },
  waiting_customer: { bg: 'rgba(139, 92, 246, 0.2)', text: '#8B5CF6', label: 'Awaiting Response' },
  resolved: { bg: 'rgba(16, 185, 129, 0.2)', text: '#10B981', label: 'Resolved' },
  closed: { bg: 'rgba(107, 114, 128, 0.2)', text: '#6B7280', label: 'Closed' }
};

const HelpDesk = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    category: 'technical',
    priority: 'medium'
  });

  const [newMessage, setNewMessage] = useState('');
  const [ticketMessages, setTicketMessages] = useState([]);

  const fetchTickets = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const response = await api.get('/support/tickets');
      setTickets(response.data.tickets || []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    }
  }, [isAuthenticated]);

  const fetchFAQ = useCallback(async () => {
    try {
      const response = await api.get('/support/faq');
      setFaq(response.data.faq || []);
    } catch (error) {
      console.error('Failed to fetch FAQ:', error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTickets(), fetchFAQ()]);
      setLoading(false);
    };
    loadData();
  }, [fetchTickets, fetchFAQ]);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/support/tickets', newTicket);
      setTickets([response.data.ticket, ...tickets]);
      setShowNewTicket(false);
      setNewTicket({ subject: '', description: '', category: 'technical', priority: 'medium' });
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  };

  const handleViewTicket = async (ticket) => {
    setSelectedTicket(ticket);
    try {
      const response = await api.get(`/support/tickets/${ticket.ticket_id}`);
      setTicketMessages(response.data.messages || []);
    } catch (error) {
      console.error('Failed to fetch ticket details:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTicket) return;
    try {
      const response = await api.post(`/support/tickets/${selectedTicket.ticket_id}/messages`, {
        message: newMessage
      });
      setTicketMessages([...ticketMessages, response.data.ticket_message]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleCloseTicket = async () => {
    if (!selectedTicket) return;
    try {
      await api.post(`/support/tickets/${selectedTicket.ticket_id}/close`);
      setSelectedTicket({ ...selectedTicket, status: 'closed' });
      fetchTickets();
    } catch (error) {
      console.error('Failed to close ticket:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredFAQ = faq.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#1e2f3c' }}>
        <div className="text-center p-8 rounded-2xl" style={{ background: 'rgba(30, 47, 60, 0.95)', border: '1px solid rgba(0, 255, 255, 0.15)' }}>
          <h2 className="text-2xl font-bold text-white mb-4">Sign In Required</h2>
          <p className="text-gray-400 mb-6">Please sign in to access the Help Desk</p>
          <Link to="/login" className="px-6 py-3 rounded-lg font-semibold text-[#1e2f3c]" style={{ background: '#00FFFF' }}>
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #1e2f3c 0%, #141f28 50%, #1e2f3c 100%)' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
            style={{ background: 'rgba(0, 255, 255, 0.1)', color: '#00FFFF', border: '1px solid rgba(0, 255, 255, 0.25)' }}>
            Support Center
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ background: 'linear-gradient(135deg, #00FFFF 0%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Help Desk
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Get support for your eSIM services. Create tickets, track issues, and find answers.
          </p>
        </motion.div>

        {/* Search and Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input type="text" placeholder="Search tickets or FAQ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl text-white placeholder-gray-500"
              style={{ background: 'rgba(30, 47, 60, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }} />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-2">
            {['tickets', 'faq', 'contact'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 rounded-xl font-medium capitalize transition-all ${activeTab === tab ? 'text-[#1e2f3c]' : 'text-gray-400 hover:text-white'}`}
                style={{ background: activeTab === tab ? '#00FFFF' : 'rgba(30, 47, 60, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
                {tab === 'faq' ? 'FAQ' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'tickets' && (
            <motion.div key="tickets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Ticket List */}
                <div className="lg:w-1/2">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">My Tickets</h2>
                    <button onClick={() => setShowNewTicket(true)}
                      className="px-4 py-2 rounded-lg font-semibold text-[#1e2f3c] flex items-center gap-2" style={{ background: '#00FFFF' }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      New Ticket
                    </button>
                  </div>

                  {/* Filter */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {['all', 'open', 'in_progress', 'waiting_customer', 'resolved', 'closed'].map(status => (
                      <button key={status} onClick={() => setFilterStatus(status)}
                        className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${filterStatus === status ? 'text-[#1e2f3c]' : 'text-gray-400'}`}
                        style={{ background: filterStatus === status ? '#00FFFF' : 'rgba(30, 47, 60, 0.8)' }}>
                        {status === 'all' ? 'All' : STATUS_COLORS[status]?.label || status}
                      </button>
                    ))}
                  </div>

                  {/* Ticket Cards */}
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {loading ? (
                      <div className="text-center py-8 text-gray-400">Loading tickets...</div>
                    ) : filteredTickets.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">No tickets found</div>
                    ) : (
                      filteredTickets.map(ticket => (
                        <div key={ticket.ticket_id} onClick={() => handleViewTicket(ticket)}
                          className={`p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${selectedTicket?.ticket_id === ticket.ticket_id ? 'ring-2 ring-cyan-400' : ''}`}
                          style={{ background: 'rgba(30, 47, 60, 0.95)', border: '1px solid rgba(0, 255, 255, 0.15)' }}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-white truncate flex-1 mr-2">{ticket.subject}</h3>
                            <span className="px-2 py-1 rounded text-xs font-medium"
                              style={{ background: STATUS_COLORS[ticket.status]?.bg, color: STATUS_COLORS[ticket.status]?.text }}>
                              {STATUS_COLORS[ticket.status]?.label}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-2">{ticket.description}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="capitalize">{ticket.category}</span>
                            <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Ticket Detail */}
                <div className="lg:w-1/2">
                  {selectedTicket ? (
                    <div className="rounded-2xl p-6" style={{ background: 'rgba(30, 47, 60, 0.95)', border: '1px solid rgba(0, 255, 255, 0.15)' }}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{selectedTicket.subject}</h3>
                          <div className="flex gap-2">
                            <span className="px-2 py-1 rounded text-xs font-medium"
                              style={{ background: STATUS_COLORS[selectedTicket.status]?.bg, color: STATUS_COLORS[selectedTicket.status]?.text }}>
                              {STATUS_COLORS[selectedTicket.status]?.label}
                            </span>
                            <span className="px-2 py-1 rounded text-xs font-medium capitalize"
                              style={{ background: 'rgba(107, 114, 128, 0.2)', color: '#9CA3AF' }}>
                              {selectedTicket.priority}
                            </span>
                          </div>
                        </div>
                        {selectedTicket.status !== 'closed' && (
                          <button onClick={handleCloseTicket} className="text-gray-400 hover:text-red-400 text-sm">Close Ticket</button>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-6">{selectedTicket.description}</p>

                      {/* Messages */}
                      <div className="border-t border-white/10 pt-4 mb-4">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">Conversation</h4>
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                          {ticketMessages.map(msg => (
                            <div key={msg.message_id} className={`p-3 rounded-lg ${msg.sender_type === 'customer' ? 'bg-cyan-900/30 ml-4' : 'bg-gray-700/30 mr-4'}`}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium" style={{ color: msg.sender_type === 'customer' ? '#00FFFF' : '#10B981' }}>
                                  {msg.sender_type === 'customer' ? 'You' : 'Support'}
                                </span>
                                <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{msg.message}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reply Form */}
                      {selectedTicket.status !== 'closed' && (
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..." className="flex-1 px-4 py-2 rounded-lg text-white placeholder-gray-500"
                            style={{ background: 'rgba(20, 31, 40, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }} />
                          <button type="submit" className="px-4 py-2 rounded-lg font-semibold text-[#1e2f3c]" style={{ background: '#00FFFF' }}>
                            Send
                          </button>
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(30, 47, 60, 0.95)', border: '1px solid rgba(0, 255, 255, 0.15)' }}>
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <p className="text-gray-400">Select a ticket to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid gap-4 max-w-3xl mx-auto">
                {filteredFAQ.map((item, index) => (
                  <details key={item.faq_id || index} className="group rounded-xl overflow-hidden"
                    style={{ background: 'rgba(30, 47, 60, 0.95)', border: '1px solid rgba(0, 255, 255, 0.15)' }}>
                    <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
                      <span className="font-semibold text-white pr-4">{item.question}</span>
                      <svg className="w-5 h-5 text-cyan-400 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 text-gray-300 text-sm border-t border-white/10 pt-4">{item.answer}</div>
                  </details>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(30, 47, 60, 0.95)', border: '1px solid rgba(0, 255, 255, 0.15)' }}>
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(0, 255, 255, 0.1)' }}>
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Email Support</h3>
                  <a href="mailto:support@esim.com.mm" className="text-cyan-400 hover:underline">support@esim.com.mm</a>
                  <p className="text-gray-500 text-sm mt-2">Response within 24 hours</p>
                </div>

                <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(30, 47, 60, 0.95)', border: '1px solid rgba(0, 255, 255, 0.15)' }}>
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(0, 255, 255, 0.1)' }}>
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Phone Support</h3>
                  <a href="tel:+9509650000172" className="text-cyan-400 hover:underline">09650000172</a>
                  <p className="text-gray-500 text-sm mt-2">Mon-Fri 9AM-6PM MMT</p>
                </div>
                <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(30, 47, 60, 0.95)', border: '1px solid rgba(0, 255, 255, 0.15)' }}>
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(0, 255, 255, 0.1)' }}>
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-white mb-2">Office</h3>
                  <p className="text-gray-400 text-sm">Yangon, Myanmar</p>
                  <p className="text-gray-500 text-sm mt-2">By appointment only</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Ticket Modal */}
        <AnimatePresence>
          {showNewTicket && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.8)' }}
              onClick={() => setShowNewTicket(false)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg rounded-2xl p-6" style={{ background: 'rgba(30, 47, 60, 0.98)', border: '1px solid rgba(0, 255, 255, 0.2)' }}
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Create Support Ticket</h2>
                  <button onClick={() => setShowNewTicket(false)} className="text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
                    <input type="text" required minLength={5} maxLength={200} value={newTicket.subject}
                      onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg text-white placeholder-gray-500"
                      style={{ background: 'rgba(20, 31, 40, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }}
                      placeholder="Brief description of your issue" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <select value={newTicket.category} onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg text-white"
                      style={{ background: 'rgba(20, 31, 40, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                    <select value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg text-white"
                      style={{ background: 'rgba(20, 31, 40, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }}>
                      {PRIORITIES.map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                    <textarea required minLength={20} maxLength={5000} rows={4} value={newTicket.description}
                      onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg text-white placeholder-gray-500 resize-none"
                      style={{ background: 'rgba(20, 31, 40, 0.8)', border: '1px solid rgba(0, 255, 255, 0.2)' }}
                      placeholder="Please describe your issue in detail..." />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-lg font-semibold text-[#1e2f3c]" style={{ background: '#00FFFF' }}>
                    Submit Ticket
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HelpDesk;
