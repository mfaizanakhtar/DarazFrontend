# Frontend Services

> **Comprehensive documentation of all services in the Edashlytic Angular application**

---

## Table of Contents

- [Service Architecture](#service-architecture)
- [Base Service](#base-service)
- [Authentication Services](#authentication-services)
- [Data Services](#data-services)
- [Utility Services](#utility-services)
- [Service Usage Patterns](#service-usage-patterns)

---

## Service Architecture

### Service Hierarchy

```
DataService (Base)
    ├── AuthService
    ├── OrdersService
    ├── OrderItemsService
    ├── ShopService
    ├── SkusService
    ├── DarazskuService
    ├── TransactionsService
    ├── BillingService
    ├── UsersService
    ├── PlansService
    ├── CouponsService
    ├── CustomOrderStatusService
    ├── LookupsService
    └── DashboardsService
```

All API services extend `DataService` for consistent HTTP operations and JWT injection.

---

## Base Service

### DataService

**File:** `src/app/services/data.service.ts`

Base service providing common HTTP operations for all API services.

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  protected baseUrl: string;

  constructor(protected http: HttpClient) {
    this.baseUrl = isDevMode() 
      ? "http://localhost:3000/api/" 
      : "api/";
  }

  // GET request
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params });
  }

  // POST request
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data);
  }

  // PUT request
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  // DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  // Build HTTP params from object
  protected buildParams(obj: any): HttpParams {
    let params = new HttpParams();
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== undefined) {
        params = params.set(key, obj[key].toString());
      }
    }
    return params;
  }
}
```

**Features:**
- Environment-aware base URL
- Generic HTTP methods
- Automatic JWT injection via interceptor
- HttpParams builder utility
- Type-safe responses

---

## Authentication Services

### AuthService

**File:** `src/app/services/auth.service.ts`

Handles user authentication, JWT management, and user state.

#### Methods

**login(email: string, password: string)**
```typescript
login(email: string, password: string): Observable<AuthResponse> {
  return this.post<AuthResponse>('auth/login', { email, password }).pipe(
    tap(response => {
      localStorage.setItem('auth-token', response.token);
      this.setCurrentUser(response.user);
    })
  );
}
```

**logout()**
```typescript
logout(): void {
  localStorage.removeItem('auth-token');
  this.currentUserSubject.next(null);
  this.router.navigate(['/login']);
}
```

**isAuthenticated()**
```typescript
isAuthenticated(): boolean {
  const token = localStorage.getItem('auth-token');
  if (!token) return false;
  
  try {
    const payload = this.decodeToken(token);
    const isExpired = payload.exp < Date.now() / 1000;
    return !isExpired;
  } catch {
    return false;
  }
}
```

**getCurrentUser()**
```typescript
getCurrentUser(): Observable<User> {
  return this.currentUser$.asObservable();
}
```

**hasPermission(permission: string)**
```typescript
hasPermission(permission: string): boolean {
  const user = this.currentUserSubject.value;
  if (!user) return false;
  
  if (user.role === 'admin') return true;
  return user.permissions?.includes(permission) || false;
}
```

**hasRole(role: string)**
```typescript
hasRole(role: string): boolean {
  const user = this.currentUserSubject.value;
  return user?.role === role;
}
```

#### State Management

```typescript
private currentUserSubject = new BehaviorSubject<User | null>(null);
public currentUser$ = this.currentUserSubject.asObservable();

