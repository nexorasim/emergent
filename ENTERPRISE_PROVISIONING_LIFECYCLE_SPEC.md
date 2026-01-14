# eSIM Myanmar - Enterprise Provisioning & Lifecycle Management

**Version:** 2.0.0  
**Last Updated:** January 2026  
**Classification:** Enterprise Technical Specification

---

## 1. Executive Overview

### 1.1 Platform Capabilities

eSIM Myanmar Enterprise Platform provides comprehensive eSIM lifecycle management with:
- Multi-tenant enterprise architecture
- Role-based access control (RBAC)
- Complete device lifecycle orchestration
- QR and QR-less activation support
- Device-to-device (D2D) migration
- Real-time telemetry and analytics
- Audit compliance and logging
- Subscription and usage billing

### 1.2 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Enterprise Portal                         │
│  (React 18 + Tailwind CSS + Framer Motion + GSAP)          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway Layer                         │
│              (FastAPI + Authentication)                      │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Provisioning │  │   Lifecycle  │  │   Billing    │
│   Service    │  │   Service    │  │   Service    │
└──────────────┘  └──────────────┘  └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
│         (MongoDB + Firebase + Supabase)                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              SM-DP+ Integration Layer                        │
│         (GSMA Compliant eSIM Management)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Role-Based Access Control (RBAC)

### 2.1 Role Definitions

#### Operator Role
**Permissions:**
- View all enterprise accounts
- Manage platform configuration
- Access system-wide analytics
- Manage service providers
- Configure billing rules
- Access audit logs
- System health monitoring

**UI Access:**
- Operator Dashboard
- Enterprise Management Console
- System Configuration
- Global Analytics
- Audit Dashboard
- Service Provider Management

#### Enterprise Admin Role
**Permissions:**
- Manage enterprise account
- Create/manage provisioners
- View enterprise analytics
- Configure enterprise settings
- Manage device inventory
- Access enterprise audit logs
- Manage subscriptions

**UI Access:**
- Enterprise Dashboard
- User Management
- Device Inventory
- Analytics Dashboard
- Subscription Management
- Audit Logs

#### Enterprise Provisioner Role
**Permissions:**
- Provision new eSIM profiles
- Activate devices
- Suspend/resume profiles
- View device status
- Generate QR codes
- Initiate D2D transfers
- View provisioning logs

**UI Access:**
- Provisioning Dashboard
- Device Activation
- QR Code Generator
- Profile Management
- Device Status Monitor

#### Finance Role
**Permissions:**
- View billing data
- Generate invoices
- Access usage reports
- Manage payment methods
- View transaction history
- Export financial reports

**UI Access:**
- Finance Dashboard
- Billing Management
- Invoice Generator
- Usage Reports
- Payment Management

#### Audit Role
**Permissions:**
- View all audit logs
- Generate compliance reports
- Access security logs
- View user activity
- Export audit data
- Monitor compliance status

**UI Access:**
- Audit Dashboard
- Compliance Reports
- Security Logs
- Activity Monitor
- Report Generator

### 2.2 Permission Matrix

| Action | Operator | Enterprise Admin | Provisioner | Finance | Audit |
|--------|----------|------------------|-------------|---------|-------|
| View Dashboard | ✓ | ✓ | ✓ | ✓ | ✓ |
| Provision eSIM | ✓ | ✓ | ✓ | ✗ | ✗ |
| Activate Profile | ✓ | ✓ | ✓ | ✗ | ✗ |
| Suspend Profile | ✓ | ✓ | ✓ | ✗ | ✗ |
| Delete Profile | ✓ | ✓ | ✗ | ✗ | ✗ |
| Manage Users | ✓ | ✓ | ✗ | ✗ | ✗ |
| View Billing | ✓ | ✓ | ✗ | ✓ | ✗ |
| Generate Invoice | ✓ | ✓ | ✗ | ✓ | ✗ |
| View Audit Logs | ✓ | ✓ | ✗ | ✗ | ✓ |
| System Config | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## 3. eSIM Provisioning Flows

### 3.1 Phone Number Registration Flow

```
User Registration
    │
    ├─► Enter Phone Number
    │       │
    │       ├─► Validate Format (Myanmar: 09XXXXXXXXX)
    │       │
    │       ├─► Check Availability
    │       │
    │       └─► Send OTP
    │
    ├─► Verify OTP
    │       │
    │       ├─► Validate Code
    │       │
    │       └─► Create User Account
    │
    ├─► Complete Profile
    │       │
    │       ├─► Full Name
    │       ├─► Email
    │       ├─► NRC/Passport
    │       └─► Address
    │
    └─► Account Created
            │
            └─► Redirect to eSIM Purchase
```

