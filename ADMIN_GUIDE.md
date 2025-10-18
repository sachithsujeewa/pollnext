# 🔐 Admin Panel Guide

## Overview

Your application now has a **secure admin panel** where you can manage questions in production.

## Access

**URL:** `https://pollnext.vercel.app/admin`

**Default Password:** `admin123`

> ⚠️ **IMPORTANT**: Change the password before going live! See "Changing Password" section below.

---

## Features

### 1. 📥 Download Questions (Export CSV)
- Click "📥 Download CSV" button
- Downloads all current questions as a CSV file
- Filename format: `questions-YYYY-MM-DD.csv`
- Use this to backup your data or edit offline

### 2. 📤 Upload Questions (Import CSV)
- Click "📤 Upload CSV" button
- Select a CSV file from your computer
- **Replaces all existing questions** with the uploaded ones
- CSV format:
  ```csv
  Id,QuestionText,NoOfLikes
  uuid-1,"Question text here",5
  uuid-2,"Another question",10
  ```

### 3. ✏️ Edit Individual Questions
- Click "Edit" button on any question
- Modify the question text
- Click "Save" to update
- Click "Cancel" to discard changes

### 4. 🗑️ Delete Questions
- Click "Delete" button on any question
- Confirms before deleting
- Permanently removes the question

### 5. 🔄 Refresh List
- Click "🔄 Refresh" to reload questions
- Useful to see latest data

---

## How to Use

### Workflow 1: Edit Questions Offline

1. **Download** current questions:
   - Go to `/admin`
   - Login with password
   - Click "📥 Download CSV"

2. **Edit** the CSV file:
   - Open in Excel, Google Sheets, or text editor
   - Modify question texts
   - Add/remove rows
   - Keep the header row: `Id,QuestionText,NoOfLikes`

3. **Upload** modified CSV:
   - Click "📤 Upload CSV"
   - Select your edited file
   - Confirms import

4. **Verify**:
   - Check the questions list
   - Main page updates automatically

### Workflow 2: Quick Edits

1. Login to `/admin`
2. Find the question you want to edit
3. Click "Edit"
4. Modify text
5. Click "Save"

### Workflow 3: Clean Up

1. Login to `/admin`
2. Find questions to remove
3. Click "Delete" on each
4. Confirm deletion

---

## CSV Format

### Valid CSV Structure:
```csv
Id,QuestionText,NoOfLikes
abc-123,"What is the meeting time?",5
def-456,"How do I join?",10
ghi-789,"Question with ""quotes"" inside",3
```

### Rules:
- **Header required**: `Id,QuestionText,NoOfLikes`
- **ID**: Any unique string (UUIDs recommended)
- **QuestionText**: Text (use `""` to escape quotes)
- **NoOfLikes**: Number (0 or positive integer)
- **Commas in text**: Wrap in quotes: `"Text, with comma"`
- **Quotes in text**: Double them: `"Text with ""quotes"""`

---

## Security

### Current Setup

- **Password Protection**: Simple password login
- **Default Password**: `admin123`
- **Session**: Login expires when you close the browser
- **Access**: Anyone with the URL and password can access

### Changing the Password

1. Open `app/admin/page.tsx`
2. Find line ~14:
   ```typescript
   const ADMIN_PASSWORD = 'admin123';
   ```
3. Change to your password:
   ```typescript
   const ADMIN_PASSWORD = 'your-secure-password-here';
   ```
4. Commit and push:
   ```bash
   git add app/admin/page.tsx
   git commit -m "Update admin password"
   git push
   ```
5. Vercel auto-deploys in ~1 minute

### Password Best Practices

✅ **DO:**
- Use a strong, unique password
- Mix letters, numbers, symbols
- At least 12 characters
- Keep it secret

❌ **DON'T:**
- Use common words
- Share the password
- Reuse from other sites
- Write it in public places

### Enhanced Security (Optional)

For production, consider:

1. **Environment Variables**:
   - Store password in Vercel environment variables
   - Use `process.env.ADMIN_PASSWORD`

2. **IP Restrictions**:
   - Limit admin access to your IP
   - Use Vercel Firewall rules

3. **2FA / OAuth**:
   - Integrate Google OAuth
   - Use NextAuth.js

---

## Troubleshooting

### "Incorrect password!"
- Check password is exactly `admin123` (or your custom one)
- Passwords are case-sensitive
- No extra spaces

### CSV Upload Fails
- Check CSV format matches example
- Ensure header row is present
- Check for special characters
- Try downloading current CSV as template

### Questions Not Updating
- Click "🔄 Refresh" button
- Check browser console for errors
- Verify you're logged in

### Lost Admin Password
1. Check `app/admin/page.tsx` for current password
2. Or reset it following "Changing Password" steps

---

## Data Persistence Warning

⚠️ **Remember**: Your app uses **in-memory storage**

- Questions exist only while the serverless function is active
- Data resets after ~5-15 minutes of inactivity
- **Download CSV regularly** to backup data!

### Backup Strategy:

1. **Before making changes**:
   - Download CSV backup
   
2. **After major updates**:
   - Download CSV backup
   
3. **Regular schedule**:
   - Download CSV weekly/daily

### For Permanent Storage:

See `VERCEL_FIX.md` for upgrading to Vercel Postgres.

---

## Example Workflows

### Scenario: Prepare Questions for Event

1. **Download** template
2. **Prepare** questions in Excel
3. **Upload** before event starts
4. **Monitor** questions during event
5. **Download** results after event
6. **Archive** CSV file

### Scenario: Fix Typo in Question

1. Login to `/admin`
2. Find the question
3. Click "Edit"
4. Fix typo
5. Click "Save"
6. Done! (Updates immediately)

### Scenario: Moderate Questions

1. Login to `/admin`
2. Review all questions
3. Delete inappropriate ones
4. Edit unclear ones
5. Download backup
6. Logout

---

## Quick Reference

| Action | Steps |
|--------|-------|
| Login | Go to `/admin` → Enter password |
| Download | Login → "📥 Download CSV" |
| Upload | Login → "📤 Upload CSV" → Select file |
| Edit | Login → Find question → "Edit" → Modify → "Save" |
| Delete | Login → Find question → "Delete" → Confirm |
| Logout | Click "Logout" (top right) |

---

## URLs

- **Main App**: `https://pollnext.vercel.app`
- **Admin Panel**: `https://pollnext.vercel.app/admin`
- **API Docs**: See `/api` folder for endpoints

---

## Support

Questions? Check:
- `README.md` - General app info
- `VERCEL_FIX.md` - Deployment info
- `DEPLOYMENT_GUIDE.md` - Setup guide

---

**Admin panel is ready!** 🎉

Visit `https://pollnext.vercel.app/admin` and login with `admin123`

