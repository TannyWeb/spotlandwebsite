# Spotland Community Centre - Project Structure

```
spotland-v2/
├── .cursorrules              # AI assistant development guidelines
├── .gitignore               # Git ignore patterns
├── env.example              # Environment variables template
├── README.md                # Main project documentation
├── SETUP.md                 # Quick setup guide
├── PROJECT_STRUCTURE.md     # This file
│
├── astro.config.mjs         # Astro configuration (SSR enabled)
├── tailwind.config.mjs      # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
│
├── public/                  # Static assets
│   └── favicon.svg          # Site favicon (teal with friendly face)
│
└── src/
    ├── env.d.ts            # TypeScript environment declarations
    ├── middleware.ts        # Payload CMS initialization middleware
    ├── payload.config.ts    # Payload CMS configuration
    │
    ├── collections/         # Payload CMS Collections
    │   └── Services.ts      # Community services content type
    │                        # Fields: title, slug, category, description,
    │                        #         schedule, callToAction, featured
    │
    ├── globals/             # Payload CMS Globals
    │   └── Navigation.ts    # Site navigation and footer configuration
    │
    ├── layouts/             # Reusable page layouts
    │   └── MainLayout.astro # Main layout with header, footer, SEO
    │                        # Implements WCAG AA accessibility standards
    │                        # Teal color scheme (#26a1ab)
    │
    └── pages/               # File-based routing (Astro)
        ├── index.astro      # Homepage
        │                    # - Hero section
        │                    # - Featured services
        │                    # - All services grid
        │                    # - Call to action
        │
        ├── 404.astro        # Custom 404 error page
        │                    # Friendly "lost neighbour" messaging
        │
        ├── admin/
        │   └── [...slug].astro  # Payload CMS admin panel
        │                        # Accessible at /admin
        │
        └── services/
            └── [slug].astro     # Dynamic service detail pages
                                 # - Breadcrumb navigation
                                 # - Service details with schedule
                                 # - Rich text description
                                 # - Call to action with phone number
```

## Key Features

### 🎨 Design System
- **Primary Color**: Teal (#26a1ab) for CTAs and accents
- **High Contrast**: Meets WCAG AA standards (4.5:1 ratio)
- **Responsive**: Mobile-first design with Tailwind CSS
- **Typography**: System font stack for performance

### ♿ Accessibility
- Semantic HTML throughout
- Skip to main content link
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus indicators

### 📝 Content Management
- **Services Collection**: Full CRUD for community services
- **Navigation Global**: Centralized menu management
- **Rich Text Editor**: Lexical editor for formatted content
- **Auto-slug Generation**: URLs created automatically from titles

### 🚀 Performance
- Astro SSR for optimal performance
- SQLite database (lightweight, no external dependencies)
- Static asset optimization
- Minimal JavaScript (only where needed)

### 🎯 Service-First Architecture
Every feature is organized around community services:
- Services are the primary content type
- Categories: Advice, Health, Youth, Education
- Featured service highlighting on homepage
- Individual service pages with detailed information

### 💬 Friendly Neighbour Tone
All UI text uses warm, welcoming language:
- "We'd love to hear from you!" instead of "Contact us"
- "Give us a ring" instead of "Call now"
- "Let's find the right service for you" instead of "Select category"
- Error pages with empathetic messaging

## Development Guidelines

See `.cursorrules` for comprehensive development guidelines including:
- Code style and standards
- Tone of voice guidelines
- Accessibility requirements
- Best practices
- File organization patterns

## Getting Started

See `SETUP.md` for step-by-step instructions on:
1. Setting up environment variables
2. Starting the development server
3. Creating your first admin user
4. Adding services
5. Configuring navigation

For more details, see the main `README.md`.