**API Endpoints:**
```
POST /api/auth/register/phone
POST /api/auth/verify-otp
POST /api/auth/complete-profile
GET  /api/auth/check-phone-availability
```

### 3.2 eSIM Purchase and Provisioning Flow

```
eSIM Purchase
    │
    ├─► Select Plan
    │       │
    │       ├─► Data Plans (1GB - Unlimited)
    │       ├─► Voice Plans (Minutes)
    │       ├─► Roaming Plans (190+ Countries)
    │       └─► Entertainment Bundles
    │
    ├─► Device Compatibility Check
    │       │
    │       ├─► Check Device Model
    │       ├─► Verify eSIM Support
    │       ├─► Check Carrier Lock
    │       └─► Validate IMEI
    │
    ├─► Payment Processing
    │       │
    │       ├─► Select Payment Method
    │       │   ├─► Credit/Debit Card
    │       │   ├─► Mobile Banking
    │       │   ├─► Digital Wallet
    │       │   └─► Bank Transfer
    │       │
    │       ├─► Process Payment
    │       │
    │       └─► Generate Receipt
    │
    ├─► Profile Provisioning
    │       │
    │       ├─► Allocate ICCID
    │       ├─► Generate Profile
    │       ├─► Configure Network Settings
    │       ├─► Set APN Parameters
    │       └─► Create SM-DP+ Entry
    │
    └─► Delivery
            │
            ├─► Generate QR Code
            ├─► Send Activation Email
            ├─► SMS Notification
            └─► In-App Notification
```

**API Endpoints:**
```
GET  /api/plans
POST /api/device/check-compatibility
POST /api/payment/process
POST /api/esim/provision
GET  /api/esim/qr-code/{profile_id}
```

### 3.3 QR Code Activation Flow

```
QR Code Activation
    │
    ├─► User Scans QR Code
    │       │
    │       └─► QR Contains: SM-DP+ Address + Activation Code
    │
    ├─► Device Contacts SM-DP+
    │       │
    │       ├─► Authenticate with Activation Code
    │       ├─► Download Profile
    │       └─► Install Profile
    │
    ├─► Profile Installation
    │       │
    │       ├─► Verify Digital Signature
    │       ├─► Install to eSIM Chip
    │       ├─► Configure Network Settings
    │       └─► Enable Profile
    │
    └─► Activation Complete
            │
            ├─► Network Registration
            ├─► Update Backend Status
            ├─► Send Confirmation
            └─► Profile Active
```

**QR Code Format:**
```
LPA:1$SM-DP-ADDRESS$ACTIVATION-CODE
Example: LPA:1$smdp.esim.com.mm$ABC123XYZ789
```

### 3.4 QR-Less Activation Flow (iOS Quick Transfer)

```
QR-Less Activation
    │
    ├─► User Initiates Transfer
    │       │
    │       └─► Settings > Cellular > Add eSIM
    │
    ├─► Carrier Selection
    │       │
    │       ├─► Select "eSIM Myanmar"
    │       └─► Authenticate User
    │
    ├─► Profile Discovery
    │       │
    │       ├─► Query Available Profiles
    │       ├─► Verify User Identity
    │       └─► Present Profile Options
    │
    ├─► Profile Download
    │       │
    │       ├─► User Confirms Selection
    │       ├─► Download Profile OTA
    │       └─► Install to eSIM
    │
    └─► Activation Complete
            │
            └─► Profile Active
```

**API Endpoints:**
```
GET  /api/esim/available-profiles
POST /api/esim/qrless-activate
GET  /api/esim/profile-status/{profile_id}
```

### 3.5 SIM to eSIM Migration Flow

