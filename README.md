# ASK AKD - Next.js Application

A modern question and answer platform built with Next.js, designed for the NPP Adelaide community.

## Features

- 📝 Ask questions and get community engagement
- 👍 Like/unlike questions
- 📊 Real-time question updates
- 👥 Member registration
- 💾 File-based storage (no database required)
- 🚀 Optimized for Vercel deployment

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: CSV files for questions, JSON for members
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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   ├── csvHelper.ts      # CSV file operations for questions
│   └── memberHelper.ts   # JSON file operations for members
├── types/
│   └── index.ts          # TypeScript type definitions
├── public/
│   └── images/           # Static images
├── data/                 # Data storage (auto-created)
│   ├── questions.csv     # Questions data
│   └── members.json      # Members data
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
   - No environment variables needed!

5. **Deploy**:
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

### Data Persistence

⚠️ **Important**: Vercel's free tier uses serverless functions, which are stateless. This means:

- **Data stored in CSV/JSON files will NOT persist between deployments**
- Files written at runtime are stored in `/tmp` and cleared after function execution

### Recommended Solutions:

1. **For Production Use** - Migrate to a database:
   - **Vercel Postgres** (Free tier: 256MB, 60 hours/month)
   - **MongoDB Atlas** (Free tier: 512MB)
   - **Supabase** (Free tier with PostgreSQL)

2. **For Testing/Demo** - Current setup works, but:
   - Data resets on each deployment
   - Use it for temporary/demo purposes

### To Add Vercel Postgres (Recommended):

1. In Vercel Dashboard, go to your project
2. Click "Storage" → "Create Database" → "Postgres"
3. Follow the setup wizard
4. Update your code to use the database instead of CSV files

## Environment Variables

No environment variables are required for the basic setup. If you add a database later, you'll need to configure connection strings.

## Local Development

The app works perfectly in local development with file-based storage:

```bash
npm run dev
```

Data will be stored in the `./data` directory:
- `questions.csv` - All questions
- `members.json` - All registered members

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

