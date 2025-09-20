# 🚀 Quick Deployment Guide

## Trước khi bắt đầu
Bạn cần có:
- GitHub account (để connect với Render)
- Credit card (cho Railway - có free tier)

## Bước 1: Deploy Database lên Railway (5 phút)

1. **Tạo tài khoản Railway**
   - Đi tới [railway.app](https://railway.app)
   - Sign up bằng GitHub
   
2. **Tạo MySQL Database**
   - Click "New Project" → "Provision MySQL"
   - Đợi 1-2 phút để setup xong
   
3. **Lấy thông tin kết nối**
   - Vào tab "Connect"
   - Copy các thông tin:
     ```
     MYSQL_HOST=containers-us-west-xxx.railway.app
     MYSQL_PORT=6543
     MYSQL_USER=root
     MYSQL_PASSWORD=xxxxxxxxxxxxx
     MYSQL_DATABASE=railway
     ```

## Bước 2: Deploy Backend lên Render (10 phút)

1. **Push code lên GitHub**
   ```bash
   git add .
   git commit -m "Add deployment config"
   git push origin main
   ```

2. **Tạo tài khoản Render**
   - Đi tới [render.com](https://render.com)
   - Sign up bằng GitHub
   
3. **Tạo Web Service**
   - Click "New" → "Web Service"
   - Connect GitHub repo: `sangcanNoti`
   - Render sẽ tự động detect `render.yaml`
   
4. **Thêm Environment Variables**
   Trong Render dashboard, thêm:
   ```
   NODE_ENV=production
   DB_HOST=[Railway MySQL Host]
   DB_PORT=[Railway MySQL Port]
   DB_USER=[Railway MySQL User]  
   DB_PASSWORD=[Railway MySQL Password]
   DB_NAME=[Railway MySQL Database]
   JWT_SECRET=my-super-secret-jwt-key-at-least-32-characters
   FRONTEND_URL=https://localhost:3000
   ```

5. **Deploy**
   - Click "Deploy"
   - Đợi 5-10 phút build & deploy
   - API sẽ có URL: `https://your-app.onrender.com`

## Bước 3: Test API

1. **Health check**
   ```bash
   curl https://your-app.onrender.com/health
   ```

2. **Test register**
   ```bash
   curl -X POST https://your-app.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"123456","name":"Test User"}'
   ```

## 🎉 Xong!

Backend API của bạn đã live tại: `https://your-app.onrender.com`

### Chi phí:
- **Railway MySQL**: Free tier (512MB storage, shared CPU)
- **Render Backend**: Free tier (512MB RAM, spin down after 15min không dùng)
- **Total**: $0/tháng

### Next steps:
1. Deploy frontend lên Vercel/Netlify
2. Update `FRONTEND_URL` trong Render
3. Setup custom domain (optional)

## ❗ Lưu ý quan trọng:
- Free tier Render sẽ "sleep" sau 15 phút không dùng
- Cold start sẽ mất 30-60 giây để "wake up"
- Để app luôn online cần upgrade plan (~$7/tháng)