```
SIM to eSIM Migration
    │
    ├─► User Requests Migration
    │       │
    │       ├─► Enter Physical SIM Number
    │       ├─► Verify Ownership (OTP)
    │       └─► Confirm Device Compatibility
    │
    ├─► Profile Generation
    │       │
    │       ├─► Retrieve SIM Data
    │       ├─► Generate eSIM Profile
    │       ├─► Transfer Phone Number
    │       ├─► Migrate Services
    │       └─► Copy Contacts (Optional)
    │
    ├─► Activation
    │       │
    │       ├─► Deliver QR Code
    │       ├─► User Scans and Installs
    │       └─► Activate eSIM Profile
    │
    ├─► Deactivation of Physical SIM
    │       │
    │       ├─► Verify eSIM Active
    │       ├─► Disable Physical SIM
    │       └─► Update Network Records
    │
    └─► Migration Complete
            │
            ├─► Send Confirmation
            ├─► Update User Account
            └─► Physical SIM Decommissioned
```

**API Endpoints:**
```
POST /api/esim/migrate-from-sim
POST /api/esim/verify-sim-ownership
GET  /api/esim/migration-status/{migration_id}
```

---

## 4. Profile Lifecycle Management

### 4.1 Lifecycle States

```
┌──────────────┐
│   CREATED    │ ─► Profile generated, not yet delivered
└──────────────┘
       │
       ▼
┌──────────────┐
│  DELIVERED   │ ─► QR code sent, awaiting installation
└──────────────┘
       │
       ▼
┌──────────────┐
│  INSTALLED   │ ─► Profile installed on device
└──────────────┘
       │
       ▼
┌──────────────┐
│   ENABLED    │ ─► Profile active and in use
└──────────────┘
       │
       ├─► SUSPENDED ─► Temporarily disabled
       │       │
       │       └─► Can return to ENABLED
       │
       ├─► DISABLED ─► Permanently disabled
       │
       └─► DELETED ─► Profile removed
```

### 4.2 State Transitions

#### Activation
```
CREATED → DELIVERED → INSTALLED → ENABLED
```

**Actions:**
- Generate profile
- Deliver QR code
- User installs profile
- Network activates profile

#### Suspension
```
ENABLED → SUSPENDED
```

**Reasons:**
- Payment failure
- User request
- Fraud detection
- Policy violation

**Actions:**
- Disable network access
- Retain profile data
- Send notification
- Log suspension reason

#### Resumption
```
SUSPENDED → ENABLED
```

**Requirements:**
- Resolve suspension reason
- Verify payment
- User confirmation

**Actions:**
- Re-enable network access
- Update profile status
- Send confirmation
- Log resumption

#### Revocation
```
ENABLED/SUSPENDED → DISABLED
```

**Reasons:**
- Account closure
- Security breach
- Regulatory requirement
- Contract termination

**Actions:**
- Disable profile permanently
- Revoke network access
- Archive profile data
- Send notification

#### Deletion
```
DISABLED → DELETED
```

**Requirements:**
- Profile must be disabled
- Retention period expired
- User consent (GDPR)

**Actions:**
- Remove profile from device
- Delete from SM-DP+
- Archive audit logs
- Purge personal data

#### Reassignment
```
DISABLED → CREATED (New User)
```

**Use Case:**
- Enterprise device reallocation
- Number recycling
- Device upgrade

**Actions:**
- Verify previous user consent
- Clear previous data
- Generate new profile
- Assign to new user

#### Device-to-Device (D2D) Migration
```
ENABLED (Device A) → ENABLED (Device B)
```

**Process:**
1. User initiates transfer
2. Verify device compatibility
3. Generate transfer token
4. Deactivate on Device A
5. Activate on Device B
6. Update device records

**API Endpoints:**
```
POST /api/esim/suspend/{profile_id}
POST /api/esim/resume/{profile_id}
POST /api/esim/revoke/{profile_id}
POST /api/esim/delete/{profile_id}
POST /api/esim/reassign/{profile_id}
POST /api/esim/transfer
```

---

## 5. Device Onboarding

### 5.1 Compatibility Check

**Supported Devices:**
- iPhone XS and later (iOS 12.1+)
- iPad Pro (3rd gen and later)
- iPad Air (3rd gen and later)
- iPad mini (5th gen and later)
- Apple Watch Series 3 and later
- Samsung Galaxy S20 and later
- Google Pixel 3 and later
- Other eSIM-capable Android devices

**Verification Process:**
```javascript
{
  "device_model": "iPhone 14 Pro",
  "os_version": "iOS 17.2",
  "imei": "123456789012345",
  "esim_capable": true,
  "carrier_locked": false,
  "supported": true
}
```

**API Endpoint:**
```
POST /api/device/verify-compatibility
{
  "device_model": "string",
  "os_version": "string",
  "imei": "string"
}
```

### 5.2 Multi-Device Support

