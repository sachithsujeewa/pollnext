# 🔍 Redis 500 Error Diagnostic Guide

## You're Getting: "Failed to load resource: 500"

This means the API route is crashing because **Redis environment variables are NOT set in Vercel**.

---

## ✅ STEP-BY-STEP FIX

### Step 1: Verify Redis Connection Status

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click your project** (ASKAKD2 or your project name)

3. **Click "Storage" tab** at the top

4. **Look at your KV database:**
   - ❌ If it says "Not Connected" → **YOU NEED TO CONNECT IT**
   - ✅ If it says "Connected to: [Project Name]" → Good, go to Step 2

### Step 2: Connect Redis (If Not Connected)

1. **Click on your KV database name** (in the Storage tab)

2. **You'll see the database dashboard**

3. **Look for one of these buttons:**
   - "Connect to Project"
   - "Connect Project" 
   - "Settings" → then look for "Connect"

4. **Click the button and:**
   - Select your project from dropdown
   - Click "Connect" or "Confirm"

5. **You should see a success message**

### Step 3: Verify Environment Variables Were Added

1. **Go to Settings** → **Environment Variables** (in your project)

2. **You MUST see these 3 variables:**
   - ✅ `KV_REST_API_URL`
   - ✅ `KV_REST_API_TOKEN`
   - ✅ `KV_REST_API_READ_ONLY_TOKEN`

3. **If they're MISSING:**
   - Redis is NOT connected properly
   - Go back to Step 2
   - Make sure you connected to the RIGHT project

### Step 4: Trigger a Redeploy

**Environment variables only work on NEW deployments!**

Run this in your terminal:

```bash
git commit --allow-empty -m "Redeploy with Redis credentials"
git push
```

**OR** in Vercel Dashboard:
1. Go to "Deployments" tab
2. Click "..." on the latest deployment
3. Click "Redeploy"

### Step 5: Wait and Test

1. **Wait 2-3 minutes** for deployment to complete

2. **Check deployment status:**
   - Vercel → Deployments → Should show "Ready" ✅

3. **Test your production URL:**
   - Try adding a question
   - Should work now! ✅

---

## 🚨 Common Issues

### Issue 1: "I don't see a Connect button"

**Possible reasons:**
- Already connected (check Storage tab shows "Connected")
- Looking in wrong place (must click INTO the database)
- Database not created yet (create it first)

**Solution:**
1. In Storage tab, click the database NAME (not just hover)
2. Look for "Connect", "Settings", or "Project" section
3. Some Vercel UIs say "Link to Project" instead

### Issue 2: "Variables show up but still 500 error"

**Solution:**
You need to **REDEPLOY** after connecting:
```bash
git commit --allow-empty -m "Redeploy"
git push
```

### Issue 3: "Connected to wrong project"

**Solution:**
1. Go to Storage → Database
2. Look for "Disconnect" or "Settings"
3. Disconnect from wrong project
4. Connect to correct project (ASKAKD2)

---

## 🔍 How to Check Deployment Logs

If still getting errors after all steps:

1. **Go to Vercel Dashboard** → Your Project

2. **Click "Deployments" tab**

3. **Click on the LATEST deployment** (top one)

4. **Click "Functions" tab**

5. **Click on any function** (like `api/question`)

6. **Look for error messages:**

   **If you see:**
   ```
   Error: KV_REST_API_URL is not defined
   ```
   → Redis is NOT connected. Go back to Step 1.

   **If you see:**
   ```
   Error connecting to Redis
   ```
   → Credentials might be wrong. Try disconnecting and reconnecting.

---

## 📋 Quick Checklist

Go through this in order:

- [ ] Go to Vercel Dashboard
- [ ] Open your project
- [ ] Click "Storage" tab
- [ ] Verify database shows "Connected to: [Your Project]"
- [ ] If NOT connected, click database → Connect to Project
- [ ] Go to Settings → Environment Variables
- [ ] Verify all 3 KV variables exist (KV_REST_API_URL, KV_REST_API_TOKEN, KV_REST_API_READ_ONLY_TOKEN)
- [ ] Run: `git commit --allow-empty -m "Redeploy" && git push`
- [ ] Wait 2-3 minutes for deployment
- [ ] Check Deployments tab shows "Ready"
- [ ] Test production URL
- [ ] Try adding a question
- [ ] ✅ Should work!

---

## 🎯 Visual Check

### In Storage Tab, You Should See:

```
┌─────────────────────────────────────────┐
│ KV Databases                            │
├─────────────────────────────────────────┤
│ 📦 your-database-name                   │
│ ✅ Connected to: ASKAKD2               │
│                                          │
│ [Click to view details]                 │
└─────────────────────────────────────────┘
```

### In Environment Variables, You Should See:

```
┌──────────────────────────────────────────────────────────────┐
│ Variable Name              │ Environments                     │
├────────────────────────────┼──────────────────────────────────┤
│ KV_REST_API_URL           │ Production, Preview, Development │
│ KV_REST_API_TOKEN         │ Production, Preview, Development │
│ KV_REST_API_READ_ONLY_... │ Production, Preview, Development │
└──────────────────────────────────────────────────────────────┘
```

---

## 💡 Key Points

1. **Creating database ≠ Connecting database**
   - Must explicitly connect to project

2. **Need to redeploy after connecting**
   - New env vars only apply to new deployments

3. **Check the right project**
   - Make sure connected to YOUR project

4. **Wait for deployment**
   - Don't test until "Ready" status

---

## 🆘 Still Not Working?

### Last Resort Checklist:

1. **Disconnect and reconnect Redis:**
   - Storage → Database → Disconnect
   - Then connect again to your project

2. **Check you're testing the right URL:**
   - Should be your-project.vercel.app
   - NOT a preview URL

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

4. **Check function logs in Vercel:**
   - Deployments → Latest → Functions → Look for errors

---

## 🎉 Success Indicators

You'll know it's fixed when:
- ✅ No 500 errors
- ✅ Questions load
- ✅ Can add questions
- ✅ Questions persist after refresh
- ✅ No errors in browser console

---

## Next Steps After Fix

Once working:
1. ✅ Your data is now persistent in Redis
2. ✅ Questions survive deployments
3. ✅ Production-ready!

---

**The fix is simple: Connect Redis → Redeploy → Test!** 🚀

