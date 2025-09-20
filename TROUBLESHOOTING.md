# 🔧 Troubleshooting Guide

## Các lỗi thường gặp và cách fix

### 1. Database Connection Failed
```
Error: connect ECONNREFUSED
```

**Nguyên nhân:**
- Railway MySQL chưa start
- Environment variables sai
- SSL configuration issue

**Cách fix:**
1. Check Railway dashboard - MySQL service có running không
2. Verify environment variables trong Render:
   ```
   DB_HOST=containers-us-west-xxx.railway.app
   DB_PORT=6543
   DB_USER=root
   DB_PASSWORD=correct-password
   DB_NAME=railway
   ```
3. Check logs trong Render dashboard

### 2. Build Failed trên Render
```
Build failed with exit code 1
```

**Nguyên nhân:**
- TypeScript compilation errors
- Missing dependencies
- Wrong Node.js version

**Cách fix:**
1. Check build logs trong Render dashboard
2. Test build locally:
   ```bash
   cd packages/backend
   npm run build
   ```
3. Fix TypeScript errors nếu có
4. Ensure Node.js version compatibility

### 3. CORS Issues
```
Access to fetch at 'xxx' from origin 'yyy' has been blocked by CORS
```

**Nguyên nhân:**
- Frontend URL chưa được config đúng
- CORS middleware chưa setup properly

**Cách fix:**
1. Update `FRONTEND_URL` trong Render environment variables
2. Check CORS config trong `src/index.ts`

### 4. JWT Token Issues
```
JsonWebTokenError: invalid signature
```

**Nguyên nhân:**
- `JWT_SECRET` chưa được set hoặc khác nhau giữa environments

**Cách fix:**
1. Set `JWT_SECRET` trong Render environment variables
2. Đảm bảo secret ít nhất 32 characters
3. Clear browser localStorage nếu cần

### 5. App "Sleeps" trên Free Tier
**Hiện tượng:**
- API response chậm lần đầu (30-60 giây)
- App không response sau một thời gian

**Nguyên nhân:**
- Render free tier tự động sleep sau 15 phút không activity

**Cách fix:**
1. **Tạm thời**: Ping health endpoint định kỳ
   ```bash
   # Cron job mỗi 10 phút
   */10 * * * * curl https://your-app.onrender.com/health
   ```
2. **Lâu dài**: Upgrade lên paid plan ($7/tháng)

### 6. MySQL Connection Timeout
```
Error: Connection lost: The server closed the connection
```

**Nguyên nhân:**
- Railway MySQL connection timeout
- Too many concurrent connections

**Cách fix:**
1. Check connection pool settings trong `database.ts`
2. Restart backend service
3. Upgrade Railway plan nếu cần more connections

## Debug Commands

### Check Railway MySQL
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login và check services
railway login
railway status
```

### Check Render Logs
1. Vào Render dashboard
2. Click vào service name
3. Tab "Logs" để xem real-time logs

### Test Database Connection
```bash
# Install MySQL client
brew install mysql

# Connect directly to Railway
mysql -h [HOST] -P [PORT] -u [USER] -p[PASSWORD] [DATABASE]

# Test queries
SHOW TABLES;
SELECT * FROM users LIMIT 5;
```

### Test API Locally với Production DB
```bash
# Set production environment variables
export DB_HOST=containers-us-west-xxx.railway.app
export DB_PORT=6543
export DB_USER=root
export DB_PASSWORD=xxxxx
export DB_NAME=railway
export JWT_SECRET=your-secret

# Run locally
cd packages/backend
npm run dev
```

## Performance Optimization

### 1. Database Indexing
```sql
-- Add indexes for better performance
ALTER TABLE users ADD INDEX idx_email (email);
ALTER TABLE users ADD INDEX idx_created_at (created_at);
```

### 2. Connection Pooling
Đã được config trong `database.ts`:
```typescript
connectionLimit: 10,
acquireTimeout: 60000,
timeout: 60000,
```

### 3. Rate Limiting
Đã được config trong `index.ts` - có thể adjust:
```typescript
windowMs: 15 * 60 * 1000, // 15 minutes
max: 100 // requests per window
```

## Monitoring

### 1. Health Check Endpoint
```
GET https://your-app.onrender.com/health
```

### 2. Database Health
```sql
-- Check connection count
SHOW STATUS LIKE 'Threads_connected';

-- Check slow queries
SHOW PROCESSLIST;
```

### 3. Application Logs
- Render Dashboard → Logs tab
- Real-time monitoring
- Error tracking

## Contact Support

### Railway Issues
- Railway Discord: discord.gg/railway
- Railway Docs: docs.railway.app

### Render Issues  
- Render Discord: discord.gg/render
- Render Docs: render.com/docs
