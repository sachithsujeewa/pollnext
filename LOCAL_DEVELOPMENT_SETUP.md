# 🛠️ Local Development Setup

## Issue: 500 Error When Running Locally

If you're seeing a **500 error** and `e.map is not a function`, it's because Redis environment variables aren't set up for local development.

## Quick Fix - Get Redis Credentials

### Step 1: Link Your Project to Vercel

```bash
vercel link
```

Follow the prompts:
- **Set up and deploy?** No (just linking)
- **Which scope?** Your Vercel account
- **Link to existing project?** Yes
- **What's the name of your existing project?** (Select your project name)

### Step 2: Pull Environment Variables

```bash
vercel env pull .env.local
```

This will create a `.env.local` file with your Redis credentials.

### Step 3: Restart Dev Server

```bash
npm run dev
```

Now it should work! ✅

---

## Alternative: Deploy First, Test on Vercel

If you don't need local development right now, just deploy to Vercel:

```bash
git add -A
git commit -m "Fix Redis integration and add error handling"
git push
```

Then test on your live Vercel URL. Redis will work automatically there!

---

## What's Happening?

The app needs these environment variables to connect to Redis:
- `KV_REST_API_URL` - Your Redis endpoint
- `KV_REST_API_TOKEN` - Authentication token

On Vercel (production), these are **automatically set**.

For local development, you need to pull them using `vercel env pull`.

---

## Verify Setup

After pulling environment variables:

```bash
# Check if file was created
ls -la .env.local

# Or on Windows
dir .env.local

# Check contents (don't share these!)
cat .env.local
```

You should see:
```
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
```

---

## Common Issues

### "Vercel CLI not found"
```bash
npm install -g vercel
```

### "Project not linked"
```bash
vercel link
# Follow prompts to link to your Vercel project
```

### "No Redis credentials in Vercel"
1. Go to Vercel Dashboard → Your Project
2. Click "Storage" → Create KV Database (if not created)
3. Click "Connect to Project"
4. Run `vercel env pull .env.local` again

---

## Quick Commands

```bash
# Link project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run dev server
npm run dev
```

---

Your app should now work locally! 🎉

