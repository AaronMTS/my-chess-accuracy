# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` (or `npm run dev`, `yarn dev`, `bun dev`)
- **Build for production**: `pnpm build`
- **Start production server**: `pnpm start`
- **Lint code**: `pnpm lint` (uses ESLint with Next.js config)
- **Run development server on specific port**: `pnpm dev --port 3001`

## Project Architecture

This is a Next.js 16.2.3 application using the App Router structure with TypeScript and Tailwind CSS v4.

### Key Directories
- **app/**: Main application routes using Next.js App Router
  - `app/page.tsx`: Home page
  - `app/layout.tsx`: Root layout
  - `app/analyze/[username]/page.tsx`: User analysis pages (dynamic route)
- **components/**: Reusable UI components organized by feature
  - `buttons/`: Button variants (CtaButton, SecondaryButton)
  - `navbar/`: Navigation components
  - `sidebar/`: Sidebar navigation
  - `rivals/`: Opponent analysis components
  - `accuracy/`: Game accuracy visualization components
- **store/**: State management (likely Zustand or similar based on file presence)
- **types/**: TypeScript type definitions
- **util/**: Utility functions and helpers
- **assets/**: Static images and media
- **public/**: Static assets served at root URL

### Technology Stack
- **Framework**: Next.js 16.2.3 (React 19.2.4)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Data Tables**: @tanstack/react-table
- **Type Safety**: TypeScript v5
- **Linting**: ESLint with Next.js configuration

### Important Files
- `app/globals.css`: Global CSS styles and Tailwind directives
- `app/fonts.ts`: Custom font configuration using next/font
- `next.config.ts`: Next.js configuration
- `eslint.config.mjs`: ESLint configuration
- `tsconfig.json`: TypeScript configuration

## Development Guidelines
- Follow existing component patterns in the components/ directory
- Use Tailwind utility classes for styling (consistent with existing code)
- Leverage Next.js 16 features like route groups and server components where appropriate
- Maintain type safety with TypeScript - define types in the types/ directory
- Keep components small and focused; extract reusable logic to util/
- Use motion for animations as demonstrated in existing components