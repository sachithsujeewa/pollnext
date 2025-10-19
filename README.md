# ASK AKD - Next.js Application

A modern question and answer platform built with Next.js, designed for the NPP Adelaide community.

> **✅ PRODUCTION READY:** This app uses **Redis (Vercel KV)** for persistent data storage. All questions and members are permanently stored. See `REDIS_SETUP.md` for details.

## Features

- 📝 Ask questions and get community engagement
- 👍 Like/unlike questions
- 📊 Real-time question updates
- 👥 Member registration
- 💾 Redis (Vercel KV) persistent storage
- 🚀 Optimized for Vercel deployment
- ✅ Production-ready data persistence

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Redis (Vercel KV) - Persistent storage
- **Deployment**: Vercel (Free Tier)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ASKAKD2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables for local development:
```bash
# Pull Redis credentials from Vercel
vercel env pull .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** For local development, you need Redis credentials. See `REDIS_SETUP.md` for details.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── question/     # Question API endpoints
│   │   └── member/       # Member API endpoints
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page component
│   └── globals.css       # Global styles
├── lib/
│   ├── csvHelper.ts      # Redis operations for questions
│   └── memberHelper.ts   # Redis operations for members
├── types/
│   └── index.ts          # TypeScript type definitions
├── public/
│   └── images/           # Static images
└── package.json
```

## Deploying to Vercel (FREE)

### Method 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial Next.js migration"
   git push origin main
   ```

2. **Sign up/Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

3. **Import Project**:
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

4. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Set Up Redis Storage**:
   - In Vercel Dashboard → Storage → Create Database → KV
   - Connect to your project
   - Environment variables are automatically configured
   - See `REDIS_SETUP.md` for detailed instructions

6. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: askakd (or your choice)
   - Directory: ./
   - Override settings: No

5. **Production deployment**:
   ```bash
   vercel --prod
   ```

## Important Notes for Vercel Deployment

### Data Persistence ✅

**Redis (Vercel KV) Storage:**
- ✅ Data persists permanently across deployments
- ✅ Data survives serverless function restarts
- ✅ Production-ready persistent storage
- ✅ Fast sub-millisecond response times

**Free Tier Includes:**
- 256 MB Redis storage
- Perfect for thousands of questions
- Automatic scaling
- No credit card required

See `REDIS_SETUP.md` for complete setup instructions.

## Environment Variables

The following environment variables are **automatically configured** by Vercel when you connect Redis:

- `KV_REST_API_URL` - Redis endpoint
- `KV_REST_API_TOKEN` - Authentication token

For local development, pull these from Vercel:
```bash
vercel env pull .env.local
```

## Local Development

The app uses Redis for storage. To run locally:

1. **Pull environment variables from Vercel:**
```bash
vercel env pull .env.local
```

2. **Run development server:**
```bash
npm run dev
```

Data is stored in Vercel KV (Redis):
- Questions stored in Redis key: `questions`
- Members stored in Redis key: `members`

See `REDIS_SETUP.md` for troubleshooting local development.

## Building for Production

```bash
npm run build
npm start
```

## Features Breakdown

### Question Management
- Create new questions
- View all questions in real-time
- Like/unlike questions (stored in localStorage)
- Auto-refresh every 2 seconds

### Member Registration
- Register new members
- Form validation
- Success feedback

### UI/UX
- Responsive design (mobile & desktop)
- Material-inspired icons
- Smooth animations
- Brand colors (#c3094a)

## Customization

### Change Brand Color
Edit the color values in:
- `app/page.tsx` - Replace `#c3094a` with your color
- `tailwind.config.ts` - Add to theme colors

### Update Images
Replace images in `public/images/`:
- `malimawa.webp` - Logo
- `icons8-facebook.svg` - Social icon
- `header.jpg` - Footer image

### Modify Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Inline in `app/page.tsx`

## Cost Breakdown

✅ **100% FREE on Vercel:**
- Hosting: Free
- Bandwidth: 100 GB/month
- Serverless Functions: 100 GB-hours
- Build Minutes: 6000 minutes/month

Perfect for small to medium traffic applications!

## Support

For issues or questions:
- Create an issue in the repository
- Contact: NPP Adelaide

## License

MIT License - Feel free to use for your community!

---

Built with ❤️ for NPP Adelaide

