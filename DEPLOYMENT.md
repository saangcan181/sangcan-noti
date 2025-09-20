# Deployment Guide: Backend to Render + MySQL to Railway

## Overview
- **Backend**: Deploy to Render (Node.js service)
- **Database**: Deploy MySQL to Railway
- **Frontend**: Can be deployed later to Vercel or Render Static

---

## Part 1: Deploy MySQL Database to Railway

### Step 1: Setup Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub account
3. Click "New Project" → "Provision MySQL"

### Step 2: Configure Railway MySQL
1. After creating MySQL service, go to **Variables** tab
2. Note down these connection details:
   - `MYSQL_URL` (full connection string)
   - `MYSQL_HOST`
   - `MYSQL_PORT` 
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

### Step 3: Initialize Database Schema
You have two options:

**Option A: Connect via MySQL client**
```bash
# Install MySQL client if needed
brew install mysql

# Connect to Railway MySQL
mysql -h [MYSQL_HOST] -P [MYSQL_PORT] -u [MYSQL_USER] -p[MYSQL_PASSWORD] [MYSQL_DATABASE]

# Run your schema (from docker/mysql-init/01-init.sql if you have one)
```

**Option B: Let your backend initialize tables automatically**
Your backend already has `initDatabase()` function that creates tables automatically.

---

## Part 2: Deploy Backend to Render

### Step 1: Setup Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub account
3. Connect your GitHub repository

### Step 2: Prepare Backend for Production
The configuration files are created automatically (see render.yaml below).

### Step 3: Configure Environment Variables in Render
In your Render service dashboard, add these environment variables:

```
NODE_ENV=production
PORT=3001
DB_HOST=[Railway MySQL Host]
DB_PORT=[Railway MySQL Port] 
DB_USER=[Railway MySQL User]
DB_PASSWORD=[Railway MySQL Password]
DB_NAME=[Railway MySQL Database]
JWT_SECRET=[Generate a strong secret key]
FRONTEND_URL=https://your-frontend-domain.com
```

### Step 4: Deploy
1. Push your code to GitHub
2. Render will automatically build and deploy
3. Your API will be available at: `https://your-service.onrender.com`

---

## Environment Variables Summary

### Railway (MySQL Database)
- Automatically provides all MySQL connection variables
- Copy these to Render backend service

### Render (Backend API)
```env
NODE_ENV=production
PORT=3001
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=6543
DB_USER=root
DB_PASSWORD=xxxxxxxxxxxxx
DB_NAME=railway
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-frontend.com
```

---

## Testing Your Deployment

1. **Health Check**: Visit `https://your-backend.onrender.com/health`
2. **Database Connection**: Check Render logs for successful connection
3. **API Endpoints**: Test your auth endpoints

---

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check Railway MySQL is running
   - Verify environment variables are correct
   - Check firewall/network settings

2. **Build Failed on Render**
   - Check Node.js version compatibility
   - Verify package.json scripts
   - Check build logs for errors

3. **JWT/Auth Issues**
   - Ensure JWT_SECRET is set
   - Check CORS settings for frontend domain

### Useful Commands:
```bash
# Check Railway MySQL status
railway status

# View Render deployment logs
# (Available in Render dashboard)

# Test database connection locally
mysql -h [HOST] -P [PORT] -u [USER] -p[PASSWORD] [DATABASE]
```

---

## Next Steps
1. Deploy frontend to Vercel/Netlify
2. Update FRONTEND_URL in backend
3. Setup custom domain (optional)
4. Configure monitoring/logging
5. Setup CI/CD pipeline
