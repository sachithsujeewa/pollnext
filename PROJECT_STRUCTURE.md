# 📁 Project Structure

## Visual Overview

```
ASKAKD2/
│
├── 📄 START_HERE.md                    ⭐ Read this first!
├── 📄 QUICKSTART.md                    ⭐ 5-minute deployment guide
├── 📄 README.md                        📚 Complete documentation
├── 📄 DEPLOYMENT_GUIDE.md              🚀 Detailed deployment steps
├── 📄 MIGRATION_SUMMARY.md             📊 Technical migration info
├── 📄 CHECKLIST.md                     ✅ Deployment checklist
│
├── 📦 package.json                     📦 Dependencies & scripts
├── 📦 tsconfig.json                    🔧 TypeScript config
├── 📦 next.config.mjs                  ⚙️ Next.js config
├── 📦 tailwind.config.ts               🎨 Tailwind CSS config
├── 📦 postcss.config.mjs               🔧 PostCSS config
├── 📦 vercel.json                      ☁️ Vercel deployment config
├── 📦 .eslintrc.json                   📝 Linting rules
├── 📦 .nvmrc                            🔢 Node version
│
├── 📁 app/                              🎯 Main Application
│   ├── 📄 layout.tsx                    📐 Root layout
│   ├── 📄 page.tsx                      🏠 Homepage (main UI)
│   ├── 📄 globals.css                   🎨 Global styles
│   │
│   └── 📁 api/                          🔌 API Routes (Backend)
│       ├── 📁 question/
│       │   └── 📄 route.ts              📝 Questions API (GET, POST, PUT)
│       └── 📁 member/
│           └── 📄 route.ts              👥 Members API (POST)
│
├── 📁 lib/                              🛠️ Utility Functions
│   ├── 📄 csvHelper.ts                  💾 Question storage logic
│   └── 📄 memberHelper.ts               💾 Member storage logic
│
├── 📁 types/                            📘 TypeScript Types
│   └── 📄 index.ts                      📝 Type definitions
│
├── 📁 public/                           🌐 Static Assets
│   └── 📁 images/
│       ├── 🖼️ malimawa.webp             (Logo)
│       ├── 🖼️ icons8-facebook.svg       (Social icon)
│       └── 🖼️ header.jpg                (Footer image)
│
└── 📁 data/                             💾 Data Storage
    ├── 📄 questions.csv                 📊 Questions database
    └── 📄 members.json                  📊 Members database
```

---

## File Purposes

### Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `START_HERE.md` | Starting point | First time setup |
| `QUICKSTART.md` | Fast deployment | Want to deploy quickly |
| `README.md` | Full documentation | Comprehensive info |
| `DEPLOYMENT_GUIDE.md` | Detailed deployment | Step-by-step help |
| `MIGRATION_SUMMARY.md` | Technical details | Understand changes |
| `CHECKLIST.md` | Verification | Check deployment |
| `PROJECT_STRUCTURE.md` | This file | Understand structure |

### Configuration Files

| File | Purpose | Edit? |
|------|---------|-------|
| `package.json` | Dependencies | ⚠️ Rarely |
| `tsconfig.json` | TypeScript setup | ⚠️ Rarely |
| `next.config.mjs` | Next.js settings | ⚠️ Advanced |
| `tailwind.config.ts` | Styling config | ✅ For customization |
| `vercel.json` | Deployment config | ⚠️ Usually no need |

### Application Files

| File | Purpose | Edit? |
|------|---------|-------|
| `app/page.tsx` | Main UI | ✅ Yes (your UI) |
| `app/layout.tsx` | App wrapper | ⚠️ Rarely |
| `app/globals.css` | Global styles | ✅ For styling |
| `app/api/question/route.ts` | Questions API | ✅ For features |
| `app/api/member/route.ts` | Members API | ✅ For features |

### Library Files

| File | Purpose | Edit? |
|------|---------|-------|
| `lib/csvHelper.ts` | Question storage | ⚠️ If changing storage |
| `lib/memberHelper.ts` | Member storage | ⚠️ If changing storage |
| `types/index.ts` | Type definitions | ✅ When adding fields |

---

## Data Flow

### 1. User Asks a Question

```
User Types Question
    ↓
app/page.tsx (Client Component)
    ↓ POST /api/question
app/api/question/route.ts
    ↓
lib/csvHelper.ts
    ↓
data/questions.csv
```

