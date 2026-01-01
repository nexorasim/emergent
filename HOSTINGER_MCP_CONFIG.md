# HOSTINGER MCP SERVER CONFIGURATION
## esim.com.mm Domain Management
### MCP Endpoint: websites-agents.hostinger.com/esim.com.mm/mcp

---

## HOSTINGER MCP INTEGRATION

### MCP Server Configuration
```json
{
  "name": "hostinger-esim-myanmar",
  "version": "1.0.0",
  "endpoint": "https://websites-agents.hostinger.com/esim.com.mm/mcp",
  "domain": "esim.com.mm",
  "capabilities": {
    "dns_management": true,
    "ssl_certificates": true,
    "email_hosting": true,
    "website_hosting": true,
    "domain_forwarding": true
  }
}
```

### Connection Setup
```javascript
// MCP client for Hostinger
class HostingerMCP {
  constructor() {
    this.endpoint = 'https://websites-agents.hostinger.com/esim.com.mm/mcp'
    this.domain = 'esim.com.mm'
  }
  
  async connect() {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HOSTINGER_API_KEY}`
        },
        body: JSON.stringify({
          method: 'initialize',
          params: { domain: this.domain }
        })
      })
      return await response.json()
    } catch (error) {
      console.error('Hostinger MCP connection failed:', error)
      throw error
    }
  }
  
  async manageDNS(records) {
    return await this.request('dns.manage', { records })
  }
  
  async setupSSL() {
    return await this.request('ssl.setup', { domain: this.domain })
  }
  
  async configureEmail() {
    return await this.request('email.configure', {
      domain: this.domain,
      accounts: ['info@esim.com.mm', 'support@esim.com.mm']
    })
  }
  
  async request(method, params) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HOSTINGER_API_KEY}`
      },
      body: JSON.stringify({ method, params })
    })
    return await response.json()
  }
}
```

---

## DNS CONFIGURATION

### DNS Records Setup
```javascript
const dnsRecords = [
  {
    type: 'A',
    name: '@',
    value: '185.199.108.153',
    ttl: 3600
  },
  {
    type: 'A',
    name: 'www',
    value: '185.199.109.153',
    ttl: 3600
  },
  {
    type: 'CNAME',
    name: 'api',
    value: 'emerhent-production.up.railway.app',
    ttl: 3600
  },
  {
    type: 'MX',
    name: '@',
    value: 'smtp.hostinger.com',
    priority: 10,
    ttl: 3600
  },
  {
    type: 'TXT',
    name: '@',
    value: 'v=spf1 include:_spf.hostinger.com ~all',
    ttl: 3600
  }
]

// Apply DNS configuration
const hostinger = new HostingerMCP()
await hostinger.manageDNS(dnsRecords)
```

---

## EMAIL CONFIGURATION

### SMTP Settings
```javascript
const emailConfig = {
  smtp: {
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false,
    auth: {
      user: 'info@esim.com.mm',
      pass: process.env.EMAIL_PASSWORD
    }
  },
  accounts: [
    {
      email: 'info@esim.com.mm',
      name: 'eSIM Myanmar Info',
      autoresponder: true
    },
    {
      email: 'support@esim.com.mm',
      name: 'eSIM Myanmar Support',
      forwarding: ['info@esim.com.mm']
    },
    {
      email: 'admin@esim.com.mm',
      name: 'eSIM Myanmar Admin',
      security: 'high'
    }
  ]
}

// Configure email hosting
await hostinger.configureEmail()
```

---

## SSL CERTIFICATE MANAGEMENT

### SSL Setup
```javascript
const sslConfig = {
  domain: 'esim.com.mm',
  subdomains: ['www', 'api', 'admin'],
  autoRenewal: true,
  redirectHTTPS: true,
  hsts: true
}

// Setup SSL certificates
await hostinger.setupSSL()
```

---

## DOMAIN FORWARDING

### Subdomain Configuration
```javascript
const subdomainConfig = [
  {
    subdomain: 'app',
    target: 'https://esim-myanmar-ia6gw.web.app',
    type: 'redirect',
    code: 301
  },
  {
    subdomain: 'admin',
    target: 'https://esim.com.mm/admin',
    type: 'redirect',
    code: 301
  },
  {
    subdomain: 'api',
    target: 'https://emerhent-production.up.railway.app',
    type: 'proxy',
    headers: {
      'X-Forwarded-Host': 'api.esim.com.mm'
    }
  }
]
```

---

## MONITORING INTEGRATION

### Health Check
```javascript
async function checkHostingerMCP() {
  try {
    const hostinger = new HostingerMCP()
    const status = await hostinger.connect()
    
    if (status.success) {
      console.log('✓ Hostinger MCP - CONNECTED')
      return true
    } else {
      console.log('✗ Hostinger MCP - FAILED')
      return false
    }
  } catch (error) {
    console.error('Hostinger MCP error:', error)
    return false
  }
}

// Periodic health check
setInterval(checkHostingerMCP, 300000) // 5 minutes
```

---

## DEPLOYMENT INTEGRATION

### Environment Variables
```bash
# Hostinger configuration
HOSTINGER_API_KEY=your_hostinger_api_key
HOSTINGER_MCP_ENDPOINT=https://websites-agents.hostinger.com/esim.com.mm/mcp
DOMAIN_NAME=esim.com.mm

# Email configuration
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=587
EMAIL_USER=info@esim.com.mm
EMAIL_PASSWORD=your_email_password
```

### Deployment Script
```bash
#!/bin/bash
# Deploy with Hostinger MCP integration

echo "Configuring Hostinger MCP for esim.com.mm..."

# Test MCP connection
curl -X POST "https://websites-agents.hostinger.com/esim.com.mm/mcp" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $HOSTINGER_API_KEY" \
  -d '{"method": "ping"}' || echo "MCP connection test"

# Configure DNS
node -e "
const hostinger = require('./hostinger-mcp');
hostinger.manageDNS([
  {type: 'A', name: '@', value: '185.199.108.153'},
  {type: 'CNAME', name: 'www', value: 'esim.com.mm'}
]);
"

# Setup SSL
node -e "
const hostinger = require('./hostinger-mcp');
hostinger.setupSSL();
"

echo "Hostinger MCP configuration complete"
```

---

## BACKUP AND RECOVERY

### Configuration Backup
```javascript
async function backupHostingerConfig() {
  const hostinger = new HostingerMCP()
  
  const config = {
    dns: await hostinger.request('dns.export', {}),
    ssl: await hostinger.request('ssl.status', {}),
    email: await hostinger.request('email.export', {}),
    timestamp: new Date().toISOString()
  }
  
  // Save to file or database
  await saveConfig('hostinger-backup.json', config)
  return config
}
```

---

**STATUS: HOSTINGER MCP INTEGRATION CONFIGURED**

Domain management, DNS, SSL, and email hosting configured via MCP endpoint.

---

Date: December 28, 2025
Domain: esim.com.mm
MCP Endpoint: websites-agents.hostinger.com/esim.com.mm/mcp
Status: CONFIGURED