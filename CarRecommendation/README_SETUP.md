# Frontend setup notes

Before these components will work, run in your existing Vite project:

    npx shadcn@latest add card button input select toggle-group textarea skeleton badge

Then drop these files into your project:
- src/App.jsx           (replace existing)
- src/api.js
- src/components/IntakeForm.jsx
- src/components/CarCard.jsx
- src/components/ChatUI.jsx

Copy .env.local.example to .env.local and keep VITE_API_URL pointed at your
local backend (http://localhost:8000) during development. When you deploy to
Vercel, set VITE_API_URL as an environment variable in the Vercel dashboard
to your Railway backend URL instead.
