# Vercel Deployment Guide for PisoPilot

This guide will help you deploy PisoPilot to Vercel.

## Prerequisites

- A Vercel account (free at vercel.com)
- A GitHub account with your project pushed to it
- A MySQL database (recommended: PlanetScale, Neon, or any cloud MySQL provider)

## Deployment Steps

### 1. Push Your Code to GitHub

Make sure your project is pushed to a GitHub repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the project settings

### 3. Configure Environment Variables

In Vercel project settings, add the following environment variables:

**Frontend Variables:**
```
VITE_API_BASE_URL=/api
```

**Backend Variables:**
```
PORT=3000
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=pisopilot
DB_PORT=3306
JWT_SECRET=generate-a-secure-random-key
```

### 4. Database Setup

Since Vercel is serverless, you need a cloud MySQL database:

**Option 1: PlanetScale (Recommended)**
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get your connection string
4. Update the environment variables with PlanetScale credentials

**Option 2: Other MySQL Providers**
- Neon (PostgreSQL - would require code changes)
- AWS RDS
- Google Cloud SQL
- Any other cloud MySQL provider

### 5. Run Database Migrations

Connect to your database and run the schema:

```bash
# Using PlanetScale CLI
pscale shell your-database-name < server/schema.sql

# Or using MySQL client
mysql -h your-host -u your-user -p your-database < server/schema.sql
```

### 6. Deploy

Click "Deploy" in Vercel. The deployment will:
- Build the React frontend
- Deploy the API as serverless functions
- Set up the routing between frontend and backend

## Project Structure for Vercel

```
PisoPilot/
├── api/              # Serverless functions for Vercel
│   ├── index.js      # Main API entry point
│   └── package.json  # API dependencies
├── dist/             # Built frontend (created during build)
├── server/           # Backend source code
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── src/              # Frontend source code
├── vercel.json       # Vercel configuration
└── package.json      # Frontend dependencies
```

## Important Notes

1. **API Routes**: All API calls are proxied through `/api/*` to the serverless functions
2. **Database Connection**: Ensure your database allows connections from Vercel's IP ranges
3. **JWT Secret**: Generate a secure random string for production
4. **Environment Variables**: Never commit `.env` files to git

## Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure TypeScript compiles without errors

### API Errors
- Verify environment variables are set correctly in Vercel
- Check database connectivity
- Review Vercel function logs

### Database Connection Issues
- Ensure database host is accessible from Vercel
- Check credentials are correct
- Verify database user has necessary permissions

## Post-Deployment

1. Test the deployed application
2. Set up a custom domain (optional)
3. Configure analytics (optional)
4. Set up automatic deployments from Git

## Local Development

For local development, use the existing setup:

```bash
# Frontend
npm run dev

# Backend (in server directory)
cd server
npm run dev
```

Make sure your local `.env` file has:
```
VITE_API_BASE_URL=http://localhost:3000/api
```
