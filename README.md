# Edashlytic Frontend

> **Angular 9 Dashboard for Daraz Marketplace Sellers**

A comprehensive web application providing analytics, order management, inventory tracking, and financial reporting for e-commerce sellers on the Daraz platform.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 12.x or higher
- Angular CLI 9.1.10

### Install & Run
```bash
npm install
npm start
# App runs on http://localhost:4200
```

📄 **Detailed Setup:** [docs/SETUP.md](docs/SETUP.md)

---

## 📚 Documentation

### Quick Links
- 📖 [**Setup & Installation**](docs/SETUP.md) - Get started quickly
- 🏗️ [**Architecture**](docs/ARCHITECTURE.md) - Design patterns & structure
- 🧩 [**Modules**](docs/MODULES.md) - Deep dive into each module
- 🔧 [**Services**](docs/SERVICES.md) - API services & business logic
- 🔌 [**API Integration**](docs/API_INTEGRATION.md) - Backend communication
- 💻 [**Development**](docs/DEVELOPMENT.md) - Dev workflow & guidelines
- 🚢 [**Deployment**](docs/DEPLOYMENT.md) - Build & deploy instructions

### For AI Agents
📄 [**Root AGENT.md**](../AGENT.md) - AI-optimized navigation guide

---

## 🎯 What's Inside

### Key Features
- 📊 **Analytics Dashboard** - Real-time sales stats, charts, store comparison
- 📦 **Order Management** - Track, filter, label printing, RTS handling
- 🛍️ **Inventory** - SKU tracking, cost management, Daraz sync
- 💰 **Finance** - Transaction history, statements, revenue tracking
- 💳 **Billing** - Subscription management, payment processing
- 👥 **Users** - Multi-user accounts, permissions, shop management

### Tech Stack
- **Framework:** Angular 9.1.9 + TypeScript 3.8.3
- **UI:** Bootstrap 4.5, Angular Material 11.1.1
- **Charts:** ApexCharts, Chart.js, ngx-echarts
- **Tables:** ngx-datatable with virtual scrolling
- **Auth:** JWT (@auth0/angular-jwt)
- **State:** RxJS 6.6.0

---

## 📁 Project Structure

```
DarazFrontend/
├── README.md              # This file
├── docs/                  # Detailed documentation
│   ├── SETUP.md
│   ├── ARCHITECTURE.md
│   ├── MODULES.md
│   ├── SERVICES.md
│   ├── API_INTEGRATION.md
│   ├── DEVELOPMENT.md
│   └── DEPLOYMENT.md
├── src/
│   ├── app/
│   │   ├── analytics/     # Dashboard & stats
│   │   ├── orders/        # Order management
│   │   ├── product/       # SKU & inventory
│   │   ├── finance/       # Financial reports
│   │   ├── billing/       # Subscriptions
│   │   ├── users/         # User management
│   │   ├── core/          # Auth & login
│   │   ├── pricing/       # Plans display
│   │   ├── services/      # 18+ API services
│   │   ├── guards/        # 4 route guards
│   │   └── shared/        # Reusable components
│   ├── assets/            # Images, styles, i18n
│   └── environments/      # Config files
├── angular.json
├── package.json
└── Dockerfile
```

---

## 🧩 Major Modules

| Module | Purpose | Components | Route |
|--------|---------|------------|-------|
| **Analytics** | Dashboard & charts | 5 components | `/` |
| **Orders** | Order management | 7+ components | `/orders` |
| **Product** | SKU & inventory | 7 components | `/products` |
| **Finance** | Transactions | 2 components | `/finance` |
| **Billing** | Subscriptions | 5 components | `/billing` |
| **Users** | User management | 5 components | `/users` |
| **Core** | Auth & login | 4 components | `/login` |
| **Pricing** | Plans display | 1 component | `/pricing` |

📄 **Full module documentation:** [docs/MODULES.md](docs/MODULES.md)

---

## 🔧 Key Services

| Service | Purpose | Endpoint |
|---------|---------|----------|
| **AuthService** | Login, JWT, user info | `/api/auth` |
| **OrdersService** | Order operations | `/api/orders` |
| **OrderItemsService** | Order items & stats | `/api/orderitems` |
| **ShopService** | Shop management | `/api/shop` |
| **SkusService** | Local SKU CRUD | `/api/skus` |
| **DarazskuService** | Daraz SKU sync | `/api/darazskus` |
| **TransactionsService** | Financial data | `/api/transactions` |
| **BillingService** | Payments | `/api/billings` |

All services extend `DataService` for consistent HTTP operations with JWT injection.

📄 **Service documentation:** [docs/SERVICES.md](docs/SERVICES.md)

---

## 🔐 Security

### Route Guards
- **LoginGuard** - Requires authentication
- **AdminGuard** - Admin-only routes
- **PermissionGuard** - Feature permissions
- **SubscriptionGuard** - Active subscription required

### Authentication Flow
```
Login → JWT Token → localStorage → Auto-injection in Headers → Guards validate routes
```

Token stored as: `localStorage['auth-token']`  
Token expiry: 24 hours

---

## 🛠️ Development

### Commands
```bash
# Start dev server
npm start

# Generate components/services
ng generate component my-component
ng generate service my-service

# Run tests
npm test

# Lint
npm run lint

# Build
npm run build
```

### API Configuration
Default API URL (dev mode): `http://localhost:3000/api/`

Change in `src/app/services/data.service.ts`:
```typescript
private baseUrl = isDevMode() 
  ? "http://your-api:port/api/" 
  : "api/";
```

📄 **Dev workflow:** [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)

---

## 🚢 Deployment

### Production Build
```bash
npm run build
# Output: dist/darazapi/
```

### Docker
```bash
docker build -t edashlytic-frontend .
docker run -p 80:80 edashlytic-frontend
```

📄 **Full deployment guide:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 📊 Statistics

- **9 Feature Modules** (lazy loaded)
- **50+ Components**
- **18+ Services**
- **4 Route Guards**
- **60+ npm Dependencies**
- **TypeScript** throughout
- **Responsive Design** (Bootstrap grid)

---

## 🐛 Common Issues

**Port in use:** `ng serve --port 4201`  
**Module errors:** `rm -rf node_modules && npm install`  
**API errors:** Check backend is running on port 3000  
**Build errors:** `npm run build -- --aot=false`

📄 **Troubleshooting:** [docs/DEVELOPMENT.md#troubleshooting](docs/DEVELOPMENT.md#troubleshooting)

---

## 📝 Learn More

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Guide](https://rxjs.dev/guide/overview)
- [Bootstrap Documentation](https://getbootstrap.com/docs/4.5/)

---

## License

Copyright © 2024 Edashlytic. All rights reserved.
