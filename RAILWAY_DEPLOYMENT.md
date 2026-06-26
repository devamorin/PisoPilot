# Railway Deployment Guide for PisoPilot

This guide will help you deploy PisoPilot backend and frontend to Railway, including MySQL database setup.

## Prerequisites

- A Railway account (free at railway.app)
- Railway CLI installed (optional but recommended)
- Git with your project pushed to GitHub

---

## Part 1: Set Up MySQL Database on Railway

### Step 1: Create MySQL Database on Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"** → **"Provision MySQL"**
3. Railway will create a MySQL database instance
4. Wait for the database to be provisioned (green checkmark)

### Step 2: Get Database Credentials

1. Click on your MySQL database in Railway
2. Go to the **"Variables"** tab
3. Copy the following credentials:
   - `MYSQLHOST` or `DB_HOST`
   - `MYSQLUSER` or `DB_USER`
   - `MYSQLPASSWORD` or `DB_PASSWORD`
   - `MYSQLDATABASE` or `DB_NAME`
   - `MYSQLPORT` or `DB_PORT` (usually 3306)

**Note:** Railway provides these as environment variables automatically.

### Step 3: Run the Schema on Railway MySQL

**Option A: Using Railway CLI (Recommended)**

```bash
# Install Railway CLI if not already installed
npm install -g @railway/cli

# Login to Railway
railway login

# Select your project
railway project

# Connect to MySQL and run the schema
railway run mysql < server/schema.sql
```

**Option B: Using Railway Console**

1. In Railway, click on your MySQL database
2. Click the **"Console"** tab
3. Click **"New Console"**
4. Copy and paste the contents of `server/schema.sql`
5. Click **"Run"**

**Option C: Using MySQL Workbench (See Part 2 below)**

---

## Part 2: Set Up MySQL Workbench (Local Testing)

### Step 1: Get Railway MySQL Connection Details

1. In Railway, click on your MySQL database
2. Click the **"Connect"** tab
3. Copy the connection string (it looks like: `mysql://user:password@host:port/database`)

### Step 2: Connect MySQL Workbench to Railway

1. Open MySQL Workbench
2. Click the **"+"** button next to "MySQL Connections"
3. Fill in the connection details:
   - **Connection Name:** `PisoPilot Railway`
   - **Hostname:** From Railway (e.g., `mysql.railway.internal`)
   - **Port:** `3306`
   - **Username:** From Railway
   - **Password:** From Railway
   - **Default Schema:** `pisopilot` (or the database name from Railway)
4. Click **"Test Connection"** to verify
5. Click **"OK"** to save

### Step 3: Run Schema in MySQL Workbench

1. Open the connection you just created
2. Open `server/schema.sql` in a text editor
3. Copy the entire schema content
4. In MySQL Workbench, click **"File"** → **"New Query Tab"**
5. Paste the schema content
6. Click the **lightning bolt** icon to execute
7. Verify tables were created by checking the **Schemas** panel

**Alternative Method:**
1. In MySQL Workbench, go to **Server** → **Data Import**
2. Select **"Import from Self-Contained File"**
3. Choose `server/schema.sql`
4. Select your database as the **Default Target Schema**
5. Click **"Start Import"**

---

## Part 3: Deploy Backend to Railway

### Step 1: Create Backend Service

1. In Railway, click **"New Service"** → **"Deploy from GitHub repo"**
2. Select your PisoPilot repository
3. Railway will detect the project

### Step 2: Configure Backend Service

1. Click on your backend service
2. Go to **"Settings"** → **"Variables"**
3. Add the following environment variables:

```
PORT=3000
DB_HOST=<from Railway MySQL>
DB_USER=<from Railway MySQL>
DB_PASSWORD=<from Railway MySQL>
DB_NAME=<from Railway MySQL>
DB_PORT=3306
JWT_SECRET=<generate a secure random string>
```

