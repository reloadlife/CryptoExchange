# Crypto Exchange Frontend

A modern crypto exchange frontend built with Next.js 15 and React 19.

## Features

- Server-side rendering with Next.js App Router
- Modern React 19 features
- TypeScript for type safety
- Shared components from workspace packages
- Responsive design

## Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

Build for production:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## Project Structure

```
apps/web/
├── src/
│   └── app/              # Next.js App Router
│       ├── layout.tsx    # Root layout
│       └── page.tsx      # Home page
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Dependencies

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with new features
- **TypeScript**: Type safety
- **@crypto-exchange/shared**: Shared workspace utilities
