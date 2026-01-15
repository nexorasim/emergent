/**
 * Anniversary.js - 4th Anniversary Free eSIM Campaign (Internationalized, Accessible)
 * ESIM MYANMAR COMPANY LIMITED
 * Universal free eSIM redemption with QR-less provisioning
 * No emoji - Professional telecom design
 */

import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { QRCodeCanvas } from 'qrcode.react';
import { useLanguage } from '../context/LanguageContext';

const ESIM_LPA_STRING = 'LPA:1$rsp.truphone.com$QR-G-5C-21K-1CHHCG1';
const IOS_PROVISION_URL = `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=${ESIM_LPA_STRING}`;
const ANDROID_PROVISION_URL = `https://esimsetup.android.com/esim_qrcode_provisioning?carddata=${ESIM_LPA_STRING}`;

const Anniversary = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState('landing');
  const [copyStatus, setCopyStatus] = useState(''); // '', 'success', 'error'
  const qrCanvasRef = useRef(null);

  const recommended = useMemo(() => {
    if (typeof navigator === 'undefined') return null;
    const ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
    if (/Android/i.test(ua)) return 'android';
    return null;
  }, []);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('success');
    } catch (e) {
      setCopyStatus('error');
    }
  };

  const handleDownloadQR = () => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'esim-lpa-qr.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (_) {
      // no-op, download not supported
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.campaignTitle}</title>
        <meta name="description" content={t.campaignSubtitle} />
      </Helmet>

      <main
        className="min-h-screen py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e2f3c 0%, #141f28 50%, #1e2f3c 100%)' }}
      >
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          {step === 'landing' && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)' }}
                  aria-label="Campaign Badge"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
                  <span className="text-purple-400 text-sm font-semibold">4th Anniversary</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #00FFFF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {t.happyNewYear}
                  </span>
                  <br />
                  <span className="text-white">{t.campaignSubtitle}</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  {t.getFreeEsim} — {t.noQrActivation}
                </p>
              </motion.div>

              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-4xl mx-auto mb-16"
                aria-labelledby="install-options"
              >
                <div
                  className="p-8 sm:p-12 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    backdropFilter: 'blur(16px)'
                  }}
                >
                  <h2 id="install-options" className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    {t.getFreeEsim}
                  </h2>
                  <p className="text-center text-gray-300 mb-8 text-lg">
                    {t.campaignSubtitle}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <a
                      href={IOS_PROVISION_URL}
                      onClick={(e) => {
                        // Fallback: ensure navigation if browser blocks anchor for some reason
                        e.currentTarget.blur();
                      }}
                      className="block text-left p-8 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '2px solid rgba(0, 255, 255, 0.2)' }}
                      aria-label={t.iosInstallEsim}
                    >
                      <div
                        className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-2xl font-bold"
                        style={{ background: 'rgba(0, 255, 255, 0.15)', color: '#00FFFF' }}
                        aria-hidden="true"
                      >
                        iOS
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{t.iosInstallEsim}</h3>
                      {recommended === 'ios' && (
                        <div className="text-xs font-medium text-cyan-400 mb-1">{t.recommendedForYourDevice}</div>
                      )}
                      <p className="text-gray-400 mb-4">iPhone, iPad, Apple Watch</p>
                      <div className="text-sm text-gray-500">iOS 12.1+</div>
                    </a>

                    <a
                      href={ANDROID_PROVISION_URL}
                      onClick={(e) => {
                        e.currentTarget.blur();
                      }}
                      className="block text-left p-8 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '2px solid rgba(16, 185, 129, 0.2)' }}
                      aria-label={t.androidInstallEsim}
                    >
                      <div
                        className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-2xl font-bold"
                        style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}
                        aria-hidden="true"
                      >
                        AND
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{t.androidInstallEsim}</h3>
                      {recommended === 'android' && (
                        <div className="text-xs font-medium text-green-400 mb-1">{t.recommendedForYourDevice}</div>
                      )}
                      <p className="text-gray-400 mb-4">Android smartphones and tablets</p>
                      <div className="text-sm text-gray-500">Android 9.0+</div>
                    </a>
                  </div>

                  <div className="text-center pt-6 border-t border-white/10">
                    <button
                      onClick={() => setStep('qr')}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[44px] px-4 py-2 rounded"
                      aria-label={t.noQrActivation}
                    >
                      {t.noQrActivation}
                    </button>
                  </div>
                </div>
              </motion.section>
            </>
          )}

          {step === 'qr' && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
              aria-labelledby="no-qr-activation"
            >
              <div
                className="p-8 sm:p-12 rounded-2xl"
                style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', backdropFilter: 'blur(16px)' }}
              >
                <h2 id="no-qr-activation" className="text-3xl font-bold mb-6">{t.noQrActivation}</h2>

                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 rounded-xl" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                    <h3 className="text-xl font-semibold mb-4">{t.scanToActivate}</h3>
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                        <QRCodeCanvas
                          value={ESIM_LPA_STRING}
                          size={192}
                          bgColor="#00000000"
                          fgColor="#E5E7EB"
                          includeMargin={false}
                          aria-label="eSIM activation QR"
                          ref={qrCanvasRef}
                        />
                      </div>
                      <button
                        onClick={handleDownloadQR}
                        className="btn btn-md btn-secondary min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      >
                        Download QR
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                    <h3 className="text-xl font-semibold mb-4">Manual LPA</h3>
                    <p className="text-gray-300 mb-4">
                      Use the LPA string below for manual eSIM activation on supported devices:
                    </p>
                    <div
                      className="p-4 rounded-lg font-mono text-sm break-all"
                      style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(139, 92, 246, 0.3)' }}
                    >
                      {ESIM_LPA_STRING}
                    </div>
                    <button
                      onClick={() => handleCopy(ESIM_LPA_STRING)}
                      className="mt-4 btn btn-md btn-secondary min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      {t.copyLpaString}
                    </button>
                    <div role="status" aria-live="polite" className="sr-only">
                      {copyStatus === 'success' ? t.copySuccess : copyStatus === 'error' ? t.copyError : ''}
                    </div>
                    {copyStatus === 'success' && (
                      <div className="mt-2 text-sm text-green-400">{t.copySuccess}</div>
                    )}
                    {copyStatus === 'error' && (
                      <div className="mt-2 text-sm text-red-400">{t.copyError}</div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Installation Steps</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                      <h4 className="font-semibold mb-2 text-cyan-400">iOS</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                        <li>Settings → Cellular → Add Cellular Plan</li>
                        <li>Enter Details Manually</li>
                        <li>Paste the LPA string</li>
                        <li>Follow on-screen instructions</li>
                      </ol>
                    </div>
                    <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                      <h4 className="font-semibold mb-2 text-green-400">Android</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                        <li>Settings → Network & Internet → SIMs</li>
                        <li>Add or Download a SIM instead</li>
                        <li>Need help? → Enter it manually</li>
                        <li>Paste the LPA string</li>
                        <li>Follow on-screen instructions</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('landing')}
                  className="w-full btn btn-lg btn-secondary min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {t.backToOptions}
                </button>
              </div>
            </motion.section>
          )}

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-20"
            aria-labelledby="benefits"
          >
            <h2 id="benefits" className="text-3xl font-bold text-center mb-12">Why Choose eSIM Myanmar</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Instant Activation', desc: 'Get connected in minutes, no physical SIM required', icon: 'IA' },
                { title: 'Global Coverage', desc: '190+ countries with seamless roaming', icon: 'GC' },
                { title: '5G Ready', desc: 'Ultra-fast 5G speeds where available', icon: '5G' },
                { title: 'VoLTE Support', desc: 'Crystal-clear HD voice calls', icon: 'HD' },
                { title: 'Multi-Device', desc: 'Use on phone, tablet, and watch', icon: 'MD' },
                { title: '24/7 Support', desc: 'Always here to help you', icon: '24' }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                  aria-label={feature.title}
                >
                  <div
                    className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center font-bold"
                    style={{ background: 'rgba(0, 255, 255, 0.15)', color: '#00FFFF' }}
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center"
            aria-labelledby="support"
          >
            <div
              className="p-8 rounded-2xl max-w-2xl mx-auto"
              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              <h3 id="support" className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="text-gray-300 mb-6">Our support team is available 24/7 to assist you with installation and activation.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:info@esim.com.mm" className="btn btn-md btn-primary min-h-[44px]">{t.emailSupport}</a>
                <a href="tel:09650000172" className="btn btn-md btn-secondary min-h-[44px]">{t.call} 09650000172</a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
};

export default Anniversary;
