# Brev.ly - URL Shortener Frontend

A modern, responsive URL shortener web application built with React, TypeScript, and Vite. This is the frontend client for the Brev.ly URL shortening service.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Link Management**: View, copy, and delete your shortened links
- **Real-time Updates**: Automatic refresh of link list after operations
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Loading States**: Visual feedback with spinners during operations
- **Error Handling**: Graceful error handling and user notifications
- **404 Redirect**: Automatic redirection for invalid short URLs

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
src/
├── pages/
│   ├── Home.tsx          # Main page with URL shortening form and links table
│   ├── Redirect.tsx      # Handles short URL redirects
│   └── NotFound.tsx      # 404 error page
├── services/
│   └── apiService.ts     # API service functions
├── lib/
│   └── axios.ts          # Axios configuration
├── App.tsx               # Main app component with routing
└── main.tsx              # Application entry point
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
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 API Integration

The application integrates with a backend API through the following services defined in [`apiService.ts`](src/services/apiService.ts):

- `createShortLink(url)` - Create a new short link
- `getLinks()` - Fetch all user's links
- `deleteLink(id)` - Delete a specific link
- `getLinkByCode(code)` - Get link details by short code

## 🎨 User Interface

### Home Page ([`Home.tsx`](src/pages/Home.tsx))
- URL input form with validation
- Submit button with loading state
- Table displaying all shortened links
- Copy-to-clipboard functionality
- Delete links with confirmation

### Redirect Page ([`Redirect.tsx`](src/pages/Redirect.tsx))
- Automatic redirection to original URLs
- Loading state during redirect
- Error handling for invalid links

### 404 Page ([`NotFound.tsx`](src/pages/NotFound.tsx))
- Clean error page for invalid routes
- User-friendly error message

## 🔄 State Management

The application uses TanStack Query for server state management:

- **Caching**: Automatic caching of API responses
- **Background Updates**: Automatic refetching of data
- **Optimistic Updates**: UI updates before API confirmation
- **Error Handling**: Built-in error states and retry logic

## 🎯 Environment Configuration

The application requires two environment variables:

- `VITE_FRONTEND_URL` - The URL where the frontend is hosted
- `VITE_BACKEND_URL` - The URL of the backend API server

## 📱 Responsive Design

Built with Tailwind CSS for a mobile-first approach:
- Responsive table layout
- Mobile-friendly forms
- Adaptive button sizes
- Optimized for various screen sizes

## 🔧 Development Setup (Vite + React + TypeScript)

This project was bootstrapped with Vite and includes:

### React Fast Refresh

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### ESLint Configuration

For production applications, consider updating the ESLint configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // or tseslint.configs.strictTypeChecked for stricter rules
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## 📄 License

This project is part of a learning exercise and is intended for educational purposes.

## 🤝 Contributing

This is a personal learning project, but suggestions and improvements are welcome!