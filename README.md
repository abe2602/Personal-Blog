# Personal Blog

A modern, feature-rich personal blog application built with React, TypeScript, and Vite. This project follows Clean Architecture principles with a clear separation of concerns between presentation, domain, and data layers.

## 🚀 Features

- **Blog Posts**: Browse and view blog posts fetched from JSONPlaceholder API
- **Search Functionality**: Real-time search through blog post titles
- **Multiple Pages**: 
  - Home page with posts listing
  - Individual post pages
  - Favorites page
  - Gallery page
  - Thoughts page
- **State Management**: Zustand for client-side state management
- **Data Persistence**: Session storage for posts and scroll position
- **Scroll Restoration**: Maintains scroll position on navigation
- **Error Handling**: Comprehensive error handling throughout the application
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

### Core
- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 7.1** - Build tool and dev server

### State Management & Data Fetching
- **Zustand 5.0** - Lightweight state management
- **React Query (TanStack Query) 5.90** - Server state management and caching
- **Axios 1.13** - HTTP client

### Routing & Dependency Injection
- **React Router DOM 7.9** - Client-side routing
- **Awilix 12.0** - Dependency injection container

### UI & Icons
- **React Icons 5.5** - Icon library

## 📁 Project Structure

```
src/
├── data/                    # Data layer
│   ├── model/              # Remote data models
│   ├── posts/              # Posts repository
│   └── RestApi.tsx         # API client configuration
├── di/                     # Dependency injection
│   └── DiModule.tsx        # DI container setup
├── domain/                 # Domain layer
│   └── model/             # Domain models
├── presentation/           # Presentation layer
│   ├── components/        # Reusable components
│   │   ├── navbar/        # Navigation bar
│   │   ├── PostContent.tsx
│   │   ├── SearchInput.tsx
│   │   └── SideMenu.tsx
│   └── pages/             # Page components
│       ├── favorites/     # Favorites page
│       ├── gallery/       # Gallery page
│       ├── home/          # Home page with controller and store
│       ├── post/          # Individual post page
│       └── thoughts/      # Thoughts page
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## 🏗️ Architecture

This project follows **Clean Architecture** principles:

1. **Presentation Layer** (`presentation/`): React components, controllers, and UI logic
2. **Domain Layer** (`domain/`): Business logic and domain models
3. **Data Layer** (`data/`): API clients, repositories, and data models

### Dependency Injection

The project uses **Awilix** for dependency injection, allowing for:
- Loose coupling between layers
- Easy testing and mocking
- Better maintainability

### State Management

- **Zustand**: Used for client-side state (posts, loading states, search terms, scroll position)
- **React Query**: Handles server state, caching, and data synchronization
- **Session Storage**: Persists posts and scroll position across page refreshes

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-blog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📡 API Integration

The application uses **JSONPlaceholder** API as the data source:
- Base URL: `https://jsonplaceholder.typicode.com/posts`
- Endpoints:
  - `GET /posts` - Fetch all posts
  - `GET /posts/:id` - Fetch individual post

## 🎨 Features in Detail

### Home Page
- Displays list of blog posts
- Real-time search filtering
- Loading states and error handling
- Scroll position restoration
- Posts cached in session storage

### Post Page
- Individual post view
- Dynamic routing with post ID

### Search Functionality
- Case-insensitive search
- Filters posts by title in real-time
- Search term persisted in state

### State Persistence
- Posts are stored in session storage
- Scroll position is saved and restored
- Search terms are maintained during navigation

## 🔧 Configuration

### React Query Configuration

The application is configured with:
- Stale time: 5 minutes
- No automatic refetching on window focus, reconnect, or mount
- Retry: 1 attempt
- Manual scroll restoration

### API Client

Configured in `src/data/RestApi.tsx`:
- Base URL: JSONPlaceholder API
- Timeout: 5 minutes
- JSON content type headers

## 📝 Development Notes

- The project uses **SWC** for fast compilation
- TypeScript strict mode enabled
- ESLint configured for code quality
- Manual scroll restoration to prevent unwanted scroll jumps

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

Private project - All rights reserved

---

Built with ❤️ using React, TypeScript, and Vite
