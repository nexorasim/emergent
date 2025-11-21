import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import QRCode from 'qrcode.react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateProfile, setShowCreateProfile] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profilesRes, plansRes] = await Promise.all([
        api.get('/esim/profiles'),
        api.get('/plans')
      ]);
      setProfiles(profilesRes.data.profiles);
      setPlans(plansRes.data.plans);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    try {
      await api.post('/esim/profiles');
      fetchData();
      setShowCreateProfile(false);
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Welcome, {user?.full_name}</span>
          </h1>
          <p className="text-gray-400">Manage your eSIM profiles and plans</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">{profiles.length}</div>
            <div className="text-gray-400">eSIM Profiles</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {profiles.filter(p => p.status === 'active').length}
            </div>
            <div className="text-gray-400">Active Profiles</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text mb-2">0 GB</div>
            <div className="text-gray-400">Data Used</div>
          </div>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">My eSIM Profiles</h2>
          <button
            onClick={() => setShowCreateProfile(true)}
            className="btn-primary"
          >
            Create New eSIM
          </button>
        </div>

        {profiles.length === 0 ? (
          <div className="glass-card text-center py-12">
            <p className="text-gray-400 mb-4">No eSIM profiles yet</p>
            <button onClick={() => setShowCreateProfile(true)} className="btn-primary">
              Create Your First eSIM
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {profiles.map((profile) => (
              <motion.div
                key={profile.profile_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">eSIM Profile</h3>
                    <p className="text-sm text-gray-400">ICCID: {profile.iccid}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${profile.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {profile.status}
                  </span>
                </div>

                {profile.qr_code && (
                  <div className="bg-white p-4 rounded-lg mb-4 inline-block">
                    <img src={profile.qr_code} alt="QR Code" className="w-48 h-48" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Data Used</p>
                    <p className="text-white font-semibold">{profile.data_used} GB</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Data Limit</p>
                    <p className="text-white font-semibold">{profile.data_limit || 'N/A'} GB</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 btn-secondary text-sm">Transfer</button>
                  <button className="flex-1 btn-secondary text-sm">Top Up</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {showCreateProfile && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card max-w-md w-full mx-4 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Create New eSIM Profile</h3>
              <p className="text-gray-400 mb-6">
                Create a new eSIM profile and scan the QR code on your device to activate.
              </p>
              <div className="flex gap-4">
                <button onClick={handleCreateProfile} className="flex-1 btn-primary">
                  Create Profile
                </button>
                <button onClick={() => setShowCreateProfile(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;