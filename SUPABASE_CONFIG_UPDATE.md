# SUPABASE CONFIGURATION UPDATE
## eSIM Myanmar Platform
### Environment Variables Applied

---

## SUPABASE CONNECTION CONFIGURED

### Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=https://ksctoosqlpemoptcaxdr.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl
```

### Frontend Configuration
```javascript
// frontend/src/utils/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ksctoosqlpemoptcaxdr.supabase.co'
const supabaseKey = 'sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database operations
export const db = {
  users: () => supabase.from('users'),
  esim_profiles: () => supabase.from('esim_profiles'),
  plans: () => supabase.from('plans'),
  transactions: () => supabase.from('transactions'),
  support_tickets: () => supabase.from('support_tickets')
}
```

### Backend Configuration
```python
# backend/config.py
import os
from supabase import create_client, Client

SUPABASE_URL = "https://ksctoosqlpemoptcaxdr.supabase.co"
SUPABASE_KEY = "sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
```

### API Integration
```python
# backend/services/supabase_service.py
from config import supabase

class SupabaseService:
    @staticmethod
    async def get_users():
        return supabase.table('users').select('*').execute()
    
    @staticmethod
    async def create_user(user_data):
        return supabase.table('users').insert(user_data).execute()
    
    @staticmethod
    async def get_esim_profiles():
        return supabase.table('esim_profiles').select('*').execute()
    
    @staticmethod
    async def activate_esim(profile_id):
        return supabase.table('esim_profiles').update({
            'status': 'active',
            'activated_at': 'now()'
        }).eq('id', profile_id).execute()
```

---

## ENVIRONMENT FILE UPDATE

### .env.local (Frontend)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://ksctoosqlpemoptcaxdr.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl
NEXT_PUBLIC_API_URL=https://emerhent-production.up.railway.app
```

### .env (Backend)
```bash
SUPABASE_URL=https://ksctoosqlpemoptcaxdr.supabase.co
SUPABASE_KEY=sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl
DATABASE_URL=postgresql://postgres:[password]@db.ksctoosqlpemoptcaxdr.supabase.co:5432/postgres
```

---

## DEPLOYMENT UPDATE

### Vercel Environment Variables
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter: https://ksctoosqlpemoptcaxdr.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
# Enter: sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl
```

### Railway Environment Variables
```bash
railway variables set SUPABASE_URL=https://ksctoosqlpemoptcaxdr.supabase.co
railway variables set SUPABASE_KEY=sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl
```

### Firebase Environment Config
```bash
firebase functions:config:set supabase.url="https://ksctoosqlpemoptcaxdr.supabase.co"
firebase functions:config:set supabase.key="sb_publishable_waCWl25a8TytSq5rW0iO5A_TujzHyzl"
```

---

## CONNECTION TEST

### Frontend Test
```javascript
// Test Supabase connection
import { supabase } from './utils/supabase'

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact' })
    
    if (error) throw error
    console.log('Supabase connected:', data)
    return true
  } catch (error) {
    console.error('Supabase connection failed:', error)
    return false
  }
}
```

### Backend Test
```python
# Test Supabase connection
from config import supabase

def test_supabase_connection():
    try:
        result = supabase.table('users').select('*').limit(1).execute()
        print(f"Supabase connected: {len(result.data)} records")
        return True
    except Exception as e:
        print(f"Supabase connection failed: {e}")
        return False
```

---

**STATUS: SUPABASE CONFIGURATION APPLIED**

Database connection configured with provided environment variables.
Ready for deployment across all platforms.

---

Date: December 28, 2025
Database: Supabase (ksctoosqlpemoptcaxdr)
Status: CONFIGURED