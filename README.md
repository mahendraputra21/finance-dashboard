# Finance Dashboard 💰

A modern, full-featured finance management dashboard built with Next.js 15, TailwindCSS, and Turborepo. Track your income, expenses, and manage your financial data with a beautiful, responsive interface.

![Finance Dashboard](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)
![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat-square)

## ✨ Features

### 📊 Dashboard Overview
- **Real-time Statistics**: View total income, expenses, and current balance
- **Bar Chart Visualization**: Interactive chart showing income vs expenses
- **Date Range Filtering**: Filter data by custom date ranges
- **Recent Transactions**: Quick view of your latest 5 transactions

### 💳 Transaction Management
- **Add Transactions**: Easy-to-use form with type toggle (Income/Expense)
- **Category-based Organization**: Categorize transactions for better tracking
- **Transaction History**: Paginated list with advanced filtering
- **CSV Export**: Download your transaction history

### 👥 User Management (Admin Only)
- **User Overview**: View all registered users
- **Role Management**: Assign Admin or User roles
- **Status Tracking**: Monitor user status (Active/Inactive/Pending)
- **Search & Filter**: Find users quickly

### 🏷️ Category Management (Admin Only)
- **Income Categories**: Salary, Freelance, Investment, Gifts, Rental
- **Expense Categories**: Groceries, Shopping, Utilities, Entertainment, Dining, Transport
- **Visual Organization**: Color-coded categories with icons
- **Easy Management**: Add, edit, or delete categories

### 🔐 Authentication
- **Login**: Secure user authentication
- **Sign Up**: Quick registration with role selection
- **Session Management**: Persistent login with Zustand

### 🌐 Internationalization (i18n)
- **Bilingual Support**: Full English and Indonesian translations
- **URL-based Locale**: `/en/` for English, `/id/` for Indonesian
- **Consistent Translation**: All UI elements translated

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **Persistent Storage** - LocalStorage integration

### UI Components & Charts
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **Custom Components** - Reusable UI components

### Monorepo & Build Tools
- **[Turborepo](https://turbo.build/)** - High-performance build system
- **[PNPM](https://pnpm.io/)** - Fast, disk space efficient package manager

### Internationalization
- **[next-intl](https://next-intl-docs.vercel.app/)** - i18n for Next.js

## 📁 Project Structure

```
dashboard-finance-ai/
├── apps/
│   └── web/                          # Next.js application
│       ├── app/
│       │   ├── [locale]/             # Internationalized routes
│       │   │   ├── login/            # Login page
│       │   │   ├── signup/           # Sign up page
│       │   │   └── dashboard/        # Protected dashboard routes
│       │   │       ├── page.tsx      # Dashboard overview
│       │   │       ├── categories/   # Category management (Admin)
│       │   │       ├── users/        # User management (Admin)
│       │   │       └── transactions/ # Transaction pages
│       │   │           ├── new/      # Add transaction
│       │   │           └── page.tsx  # Transaction history
│       │   └── globals.css           # Global styles
│       ├── components/
│       │   ├── ui/                   # Reusable UI components
│       │   ├── layout/               # Layout components
│       │   └── dashboard/            # Dashboard-specific components
│       ├── stores/                   # Zustand state stores
│       ├── i18n/                     # Internationalization
│       ├── lib/                      # Utilities & helpers
│       └── middleware.ts             # Next.js middleware
├── packages/
│   ├── types/                        # Shared TypeScript types
│   └── config/                       # Shared configuration
├── turbo.json                        # Turborepo configuration
├── pnpm-workspace.yaml               # PNPM workspace config
└── package.json                      # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **PNPM** 8.x or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahendraputra21/finance-dashboard.git
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Default redirects to `/en/login`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📱 Pages & Routes

### Public Routes
- `/en/login` - Login page (English)
- `/id/login` - Login page (Indonesian)
- `/en/signup` - Sign up page (English)
- `/id/signup` - Sign up page (Indonesian)

### Protected Routes (Requires Authentication)
- `/en/dashboard` - Dashboard overview
- `/en/dashboard/transactions/new` - Add new transaction
- `/en/dashboard/transactions` - Transaction history

### Admin Routes (Requires Admin Role)
- `/en/dashboard/categories` - Manage categories
- `/en/dashboard/users` - User management

## 🎨 Design System

### Colors
- **Primary**: `#4F46E5` (Indigo) - Buttons, links, active states
- **Success**: `#10B981` (Green) - Income, positive indicators
- **Danger**: `#EF4444` (Red) - Expenses, negative indicators
- **Gray Scale**: Various shades for UI elements

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, various sizes
- **Body**: Regular, 14-16px

### Components
- **Cards**: White background, shadow, rounded corners
- **Buttons**: Primary, secondary, ghost variants
- **Inputs**: Labeled, error states, icon support
- **Badges**: Status indicators, category tags

## 🔑 Default Test Account

For development and testing:

```
Email: any@email.com
Password: any password
Role: Select Admin or User during signup
```

*Note: Currently using mock authentication. All credentials will work.*

## 📊 Mock Data

The application includes comprehensive mock data:

- **5 Income Categories**: Salary, Freelance, Investment, Gifts, Rental
- **6 Expense Categories**: Groceries, Shopping, Utilities, Entertainment, Dining, Transport
- **Sample Transactions**: Pre-populated with realistic transaction data
- **5 Mock Users**: With different roles and statuses

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication with JWT
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User settings & profile page
- [ ] Budget tracking & alerts
- [ ] Recurring transactions
- [ ] Advanced reporting & analytics
- [ ] Mobile app (React Native)
- [ ] Dark mode
- [ ] Email notifications
- [ ] Multi-currency support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mahendra Putra**
- GitHub: [@mahendraputra21](https://github.com/mahendraputra21)

## 🙏 Acknowledgments

- Design inspiration from modern finance apps
- Built with ❤️ using Next.js and TailwindCSS
- Charts powered by Recharts
- Icons by Lucide

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
