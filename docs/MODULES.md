# Frontend Modules

> **Detailed documentation of all feature modules in the Edashlytic Angular application**

---

## Table of Contents

- [Module Overview](#module-overview)
- [Analytics Module](#analytics-module)
- [Orders Module](#orders-module)
- [Product Module](#product-module)
- [Finance Module](#finance-module)
- [Billing Module](#billing-module)
- [Users Module](#users-module)
- [Core Module](#core-module)
- [Pricing Module](#pricing-module)
- [Shared Module](#shared-module)

---

## Module Overview

The application consists of **9 feature modules**, each responsible for specific business functionality:

| Module | Route | Components | Purpose |
|--------|-------|------------|---------|
| **Analytics** | `/` or `/dashboard` | 5 | Dashboard, stats, charts |
| **Orders** | `/orders` | 7+ | Order management, tracking |
| **Product** | `/products` | 7 | SKU management, inventory |
| **Finance** | `/finance` | 2 | Transactions, statements |
| **Billing** | `/billing` | 5 | Subscriptions, payments |
| **Users** | `/users` | 5 | User & shop management |
| **Core** | `/login` | 4 | Authentication, login |
| **Pricing** | `/pricing` | 1 | Plan comparison |
| **Shared** | N/A | Multiple | Reusable components |

All feature modules (except Shared) are **lazy-loaded** for optimal performance.

---

## Analytics Module

### Overview

The main dashboard providing real-time analytics, sales statistics, and business insights.

**Route:** `/` or `/dashboard`  
**Guards:** `LoginGuard`, `SubscriptionGuard`

### Components

#### 1. **AnalyticsComponent** (Main Dashboard)
- **Path:** `analytics/analytics.component.ts`
- **Purpose:** Main dashboard container
- **Features:**
  - Sales overview (revenue, orders, profit)
  - Date range selector
  - Shop comparison
  - Key metrics cards
  - Chart visualizations

**Template Structure:**
```html
<div class="dashboard-header">
  <date-range-picker></date-range-picker>
  <shop-selector></shop-selector>
</div>

<div class="metrics-row">
  <metric-card [title]="'Total Revenue'" [value]="revenue$ | async"></metric-card>
  <metric-card [title]="'Orders'" [value]="orders$ | async"></metric-card>
  <metric-card [title]="'Profit'" [value]="profit$ | async"></metric-card>
</div>

<div class="charts-row">
  <sales-chart [data]="salesData$ | async"></sales-chart>
  <orders-chart [data]="ordersData$ | async"></orders-chart>
</div>
```

#### 2. **StatsComponent**
- **Purpose:** Display aggregated statistics
- **Data Sources:**
  - `OrderItemsService.getStats()`
  - `TransactionsService.getSummary()`
- **Metrics:**
  - Total revenue
  - Order count
  - Average order value
  - Profit margin
  - Top products

#### 3. **ChartsComponent**
- **Purpose:** Render various chart types
- **Charts Used:**
  - **ApexCharts** - Line charts, area charts
  - **Chart.js** - Bar charts, pie charts
  - **ngx-echarts** - Complex visualizations

**Example Chart Configuration:**
```typescript
salesChartOptions: ApexOptions = {
  chart: { type: 'line', height: 350 },
  series: [{
    name: 'Sales',
    data: [] // populated from API
  }],
  xaxis: { categories: [] },
  yaxis: { title: { text: 'Revenue (PKR)' } }
};
```

#### 4. **StoreComparisonComponent**
- **Purpose:** Compare multiple shops side-by-side
- **Features:**
  - Multi-shop selection
  - Comparative metrics
  - Performance indicators
  - Trend analysis

#### 5. **TopProductsComponent**
- **Purpose:** Display best-selling products
- **Data:** Top 10 products by revenue/quantity
- **Visualization:** Table with sparklines

### Services Used

- `OrderItemsService` - Order statistics
- `OrdersService` - Order counts
- `TransactionsService` - Financial data
- `ShopService` - Shop information

### Key Features

- **Real-time Updates:** Auto-refresh every 5 minutes
- **Date Filtering:** Custom date ranges
- **Shop Comparison:** Multi-shop analytics
- **Export:** Download reports as CSV/PDF
- **Responsive:** Mobile-optimized dashboard

---

## Orders Module

### Overview

Complete order management system with filtering, tracking, label printing, and RTS workflow.

**Route:** `/orders`  
**Guards:** `LoginGuard`, `PermissionGuard`

### Components

#### 1. **OrderListComponent**
- **Purpose:** Main orders table with filtering
- **Features:**
  - Virtual scrolling for performance
  - Advanced filters (status, date, SKU, customer)
  - Bulk actions (update status, print labels)
  - Pagination
  - Export to Excel

**Filters:**
```typescript
interface OrderFilters {
  status?: string;
  startDate?: Date;
  endDate?: Date;
  customerId?: string;
  sku?: string;
  orderId?: string;
  shopId?: string;
}
```

#### 2. **OrderDetailComponent**
- **Purpose:** Single order details view
- **Route:** `/orders/:id`
- **Sections:**
  - Order summary
  - Customer information
  - Order items table
  - Status history
  - Shipping details
  - Notes/comments

#### 3. **OrderFilterComponent**
- **Purpose:** Advanced filtering UI
- **Filter Types:**
  - Status dropdown (Pending, Processing, Shipped, Delivered, Cancelled)
  - Date range picker
  - Customer search
  - SKU search
  - Custom status (if configured)

#### 4. **OrderItemsComponent**
- **Purpose:** Display order line items
- **Columns:**
  - SKU
  - Product name
  - Quantity
  - Unit price
  - Cost (if available)
  - Profit
  - Status

#### 5. **PrintLabelComponent**
- **Purpose:** Print shipping labels
- **Features:**
  - Bulk label printing
  - Custom label templates
  - Preview before print
  - Save as PDF

#### 6. **RtsHandlingComponent**
- **Purpose:** Handle Return-to-Sender orders
- **Workflow:**
  1. Mark order as RTS
  2. Update inventory (restore stock)
  3. Process refund
  4. Update order status

#### 7. **OrderStatusComponent**
- **Purpose:** Update order status
- **Features:**
  - Status dropdown
  - Tracking number input
  - Status history timeline
  - Notes field

### Services Used

- `OrdersService` - Order CRUD operations
- `OrderItemsService` - Order items data
- `CustomOrderStatusService` - Custom statuses
- `ShopService` - Shop-specific settings

### Key Features

- **Smart Filters:** Remember last used filters
- **Bulk Operations:** Update multiple orders at once
- **Label Printing:** Integrated printing solution
- **Status Tracking:** Complete order lifecycle
- **RTS Workflow:** Automated return handling

---

## Product Module

### Overview

SKU and inventory management with Daraz product synchronization.

**Route:** `/products`  
**Guards:** `LoginGuard`, `PermissionGuard`

### Components

#### 1. **ProductListComponent**
- **Purpose:** Display all local SKUs
- **Features:**
  - Searchable table
  - Cost management
  - Stock tracking
  - Daraz sync status

#### 2. **ProductDetailComponent**
- **Purpose:** Edit SKU details
- **Form Fields:**
  - SKU code
  - Product name
  - Cost price
  - Quantity on hand
  - Shopify SKU (mapping)
  - Notes

#### 3. **ProductCreateComponent**
- **Purpose:** Add new SKU
- **Validation:**
  - Unique SKU code
  - Valid cost (positive number)
  - Required fields

#### 4. **DarazProductsComponent**
- **Purpose:** View products from Daraz
- **Features:**
  - Sync button
  - Product catalog
  - SKU mapping
  - Status indicators

#### 5. **SkuMappingComponent**
- **Purpose:** Map local SKU to Daraz SKU
- **Mapping Table:**
  - Local SKU → Daraz SellerSku
  - Product names
  - Stock levels
  - Sync status

#### 6. **CostManagementComponent**
- **Purpose:** Bulk cost updates
- **Features:**
  - Import costs from CSV
  - Bulk edit
  - Cost history
  - Profit calculator

#### 7. **InventoryComponent**
- **Purpose:** Stock level tracking
- **Features:**
  - Low stock alerts
  - Stock movements
  - Reorder suggestions

### Services Used

- `SkusService` - Local SKU operations
- `DarazskuService` - Daraz product sync
- `OrderItemsService` - Stock deduction calculations

### Key Features

- **Daraz Sync:** Automatic product synchronization
- **Cost Tracking:** Historical cost data
- **Profit Analysis:** Calculate profit per SKU
- **Bulk Import:** CSV upload for mass updates
- **Stock Alerts:** Low inventory notifications

---

## Finance Module

### Overview

Financial reports, transaction history, and revenue tracking.

**Route:** `/finance`  
**Guards:** `LoginGuard`, `PermissionGuard`

### Components

#### 1. **TransactionListComponent**
- **Purpose:** Display all financial transactions
- **Columns:**
  - Transaction ID
  - Type (Payment, Refund, Fee, Adjustment)
  - Amount
  - Date
  - Status
  - Shop

**Filters:**
```typescript
interface TransactionFilters {
  type?: string;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  shopId?: string;
}
```

#### 2. **StatementComponent**
- **Purpose:** Financial statements by date range
- **Sections:**
  - Revenue summary
  - Transaction breakdown
  - Fee analysis
  - Net profit
  - Export to PDF/Excel

### Services Used

- `TransactionsService` - Transaction data
- `OrderItemsService` - Sales revenue
- `ShopService` - Shop-specific financials

### Key Features

- **Transaction History:** Complete financial audit trail
- **Statement Generation:** Period-based reports
- **Revenue Analysis:** Daily/weekly/monthly breakdowns
- **Export Options:** PDF, Excel, CSV formats
- **Multi-Currency:** Support for different currencies (if applicable)

---

## Billing Module

### Overview

Subscription management, payment processing, and plan upgrades.

**Route:** `/billing`  
**Guards:** `LoginGuard`

### Components

#### 1. **SubscriptionComponent**
- **Purpose:** View current subscription
- **Display:**
  - Current plan
  - Billing cycle
  - Next payment date
  - Features included
  - Usage statistics

#### 2. **PaymentComponent**
- **Purpose:** Process payments
- **Integration:** Stripe payment gateway
- **Features:**
  - Card input
  - Payment validation
  - Receipt generation
  - Payment history

#### 3. **PlanSelectionComponent**
- **Purpose:** Choose subscription plan
- **Plans:**
  - Free (trial)
  - Starter
  - Professional
  - Enterprise

#### 4. **InvoiceComponent**
- **Purpose:** View/download invoices
- **Features:**
  - Invoice list
  - PDF download
  - Payment status
  - Due date tracking

#### 5. **CouponComponent**
- **Purpose:** Apply discount coupons
- **Features:**
  - Coupon code input
  - Validation
  - Discount calculation
  - Expiry checking

### Services Used

- `BillingService` - Payment processing
- `PlansService` - Plan information
- `CouponsService` - Coupon validation
- `UserSubscriptionService` - Subscription status

### Key Features

- **Secure Payments:** PCI-compliant via Stripe
- **Auto-Renewal:** Automatic subscription renewal
- **Plan Flexibility:** Upgrade/downgrade anytime
- **Invoice Management:** Auto-generated invoices
- **Coupon System:** Promotional discounts

---

## Users Module

### Overview

User account management, shop management, and permissions.

**Route:** `/users`  
**Guards:** `LoginGuard`, `AdminGuard`

### Components

#### 1. **UserListComponent**
- **Purpose:** Display all users
- **Columns:**
  - Name
  - Email
  - Role (Admin/User)
  - Shop
  - Status (Active/Inactive)
  - Last login

#### 2. **UserDetailComponent**
- **Purpose:** Edit user details
- **Form Fields:**
  - Name
  - Email
  - Role
  - Permissions
  - Assigned shop
  - Status

#### 3. **UserCreateComponent**
- **Purpose:** Create new user (sub-account)
- **Features:**
  - Email validation
  - Password generation
  - Role assignment
  - Permission selection

#### 4. **ShopManagementComponent**
- **Purpose:** Manage shops
- **Features:**
  - Add/edit shops
  - Daraz credentials
  - Shop status
  - User assignments

#### 5. **PermissionsComponent**
- **Purpose:** Configure user permissions
- **Permission Types:**
  - View orders
  - Edit orders
  - View products
  - Edit products
  - View finance
  - Manage users (admin only)

### Services Used

- `UsersService` - User CRUD
- `ShopService` - Shop management
- `AuthService` - Permission checking

### Key Features

- **Multi-User Support:** Sub-accounts with limited access
- **Role-Based Access:** Admin vs. regular users
- **Shop Assignment:** Users tied to specific shops
- **Permission Granularity:** Feature-level access control
- **Activity Tracking:** User login history

---

## Core Module

### Overview

Authentication, login, and core application functionality.

**Route:** `/login`  
**Loaded:** Eagerly (not lazy)

### Components

#### 1. **LoginComponent**
- **Purpose:** User login form
- **Form:**
  - Email input
  - Password input
  - Remember me checkbox
  - Forgot password link

**Login Flow:**
```typescript
onLogin() {
  this.authService.login(this.email, this.password).subscribe(
    response => {
      localStorage.setItem('auth-token', response.token);
      this.authService.setCurrentUser(response.user);
      this.router.navigate(['/dashboard']);
    },
    error => this.showError(error.message)
  );
}
```

#### 2. **RegisterComponent**
- **Purpose:** New user registration
- **Form Fields:**
  - Name
  - Email
  - Password
  - Confirm password
  - Shop name

#### 3. **ForgotPasswordComponent**
- **Purpose:** Password reset request
- **Flow:**
  1. Enter email
  2. Send reset link
  3. Check email
  4. Reset password

#### 4. **ResetPasswordComponent**
- **Purpose:** Set new password
- **Route:** `/reset-password/:token`
- **Validation:**
  - Token validity
  - Password strength
  - Confirmation match

### Services Used

- `AuthService` - Authentication logic
- `UsersService` - User operations

### Key Features

- **JWT Authentication:** Secure token-based auth
- **Auto-Login:** Remember me functionality
- **Password Reset:** Email-based reset flow
- **Session Management:** Token expiry handling
- **Redirect Logic:** Return to attempted route after login

---

## Pricing Module

### Overview

Display subscription plans and features for potential customers.

**Route:** `/pricing`  
**Guards:** None (public)

### Components

#### 1. **PricingComponent**
- **Purpose:** Plan comparison table
- **Layout:**
  - 3-4 plan cards
  - Feature comparison
  - Pricing tiers
  - CTA buttons

**Plan Structure:**
```typescript
interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  maxOrders: number;
  maxShops: number;
  support: string;
}
```

### Services Used

- `PlansService` - Fetch plan details

### Key Features

- **Responsive Design:** Mobile-friendly cards
- **Feature Highlights:** Visual feature list
- **CTA Integration:** Direct signup/upgrade
- **Annual Discount:** Show savings for yearly plans

---

## Shared Module

### Overview

Reusable components, directives, and pipes used across the application.

**Exported:** Yes (imported by feature modules)  
**Loaded:** With each feature module

### Components

#### Reusable UI Components

1. **LoadingSpinnerComponent** - Loading indicator
2. **ErrorMessageComponent** - Error display
3. **ConfirmDialogComponent** - Confirmation modals
4. **DatePickerComponent** - Custom date picker
5. **SearchBoxComponent** - Search input with debounce
6. **PaginationComponent** - Custom pagination
7. **BreadcrumbComponent** - Navigation breadcrumbs
8. **TooltipDirective** - Custom tooltips

### Directives

1. **HighlightDirective** - Highlight text on hover
2. **AutofocusDirective** - Auto-focus input on load
3. **PermissionDirective** - Hide elements based on permissions
4. **NumericOnlyDirective** - Allow only numeric input

### Pipes

1. **CurrencyFormatPipe** - Format PKR currency
2. **DateFormatPipe** - Custom date formatting
3. **TruncatePipe** - Truncate long text
4. **SafeHtmlPipe** - Sanitize HTML
5. **FilterPipe** - Array filtering

### Usage Example

```typescript
// Import in feature module
@NgModule({
  imports: [
    CommonModule,
    SharedModule  // Gets all shared components/directives/pipes
  ]
})
export class OrdersModule { }
```

---

## Module Dependencies

### Dependency Graph

```
AppModule
  ├── CoreModule (singleton)
  ├── SharedModule
  └── Feature Modules (lazy loaded)
      ├── AnalyticsModule → SharedModule
      ├── OrdersModule → SharedModule
      ├── ProductModule → SharedModule
      ├── FinanceModule → SharedModule
      ├── BillingModule → SharedModule
      └── UsersModule → SharedModule
```

### Import Strategy

- **CoreModule:** Import once in AppModule
- **SharedModule:** Import in every feature module
- **Feature Modules:** Lazy load via routing

---

## Summary

The modular architecture provides:

- **Separation of Concerns** - Each module has clear responsibility
- **Lazy Loading** - Optimal initial load performance
- **Reusability** - Shared module reduces duplication
- **Scalability** - Easy to add new feature modules
- **Maintainability** - Isolated changes don't affect other modules

Total: **9 modules, 50+ components** serving a complete e-commerce analytics platform.