**Supported Configurations:**
- Primary smartphone + Apple Watch
- Primary smartphone + iPad
- Primary smartphone + secondary smartphone
- Multiple devices per account (up to 10)

**Device Management:**
```
GET  /api/device/list
POST /api/device/add
PUT  /api/device/update/{device_id}
DELETE /api/device/remove/{device_id}
```

---

## 6. Inventory Tracking

### 6.1 Profile Inventory

**Tracking Metrics:**
- Total profiles created
- Active profiles
- Suspended profiles
- Available profiles
- Profiles by plan type
- Profiles by enterprise
- Profiles by region

**Inventory Dashboard:**
```javascript
{
  "total_profiles": 50000000,
  "active": 45000000,
  "suspended": 2000000,
  "available": 3000000,
  "by_plan": {
    "prepaid": 30000000,
    "postpaid": 15000000,
    "enterprise": 5000000
  },
  "by_region": {
    "myanmar": 40000000,
    "thailand": 5000000,
    "vietnam": 3000000,
    "other": 2000000
  }
}
```

### 6.2 Device Inventory

**Tracking Metrics:**
- Registered devices
- Active devices
- Device types
- OS distribution
- Manufacturer distribution

**API Endpoints:**
```
GET /api/inventory/profiles
GET /api/inventory/devices
GET /api/inventory/summary
GET /api/inventory/analytics
```

---

## 7. Subscription and Billing

### 7.1 Subscription Models

#### Prepaid Plans
- Pay-as-you-go
- Fixed data allowance
- Validity period (7/30/90 days)
- Auto-renewal optional

#### Postpaid Plans
- Monthly billing cycle
- Usage-based charges
- Overage fees
- Contract terms (12/24 months)

#### Enterprise Plans
- Custom pricing
- Volume discounts
- Dedicated support
- SLA guarantees

### 7.2 Usage Tracking

**Tracked Metrics:**
- Data usage (MB/GB)
- Voice minutes
- SMS count
- Roaming usage
- Service usage

**Real-time Monitoring:**
```javascript
{
  "profile_id": "ESIM-MM-123456",
  "billing_cycle": "2026-01",
  "data_used": 5.2,
  "data_limit": 10.0,
  "voice_minutes": 120,
  "sms_count": 50,
  "roaming_data": 0.5,
  "charges": {
    "base": 15.00,
    "data_overage": 0.00,
    "roaming": 2.50,
    "total": 17.50
  }
}
```

### 7.3 Invoice Generation

**Invoice Components:**
- Subscription fees
- Usage charges
- Roaming charges
- Service fees
- Taxes and surcharges
- Discounts
- Total amount

**Invoice Format:**
```
Invoice #: INV-2026-001234
Date: January 15, 2026
Period: January 1-31, 2026

Customer: Enterprise Corp
Profile: ESIM-MM-123456

Charges:
- Base Subscription: $15.00
- Data Usage: $0.00 (5.2GB / 10GB)
- Voice Usage: $0.00 (120 min / Unlimited)
- Roaming: $2.50
- Service Fee: $1.00
Subtotal: $18.50
Tax (5%): $0.93
Total: $19.43
```

**API Endpoints:**
```
GET  /api/billing/usage/{profile_id}
GET  /api/billing/invoice/{invoice_id}
POST /api/billing/generate-invoice
GET  /api/billing/history
```

---

## 8. Telemetry and Analytics

### 8.1 Real-time Telemetry

**Collected Metrics:**
- Network signal strength
- Data throughput
- Connection status
- Roaming status
- Battery impact
- Error rates

**Telemetry Data:**
```javascript
{
  "profile_id": "ESIM-MM-123456",
  "timestamp": "2026-01-15T10:30:00Z",
  "network": {
    "operator": "eSIM Myanmar",
    "signal_strength": -75,
    "network_type": "5G",
    "connected": true
  },
  "performance": {
    "download_speed": 150.5,
    "upload_speed": 50.2,
    "latency": 15
  },
  "device": {
    "battery_level": 85,
    "temperature": 35
  }
}
```

### 8.2 Analytics Dashboard

**Key Metrics:**
- Active users
- Data consumption
- Revenue metrics
- Churn rate
- Customer satisfaction
- Network performance

**Dashboard Widgets:**
- Real-time user count
- Data usage trends
- Revenue charts
- Geographic distribution
- Device type breakdown
- Plan popularity