setCurrentUser(user: User): void {
  this.currentUserSubject.next(user);
}
```

#### Usage Example

```typescript
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: response => this.router.navigate(['/dashboard']),
      error: err => this.showError(err.message)
    });
  }
}
```

---

## Data Services

### OrdersService

**File:** `src/app/services/orders.service.ts`

Manages order operations.

#### Methods

**getOrders(filters?: OrderFilter)**
```typescript
getOrders(filters?: OrderFilter): Observable<Order[]> {
  const params = this.buildParams(filters);
  return this.get<Order[]>('orders', params);
}
```

**getOrder(id: string)**
```typescript
getOrder(id: string): Observable<Order> {
  return this.get<Order>(`orders/${id}`);
}
```

**updateOrderStatus(id: string, status: string)**
```typescript
updateOrderStatus(id: string, status: string): Observable<Order> {
  return this.put<Order>(`orders/${id}/status`, { status });
}
```

**deleteOrder(id: string)**
```typescript
deleteOrder(id: string): Observable<void> {
  return this.delete<void>(`orders/${id}`);
}
```

**bulkUpdateStatus(orderIds: string[], status: string)**
```typescript
bulkUpdateStatus(orderIds: string[], status: string): Observable<any> {
  return this.post('orders/bulk-update', { orderIds, status });
}
```

#### Filter Interface

```typescript
interface OrderFilter {
  status?: string;
  startDate?: string;
  endDate?: string;
  customerId?: string;
  sku?: string;
  shopId?: string;
  limit?: number;
  offset?: number;
}
```

---

### OrderItemsService

**File:** `src/app/services/order-items.service.ts`

Manages order items and statistics.

#### Methods

**getOrderItems(filters?: OrderItemFilter)**
```typescript
getOrderItems(filters?: OrderItemFilter): Observable<OrderItem[]> {
  const params = this.buildParams(filters);
  return this.get<OrderItem[]>('orderitems', params);
}
```

**getStats(filters?: StatsFilter)**
```typescript
getStats(filters?: StatsFilter): Observable<OrderStats> {
  const params = this.buildParams(filters);
  return this.get<OrderStats>('orderitems/stats', params);
}
```

**getRevenueByDate(startDate: string, endDate: string)**
```typescript
getRevenueByDate(startDate: string, endDate: string): Observable<RevenueData[]> {
  return this.get<RevenueData[]>('orderitems/revenue-by-date', 
    this.buildParams({ startDate, endDate })
  );
}
```

**getTopProducts(limit: number = 10)**
```typescript
getTopProducts(limit: number = 10): Observable<TopProduct[]> {
  return this.get<TopProduct[]>('orderitems/top-products', 
    this.buildParams({ limit })
  );
}
```

#### Response Interfaces

```typescript
interface OrderStats {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  orderCount: number;
  averageOrderValue: number;
}

interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