### 2. User Likes a Question

```
User Clicks Like
    ↓
app/page.tsx (Client Component)
    ↓ PUT /api/question
app/api/question/route.ts
    ↓
lib/csvHelper.ts
    ↓
data/questions.csv (updated)
```

### 3. User Registers

```
User Fills Form
    ↓
app/page.tsx (Client Component)
    ↓ POST /api/member
app/api/member/route.ts
    ↓
lib/memberHelper.ts
    ↓
data/members.json
```

---

## Component Hierarchy

```
app/layout.tsx (Root)
    │
    └── app/page.tsx (Home Page)
            │
            ├── Navigation Bar
            │   ├── Logo (Image)
            │   ├── Title
            │   └── Facebook Link (Image)
            │
            ├── Tab Navigation
            │   ├── "Ask Questions" Tab
            │   └── "Join" Tab
            │
            ├── Questions Tab Content
            │   ├── Question Input (Textarea)
            │   ├── Send Button
            │   └── Questions List
            │       └── Question Card
            │           ├── Question Text
            │           └── Like Button + Count
            │
            ├── Join Tab Content
            │   ├── Name Input
            │   ├── Mobile Input
            │   └── Send Button
            │
            ├── Header Image
            └── Footer
```

---

## API Routes

### `/api/question`

**GET** - Fetch all questions
```
Request: None
Response: Question[]
```

**POST** - Create new question
```
Request: { questionText: string }
Response: Question[]
```

**PUT** - Like/Unlike question
```
Request: { id: string, noOfLikes: 0|1 }
Response: Question[] (sorted by likes)
```

### `/api/member`

**POST** - Register new member
```
Request: { name: string, mobile: string }
Response: { success: true }
```

---

## Data Models

### Question
```typescript
{
  id: string              // UUID
  questionText: string    // Question content
  noOfLikes: number       // Like count
}
```

### Member
```typescript
{
  id: number             // Auto-increment
  name: string           // Member name
  mobile: string         // Phone number
}
```

---

## Build & Deploy Process

### Local Development
```
npm run dev
    ↓
Next.js Dev Server
    ↓
http://localhost:3000
```

### Production Build
```
npm run build
    ↓
Next.js Compiler
    ↓
.next/ directory (optimized)
    ↓
npm start
    ↓
http://localhost:3000 (production mode)
```

### Vercel Deployment
```
git push
    ↓
Vercel detects push
    ↓
Runs: npm install
    ↓
Runs: npm run build
    ↓
Deploys to CDN
    ↓
Live at: https://your-app.vercel.app
```

---

## Key Directories

### `/app`
- **Purpose**: Application code (Next.js App Router)
- **Contains**: Pages, layouts, API routes
- **Edit**: Yes, this is your main code

### `/lib`
- **Purpose**: Utility functions and helpers
- **Contains**: Business logic, data operations
- **Edit**: Yes, when adding features

### `/types`
- **Purpose**: TypeScript type definitions
- **Contains**: Interfaces and types
- **Edit**: Yes, when adding data fields

### `/public`
- **Purpose**: Static files served as-is
- **Contains**: Images, fonts, static assets
- **Edit**: Yes, add/replace images here

### `/data`
- **Purpose**: File-based database
- **Contains**: CSV and JSON data files
- **Edit**: No (automatically managed)

### `/angularapp` & `/webapi`
- **Purpose**: Original Angular/.NET code (backup)
- **Contains**: Your old application
- **Edit**: No (preserved for rollback)

---

## Scripts

```json
"dev"     → Start development server (localhost:3000)
"build"   → Build for production
"start"   → Run production server
"lint"    → Check code quality
```

### Usage
```bash
npm run dev      # Local development
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Check for issues
```

---

## Environment

### Node.js Version
- Minimum: 18.17.0
- Recommended: 18.17.0 or higher

### Package Manager
- npm (default)
- yarn (alternative)
- pnpm (alternative)

---

## Next Steps

1. **Understand structure**: ✅ You're reading this!
2. **Test locally**: Run `npm run dev`
3. **Deploy**: Follow `QUICKSTART.md`
4. **Customize**: Edit colors, images, text
5. **Add features**: Modify code in `/app`

---

**Questions?** Check the other documentation files listed at the top!

