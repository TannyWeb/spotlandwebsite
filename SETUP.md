# Quick Setup Guide

Welcome to the Spotland Community Centre website! Here's how to get started in just a few minutes.

## Step 1: Create Your Environment File

You need to create a `.env` file with your configuration. Run this command:

```bash
cp env.example .env
```

Then edit the `.env` file and replace `your-secret-key-change-this-in-production` with a secure random string. You can generate one using:

```bash
openssl rand -base64 32
```

Or just use any long random string (at least 32 characters).

## Step 2: Start the Development Server

```bash
npm run dev
```

The site will start at `http://localhost:4321`

## Step 3: Start the Payload Admin Server

The admin panel runs on a separate server. Start it with:

```bash
npm run dev:payload
```

Or run both the Astro site and admin panel together:

```bash
npm run dev:all
```

## Step 4: Access the Admin Panel

1. Open your browser and go to: `http://localhost:3000/admin`
2. You'll be prompted to create your first admin user
3. Fill in your details:
   - Email (for login)
   - Password (make it secure!)
   - Name (your display name)

## Step 5: Add Your First Service

1. Once logged in, click on "Services" in the admin sidebar
2. Click "Create New"
3. Fill in the details:
   - **Title**: e.g., "Youth Drop-In Sessions"
   - **Slug**: Auto-generated, but you can customize it
   - **Category**: Choose from Advice, Health, Youth, or Education
   - **Description**: Tell people about the service (supports rich text formatting!)
   - **Schedule**: e.g., "Every Tuesday and Thursday, 3pm-6pm"
   - **Call to Action**: Add a phone number and button text
   - **Featured**: Check this to show on the homepage

4. Click "Save" or "Save and Publish"

## Step 6: Configure Navigation (Optional)

1. In the admin panel, go to "Globals" → "Navigation"
2. Add menu items for your header
3. Update footer contact information
4. Save your changes

## That's It!

Your setup is complete! You now have:
- **Astro site**: http://localhost:4321 (or use `npm run dev`)
- **Payload Admin**: http://localhost:3000/admin (use `npm run dev:payload`)
- **Both together**: `npm run dev:all`

Visit http://localhost:4321 to see your site live!

## Need Help?

- Check [ADMIN_SETUP.md](./ADMIN_SETUP.md) for detailed admin panel information
- See the main [README.md](./README.md) for project details
- Review [.cursorrules](./.cursorrules) for development guidelines
- The admin panel is intuitive – explore and experiment!

---

## Troubleshooting

### "Cannot find module 'payload'" error

Make sure you've installed all dependencies:

```bash
npm install
```

### Database locked error

If you see a database locked error, make sure you don't have multiple instances of the dev server running:

```bash
# Kill any existing processes
pkill -f "astro dev"
# Then restart
npm run dev
```

### Admin panel not accessible

Make sure you:
1. Started the Payload server: `npm run dev:payload`
2. Visit http://localhost:3000/admin (NOT 4321/admin)
3. Your `.env` file exists with a valid `PAYLOAD_SECRET`

### Port already in use

If port 4321 is busy, Astro will automatically try the next available port (4322, 4323, etc.). Check the terminal output for the actual URL.

