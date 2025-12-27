import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function NexoraAuditDashboard() {
  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [auditIds, setAuditIds] = useState([]);
  const [selectedAuditId, setSelectedAuditId] = useState(null);

  const startComprehensiveAudit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/nexora/audit/start`, {
        audit_type: 'comprehensive'
      });
      
      if (response.data.audit_ids && response.data.audit_ids.length > 0) {
        setAuditIds(response.data.audit_ids);
        setSelectedAuditId(response.data.audit_ids[0]);
        
        // Poll for audit completion
        pollAuditStatus(response.data.audit_ids[0]);
      }
    } catch (error) {
      console.error('Error starting audit:', error);
    }
  };

  const pollAuditStatus = async (auditId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${API_URL}/api/nexora/audit/status/${auditId}`);
        
        if (response.data.status === 'completed') {
          clearInterval(interval);
          fetchFullReport(auditId);
        } else if (response.data.status === 'failed') {
          clearInterval(interval);
          setLoading(false);
        }
      } catch (error) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      if (loading) fetchFullReport(auditId);
    }, 30000);
  };

  const fetchFullReport = async (auditId) => {
    try {
      const response = await axios.get(`${API_URL}/api/nexora/audit/report/${auditId}`);
      setAuditData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching report:', error);
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'text-red-500',
      high: 'text-orange-500',
      medium: 'text-yellow-500',
      low: 'text-blue-500',
      info: 'text-gray-400'
    };
    return colors[severity] || 'text-gray-400';
  };

  const getSeverityBg = (severity) => {
    const colors = {
      critical: 'bg-red-500/20 border-red-500',
      high: 'bg-orange-500/20 border-orange-500',
      medium: 'bg-yellow-500/20 border-yellow-500',
      low: 'bg-blue-500/20 border-blue-500',
      info: 'bg-gray-500/20 border-gray-500'
    };
    return colors[severity] || 'bg-gray-500/20 border-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e2f3c] via-[#162838] to-[#0d1821] text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-[#00FFFF]">NexoraAI</span> Audit Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Enterprise-Grade Platform Audit & Optimization
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-center gap-4"
        >
          <button
            onClick={startComprehensiveAudit}
            disabled={loading}
            data-testid="start-audit-button"
            className="bg-gradient-to-r from-[#00FFFF] to-[#00CCCC] text-[#1e2f3c] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Audit in Progress...' : 'Start Comprehensive Audit'}
          </button>
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00FFFF] border-t-transparent" data-testid="audit-loading-spinner"></div>
            <p className="mt-4 text-gray-300">Analyzing platform infrastructure, security, and performance...</p>
          </motion.div>
        )}

        {auditData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {['overview', 'security', 'performance', 'ux', 'seo', 'compliance'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-t-lg font-semibold capitalize transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-[#00FFFF] text-[#1e2f3c]'
                      : 'bg-[#1e2f3c]/50 text-gray-300 hover:bg-[#1e2f3c]'
                  }`}
                  data-testid={`tab-${tab}`}
                >
                  {tab.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-testid="metrics-grid">
                  <div className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-[#00FFFF]/30 rounded-lg p-6">
                    <h3 className="text-sm text-gray-400 mb-2">Health Score</h3>
                    <p className="text-4xl font-bold text-[#00FFFF]" data-testid="health-score">
                      {auditData.metrics?.health_score || 0}%
                    </p>
                  </div>
                  <div className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-orange-500/30 rounded-lg p-6">
                    <h3 className="text-sm text-gray-400 mb-2">Total Findings</h3>
                    <p className="text-4xl font-bold text-orange-400" data-testid="total-findings">
                      {auditData.summary?.total_findings || 0}
                    </p>
                  </div>
                  <div className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
                    <h3 className="text-sm text-gray-400 mb-2">Critical Issues</h3>
                    <p className="text-4xl font-bold text-red-400" data-testid="critical-issues">
                      {auditData.summary?.critical || 0}
                    </p>
                  </div>
                  <div className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
                    <h3 className="text-sm text-gray-400 mb-2">Auto-fixable</h3>
                    <p className="text-4xl font-bold text-green-400" data-testid="auto-fixable">
                      {auditData.summary?.auto_fixable || 0}
                    </p>
                  </div>
                </div>

                {/* Summary Chart */}
                <div className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-[#00FFFF]/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#00FFFF]">Findings by Severity</h3>
                  <div className="space-y-3">
                    {['critical', 'high', 'medium', 'low'].map((severity) => (
                      <div key={severity} className="flex items-center gap-4">
                        <span className={`capitalize font-semibold w-24 ${getSeverityColor(severity)}`}>
                          {severity}
                        </span>
                        <div className="flex-1 bg-gray-700 rounded-full h-8 overflow-hidden">
                          <div
                            className={`h-full ${getSeverityColor(severity)} bg-current`}
                            style={{
                              width: `${
                                ((auditData.summary?.[severity] || 0) / (auditData.summary?.total_findings || 1)) * 100
                              }%`
                            }}
                          ></div>
                        </div>
                        <span className="w-12 text-right text-gray-300">
                          {auditData.summary?.[severity] || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-[#1e2f3c]/50 backdrop-blur-sm border border-[#00FFFF]/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#00FFFF]">Priority Recommendations</h3>
                  <ul className="space-y-2">
                    {auditData.recommendations?.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-[#00FFFF] mt-1">•</span>
                        <span className="text-gray-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Findings by Category */}
            {activeTab !== 'overview' && (
              <div className="space-y-4" data-testid="findings-list">
                {auditData.findings
                  ?.filter((finding) => finding.phase === activeTab || activeTab === 'all')
                  .map((finding, index) => (
                    <motion.div
                      key={finding.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-[#1e2f3c]/50 backdrop-blur-sm border rounded-lg p-6 ${getSeverityBg(
                        finding.severity
                      )}`}
                      data-testid={`finding-${finding.id}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">{finding.title}</h4>
                          <p className="text-sm text-gray-400">
                            Phase: {finding.phase} | Severity: {finding.severity.toUpperCase()} | Effort: {finding.effort}
                          </p>
                        </div>
                        {finding.auto_fixable && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                            Auto-fixable
                          </span>
                        )}
                      </div>

                      <p className="text-gray-300 mb-4">{finding.description}</p>

                      <div className="mb-4">
                        <h5 className="font-semibold text-[#00FFFF] mb-2">Current State:</h5>
                        <p className="text-gray-300 text-sm">{finding.current_state}</p>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-semibold text-[#00FFFF] mb-2">Recommended Fix:</h5>
                        <p className="text-gray-300 text-sm">{finding.recommended_fix}</p>
                      </div>

                      {finding.code_fix && (
                        <div className="mb-4">
                          <h5 className="font-semibold text-[#00FFFF] mb-2">Code Fix:</h5>
                          <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm">
                            <code className="text-gray-300">{finding.code_fix}</code>
                          </pre>
                        </div>
                      )}

                      {finding.affected_components && finding.affected_components.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-[#00FFFF] mb-2">Affected Components:</h5>
                          <div className="flex flex-wrap gap-2">
                            {finding.affected_components.map((component, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-[#00FFFF]/10 text-[#00FFFF] rounded-full text-sm"
                              >
                                {component}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            )}
          </motion.div>
        )}

        {/* No Data State */}
        {!auditData && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-300">No Audit Data</h3>
            <p className="text-gray-400">Click the button above to start a comprehensive audit</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default NexoraAuditDashboard;
