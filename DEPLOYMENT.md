# Vercel Deployment Guide for Kanban Board

## 📋 Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- MongoDB Atlas connection string

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy on Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Click "Import Project"

2. **Import Git Repository**
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** Leave default or use: `cd client && npm install && npm run build`
   - **Output Directory:** `client/dist`

4. **Add Environment Variables**
   Click on "Environment Variables" and add:
   - **Name:** `MONGO_URI`
   - **Value:** `mongodb+srv://mdgazisahil:Gazisahil725492@cluster0.puuzwa3.mongodb.net/?appName=Cluster0`
   - **Environment:** Production, Preview, Development (select all)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)

### Step 3: Verify Deployment

Once deployed, you'll get a URL like: `https://your-project.vercel.app`

Test the following:
- ✅ Page loads correctly
- ✅ Can add new tasks
- ✅ Can move tasks between columns
- ✅ Can edit task titles
- ✅ Can delete tasks
- ✅ Data persists (refresh page to verify)

## 🔧 Project Structure

```
canbonBoard/
├── api/                    # Serverless API functions
│   ├── index.js           # Main API handler
│   └── package.json       # API dependencies
├── client/                # Frontend (Vite + React)
│   ├── src/
│   ├── dist/              # Build output
│   └── package.json
├── server/                # Local development server (not used in production)
└── vercel.json           # Vercel configuration
```

## 🌐 How It Works

- **Frontend:** Built with Vite and deployed as static files
- **Backend:** API routes handled by Vercel serverless functions
- **Database:** MongoDB Atlas (cloud database)
- **API Calls:** All `/api/*` requests routed to serverless functions

## 🐛 Troubleshooting

### Issue: "mongo_uri secret does not exist"
**Solution:** Make sure environment variable is named `MONGO_URI` (uppercase) in Vercel dashboard

### Issue: API calls fail with 404
**Solution:** Check that `vercel.json` is properly configured and redeploy

### Issue: Build fails
**Solution:** 
1. Check that all dependencies are in `package.json`
2. Verify Node.js version compatibility
3. Check build logs in Vercel dashboard

### Issue: Database connection fails
**Solution:**
1. Verify MongoDB Atlas IP whitelist (add `0.0.0.0/0` to allow all IPs)
2. Check that MONGO_URI is correct
3. Ensure database user has read/write permissions

## 📝 Important Notes

- Environment variables are automatically available to serverless functions
- The `/api` folder contains serverless functions that run on-demand
- Static files are served from `client/dist`
- MongoDB connection is established per request (serverless architecture)

## 🔄 Redeployment

To redeploy after making changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically redeploy on every push to the main branch.

## 🎉 Success!

Your Kanban Board is now live on Vercel! Share your URL with others.
