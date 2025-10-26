# Brev.ly - URL Shortener Frontend

A modern, responsive URL shortener web application built with React, TypeScript, and Vite. This is the frontend client for the Brev.ly URL shortening service.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Names**: Create custom short URLs with personalized names
- **Link Management**: View, copy, and delete your shortened links
- **Visit Tracking**: Monitor click counts for each shortened link
- **Real-time Updates**: Automatic refresh of link list after operations
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Loading States**: Visual feedback with spinners during operations
- **Error Handling**: Graceful error handling and user notifications
- **Smart Redirects**: Automatic redirection with visit counting
- **Copy to Clipboard**: Easy sharing with one-click copy functionality

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router DOM v7** - Client-side routing
- **TanStack Query v5** - Server state management
- **Axios** - HTTP client for API requests
- **Tailwind CSS v3** - Utility-first CSS framework
- **Tailwind Variants** - Component variant management
- **Lucide React** - Modern icon library
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
src/
├── components/
│   ├── Button.tsx        # Reusable button component with variants
│   ├── IconButton.tsx    # Icon-based button component
│   └── Input.tsx         # Form input component with validation
├── pages/
│   ├── Home.tsx          # Main page with URL shortening form and links table
│   ├── Redirect.tsx      # Handles short URL redirects with visit counting
│   └── NotFound.tsx      # 404 error page with responsive images
├── services/
│   └── apiService.ts     # API service functions
├── lib/
│   └── axios.ts          # Axios configuration with environment variables
├── App.tsx               # Main app component with routing
├── main.tsx              # Application entry point with QueryClient setup
├── index.css             # Global styles with Tailwind imports
└── App.css               # Component-specific styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Backend API server running (see backend repository)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd brev-ly-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3333
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 API Integration

The application integrates with a backend API through the following services defined in [`apiService.ts`](src/services/apiService.ts):

- `createShortLink(url, customName?)` - Create a new short link with optional custom name
- `getLinks()` - Fetch all user's links with visit counts
- `deleteLink(code)` - Delete a specific link by code
- `getLinkByCode(code)` - Get link details by short code for redirects
- `incrementVisitCount(code)` - Increment visit counter for analytics

### API Response Format

```typescript
interface ShortLink {
  id: string
  code: string
  original_url: string
  custom_name?: string
  created_at: string
  access_count?: number
}
```

## 🎨 User Interface Components

### Reusable Components

#### Button Component ([`Button.tsx`](src/components/Button.tsx))
- Multiple variants: `primary`, `secondary`, `tertiary`
- Loading states with spinner
- Disabled states with visual feedback
- Built with Tailwind Variants for consistent styling

#### Input Component ([`Input.tsx`](src/components/Input.tsx))
- Form validation states
- Accessible labels
- Error handling with visual feedback
- Consistent styling across the application

#### IconButton Component ([`IconButton.tsx`](src/components/IconButton.tsx))
- Icon-based actions (copy, delete)
- Danger variant for destructive actions
- Loading states for async operations

### Page Components

#### Home Page ([`Home.tsx`](src/pages/Home.tsx))
- URL input form with validation
- Optional custom name input
- Responsive layout (side-by-side on desktop, stacked on mobile)
- Interactive links table with:
  - Short URL display with click-to-visit functionality
  - Original URL truncation for long URLs
  - Visit count tracking
  - Copy-to-clipboard functionality
  - Delete confirmation with loading states

#### Redirect Page ([`Redirect.tsx`](src/pages/Redirect.tsx))
- Automatic redirection to original URLs
- Visit count increment before redirect
- Loading state with responsive images
- Error handling for invalid short codes
- Protocol detection and correction

#### NotFound Page ([`NotFound.tsx`](src/pages/NotFound.tsx))
- Responsive design with different images for mobile/desktop
- Clean error messaging
- Consistent branding

## 🔄 State Management

The application uses TanStack Query for comprehensive server state management:

- **Caching**: Intelligent caching of API responses
- **Background Updates**: Automatic refetching of stale data
- **Optimistic Updates**: UI updates before API confirmation
- **Error Handling**: Built-in error states and retry logic
- **Loading States**: Granular loading indicators
- **Query Invalidation**: Automatic data refresh after mutations

### Query Keys Structure
```typescript
['links'] // All user links
['redirectLink', shortUrl] // Individual link for redirection
```

## 🎯 Environment Configuration

The application requires two environment variables:

- `VITE_FRONTEND_URL` - The URL where the frontend is hosted (used for generating working links)
- `VITE_BACKEND_URL` - The URL of the backend API server

These are configured in the [axios configuration](src/lib/axios.ts) and used throughout the application.

## 📱 Responsive Design

Built with Tailwind CSS for a mobile-first approach:

### Design System
- **Colors**: Custom brand colors defined in [`tailwind.config.js`](tailwind.config.js)
  - Brand: `#2C46B1` (base), `#2C4091` (dark)
  - Danger: `#B12C4D`
  - Gray scale: 6 shades from `#F9F9FB` to `#1F2025`
- **Typography**: Open Sans font family with custom font sizes
- **Components**: Responsive table layout, mobile-friendly forms, adaptive button sizes

### Responsive Features
- Conditional layout switching (side-by-side vs stacked)
- Table scrolling on mobile devices
- Responsive images for different screen sizes
- Touch-friendly interactive elements

## 🔧 Development Setup (Vite + React + TypeScript)

This project uses a modern development setup with:

### TypeScript Configuration
- **App Config** ([`tsconfig.app.json`](tsconfig.app.json)): React app configuration
- **Node Config** ([`tsconfig.node.json`](tsconfig.node.json)): Vite configuration
- **Root Config** ([`tsconfig.json`](tsconfig.json)): Project references

### ESLint Configuration ([`eslint.config.js`](eslint.config.js))
- TypeScript ESLint rules
- React Hooks plugin
- React Refresh plugin for HMR
- Modern ESLint flat config format

### Vite Configuration ([`vite.config.ts`](vite.config.ts))
- React plugin for JSX support
- Fast HMR (Hot Module Replacement)
- Optimized build process

### PostCSS Configuration ([`postcss.config.js`](postcss.config.js))
- Tailwind CSS processing
- Autoprefixer for browser compatibility

## 🚀 Deployment

The application is configured for easy deployment:

1. **Build**: `npm run build` creates an optimized production build
2. **Preview**: `npm run preview` allows local testing of the production build
3. **Static Hosting**: Built files can be deployed to any static hosting service

## 🔍 Key Features Explained

### Custom Short URLs
Users can create personalized short URLs by providing a custom name, making links more memorable and brandable.

### Visit Analytics
Every click on a shortened link increments a visit counter, providing basic analytics for link performance.

### Smart Protocol Handling
The application automatically adds `https://` protocol to URLs that don't specify one, ensuring proper redirection.

### Optimistic UI Updates
The interface immediately updates when users perform actions, providing instant feedback while API requests process in the background.

## 📄 License

This project is part of a learning exercise and is intended for educational purposes.

## 🤝 Contributing

This is a personal learning project, but suggestions and improvements are welcome! Feel free to:

- Report bugs or issues
- Suggest new features
- Improve documentation
- Optimize performance

## 🔗 Related Projects

This frontend application works in conjunction with a backend API service. Make sure to set up the backend server and configure the appropriate environment variables for full functionality.