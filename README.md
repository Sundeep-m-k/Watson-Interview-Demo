# Watson Tech Talent Micro-Internship Portal

A clean, responsive full-stack demo app for connecting university sponsors with students for micro-internship projects.

## Project info

**URL**: https://lovable.dev/projects/85459f73-43cf-47f3-80fe-76450892ddb5

## 🎓 About

The Watson Micro-Intern Portal helps sponsors post short-term project opportunities and allows students to discover meaningful work experiences that build real-world skills.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **Data Persistence**: localStorage (demo mode)
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives

## ✨ Features

- 🏠 **Landing Page**: University-branded hero with feature highlights
- 📝 **Project Submission**: Form with validation for sponsors to post projects
- 📋 **Live Project List**: Real-time display of all submitted projects
- 💾 **localStorage Persistence**: Data persists across browser sessions
- 📱 **Responsive Design**: Mobile-first, works on all screen sizes
- 🎨 **Custom Design System**: University blue color palette with semantic tokens
- ♿ **Accessible**: Built with WCAG guidelines in mind

## 🏃‍♂️ Running Locally

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

Open your browser to `http://localhost:8080`

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── Navigation.tsx   # Main navigation bar
├── pages/
│   ├── Index.tsx        # Landing page
│   ├── Projects.tsx     # Projects submission & list
│   └── NotFound.tsx     # 404 page
├── hooks/
│   └── use-toast.ts     # Toast notifications
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app with routing
├── main.tsx             # App entry point
└── index.css            # Global styles & design tokens
```

## 🎨 Design System

The app uses a university-themed color palette defined in `src/index.css`:

- **Primary**: Deep university blue (`hsl(215, 85%, 25%)`)
- **Accent**: Bright blue (`hsl(210, 100%, 50%)`)
- **Secondary**: Light blue backgrounds
- **Semantic tokens** for consistent theming

All colors use HSL format for better color manipulation and dark mode support.

## 💾 Data Storage

Currently uses **localStorage** for demo purposes. Data structure:

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  skills: string;
  deadline: string;
  createdAt: string;
}
```

### Migrating to a Real Backend

To connect to a real database:

1. **PostgreSQL + Prisma**:
   - Add Prisma ORM
   - Create schema in `prisma/schema.prisma`
   - Replace localStorage calls with Prisma client

2. **Supabase / Lovable Cloud**:
   - Enable Lovable Cloud
   - Create projects table
   - Replace localStorage with Supabase client

3. **Express API**:
   - Create `/api/projects` endpoints
   - Replace localStorage with API calls

## 🚀 Deployment

Simply open [Lovable](https://lovable.dev/projects/85459f73-43cf-47f3-80fe-76450892ddb5) and click on Share -> Publish.

### Custom Domain

You can connect a custom domain! Navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🔄 Converting to Next.js

To migrate this React app to Next.js 14+ App Router:

1. Move `src/pages/*.tsx` → `app/**/page.tsx`
2. Convert `Navigation.tsx` to use Next.js `<Link>`
3. Replace localStorage with Server Actions or API routes
4. Move form logic to Server Actions
5. Use Next.js built-in metadata for SEO

## 📝 Future Enhancements

- [ ] User authentication for sponsors and students
- [ ] Application system for students
- [ ] Project status tracking (open/in-progress/completed)
- [ ] Student profiles and portfolios
- [ ] Search and filter projects
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] File uploads for project materials

## 📄 License

MIT License - feel free to use this template for your own projects!

---

Built with ❤️ using Lovable, React, and Tailwind CSS
