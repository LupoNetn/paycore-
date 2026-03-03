# Paycore+ Frontend Implementation

The frontend has been built as a high-performance Next.js application that maps 1:1 with the Paycore backend engine.

## 🏗️ Technical Architecture

- **Framework**: Next.js 15 (App Router)
- **Styling**: Vanilla CSS with modern Glassmorphism (Variables in `globals.css`)
- **State Management**: React Context (`AuthProvider`)
- **Icons**: Lucide React
- **Integration**: Dedicated API client (`lib/api.ts`)

## 🛠️ Feature Mapping

| Frontend Feature          | Backend API                     | Description                                            |
| :------------------------ | :------------------------------ | :----------------------------------------------------- |
| **User Onboarding**       | `POST /auth/signup`             | Secure registration with user details.                 |
| **Secure Authentication** | `POST /auth/login`              | JWT-based authentication with local persistent state.  |
| **Wallet Overview**       | `GET /wallets/:id`              | Real-time balance display and currency management.     |
| **Atomic Transfers**      | `POST /transfer/`               | Wallet-to-wallet transfers with UUID idempotency keys. |
| **Ledger History**        | `GET /wallets/:id/transactions` | Full paginated record of all debits and credits.       |

## 🌟 Premium Design System

The app utilizes a custom design system defined in `globals.css`:

- **Gradients**: Indigo to Cyan for branding; Error/Success for financial indicators.
- **Glassmorphism**: 12px blur with 3% opacity backgrounds and 6% opacity borders.
- **Micro-animations**: Smooth transitions (0.4s) for all interactions and page loads.

## 🚀 Getting Started

1.  Ensure the backend is running at `http://localhost:8080`.
2.  Install frontend dependencies: `npm install`
3.  Start the dev server: `npm run dev`
4.  Navigate to `http://localhost:3000`.
