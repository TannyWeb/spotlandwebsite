# Spotland Community Centre Website

A professional, high-performance web platform for the Spotland Community Centre, built with modern web technologies and accessibility in mind.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) (Latest version)
- **CMS**: [Payload CMS 3.0](https://payloadcms.com/) (Integrated as middleware)
- **Database**: SQLite via Payload Drizzle adapter
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript (Strict mode)

## 🏗️ Architecture

This project follows a **Service-First Architecture**, organizing all features around community services. The structure includes:

```
src/
├── collections/       # Payload CMS content types
│   └── Services.ts    # Community services collection
├── globals/          # Payload CMS global settings
│   └── Navigation.ts # Site navigation configuration
├── layouts/          # Reusable page layouts
│   └── MainLayout.astro
├── pages/            # Astro pages (file-based routing)
│   ├── index.astro   # Homepage
│   └── services/
│       └── [slug].astro  # Dynamic service pages
├── middleware.ts     # Payload CMS initialization
└── payload.config.ts # Payload CMS configuration
```

## 🎨 Design System

- **Primary Color**: Teal (#26a1ab)
- **Accessibility**: WCAG AA compliant with high contrast ratios
- **Tone**: Friendly Neighbour - warm, welcoming, community-focused
- **Responsive**: Mobile-first design approach

## 📋 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git (optional)

### Installation

1. **Clone or navigate to the project directory**

```bash
cd spotland-v2
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and update the `PAYLOAD_SECRET` with a secure random string:

```env
PAYLOAD_SECRET=your-secure-secret-key-here
DATABASE_URL=file:./local.db
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:4321
```

4. **Start the servers**

```bash
# Run both Astro site and Payload admin (recommended)
npm run dev:all

# Or run them separately:
npm run dev           # Astro site only (http://localhost:4321)
npm run dev:payload   # Payload admin only (http://localhost:3000)
```

### First-Time Setup

1. Visit `http://localhost:3000/admin` to access the Payload CMS admin panel
2. Create your first admin user account
3. Start adding services and configuring navigation

**Note**: The admin panel runs on port 3000, while your public site runs on port 4321. See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for detailed admin instructions.

## 🧩 Available Scripts

- `npm run dev` - Start Astro development server (http://localhost:4321)
- `npm run dev:payload` - Start Payload admin server (http://localhost:3000)
- `npm run dev:all` - Start both servers together (recommended)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run payload:generate` - Generate TypeScript types from Payload config

## 📝 Content Management

### Services Collection

Each service includes:
- **Title**: A clear, friendly name
- **Slug**: Auto-generated URL-friendly identifier
- **Category**: Advice, Health, Youth, or Education
- **Description**: Rich text content with formatting
- **Schedule**: When the service is available
- **Call to Action**: Phone number and button text
- **Featured**: Toggle to highlight on homepage

### Navigation Global

Configure:
- **Header Menu**: Main navigation links
- **Footer**: Tagline and contact information

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Skip to main content link
- High contrast color scheme (4.5:1 minimum)
- Screen reader friendly

## 🎯 Best Practices

This project follows the guidelines in `.cursorrules`:
- Service-first architecture
- Friendly neighbour tone of voice
- WCAG AA accessibility standards
- TypeScript strict mode
- Mobile-first responsive design

## 📄 License

Copyright © 2025 Spotland Community Centre. All rights reserved.

## 🤝 Contributing

For development guidelines and coding standards, please refer to `.cursorrules` in the project root.

---

Built with ❤️ for the Spotland Community