**To generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. Go to **"Settings"** → **"Root Directory"**
5. Set to: `server`
6. Click **"Deploy"**

### Step 3: Verify Backend Deployment

1. Wait for deployment to complete (green checkmark)
2. Click on your backend service
3. Click the **"URL"** to open it
4. You should see: `{"message": "PisoPilot API is running"}`

---

## Part 4: Deploy Frontend to Railway (or Vercel)

### Option A: Deploy Frontend to Railway

1. In Railway, click **"New Service"** → **"Deploy from GitHub repo"**
2. Select your PisoPilot repository (same repo)
3. Go to **"Settings"** → **"Variables"**
4. Add:

```
VITE_API_BASE_URL=<your-backend-railway-url>
```

5. Go to **"Settings"** → **"Root Directory"**
6. Set to: `.` (root directory)
7. Go to **"Settings"** → **"Build Command"**
8. Set to: `npm run build`
9. Go to **"Settings"** → **"Start Command"**
10. Set to: `npm run preview` or configure for static serving
11. Click **"Deploy"**

### Option B: Deploy Frontend to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. In environment variables, add:

```
VITE_API_BASE_URL=<your-backend-railway-url>
```

5. Click **"Deploy"**

---

## Part 5: Update Local Development

### Update Local .env Files

**For `server/.env`:**
```bash
PORT=3000
DB_HOST=<your-railway-mysql-host>
DB_USER=<your-railway-mysql-user>
DB_PASSWORD=<your-railway-mysql-password>
DB_NAME=pisopilot
DB_PORT=3306
JWT_SECRET=<your-jwt-secret>
```

**For root `.env`:**
```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

### Test Locally with Railway Database

```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
npm run dev
```

---

## Part 6: Verify Everything Works

### Test API Endpoints

1. **Health Check:**
   ```bash
   curl <your-backend-url>/
   ```

2. **Register User:**
   ```bash
   curl -X POST <your-backend-url>/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

3. **Login User:**
   ```bash
   curl -X POST <your-backend-url>/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

### Test Frontend

1. Open your frontend URL
2. Navigate to `/register`
3. Try to register a new user
4. Verify you can login with the registered user

---

## Troubleshooting

### Database Connection Issues

**Error:** `Access denied for user`
- Verify DB_USER and DB_PASSWORD are correct
- Check Railway MySQL is running

**Error:** `Can't connect to MySQL server`
- Verify DB_HOST is correct
- Check if Railway MySQL is accessible from your location
- Try using Railway's internal hostname

### Build Errors

**Error:** `Module not found`
- Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error:** `Environment variable not set`
- Verify all required environment variables are set in Railway
- Check variable names match exactly (case-sensitive)

### Frontend API Errors

**Error:** `Network Error` or `CORS Error`
- Verify VITE_API_BASE_URL is correct
- Check backend is running and accessible
- Verify CORS is enabled in backend

---

## Railway CLI Commands Reference

```bash
# Login
railway login

# List projects
railway project

# Select project
railway project select

# List services
railway services

# View logs
railway logs

# Open console for MySQL
railway run mysql

# Open console for backend
railway run bash

# View environment variables
railway variables

# Add environment variable
railway variables set KEY=value

# Redeploy
railway up
```

---

## Summary Checklist

- [ ] Create MySQL database on Railway
- [ ] Run schema on Railway MySQL
- [ ] Get database credentials
- [ ] Deploy backend to Railway
- [ ] Configure backend environment variables
- [ ] Deploy frontend (Railway or Vercel)
- [ ] Configure frontend environment variables
- [ ] Test API endpoints
- [ ] Test user registration and login
- [ ] Update local .env files for development

---

## Next Steps After Deployment

1. **Set up custom domain** (optional)
2. **Configure email service** for OTP verification
3. **Set up monitoring** and alerts
4. **Enable automatic deployments** from Git
5. **Configure backup strategy** for database
