import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/enterprise.css';

const EnterpriseHome = () => {
  return (
    <div className="enterprise-page">
      {/* Hero Section - Enterprise Focus */}
      <section className="hero-enterprise">
        <div className="container text-center">
          <p className="text-caption" style={{color: 'var(--color-cyan-400)', marginBottom: '16px'}}>
            ENTERPRISE eSIM CONNECTIVITY PLATFORM
          </p>
          <h1>
            Secure, Scalable Mobile Solutions<br />for Myanmar and ASEAN Markets
          </h1>
          <p className="text-large" style={{maxWidth: '720px', margin: '0 auto 40px'}}>
            Trusted by leading telecom operators and enterprise clients. Deploy eSIM connectivity 
            for IoT, corporate mobility, and government applications with enterprise-grade security 
            and 99.9% uptime SLA.
          </p>
          <div className="flex gap-md" style={{justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/request-demo" className="btn btn-primary btn-large">
              Request Enterprise Demo
            </Link>
            <Link to="/solutions" className="btn btn-secondary btn-large">
              View Solutions
            </Link>
          </div>
          <div style={{marginTop: '48px', paddingTop: '48px', borderTop: '1px solid rgba(255,255,255,0.2)'}}>
            <p className="text-small" style={{color: 'var(--color-pearl-300)', marginBottom: '16px'}}>
              Trusted by Leading Organizations
            </p>
            {/* Placeholder for partner logos */}
            <div className="flex gap-lg" style={{justifyContent: 'center', flexWrap: 'wrap', opacity: 0.7}}>
              <div style={{padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px'}}>
                Telecom Partner 1
              </div>
              <div style={{padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px'}}>
                Telecom Partner 2
              </div>
              <div style={{padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px'}}>
                Enterprise Client
              </div>
              <div style={{padding: '12px 24px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px'}}>
                Government Agency
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Certifications */}
      <section className="trust-bar">
        <div className="container">
          <div className="flex gap-lg" style={{justifyContent: 'center', flexWrap: 'wrap'}}>
            <div className="certification-badge">GSMA CERTIFIED</div>
            <div className="certification-badge">ISO 27001</div>
            <div className="certification-badge">SOC 2 TYPE II</div>
            <div className="certification-badge">SM-DP+ COMPLIANT</div>
            <div className="certification-badge">99.9% UPTIME SLA</div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="section-light section-padding-large">
        <div className="container">
          <div className="text-center" style={{marginBottom: '64px'}}>
            <h2>Why Leading Organizations Choose eSIM Myanmar</h2>
            <p className="text-large" style={{color: 'var(--color-graphite-600)', maxWidth: '640px', margin: '16px auto 0'}}>
              Enterprise-grade connectivity platform built for scale, security, and reliability
            </p>
          </div>
          
          <div className="grid grid-3">
            <div className="card-enterprise">
              <div style={{width: '56px', height: '56px', background: 'var(--color-cyan-600)', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>
                1
              </div>
              <h3>Enterprise Security</h3>
              <p style={{color: 'var(--color-graphite-600)'}}>
                Bank-grade encryption, multi-factor authentication, and compliance with international 
                security standards including ISO 27001 and SOC 2 Type II.
              </p>
              <ul style={{marginTop: '16px', paddingLeft: '20px', color: 'var(--color-graphite-700)'}}>
                <li>End-to-end encryption</li>
                <li>Role-based access control</li>
                <li>Audit logging and monitoring</li>
                <li>Data residency compliance</li>
              </ul>
            </div>

            <div className="card-enterprise">
              <div style={{width: '56px', height: '56px', background: 'var(--color-teal-600)', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>
                2
              </div>
              <h3>Global Connectivity</h3>
              <p style={{color: 'var(--color-graphite-600)'}}>
                Seamless coverage across Myanmar and 150+ countries with direct carrier integrations 
                and advanced roaming capabilities for your mobile workforce.
              </p>
              <ul style={{marginTop: '16px', paddingLeft: '20px', color: 'var(--color-graphite-700)'}}>
                <li>150+ country coverage</li>
                <li>Multi-carrier support</li>
                <li>5G and VoLTE enabled</li>
                <li>Real-time network switching</li>
              </ul>
            </div>

            <div className="card-enterprise">
              <div style={{width: '56px', height: '56px', background: 'var(--color-navy-700)', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 'bold'}}>
                3
              </div>
              <h3>API-First Platform</h3>
              <p style={{color: 'var(--color-graphite-600)'}}>
                Comprehensive RESTful APIs for seamless integration with your existing systems. 
                Full documentation, SDKs, and dedicated technical support.
              </p>
              <ul style={{marginTop: '16px', paddingLeft: '20px', color: 'var(--color-graphite-700)'}}>
                <li>RESTful API architecture</li>
                <li>Webhooks and real-time events</li>
                <li>SDKs for major platforms</li>
                <li>Technical support included</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-neutral section-padding-large">
        <div className="container">
          <div className="text-center" style={{marginBottom: '64px'}}>
            <h2>Enterprise Solutions by Industry</h2>
            <p className="text-large" style={{color: 'var(--color-graphite-600)'}}>
              Tailored eSIM connectivity for your specific business needs
            </p>
          </div>
          
          <div className="grid grid-2" style={{gap: '32px'}}>
            <div className="card-enterprise">
              <h4 style={{color: 'var(--color-navy-900)', marginBottom: '16px'}}>
                Corporate & Enterprise Mobility
              </h4>
              <p style={{color: 'var(--color-graphite-600)', marginBottom: '16px'}}>
                Manage mobile connectivity for your entire workforce with centralized control, 
                usage tracking, and cost optimization.
              </p>
              <ul style={{paddingLeft: '20px', color: 'var(--color-graphite-700)', marginBottom: '20px'}}>
                <li>Centralized SIM management</li>
                <li>Usage analytics and reporting</li>
                <li>Cost center allocation</li>
                <li>Employee self-service portal</li>
              </ul>
              <Link to="/solutions/enterprise" className="btn btn-secondary">
                Learn More
              </Link>
            </div>

            <div className="card-enterprise">
              <h4 style={{color: 'var(--color-navy-900)', marginBottom: '16px'}}>
                IoT & M2M Solutions
              </h4>
              <p style={{color: 'var(--color-graphite-600)', marginBottom: '16px'}}>
                Connect millions of IoT devices with automated provisioning, lifecycle management, 
                and real-time monitoring.
              </p>
              <ul style={{paddingLeft: '20px', color: 'var(--color-graphite-700)', marginBottom: '20px'}}>
                <li>Mass device provisioning</li>
                <li>Remote SIM management</li>
                <li>Network automation</li>
                <li>IoT-specific data plans</li>
              </ul>
              <Link to="/solutions/iot" className="btn btn-secondary">
                Learn More
              </Link>
            </div>

            <div className="card-enterprise">
              <h4 style={{color: 'var(--color-navy-900)', marginBottom: '16px'}}>
                Government & Public Sector
              </h4>
              <p style={{color: 'var(--color-graphite-600)', marginBottom: '16px'}}>
                Secure connectivity solutions for government agencies with enhanced security, 
                compliance, and data sovereignty.
              </p>
              <ul style={{paddingLeft: '20px', color: 'var(--color-graphite-700)', marginBottom: '20px'}}>
                <li>Government-grade security</li>
                <li>Local data residency</li>
                <li>Compliance reporting</li>
                <li>Emergency services integration</li>
              </ul>
              <Link to="/solutions/government" className="btn btn-secondary">
                Learn More
              </Link>
            </div>

            <div className="card-enterprise">
              <h4 style={{color: 'var(--color-navy-900)', marginBottom: '16px'}}>
                Travel & Hospitality
              </h4>
              <p style={{color: 'var(--color-graphite-600)', marginBottom: '16px'}}>
                Provide seamless connectivity for business travelers with instant activation 
                and global coverage.
              </p>
              <ul style={{paddingLeft: '20px', color: 'var(--color-graphite-700)', marginBottom: '20px'}}>
                <li>Instant global activation</li>
                <li>Travel-specific plans</li>
                <li>Multi-device support</li>
                <li>24/7 traveler support</li>
              </ul>
              <Link to="/solutions/travel" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Platform Section */}
      <section className="section-light section-padding-large">
        <div className="container">
          <div className="grid grid-2" style={{alignItems: 'center', gap: '64px'}}>
            <div>
              <p className="text-caption" style={{color: 'var(--color-cyan-600)', marginBottom: '16px'}}>
                ENTERPRISE PLATFORM
              </p>
              <h2>Built on Cloud-Native<br />Microservices Architecture</h2>
              <p className="text-body" style={{marginBottom: '24px'}}>
                Our platform is designed for scale, reliability, and performance. Built with modern 
                cloud-native technologies, we deliver 99.9% uptime SLA with automatic scaling and 
                redundancy across multiple data centers.
              </p>
              <div style={{marginBottom: '32px'}}>
                <h4 style={{fontSize: '18px', marginBottom: '16px'}}>Core Capabilities:</h4>
                <div className="grid grid-2" style={{gap: '16px'}}>
                  <div>
                    <strong style={{display: 'block', marginBottom: '4px'}}>GSMA Compliant</strong>
                    <span style={{color: 'var(--color-graphite-600)', fontSize: '14px'}}>Full SM-DP+ integration</span>
                  </div>
                  <div>
                    <strong style={{display: 'block', marginBottom: '4px'}}>Multi-Tenant</strong>
                    <span style={{color: 'var(--color-graphite-600)', fontSize: '14px'}}>Isolated environments</span>
                  </div>
                  <div>
                    <strong style={{display: 'block', marginBottom: '4px'}}>Real-Time APIs</strong>
                    <span style={{color: 'var(--color-graphite-600)', fontSize: '14px'}}>Webhooks & events</span>
                  </div>
                  <div>
                    <strong style={{display: 'block', marginBottom: '4px'}}>Auto-Scaling</strong>
                    <span style={{color: 'var(--color-graphite-600)', fontSize: '14px'}}>Handle any load</span>
                  </div>
                </div>
              </div>
              <Link to="/platform" className="btn btn-primary">
                Explore Platform
              </Link>
            </div>
            <div>
              {/* Placeholder for architecture diagram */}
              <div style={{background: 'var(--color-pearl-100)', borderRadius: '12px', padding: '48px', textAlign: 'center', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                  <p style={{color: 'var(--color-graphite-600)', marginBottom: '16px'}}>Platform Architecture Diagram</p>
                  <p style={{color: 'var(--color-graphite-500)', fontSize: '14px'}}>Visual representation of microservices,<br />API gateway, and carrier integrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Case Studies */}
      <section className="section-neutral section-padding-large">
        <div className="container">
          <div className="text-center" style={{marginBottom: '64px'}}>
            <h2>Trusted by Leading Organizations</h2>
            <p className="text-large" style={{color: 'var(--color-graphite-600)'}}>
              See how enterprises are transforming connectivity with eSIM Myanmar
            </p>
          </div>
          
          <div className="grid grid-3">
            <div className="card-enterprise">
              <div style={{color: 'var(--color-cyan-600)', fontSize: '32px', marginBottom: '16px'}}>
                "
              </div>
              <p style={{color: 'var(--color-graphite-700)', fontSize: '18px', fontStyle: 'italic', marginBottom: '24px'}}>
                eSIM Myanmar enabled us to deploy 50,000 IoT devices across ASEAN in just 3 months. 
                The platform's reliability and API integration made it seamless.
              </p>
              <div style={{borderTop: '1px solid var(--color-pearl-300)', paddingTop: '16px'}}>
                <strong style={{display: 'block'}}>Regional Logistics Company</strong>
                <span style={{color: 'var(--color-graphite-500)', fontSize: '14px'}}>Transportation & Fleet Management</span>
              </div>
            </div>

            <div className="card-enterprise">
              <div style={{color: 'var(--color-cyan-600)', fontSize: '32px', marginBottom: '16px'}}>
                "
              </div>
              <p style={{color: 'var(--color-graphite-700)', fontSize: '18px', fontStyle: 'italic', marginBottom: '24px'}}>
                The security and compliance features met our strict government requirements. 
                Best-in-class support and local data residency sealed the deal.
              </p>
              <div style={{borderTop: '1px solid var(--color-pearl-300)', paddingTop: '16px'}}>
                <strong style={{display: 'block'}}>Myanmar Government Agency</strong>
                <span style={{color: 'var(--color-graphite-500)', fontSize: '14px'}}>Public Sector Digital Transformation</span>
              </div>
            </div>

            <div className="card-enterprise">
              <div style={{color: 'var(--color-cyan-600)', fontSize: '32px', marginBottom: '16px'}}>
                "
              </div>
              <p style={{color: 'var(--color-graphite-700)', fontSize: '18px', fontStyle: 'italic', marginBottom: '24px'}}>
                Cost savings of 40% compared to traditional roaming while improving connectivity 
                for our international workforce. ROI achieved in 6 months.
              </p>
              <div style={{borderTop: '1px solid var(--color-pearl-300)', paddingTop: '16px'}}>
                <strong style={{display: 'block'}}>Multinational Corporation</strong>
                <span style={{color: 'var(--color-graphite-500)', fontSize: '14px'}}>Enterprise Mobility Management</span>
              </div>
            </div>
          </div>

          <div className="text-center" style={{marginTop: '48px'}}>
            <Link to="/case-studies" className="btn btn-secondary">
              View All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-light section-padding-large">
        <div className="container">
          <div className="text-center" style={{marginBottom: '64px'}}>
            <h2>Transparent Enterprise Pricing</h2>
            <p className="text-large" style={{color: 'var(--color-graphite-600)'}}>
              Choose the plan that fits your organization's needs
            </p>
          </div>
          
          <div className="grid grid-3">
            <div className="card-enterprise">
              <h4>Business</h4>
              <div style={{margin: '24px 0'}}>
                <div style={{fontSize: '48px', fontWeight: 'bold', color: 'var(--color-navy-900)'}}>
                  $299
                </div>
                <div style={{color: 'var(--color-graphite-500)'}}>per month</div>
              </div>
              <p style={{color: 'var(--color-graphite-600)', marginBottom: '24px'}}>
                For small to medium businesses
              </p>
              <ul style={{paddingLeft: '20px', marginBottom: '32px', color: 'var(--color-graphite-700)'}}>
                <li>Up to 100 users</li>
                <li>Basic API access</li>
                <li>Email support</li>
                <li>99% uptime SLA</li>
                <li>Standard reporting</li>
              </ul>
              <Link to="/pricing" className="btn btn-secondary" style={{width: '100%'}}>
                Get Started
              </Link>
            </div>

            <div className="card-enterprise" style={{border: '2px solid var(--color-cyan-600)', position: 'relative'}}>
              <div style={{position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-cyan-600)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'}}>
                MOST POPULAR
              </div>
              <h4>Enterprise</h4>
              <div style={{margin: '24px 0'}}>
                <div style={{fontSize: '48px', fontWeight: 'bold', color: 'var(--color-navy-900)'}}>
                  $999
                </div>
                <div style={{color: 'var(--color-graphite-500)'}}>per month</div>
              </div>
              <p style={{color: 'var(--color-graphite-600)', marginBottom: '24px'}}>
                For growing enterprises
              </p>
              <ul style={{paddingLeft: '20px', marginBottom: '32px', color: 'var(--color-graphite-700)'}}>
                <li>Up to 1,000 users</li>
                <li>Full API access</li>
                <li>Priority support</li>
                <li>99.9% uptime SLA</li>
                <li>Advanced analytics</li>
                <li>Dedicated account manager</li>
              </ul>
              <Link to="/pricing" className="btn btn-primary" style={{width: '100%'}}>
                Get Started
              </Link>
            </div>

            <div className="card-enterprise">
              <h4>Custom</h4>
              <div style={{margin: '24px 0'}}>
                <div style={{fontSize: '48px', fontWeight: 'bold', color: 'var(--color-navy-900)'}}>
                  Custom
                </div>
                <div style={{color: 'var(--color-graphite-500)'}}>contact sales</div>
              </div>
              <p style={{color: 'var(--color-graphite-600)', marginBottom: '24px'}}>
                For large organizations
              </p>
              <ul style={{paddingLeft: '20px', marginBottom: '32px', color: 'var(--color-graphite-700)'}}>
                <li>Unlimited users</li>
                <li>Custom integration</li>
                <li>24/7 support</li>
                <li>99.99% uptime SLA</li>
                <li>Custom reporting</li>
                <li>On-premise options</li>
                <li>Professional services</li>
              </ul>
              <Link to="/contact-sales" className="btn btn-secondary" style={{width: '100%'}}>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-dark section-padding-large">
        <div className="container text-center">
          <h2 style={{color: 'white', marginBottom: '24px'}}>
            Ready to Transform Your Connectivity?
          </h2>
          <p className="text-large" style={{color: 'var(--color-pearl-200)', maxWidth: '640px', margin: '0 auto 40px'}}>
            Join leading organizations in Myanmar and ASEAN who trust eSIM Myanmar for 
            their enterprise connectivity needs.
          </p>
          <div className="flex gap-md" style={{justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/request-demo" className="btn btn-primary btn-large">
              Request a Demo
            </Link>
            <Link to="/contact-sales" className="btn btn-secondary btn-large">
              Talk to Sales
            </Link>
          </div>
          <div style={{marginTop: '48px', paddingTop: '48px', borderTop: '1px solid rgba(255,255,255,0.2)'}}>
            <p style={{color: 'var(--color-pearl-300)', marginBottom: '16px'}}>
              Questions? Contact our enterprise team
            </p>
            <div className="flex gap-lg" style={{justifyContent: 'center', color: 'white', fontSize: '18px', flexWrap: 'wrap'}}>
              <div>
                <strong>Email:</strong> enterprise@esim.com.mm
              </div>
              <div>
                <strong>Phone:</strong> +95 9 650 000 172
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnterpriseHome;
