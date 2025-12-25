import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const HelpDesk = () => {
  const { user, isAuthenticated } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    'Technical Issues',
    'Billing Inquiries', 
    'Account Management',
    'Device Support',
    'Network Issues'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'medium', label: 'Medium', color: 'yellow' },
    { value: 'high', label: 'High', color: 'orange' },
    { value: 'critical', label: 'Critical', color: 'red' }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      fetchTickets();
    }
  }, [isAuthenticated]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/support/tickets', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newTicket)
      });
      
      if (response.ok) {
        setNewTicket({ subject: '', category: '', priority: 'medium', description: '' });
        fetchTickets();
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'new': 'blue',
      'assigned': 'purple', 
      'in_progress': 'yellow',
      'pending_customer': 'orange',
      'resolved': 'green',
      'closed': 'gray'
    };
    return colors[status] || 'gray';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background-light to-background-dark">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-12 rounded-xl p-8 border border-white/10">
            <h1 className="text-2xl font-bold text-center mb-6">Help Desk Login Required</h1>
            <p className="text-center text-muted mb-6">Please log in to access the help desk system.</p>
            <a href="/login" className="btn btn-primary btn-block">Login to Continue</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-light to-background-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">eSIM Myanmar Help Desk</h1>
          <p className="text-muted">Submit and track your support requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Ticket */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <div className="card-header">
                <h2 className="card-title">Create New Ticket</h2>
                <p className="card-subtitle">Describe your issue and we'll help you resolve it</p>
              </div>
              
              <form onSubmit={createTicket} className="space-y-4">
                <div className="form-group">
                  <label className="label">Subject *</label>
                  <input
                    type="text"
                    className="input"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="label">Category *</label>
                    <select
                      className="input"
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="label">Priority</label>
                    <select
                      className="input"
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    >
                      {priorities.map(p => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Description *</label>
                  <textarea
                    className="input"
                    rows="6"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    placeholder="Please provide detailed information about your issue..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Ticket'}
                </button>
              </form>
            </div>

            {/* Tickets List */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Your Tickets</h2>
                <p className="card-subtitle">Track the status of your support requests</p>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-2 text-muted">Loading tickets...</p>
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted">No tickets found. Create your first support ticket above.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map(ticket => (
                    <div key={ticket.ticket_id} className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{ticket.subject}</h3>
                        <span className={`badge badge-${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted mb-2">
                        <span>#{ticket.ticket_id}</span>
                        <span>{ticket.category}</span>
                        <span className={`badge badge-${priorities.find(p => p.value === ticket.priority)?.color}`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                        <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                      </div>
                      
                      <p className="text-sm text-muted line-clamp-2">{ticket.description}</p>
                      
                      {ticket.last_response && (
                        <div className="mt-3 p-3 bg-white/5 rounded border-l-4 border-primary">
                          <p className="text-sm font-medium">Latest Response:</p>
                          <p className="text-sm text-muted">{ticket.last_response}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card card-compact">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <a href="/faq" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="font-medium">FAQ</div>
                  <div className="text-sm text-muted">Find answers to common questions</div>
                </a>
                <a href="/how-it-works" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="font-medium">Setup Guide</div>
                  <div className="text-sm text-muted">Learn how to activate your eSIM</div>
                </a>
                <a href="/supported-devices" className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="font-medium">Device Compatibility</div>
                  <div className="text-sm text-muted">Check if your device is supported</div>
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card card-compact">
              <h3 className="font-semibold mb-4">Contact Support</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted">support@esim.com.mm</div>
                </div>
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-sm text-muted">+95 9650000172</div>
                </div>
                <div>
                  <div className="font-medium">Hours</div>
                  <div className="text-sm text-muted">24/7 Support Available</div>
                </div>
              </div>
            </div>

            {/* SLA Information */}
            <div className="card card-compact">
              <h3 className="font-semibold mb-4">Response Times</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="badge badge-red">Critical</span>
                  <span className="text-sm">1 hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="badge badge-orange">High</span>
                  <span className="text-sm">4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="badge badge-yellow">Medium</span>
                  <span className="text-sm">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="badge badge-green">Low</span>
                  <span className="text-sm">72 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;