interface TopProduct {
  sku: string;
  name: string;
  quantity: number;
  revenue: number;
}
```

---

### ShopService

**File:** `src/app/services/shop.service.ts`

Manages shop/store operations.

#### Methods

**getShops()**
```typescript
getShops(): Observable<Shop[]> {
  return this.get<Shop[]>('shop');
}
```

**getShop(id: string)**
```typescript
getShop(id: string): Observable<Shop> {
  return this.get<Shop>(`shop/${id}`);
}
```

**createShop(shop: Partial<Shop>)**
```typescript
createShop(shop: Partial<Shop>): Observable<Shop> {
  return this.post<Shop>('shop', shop);
}
```

**updateShop(id: string, shop: Partial<Shop>)**
```typescript
updateShop(id: string, shop: Partial<Shop>): Observable<Shop> {
  return this.put<Shop>(`shop/${id}`, shop);
}
```

**updateDarazCredentials(id: string, credentials: DarazCredentials)**
```typescript
updateDarazCredentials(id: string, credentials: DarazCredentials): Observable<Shop> {
  return this.put<Shop>(`shop/${id}/credentials`, credentials);
}
```

**syncWithDaraz(shopId: string)**
```typescript
syncWithDaraz(shopId: string): Observable<SyncResult> {
  return this.post<SyncResult>(`shop/${shopId}/sync`, {});
}
```

#### Shop Interface

```typescript
interface Shop {
  _id: string;
  name: string;
  darazAppKey?: string;
  darazAppSecret?: string;
  darazAccessToken?: string;
  darazRefreshToken?: string;
  isActive: boolean;
  lastSyncDate?: Date;
  owner: string;
  createdAt: Date;
}
```

---

### SkusService

**File:** `src/app/services/skus.service.ts`

Manages local SKU/inventory.

#### Methods

**getSkus(shopId?: string)**
```typescript
getSkus(shopId?: string): Observable<Sku[]> {
  const params = shopId ? this.buildParams({ shopId }) : undefined;
  return this.get<Sku[]>('skus', params);
}
```

**getSku(id: string)**
```typescript
getSku(id: string): Observable<Sku> {
  return this.get<Sku>(`skus/${id}`);
}
```

**createSku(sku: Partial<Sku>)**
```typescript
createSku(sku: Partial<Sku>): Observable<Sku> {
  return this.post<Sku>('skus', sku);
}
```

**updateSku(id: string, sku: Partial<Sku>)**
```typescript
updateSku(id: string, sku: Partial<Sku>): Observable<Sku> {
  return this.put<Sku>(`skus/${id}`, sku);
}
```

**deleteSku(id: string)**
```typescript
deleteSku(id: string): Observable<void> {
  return this.delete<void>(`skus/${id}`);
}
```

**bulkUpdateCosts(updates: CostUpdate[])**
```typescript
bulkUpdateCosts(updates: CostUpdate[]): Observable<any> {
  return this.post('skus/bulk-update-costs', { updates });
}
```

#### SKU Interface

```typescript
interface Sku {
  _id: string;
  sku: string;
  name: string;
  cost: number;
  quantity: number;
  shopify_sku?: string;
  shop: string;
  createdAt: Date;
  updatedAt: Date;
}
```

---

### DarazskuService

**File:** `src/app/services/darazsku.service.ts`

Manages Daraz products synchronization.

#### Methods

**getDarazSkus(shopId: string)**
```typescript
getDarazSkus(shopId: string): Observable<DarazSku[]> {
  return this.get<DarazSku[]>('darazskus', this.buildParams({ shopId }));
}
```

**syncDarazProducts(shopId: string)**
```typescript
syncDarazProducts(shopId: string): Observable<SyncResult> {
  return this.get<SyncResult>(`darazskus/sync/${shopId}`);
}
```

**mapSkus(localSkuId: string, darazSellerSku: string)**
```typescript
mapSkus(localSkuId: string, darazSellerSku: string): Observable<any> {
  return this.post('darazskus/map', { localSkuId, darazSellerSku });
}
```

#### DarazSku Interface

```typescript
interface DarazSku {
  _id: string;
  SellerSku: string;
  ProductId: string;
  ProductName: string;
  shopify_sku?: string;
  Price: number;
  AvailableQuantity: number;
  Status: string;
  shop: string;
  createdAt: Date;
}
```

---

### TransactionsService

**File:** `src/app/services/transactions.service.ts`

Manages financial transactions.

#### Methods

**getTransactions(filters?: TransactionFilter)**
```typescript
getTransactions(filters?: TransactionFilter): Observable<Transaction[]> {
  const params = this.buildParams(filters);
  return this.get<Transaction[]>('transactions', params);
}
```

**getTransaction(id: string)**
```typescript
getTransaction(id: string): Observable<Transaction> {
  return this.get<Transaction>(`transactions/${id}`);
}
```

**getSummary(startDate: string, endDate: string, shopId?: string)**
```typescript
getSummary(startDate: string, endDate: string, shopId?: string): Observable<TransactionSummary> {
  const params = this.buildParams({ startDate, endDate, shopId });
  return this.get<TransactionSummary>('transactions/summary', params);
}
```

**syncTransactions(shopId: string)**
```typescript
syncTransactions(shopId: string): Observable<SyncResult> {
  return this.post<SyncResult>(`transactions/sync/${shopId}`, {});
}
```

#### Transaction Interface

```typescript
interface Transaction {
  _id: string;
  transaction_id: string;
  type: string;
  amount: number;
  currency: string;
  transaction_date: Date;
  status: string;
  shop: string;
  createdAt: Date;
}
```

---

### BillingService

**File:** `src/app/services/billing.service.ts`

Manages billing and payments.

#### Methods

**processPayment(paymentData: PaymentData)**
```typescript
processPayment(paymentData: PaymentData): Observable<PaymentResult> {
  return this.post<PaymentResult>('billings', paymentData);
}
```

**getBillingHistory(userId: string)**
```typescript
getBillingHistory(userId: string): Observable<Billing[]> {
  return this.get<Billing[]>('billings', this.buildParams({ userId }));
}
```

**getInvoice(billingId: string)**
```typescript
getInvoice(billingId: string): Observable<Blob> {
  return this.http.get(`${this.baseUrl}billings/${billingId}/invoice`, {
    responseType: 'blob'
  });
}
```

#### Payment Interface

```typescript
interface PaymentData {
  user: string;
  plan: string;
  amount: number;
  stripeToken: string;
  couponCode?: string;
}

