# Payload CMS Admin Panel Setup

## Quick Start

The Payload CMS admin panel runs on a separate server from your Astro site. Here's how to access it:

### Option 1: Run Payload Admin Server Only

```bash
npm run dev:payload
```

Then visit: **http://localhost:3000/admin**

Your Astro site will still be available at http://localhost:4321

### Option 2: Run Both Servers Together (Recommended)

```bash
npm run dev:all
```

This starts both:
- **Astro site**: http://localhost:4321
- **Payload Admin**: http://localhost:3000/admin

## First Time Setup

1. Make sure your `.env` file exists with a `PAYLOAD_SECRET`

2. Start the Payload admin server:
   ```bash
   npm run dev:payload
   ```

3. Open http://localhost:3000/admin in your browser

4. You'll see the Payload CMS login/setup screen

5. Create your first admin user:
   - **Email**: Your email address (for logging in)
   - **Password**: Choose a secure password
   - **Name**: Your display name

6. Click "Create First User" or "Register"

## How It Works

- **Payload Admin** (port 3000): Where you manage content (services, navigation, etc.)
- **Astro Site** (port 4321): Your public-facing website that fetches content from Payload

Both servers share the same SQLite database (`local.db`), so changes you make in the admin panel immediately appear on your Astro site!

## Common Tasks

### Adding a New Service

1. Go to http://localhost:3000/admin
2. Click "Services" in the sidebar
3. Click "Create New"
4. Fill in the service details
5. Click "Save" or "Publish"
6. Visit http://localhost:4321 to see it on your site

### Updating Navigation

1. Go to http://localhost:3000/admin
2. Click "Globals" → "Navigation"
3. Edit menu items or footer info
4. Click "Save"

### Managing Users

1. Go to http://localhost:3000/admin
2. Click "Users" in the sidebar
3. Add, edit, or remove admin users

## Troubleshooting

### Port 3000 already in use

If you get an error that port 3000 is in use:

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or edit payload-server.mjs and change PORT to 3001
```

### Can't access admin panel

Make sure:
- The Payload server is running (`npm run dev:payload`)
- You're visiting http://localhost:3000/admin (not 4321/admin)
- Your `.env` file exists with `PAYLOAD_SECRET` set

### Database errors

If you see database locked errors:
1. Stop all running servers (Ctrl+C)
2. Delete `local.db`, `local.db-shm`, `local.db-wal` if present
3. Restart: `npm run dev:payload`
4. Create a new admin user

## Production Deployment

For production, you'll want to:
1. Run Payload on a separate subdomain (e.g., admin.yoursite.com)
2. Or use environment variables to configure different URLs
3. Set proper authentication and security settings
4. Use a production database (PostgreSQL recommended)

See the main README.md for more deployment information.

