# Deployment Checklist

## Pre-Deployment Checklist

- [ ] All code is committed to Git
- [ ] Repository is pushed to GitHub
- [ ] Images are in `public/images/` directory
- [ ] Package.json dependencies are correct
- [ ] Local development works (`npm run dev`)
- [ ] Build succeeds locally (`npm run build`)

## Vercel Account Setup

- [ ] Created Vercel account at [vercel.com](https://vercel.com)
- [ ] Connected GitHub account to Vercel
- [ ] Authorized Vercel to access repositories

## Deployment Steps

- [ ] Imported project in Vercel Dashboard
- [ ] Verified Next.js framework auto-detection
- [ ] Kept default build settings
- [ ] Clicked "Deploy" button
- [ ] Waited for deployment to complete
- [ ] Received deployment URL

## Post-Deployment Verification

- [ ] Website loads at Vercel URL
- [ ] Navigation bar displays correctly
- [ ] Logo and images load
- [ ] Can type a question
- [ ] Can submit a question
- [ ] Questions display in list
- [ ] Can like/unlike questions
- [ ] Like count updates
- [ ] Join tab works
- [ ] Member registration works
- [ ] Footer displays correctly

## Optional Enhancements

- [ ] Add custom domain
- [ ] Set up Vercel Postgres for data persistence
- [ ] Configure analytics
- [ ] Set up monitoring
- [ ] Add SEO metadata

## Known Limitations (Current Version)

⚠️ **File-based storage limitations:**
- Data resets on each deployment
- Data lost after ~5 minutes of inactivity (Vercel serverless)
- Recommended: Upgrade to database for production use

## Next Steps After Deployment

1. Share your live URL with users
2. Monitor traffic in Vercel Dashboard
3. Consider adding a database if you need data persistence
4. Customize branding and colors as needed

---

✅ **All items checked?** You're ready to go live!

