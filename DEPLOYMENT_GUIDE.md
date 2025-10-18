# Quick Deployment Guide to Vercel

## Step-by-Step Instructions

### 1. Prepare Your Code

First, make sure all your changes are committed to Git:

```bash
cd "D:\Private\buddika aiya\ASKAKD2"
git add .
git commit -m "Migrate to Next.js for Vercel deployment"
git push origin main
```

### 2. Sign Up for Vercel

1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

### 3. Deploy Your Application

#### Option A: Via Vercel Dashboard (Easiest)

1. **Login to Vercel**: [https://vercel.com](https://vercel.com)

2. **Click "Add New Project"**

3. **Import Git Repository**:
   - Select your GitHub repository (ASKAKD2)
   - Click "Import"

4. **Configure Project**:
   - **Project Name**: `askakd` (or your preferred name)
   - **Framework Preset**: Next.js ✅ (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` ✅ (default)
   - **Output Directory**: `.next` ✅ (default)
   - **Install Command**: `npm install` ✅ (default)

5. **Environment Variables**: 
   - Leave blank (none required!)

6. **Click "Deploy"** 🚀

7. **Wait 2-3 minutes** for deployment to complete

8. **Get Your URL**: 
   - Your app will be live at: `https://askakd-[random].vercel.app`
   - You can customize this domain in settings

#### Option B: Via Command Line

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from your project directory)
cd "D:\Private\buddika aiya\ASKAKD2"
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: [Your account]
# - Link to existing project: N
# - Project name: askakd
# - In which directory: ./
# - Override settings: N

# For production deployment
vercel --prod
```

### 4. Verify Deployment

1. Open the provided URL (e.g., `https://askakd.vercel.app`)
2. Test the following:
   - ✅ Page loads correctly
   - ✅ Can ask a question
   - ✅ Can like a question
   - ✅ Can register a member
   - ✅ Images display properly

### 5. Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Important: Data Persistence Warning

⚠️ **Current Setup Limitation**:
- Your app uses file-based storage (CSV/JSON files)
- Vercel's serverless environment is **stateless**
- **Data will be lost** after each deployment or after ~5 minutes of inactivity

### Solutions:

#### For Demo/Testing (Current Setup)
- Works fine for demonstration purposes
- Data resets on each deployment
- Good for trying out the app

#### For Production (Recommended Upgrade)
Add a database to persist data permanently:

1. **Vercel Postgres** (Easiest, stays on Vercel):
   - Free tier: 256 MB, 60 compute hours/month
   - Click "Storage" in Vercel Dashboard → "Create Database"
   - Choose "Postgres" → Follow setup wizard
   - Free forever!

2. **Supabase** (PostgreSQL):
   - Free tier: 500 MB database
   - Sign up at [supabase.com](https://supabase.com)
   - Create project → Get connection string

3. **MongoDB Atlas**:
   - Free tier: 512 MB
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

**Would you like me to upgrade the app to use Vercel Postgres?** It's free and easy to set up!

## Troubleshooting

### Build Fails
- Check the build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Images Not Loading
- Ensure images are in `public/images/` directory
- Check image paths in code
- Verify images were committed to Git

### API Routes Not Working
- Check function logs in Vercel Dashboard
- Verify API route files are in `app/api/` directory
- Check for syntax errors

### Data Not Persisting
- This is expected with file-based storage on Vercel
- Consider upgrading to a database (see above)

## Cost Breakdown

Your current deployment is **100% FREE** on Vercel:

| Resource | Free Tier Limit | Cost |
|----------|----------------|------|
| Hosting | Unlimited | $0 |
| Bandwidth | 100 GB/month | $0 |
| Serverless Functions | 100 GB-hours/month | $0 |
| Build Minutes | 6000 minutes/month | $0 |
| **Total** | | **$0/month** ✅ |

Perfect for small to medium traffic applications!

## Next Steps

1. ✅ Deploy to Vercel
2. 🔗 Share your live URL
3. 📊 Monitor usage in Vercel Dashboard
4. 💾 (Optional) Add database for data persistence
5. 🌐 (Optional) Add custom domain

## Need Help?

- Vercel Documentation: [https://vercel.com/docs](https://vercel.com/docs)
- Next.js Documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
- Open an issue in your repository

---

Happy Deploying! 🎉

