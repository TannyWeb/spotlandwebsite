# Quick Reference

## 🚀 Starting the Project

```bash
# Start everything (Astro + Payload Admin)
npm run dev:all

# Or start separately:
npm run dev           # Astro site → http://localhost:4321
npm run dev:payload   # Payload admin → http://localhost:3000/admin
```

## 🔗 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Public Site** | http://localhost:4321 | Your community centre website |
| **Admin Panel** | http://localhost:3000/admin | Content management (CMS) |
| **API** | http://localhost:3000/api | Payload CMS API |

## 📁 Key Files

```
src/
├── collections/Services.ts      # Service content type definition
├── globals/Navigation.ts        # Navigation & footer config
├── layouts/MainLayout.astro     # Site layout & header/footer
├── pages/index.astro           # Homepage
└── pages/services/[slug].astro # Service detail pages

Configuration:
├── .env                        # Environment variables (SECRET!)
├── .cursorrules               # AI development guidelines
├── payload.config.ts          # CMS configuration
└── astro.config.mjs          # Astro configuration
```

## ✏️ Common Tasks

### Add a Service
1. Go to http://localhost:3000/admin
2. Click "Services" → "Create New"
3. Fill in details and save
4. View at http://localhost:4321

### Edit Navigation
1. Go to http://localhost:3000/admin
2. Click "Globals" → "Navigation"
3. Edit menu items or footer
4. Save

### Add Admin User
1. Go to http://localhost:3000/admin
2. Click "Users" → "Create New"
3. Enter email, password, name
4. Save

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Primary Color** | Teal #26a1ab |
| **Font** | System UI fonts |
| **Spacing** | Tailwind scale (4px base) |
| **Accessibility** | WCAG AA (4.5:1 contrast) |

## 🔧 Troubleshooting

### Admin panel not loading
```bash
# Make sure Payload server is running
npm run dev:payload

# Visit http://localhost:3000/admin (NOT 4321)
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 4321
lsof -ti:4321 | xargs kill -9
```

### Database locked
```bash
# Stop all servers (Ctrl+C)
# Delete database and restart
rm local.db*
npm run dev:payload
```

### Changes not appearing
```bash
# Hard refresh browser: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
# Or restart dev server
```

## 📚 More Help

- **[SETUP.md](./SETUP.md)** - Step-by-step setup guide
- **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Detailed admin panel guide
- **[README.md](./README.md)** - Full project documentation
- **[.cursorrules](./.cursorrules)** - Development guidelines

## 💡 Pro Tips

1. **Use `npm run dev:all`** to run everything at once
2. **Keep admin panel open** in one tab for quick edits
3. **Use "Featured" checkbox** to highlight services on homepage
4. **Auto-slug generation** - just type title, slug is created automatically
5. **Rich text editor** - Use formatting buttons for bold, lists, links
6. **Save often** - Changes are instant on the frontend!

## 🎯 Tone of Voice

Remember: **Friendly Neighbour**
- ✅ "We'd love to hear from you!"
- ✅ "Give us a ring"
- ✅ "Let's find the right service"
- ❌ "Contact us"
- ❌ "Call now"
- ❌ "Select category"

Always write as if talking to a friendly neighbour! 😊

