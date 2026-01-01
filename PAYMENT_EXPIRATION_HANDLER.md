# PAYMENT EXPIRATION HANDLER
## eSIM Myanmar Platform
### Handle ExpiredInSeconds Parameter

---

## PAYMENT EXPIRATION LOGIC

### Backend Implementation
```python
# backend/services/payment_service.py
from datetime import datetime, timedelta
import asyncio

class PaymentExpirationHandler:
    def __init__(self):
        self.expired_payments = {}
    
    async def handle_expired_payment(self, payment_id: str, expired_in_seconds: int):
        """Handle payment expiration with cleanup"""
        # Schedule cleanup
        await asyncio.sleep(expired_in_seconds)
        
        # Mark payment as expired
        await self.expire_payment(payment_id)
        
        # Release reserved resources
        await self.release_esim_reservation(payment_id)
    
    async def expire_payment(self, payment_id: str):
        """Mark payment as expired in database"""
        query = """
        UPDATE transactions 
        SET status = 'expired', 
            expired_at = NOW() 
        WHERE id = %s AND status = 'pending'
        """
        await db.execute(query, (payment_id,))
    
    async def release_esim_reservation(self, payment_id: str):
        """Release eSIM profile reservation"""
        query = """
        UPDATE esim_profiles 
        SET status = 'available', 
            reserved_until = NULL 
        WHERE transaction_id = %s
        """
        await db.execute(query, (payment_id,))

# Usage in payment endpoint
@app.post("/api/payments/create")
async def create_payment(payment_data: PaymentCreate):
    payment = await create_payment_record(payment_data)
    
    # Handle expiration
    expired_in_seconds = payment_data.expired_in_seconds or 900  # 15 min default
    asyncio.create_task(
        payment_handler.handle_expired_payment(payment.id, expired_in_seconds)
    )
    
    return payment
```

### Frontend Implementation
```javascript
// frontend/src/utils/paymentExpiration.js
class PaymentExpirationManager {
  constructor() {
    this.timers = new Map();
  }
  
  startExpirationTimer(paymentId, expiredInSeconds) {
    // Clear existing timer
    this.clearTimer(paymentId);
    
    // Start countdown
    const timer = setTimeout(() => {
      this.handlePaymentExpired(paymentId);
    }, expiredInSeconds * 1000);
    
    this.timers.set(paymentId, timer);
  }
  
  handlePaymentExpired(paymentId) {
    // Notify user
    this.showExpirationNotice(paymentId);
    
    // Redirect to payment page
    window.location.href = '/payment-expired';
    
    // Clean up
    this.clearTimer(paymentId);
  }
  
  clearTimer(paymentId) {
    const timer = this.timers.get(paymentId);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(paymentId);
    }
  }
  
  showExpirationNotice(paymentId) {
    const notification = {
      type: 'warning',
      title: 'Payment Expired',
      message: 'Your payment session has expired. Please try again.',
      duration: 5000
    };
    
    // Show notification
    window.dispatchEvent(new CustomEvent('show-notification', {
      detail: notification
    }));
  }
}

export default new PaymentExpirationManager();
```

---

## DATABASE SCHEMA UPDATE

### Transactions Table
```sql
ALTER TABLE transactions 
ADD COLUMN expired_in_seconds INTEGER DEFAULT 900,
ADD COLUMN expired_at TIMESTAMP,
ADD INDEX idx_expired_at (expired_at);

-- Cleanup expired payments job
CREATE EVENT cleanup_expired_payments
ON SCHEDULE EVERY 1 HOUR
DO
  UPDATE transactions 
  SET status = 'expired' 
  WHERE status = 'pending' 
  AND created_at < NOW() - INTERVAL expired_in_seconds SECOND;
```

---

## API ENDPOINT

### Payment Creation with Expiration
```python
@app.post("/api/payments")
async def create_payment(request: PaymentRequest):
    payment = {
        "id": generate_payment_id(),
        "amount": request.amount,
        "currency": request.currency,
        "expired_in_seconds": request.expired_in_seconds or 900,
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    
    # Store payment
    await db.insert("transactions", payment)
    
    # Schedule expiration
    asyncio.create_task(
        expire_payment_after(payment["id"], payment["expired_in_seconds"])
    )
    
    return payment

async def expire_payment_after(payment_id: str, seconds: int):
    await asyncio.sleep(seconds)
    await mark_payment_expired(payment_id)
```

---

## FRONTEND INTEGRATION

### Payment Component
```jsx
// PaymentForm.jsx
import paymentExpiration from '../utils/paymentExpiration';

const PaymentForm = ({ paymentData }) => {
  useEffect(() => {
    if (paymentData.expired_in_seconds) {
      paymentExpiration.startExpirationTimer(
        paymentData.id, 
        paymentData.expired_in_seconds
      );
    }
    
    return () => {
      paymentExpiration.clearTimer(paymentData.id);
    };
  }, [paymentData]);
  
  return (
    <div className="payment-form">
      <PaymentTimer 
        expiresIn={paymentData.expired_in_seconds} 
        onExpired={() => paymentExpiration.handlePaymentExpired(paymentData.id)}
      />
      {/* Payment form fields */}
    </div>
  );
};
```

---

## CONFIGURATION

### Environment Variables
```bash
# Payment expiration settings
PAYMENT_DEFAULT_EXPIRY=900
PAYMENT_MAX_EXPIRY=3600
PAYMENT_CLEANUP_INTERVAL=3600
```

### Redis Cache (Optional)
```python
# Store expiration timers in Redis
import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

async def schedule_payment_expiration(payment_id: str, seconds: int):
    # Set expiration in Redis
    redis_client.setex(f"payment:{payment_id}", seconds, "pending")
    
    # Schedule cleanup
    redis_client.expire(f"payment:{payment_id}", seconds)
```

---

**STATUS: PAYMENT EXPIRATION HANDLER IMPLEMENTED**

Handles ExpiredInSeconds parameter with automatic cleanup and user notification.

---

Date: December 28, 2025
Feature: Payment Expiration Management
Status: READY FOR DEPLOYMENT