interface PaymentResult {
  success: boolean;
  billingId: string;
  message: string;
}
```

---

### UsersService

**File:** `src/app/services/users.service.ts`

Manages user accounts.

#### Methods

**getUsers(shopId?: string)**
```typescript
getUsers(shopId?: string): Observable<User[]> {
  const params = shopId ? this.buildParams({ shopId }) : undefined;
  return this.get<User[]>('users', params);
}
```

**getUser(id: string)**
```typescript
getUser(id: string): Observable<User> {
  return this.get<User>(`users/${id}`);
}
```

**createUser(user: Partial<User>)**
```typescript
createUser(user: Partial<User>): Observable<User> {
  return this.post<User>('users', user);
}
```

**updateUser(id: string, user: Partial<User>)**
```typescript
updateUser(id: string, user: Partial<User>): Observable<User> {
  return this.put<User>(`users/${id}`, user);
}
```

**deleteUser(id: string)**
```typescript
deleteUser(id: string): Observable<void> {
  return this.delete<void>(`users/${id}`);
}
```

**updatePermissions(userId: string, permissions: string[])**
```typescript
updatePermissions(userId: string, permissions: string[]): Observable<User> {
  return this.put<User>(`users/${userId}/permissions`, { permissions });
}
```

---

### PlansService

**File:** `src/app/services/plans.service.ts`

Manages subscription plans.

#### Methods

**getPlans()**
```typescript
getPlans(): Observable<Plan[]> {
  return this.get<Plan[]>('plans');
}
```

**getPlan(id: string)**
```typescript
getPlan(id: string): Observable<Plan> {
  return this.get<Plan>(`plans/${id}`);
}
```

#### Plan Interface

```typescript
interface Plan {
  _id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  maxOrders: number;
  maxShops: number;
  support: string;
}
```

---

### CouponsService

**File:** `src/app/services/coupons.service.ts`

Manages discount coupons.

#### Methods

**validateCoupon(code: string)**
```typescript
validateCoupon(code: string): Observable<Coupon> {
  return this.get<Coupon>(`coupons/validate/${code}`);
}
```

**applyCoupon(code: string, amount: number)**
```typescript
applyCoupon(code: string, amount: number): Observable<CouponResult> {
  return this.post<CouponResult>('coupons/apply', { code, amount });
}
```

---

## Utility Services

### LoadingService

**Purpose:** Manage loading states globally

```typescript
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }
}
```

### NotificationService

**Purpose:** Display toast notifications

```typescript
@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
```

---

## Service Usage Patterns

### 1. Component Subscription

```typescript
export class OrderListComponent implements OnInit, OnDestroy {
  orders$: Observable<Order[]>;
  private destroy$ = new Subject<void>();

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.orders$ = this.ordersService.getOrders().pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 2. Using Async Pipe (Recommended)

```html
<div *ngIf="orders$ | async as orders">
  <order-table [orders]="orders"></order-table>
</div>
```

### 3. Handling Errors

```typescript
this.ordersService.getOrders().pipe(
  catchError(error => {
    this.notificationService.error('Failed to load orders');
    return throwError(() => error);
  })
).subscribe();
```

### 4. Loading States

```typescript
this.loadingService.show();
this.ordersService.getOrders().pipe(
  finalize(() => this.loadingService.hide())
).subscribe(orders => this.orders = orders);
```

---

## Summary

**18+ Services** providing:
- Authentication & authorization
- Complete CRUD operations
- Daraz API integration
- Financial operations
- Subscription management
- User & shop management
- Utility functions

All services follow consistent patterns for maintainability and testability.
