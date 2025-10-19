# ASK AKD - Next.js Application

A modern question and answer platform built with Next.js, designed for the NPP Adelaide community.

## Features

- 📝 Ask questions and get community engagement
- 👍 Like/unlike questions
- 📊 Real-time question updates
- 👥 Member registration
- 💾 Redis Cloud persistent storage
- 🚀 Optimized for Vercel deployment
- 👨‍💼 Admin panel for managing questions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Redis Cloud (using ioredis)
- **Deployment**: Vercel (Free Tier)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Redis Cloud account (or any Redis instance)

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd ASKAKD2
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file:
```env
REDIS_URL=your_redis_connection_url_here
```

4. **Run development server:**
```bash
npm run dev
```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Add Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

- **Name:** `REDIS_URL`
- **Value:** Your Redis connection URL
- **Environments:** Production, Preview, Development

### Step 4: Deploy

Click "Deploy" and wait for the build to complete (~2-3 minutes)

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── question/          # Question CRUD endpoints
│   │   ├── member/            # Member registration
│   │   └── admin/             # Admin operations
│   ├── admin/                 # Admin dashboard
│   ├── page.tsx               # Main page
│   └── layout.tsx             # Root layout
├── lib/
│   ├── csvHelper.ts           # Question operations with Redis
│   └── memberHelper.ts        # Member operations with Redis
├── types/
│   └── index.ts               # TypeScript definitions
└── public/
    └── images/                # Static assets
```

## Environment Variables

### Required:

- `REDIS_URL` - Your Redis connection string

**Format:**
```
redis://username:password@host:port
```

**Example:**
```
redis://default:password123@redis-12345.cloud.redislabs.com:12345
```

## Features

### Public Interface
- View all questions sorted by likes
- Add new questions
- Like/unlike questions (tracked in localStorage)
- Register as a member
- Auto-refresh every 2 seconds

### Admin Panel
- Access at `/admin`
- Default password: `admin123` (change in `app/admin/page.tsx`)
- Features:
  - View all questions
  - Edit question text
  - Delete questions
  - Update like counts
  - Export questions to CSV
  - Import questions from CSV

## Redis Data Structure

### Questions (Key: `questions`)
```json
[
  {
    "id": "uuid",
    "questionText": "What is the question?",
    "noOfLikes": 5
  }
]
```

### Members (Key: `members`)
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

## Customization

### Change Admin Password

Edit `app/admin/page.tsx`:
```typescript
const ADMIN_PASSWORD = 'your_new_password';
```

### Change Brand Colors

Edit colors in `app/page.tsx` and `app/admin/page.tsx`:
```typescript
// Replace #c3094a with your color
style={{ borderColor: '#c3094a' }}
```

### Update Images

Replace files in `public/images/`:
- `malimawa.webp` - Logo
- `header.jpg` - Footer image
- `icons8-facebook.svg` - Social icon

## Building for Production

```bash
npm run build
npm start
```

## Common Issues

### Connection errors during build
- Normal if `REDIS_URL` is not set locally
- Build will succeed
- Production will work with environment variable set

### Questions not persisting
- Verify `REDIS_URL` is set in Vercel
- Check Redis instance is running
- Verify connection string format

### 500 errors in production
- Check Vercel logs: Deployments → Latest → Functions
- Verify environment variable is set
- Redeploy after adding environment variables

## Documentation

- **ADMIN_GUIDE.md** - Complete admin panel documentation
- **DEPLOYMENT_GUIDE.md** - Detailed deployment instructions

## Support

For issues or questions:
- Create an issue in the repository
- Contact: NPP Adelaide

## License

MIT License - Feel free to use for your community!

---

Built with ❤️ for NPP Adelaide
