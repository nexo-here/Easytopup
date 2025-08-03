# EasyTopUp - Free Fire Diamond Top-Up Service

## Overview

EasyTopUp is a Bengali-language web application designed to provide Free Fire diamond top-up services for Bangladeshi users. The platform features a category-based navigation system allowing users to browse different types of top-ups including diamonds, subscriptions, and special offers. The application uses AG TOPUP standardized pricing and supports local payment methods including bKash, Nagad, and Rocket.

## Recent Changes (January 2025)

- **AG TOPUP Integration**: Integrated standardized diamond packages with accurate Bangladeshi Taka pricing
- **Category System**: Implemented category-based navigation with 7 main categories (Weekly Monthly, Level Up Pass, UID BD/Indonesia, Evo Access, Unipin Code, Lite Offer)
- **Pricing Structure**: Updated all packages to match AG TOPUP standards (25 Diamond - ৳23 to 5060 Diamond - ৳3120)
- **API Endpoints**: Created comprehensive backend API for package management and order processing
- **Package Management**: Added structured package data with validation and JSON export functionality

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React-based frontend with the following key architectural decisions:

- **Framework**: React 18 with TypeScript for type safety and better developer experience
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with a custom dark theme and support for Bengali fonts (Noto Sans Bengali)
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui component library
- **State Management**: TanStack Query for server state management and React Context for authentication
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
The backend follows a minimal Express.js setup with the following design:

- **Server Framework**: Express.js with TypeScript
- **Development Setup**: Custom Vite integration for seamless full-stack development
- **API Design**: RESTful endpoints with minimal server-side logic (most functionality handled client-side with Firebase)
- **Storage Interface**: Abstract storage interface with in-memory implementation for development

### Authentication System
The application implements Firebase Authentication with Google OAuth:

- **Provider**: Google Sign-In for user authentication
- **Session Management**: Firebase handles authentication state and tokens
- **User Data**: User profiles stored in Firestore with automatic creation on first login

### Data Storage
The application uses Firebase Firestore for data persistence:

- **User Data**: Stores user profiles, preferences, and metadata
- **Order Management**: Tracks diamond purchase orders with status updates
- **Schema Validation**: Zod schemas for type-safe data validation across client and server

### Database Design
While Drizzle ORM is configured for PostgreSQL, the current implementation primarily uses Firebase Firestore. The PostgreSQL setup suggests future migration plans:

- **ORM**: Drizzle ORM configured for PostgreSQL with Neon Database
- **Migrations**: Database migrations stored in dedicated migrations folder
- **Schema**: Shared schema definitions using Zod for consistency

### Internationalization
The application is specifically designed for Bengali-speaking users:

- **Language**: Primary interface in Bengali with English fallbacks
- **Typography**: Custom font loading for Bengali text (Noto Sans Bengali)
- **Cultural Adaptation**: Pricing in Bangladeshi Taka, local payment method references

### Component Architecture
The UI follows a modular component structure:

- **Page Components**: Route-level components for different application screens
- **Feature Components**: Business logic components (diamond packages, payment, user dashboard)
- **UI Components**: Reusable primitive components from Radix UI
- **Shared Components**: Header, footer, and layout components

### Development Architecture
The project uses a monorepo structure with shared code:

- **Shared Folder**: Common types, schemas, and utilities
- **Client Folder**: React frontend application
- **Server Folder**: Express.js backend application
- **Build Process**: Separate build processes for client and server with unified deployment

## External Dependencies

### Authentication & Database
- **Firebase**: Complete authentication and database solution
  - Firebase Auth for Google OAuth integration
  - Firestore for document-based data storage
  - Firebase SDK for client-side operations

### Database (Future Migration)
- **Neon Database**: Serverless PostgreSQL database for future data migration
- **Drizzle ORM**: Type-safe database operations and migrations
- **PostgreSQL**: Relational database for structured data storage

### UI Framework & Styling
- **Radix UI**: Headless UI primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library based on Radix UI

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the entire application
- **TanStack Query**: Data fetching and caching library
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema definition

### Fonts & Typography
- **Google Fonts**: Bengali font loading (Noto Sans Bengali, Inter)
- **Custom CSS**: Typography system supporting Bengali text rendering

### Payment Integration (Planned)
The application is structured to support local Bangladeshi payment providers, though specific integrations are not yet implemented in the current codebase.