**API Endpoints:**
```
GET /api/analytics/realtime
GET /api/analytics/usage-trends
GET /api/analytics/revenue
GET /api/analytics/customer-metrics
```

---

## 9. Audit and Compliance

### 9.1 Audit Logging

**Logged Events:**
- User authentication
- Profile provisioning
- State transitions
- Configuration changes
- Access attempts
- Data exports
- Payment transactions

**Log Format:**
```javascript
{
  "event_id": "AUD-2026-001234",
  "timestamp": "2026-01-15T10:30:00Z",
  "event_type": "PROFILE_ACTIVATION",
  "actor": {
    "user_id": "USR-123456",
    "role": "PROVISIONER",
    "ip_address": "203.81.xxx.xxx"
  },
  "resource": {
    "type": "ESIM_PROFILE",
    "id": "ESIM-MM-123456"
  },
  "action": "ACTIVATE",
  "result": "SUCCESS",
  "metadata": {
    "device_imei": "123456789012345",
    "activation_method": "QR_CODE"
  }
}
```

### 9.2 Compliance Requirements

**GDPR Compliance:**
- Data minimization
- Purpose limitation
- Storage limitation
- Right to access
- Right to erasure
- Data portability
- Consent management

**Telecom Regulations:**
- Number portability
- Emergency services
- Lawful intercept
- Data retention
- Customer identification

**Security Standards:**
- ISO 27001
- GSMA eSIM specifications
- PCI DSS (payment data)
- SOC 2 Type II

**API Endpoints:**
```
GET  /api/audit/logs
GET  /api/audit/compliance-report
POST /api/audit/export
GET  /api/audit/user-activity/{user_id}
```

---

## 10. Error Handling and Logging

### 10.1 Error Categories

**Provisioning Errors:**
- PROFILE_GENERATION_FAILED
- SMDP_CONNECTION_ERROR
- INVALID_ACTIVATION_CODE
- DEVICE_NOT_COMPATIBLE

**Lifecycle Errors:**
- SUSPENSION_FAILED
- ACTIVATION_TIMEOUT
- TRANSFER_FAILED
- DELETION_ERROR

**Billing Errors:**
- PAYMENT_FAILED
- INVOICE_GENERATION_ERROR
- USAGE_TRACKING_ERROR

**Network Errors:**
- NETWORK_REGISTRATION_FAILED
- ROAMING_ACTIVATION_ERROR
- APN_CONFIGURATION_ERROR

### 10.2 Error Response Format

```javascript
{
  "error": {
    "code": "PROFILE_ACTIVATION_FAILED",
    "message": "Failed to activate eSIM profile",
    "details": "SM-DP+ server returned error 404",
    "timestamp": "2026-01-15T10:30:00Z",
    "request_id": "REQ-123456",
    "support_reference": "SUP-789012"
  }
}
```

### 10.3 Logging Levels

- **DEBUG:** Detailed diagnostic information
- **INFO:** General informational messages
- **WARNING:** Warning messages for potential issues
- **ERROR:** Error events that might still allow operation
- **CRITICAL:** Critical errors requiring immediate attention

---

## 11. API Reference Summary

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh-token
```

### Provisioning
```
POST /api/esim/provision
GET  /api/esim/qr-code/{profile_id}
POST /api/esim/qrless-activate
POST /api/esim/migrate-from-sim
```

### Lifecycle
```
POST /api/esim/activate/{profile_id}
POST /api/esim/suspend/{profile_id}
POST /api/esim/resume/{profile_id}
POST /api/esim/revoke/{profile_id}
POST /api/esim/delete/{profile_id}
POST /api/esim/transfer
```

### Device Management
```
POST /api/device/verify-compatibility
GET  /api/device/list
POST /api/device/add
DELETE /api/device/remove/{device_id}
```

### Billing
```
GET  /api/billing/usage/{profile_id}
GET  /api/billing/invoice/{invoice_id}
POST /api/billing/generate-invoice
POST /api/payment/process
```

### Analytics
```
GET /api/analytics/realtime
GET /api/analytics/usage-trends
GET /api/analytics/revenue
```

### Audit
```
GET  /api/audit/logs
GET  /api/audit/compliance-report
POST /api/audit/export
```

---

**Document Version:** 2.0.0  
**Maintained By:** eSIM Myanmar Engineering Team  
**Classification:** Enterprise Technical Specification  
**Last Updated:** January 2026
