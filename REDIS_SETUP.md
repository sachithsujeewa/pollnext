# ✅ Redis (Vercel KV) Integration

## Overview

The application now uses **Vercel KV (Redis)** for persistent data storage. Questions and members are stored in Redis, ensuring data persists across serverless function restarts and deployments.

## What Changed

### Before: In-Memory Storage
- Data stored in JavaScript variables
- Data lost on serverless function restart (~15 minutes of inactivity)
- Data reset on every deployment

### After: Redis Storage
- Data stored in Vercel KV (Redis)
- Data persists permanently
- Data survives function restarts and deployments
- ✅ Production-ready!

## Files Modified

1. **`lib/csvHelper.ts`** - Now uses Redis for questions storage
2. **`lib/memberHelper.ts`** - Now uses Redis for members storage
3. **`package.json`** - Added `@vercel/kv` dependency

## Environment Variables

The Vercel KV integration requires these environment variables (automatically set by Vercel):

- `KV_REST_API_URL` - Redis REST API endpoint
- `KV_REST_API_TOKEN` - Authentication token
- `KV_REST_API_READ_ONLY_TOKEN` - Read-only token (optional)

These are **automatically configured** when you create a Vercel KV database in your project.

## Setting Up Vercel KV

### 1. Create KV Database (If Not Already Done)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (ASKAKD2)
3. Click on **"Storage"** tab
4. Click **"Create Database"**
5. Select **"KV"** (Redis)
6. Choose a name (e.g., `askakd-redis`)
7. Click **"Create"**

### 2. Connect to Your Project

1. After creating the database, click **"Connect to Project"**
2. Select your project from the dropdown
3. Click **"Connect"**
4. Vercel automatically adds the environment variables

### 3. Deploy

The next deployment will automatically use the Redis database:

```bash
git add -A
git commit -m "Integrate Redis for persistent storage"
git push
```

Vercel will automatically deploy with Redis support!

## Local Development

For local development, you need to set up environment variables:

### Option 1: Pull from Vercel (Recommended)

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Pull environment variables from Vercel
vercel env pull .env.local
```

This creates a `.env.local` file with your KV credentials.

### Option 2: Manual Setup

Create a `.env.local` file in your project root:

```env
KV_REST_API_URL=your_redis_url_here
KV_REST_API_TOKEN=your_redis_token_here
```

Get these values from:
1. Vercel Dashboard → Your Project → Storage → Your KV Database
2. Click on the database
3. Click **".env.local"** tab
4. Copy the values

## Redis Data Structure

### Questions Key
- **Key:** `questions`
- **Type:** JSON array
- **Structure:**
  ```json
  [
    {
      "id": "uuid-here",
      "questionText": "What is the question?",
      "noOfLikes": 5
    }
  ]
  ```

### Members Key
- **Key:** `members`
- **Type:** JSON array
- **Structure:**
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "phone": "0412345678",
      "email": "john@example.com"
    }
  ]
  ```

## API Functions

### Questions (`lib/csvHelper.ts`)

```typescript
// Get all questions
const questions = await getQuestions();

// Add a new question
await addQuestion(question);

// Update a question (e.g., increment likes)
await updateQuestion(updatedQuestion);
```

### Members (`lib/memberHelper.ts`)

```typescript
// Get all members
const members = await getMembers();

// Add a new member
await addMember(member);
```

## Error Handling

All Redis operations include error handling:
- Errors are logged to console
- Failed reads return empty arrays
- Failed writes throw errors (caught by API routes)

## Verifying Redis is Working

### 1. Check Deployment Logs

1. Go to Vercel Dashboard → Your Project
2. Click on the latest deployment
3. Click **"Functions"** tab
4. Check for any Redis-related errors

### 2. Test the Application

1. Add a question
2. Wait 20+ minutes (let serverless function restart)
3. Refresh the page
4. ✅ Question should still be there!

### 3. Check Redis Data (Vercel Dashboard)

1. Go to Storage → Your KV Database
2. Click **"Data"** tab
3. You should see keys: `questions` and `members`
4. Click on them to view the stored data

## Troubleshooting

### Issue: "KV_REST_API_URL is not defined"

**Solution:**
1. Make sure KV database is connected to your project
2. Redeploy your application
3. Check environment variables in Vercel Dashboard → Settings → Environment Variables

### Issue: Questions still disappear

**Possible causes:**
1. **Redis not connected:** Check Vercel Dashboard → Storage → make sure database is connected
2. **Environment variables missing:** Check Settings → Environment Variables
3. **Old deployment:** Make sure latest code is deployed

### Issue: Local development not working

**Solution:**
1. Pull environment variables: `vercel env pull .env.local`
2. Make sure `.env.local` exists and has the Redis credentials
3. Restart your dev server: `npm run dev`

## Benefits

✅ **Persistent Storage** - Data survives function restarts and deployments
✅ **Fast** - Redis is extremely fast (sub-millisecond response times)
✅ **Scalable** - Can handle high traffic
✅ **Free Tier** - Vercel KV has a generous free tier (256 MB)
✅ **No Setup** - Vercel manages infrastructure
✅ **Production Ready** - Used by thousands of production apps

## Next Steps

Your application now has persistent storage! 🎉

**Optional enhancements:**
- Add Redis caching for frequently accessed data
- Implement data expiration (TTL) for temporary data
- Add Redis transactions for complex operations
- Monitor Redis usage in Vercel Dashboard

## Questions?

If you encounter any issues:
1. Check the Troubleshooting section above
2. Review Vercel KV logs in the dashboard
3. Check deployment logs for errors

---

**Your app now has permanent data storage with Redis!** 🚀

