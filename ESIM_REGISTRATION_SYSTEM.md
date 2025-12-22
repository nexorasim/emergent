# eSIM Registration System - Technical Documentation
## MPT, ATOM U9, MYTEL Automated Registration with MMQR Payment

---

## System Overview

Complete automated workflow for Myanmar eSIM registration supporting:
- MPT, ATOM U9, MYTEL providers
- MMQR payment verification (120,000 MMK)
- Nexora AI verification engine
- Screenshot validation
- QR code issuance
- Order tracking

---

## Live Deployment

- Frontend: https://esim-myanmar-ia6gw.web.app/esim-register
- GitHub: https://github.com/nexorasim/2026

---

## User Registration Flow

### Step 1: Provider Selection
User selects telecom provider (MPT, ATOM U9, or MYTEL)

### Step 2: Phone Number Validation
- Myanmar phone format validation
- Provider prefix detection
- Duplicate check
- eSIM eligibility verification

### Step 3: Device Compatibility Check
- Device type: iOS, Android, Tablet, Wearable
- Model verification against supported list
- OS version validation
- eSIM capability confirmation

### Step 4: MMQR Payment
- Payment amount: 120,000 MMK
- MMQR QR code parsing
- Payment data validation
- Optional screenshot upload

### Step 5: AI Verification
- Nexora AI validates all inputs
- Cross-checks provider rules
- Detects mismatches and duplicates
- Real-time verification feedback

### Step 6: eSIM QR Issuance
- Generate eSIM activation QR code
- Provide device-specific instructions
- Order confirmation and tracking

---

## Backend API Endpoints

### Base URL: `/api/esim-registration`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/validate-phone` | POST | Validate Myanmar phone number |
| `/check-device` | POST | Check device eSIM compatibility |
| `/register` | POST | Create registration order |
| `/verify-payment` | POST | Verify MMQR payment |
| `/upload-screenshot` | POST | Upload payment screenshot |
| `/issue-esim` | POST | Issue eSIM QR code |
| `/order/{order_id}` | GET | Get order status |
| `/parse-mmqr` | GET | Parse MMQR data (debug) |
| `/providers` | GET | List supported providers |

---

## MMQR Payment Integration

### MMQR Data Structure
```
00020101021126500015com.mmqrpay.www01152235110100152220208100165355204481253031045802MM5912ESIM Myanmar6006Hlaing61051105164330002MY0113...0206...63041C92
```

### Parsed Fields
- Tag 00: Payload Format Indicator
- Tag 01: Point of Initiation Method
- Tag 26: Merchant Account Information
- Tag 52: Merchant Category Code
- Tag 53: Currency (104 = MMK)
- Tag 54: Transaction Amount
- Tag 58: Country Code (MM)
- Tag 59: Merchant Name
- Tag 60: Merchant City
- Tag 61: Postal Code
- Tag 62: Additional Data
- Tag 63: CRC Checksum

### Validation Rules
- Country code must be MM
- Currency must be 104 (MMK)
- Amount must be >= 120,000 MMK
- CRC checksum verification

---

## Phone Number Validation

### Provider Prefixes
| Provider | Prefixes |
|----------|----------|
| MPT | 09, 097, 098 |
| ATOM | 094, 0944, 0945 |
| MYTEL | 096, 0966, 0967, 0968, 0969 |
| OOREDOO | 099, 0995, 0996, 0997 |

### Format
- Pattern: `^(09|959|\+959)[0-9]{7,9}$`
- Normalized to 09xxxxxxxx format

---

## Device Compatibility

### iOS (min version 12.1)
- iPhone XS and newer
- iPhone SE (2nd gen and newer)
- iPad Pro (3rd gen and newer)
- iPad Air (3rd gen and newer)
- Apple Watch Series 3 and newer

### Android (min version 9.0)
- Samsung Galaxy S20+ and newer
- Samsung Galaxy Z Fold/Flip series
- Google Pixel 3 and newer
- Huawei P40+ and newer
- Xiaomi 12+ and newer
- OPPO Find X3+ and newer
- OnePlus 9+ and newer

---

## Nexora AI Verification

### Verification Types
1. Phone Number Verification
2. Device Eligibility Check
3. Payment Validation
4. Screenshot OCR Analysis
5. Duplicate Detection

### Confidence Scoring
- 0.0 - 0.5: Failed
- 0.5 - 0.8: Requires Review
- 0.8 - 1.0: Verified

### Provider Rules
| Provider | Max eSIM | Transfer Cooldown | KYC Required |
|----------|----------|-------------------|--------------|
| MPT | 3 | 30 days | Yes |
| ATOM | 2 | 14 days | Yes |
| MYTEL | 3 | 7 days | Yes |

---

## Order Number Format

```
ESM-{PROVIDER}-{TIMESTAMP}-{HASH}
```

Example: `ESM-MPT-20251222143052-A1B2C3`

---

## File Structure

### Backend
```
backend/
  services/
    mmqr_service.py      # MMQR parsing and validation
    nexora_ai_service.py # AI verification engine
  routers/
    esim_registration.py # API endpoints
```

### Frontend
```
frontend/src/
  pages/
    ESIMRegistration.js  # Registration flow UI
```

---

## Security Measures

- Phone number format validation
- Provider prefix verification
- Device compatibility checks
- Payment amount validation
- CRC checksum verification
- Screenshot size limits (10MB max)
- Rate limiting on all endpoints
- Audit logging for all operations

---

## Error Handling

### Common Errors
| Error | Cause | Resolution |
|-------|-------|------------|
| Invalid phone format | Wrong number format | Use 09xxxxxxxx format |
| Provider mismatch | Phone doesn't match selected provider | Select correct provider |
| Device not supported | eSIM not available for device | Use compatible device |
| Payment insufficient | Amount below 120,000 MMK | Pay correct amount |
| Verification failed | AI detected issues | Contact support |

---

## Activation Instructions

### iOS
1. Go to Settings > Cellular > Add Cellular Plan
2. Scan the eSIM QR code
3. Follow on-screen instructions
4. Label your new plan
5. Choose default line settings

### Android
1. Go to Settings > Network & Internet > SIMs
2. Tap Add or + to add new SIM
3. Select Download a SIM instead
4. Scan the eSIM QR code
5. Follow on-screen instructions

---

## Support

- Email: info@esim.com.mm
- Phone: 09650000172
- Website: esim.com.mm

---

## Changelog

### v1.0.0 (December 22, 2025)
- Initial release
- MPT, ATOM U9, MYTEL support
- MMQR payment integration
- Nexora AI verification
- Screenshot validation
- QR code issuance
