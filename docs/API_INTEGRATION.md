# API Integration

> **Backend communication patterns and API integration for the Edashlytic Angular application**

---

## Table of Contents

- [Overview](#overview)
- [API Configuration](#api-configuration)
- [HTTP Client Setup](#http-client-setup)
- [Authentication & Authorization](#authentication--authorization)
- [Request/Response Flow](#requestresponse-flow)
- [Error Handling](#error-handling)
- [API Endpoints Reference](#api-endpoints-reference)
- [Real-time Updates](#real-time-updates)

---

## Overview

The frontend communicates with the backend REST API using Angular's `HttpClient`. All API requests include JWT authentication tokens and follow RESTful conventions.

### Communication Architecture

```
Component → Service → HttpClient → HTTP Interceptor → Backend API
    ↑                                                        ↓
    └────────────── Response Handler ←──────────────────────┘
```

### Base URL Configuration

- **Development:** `http://localhost:3000/api/`
- **Production:** `api/` (relative, served from same domain)

---

## API Configuration

### Environment Setup

**File:** `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/'
};
```

**File:** `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'api/'  // Relative path for production
};
```

### DataService Configuration

**File:** `src/app/services/data.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  protected baseUrl: string;

  constructor(protected http: HttpClient) {
    this.baseUrl = isDevMode() 
      ? "http://localhost:3000/api/" 
      : "api/";
  }
}
```

---

## HTTP Client Setup

### Module Configuration

**File:** `src/app/app.module.ts`

```typescript
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    // ... other imports
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

### HTTP Interceptor (JWT Injection)

**File:** `src/app/interceptors/jwt.interceptor.ts`

```typescript
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth-token');
    
    if (token) {
      // Clone request and add authorization header
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized - redirect to login
          localStorage.removeItem('auth-token');
          window.location.href = '/login';
        }
        return throwError(() => error);
      })
    );
  }
}
```

---

## Authentication & Authorization

### Login Flow

```
1. User submits credentials
2. POST /api/auth/login
3. Backend validates credentials
4. Backend returns JWT token + user data
5. Frontend stores token in localStorage
6. Token automatically injected in subsequent requests
```

### Login Implementation

```typescript
// AuthService
login(email: string, password: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.baseUrl}auth/login`, {
    email,
    password
  }).pipe(
    tap(response => {
      // Store token
      localStorage.setItem('auth-token', response.token);
      
      // Update user state
      this.currentUserSubject.next(response.user);
    }),
    catchError(error => {
      return throwError(() => new Error('Login failed'));
    })
  );
}
```

### Token Storage

```typescript
// Store token
localStorage.setItem('auth-token', token);

// Retrieve token
const token = localStorage.getItem('auth-token');

// Remove token (logout)
localStorage.removeItem('auth-token');
```

### Token Validation

```typescript
isAuthenticated(): boolean {
  const token = localStorage.getItem('auth-token');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp < Date.now() / 1000;
    return !isExpired;
  } catch {
    return false;
  }
}
```

---

## Request/Response Flow

### GET Request Example

```typescript
// Service
getOrders(filters?: OrderFilter): Observable<Order[]> {
  const params = new HttpParams()
    .set('status', filters?.status || '')
    .set('startDate', filters?.startDate || '');
    
  return this.http.get<Order[]>(`${this.baseUrl}orders`, { params });
}

// Component
this.ordersService.getOrders({ status: 'pending' }).subscribe(
  orders => this.orders = orders,
  error => this.handleError(error)
);
```

### POST Request Example

```typescript
// Service
createOrder(order: Partial<Order>): Observable<Order> {
  return this.http.post<Order>(`${this.baseUrl}orders`, order);
}

// Component
this.ordersService.createOrder(newOrder).subscribe(
  createdOrder => this.onOrderCreated(createdOrder),
  error => this.handleError(error)
);
```

### PUT Request Example

```typescript
// Service
updateOrder(id: string, updates: Partial<Order>): Observable<Order> {
  return this.http.put<Order>(`${this.baseUrl}orders/${id}`, updates);
}

// Component
this.ordersService.updateOrder(orderId, { status: 'shipped' }).subscribe(
  updatedOrder => this.onOrderUpdated(updatedOrder),
  error => this.handleError(error)
);
```

### DELETE Request Example

```typescript
// Service
deleteOrder(id: string): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}orders/${id}`);
}

// Component
this.ordersService.deleteOrder(orderId).subscribe(
  () => this.onOrderDeleted(),
  error => this.handleError(error)
);
```

---

## Error Handling

### Centralized Error Handler

```typescript
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          break;
        case 403:
          errorMessage = 'Access forbidden.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = error.error?.message || 'Request failed';
      }
    }
    
    console.error('HTTP Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
```

### Service Error Handling

```typescript
getOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(`${this.baseUrl}orders`).pipe(
    retry(2),  // Retry failed requests up to 2 times
    catchError(this.errorHandler.handleError),
    finalize(() => this.loadingService.hide())
  );
}
```

### Component Error Handling

```typescript
loadOrders() {
  this.ordersService.getOrders().subscribe({
    next: orders => this.orders = orders,
    error: error => {
      this.notificationService.error(error.message);
      this.orders = [];
    },
    complete: () => console.log('Orders loaded')
  });
}
```

---

## API Endpoints Reference

### Authentication Endpoints

| Method | Endpoint | Purpose | Request Body | Response |
|--------|----------|---------|--------------|----------|
| POST | `/api/auth/login` | User login | `{ email, password }` | `{ token, user }` |
| POST | `/api/auth/register` | User registration | `{ name, email, password }` | `{ token, user }` |
| POST | `/api/auth/forgot-password` | Request password reset | `{ email }` | `{ message }` |
| POST | `/api/auth/reset-password` | Reset password | `{ token, password }` | `{ message }` |

### Order Endpoints

| Method | Endpoint | Purpose | Params/Body | Response |
|--------|----------|---------|-------------|----------|
| GET | `/api/orders` | List orders | `?status=&startDate=&endDate=` | `Order[]` |
| GET | `/api/orders/:id` | Get order | - | `Order` |
| PUT | `/api/orders/:id` | Update order | `{ status, ... }` | `Order` |
| DELETE | `/api/orders/:id` | Delete order | - | `void` |
| POST | `/api/orders/bulk-update` | Bulk update | `{ orderIds, status }` | `{ success }` |

### Order Items Endpoints

| Method | Endpoint | Purpose | Params | Response |
|--------|----------|---------|--------|----------|
| GET | `/api/orderitems` | List items | `?orderId=&sku=` | `OrderItem[]` |
| GET | `/api/orderitems/stats` | Get statistics | `?startDate=&endDate=` | `Stats` |
| GET | `/api/orderitems/revenue-by-date` | Revenue data | `?startDate=&endDate=` | `RevenueData[]` |
| GET | `/api/orderitems/top-products` | Top products | `?limit=10` | `TopProduct[]` |

### SKU Endpoints

| Method | Endpoint | Purpose | Body | Response |
|--------|----------|---------|------|----------|
| GET | `/api/skus` | List SKUs | - | `Sku[]` |
| GET | `/api/skus/:id` | Get SKU | - | `Sku` |
| POST | `/api/skus` | Create SKU | `{ sku, name, cost }` | `Sku` |
| PUT | `/api/skus/:id` | Update SKU | `{ cost, quantity }` | `Sku` |
| DELETE | `/api/skus/:id` | Delete SKU | - | `void` |
| POST | `/api/skus/bulk-update-costs` | Bulk cost update | `{ updates }` | `{ success }` |

### Daraz SKU Endpoints

| Method | Endpoint | Purpose | Params | Response |
|--------|----------|---------|--------|----------|
| GET | `/api/darazskus` | List Daraz products | `?shopId=` | `DarazSku[]` |
| GET | `/api/darazskus/sync/:shopId` | Sync from Daraz | - | `SyncResult` |
| POST | `/api/darazskus/map` | Map SKUs | `{ localSkuId, darazSellerSku }` | `{ success }` |

### Shop Endpoints

| Method | Endpoint | Purpose | Body | Response |
|--------|----------|---------|------|----------|
| GET | `/api/shop` | List shops | - | `Shop[]` |
| GET | `/api/shop/:id` | Get shop | - | `Shop` |
| POST | `/api/shop` | Create shop | `{ name, ... }` | `Shop` |
| PUT | `/api/shop/:id` | Update shop | `{ name, ... }` | `Shop` |
| PUT | `/api/shop/:id/credentials` | Update credentials | `{ appKey, appSecret }` | `Shop` |

### Transaction Endpoints

| Method | Endpoint | Purpose | Params | Response |
|--------|----------|---------|--------|----------|
| GET | `/api/transactions` | List transactions | `?type=&startDate=` | `Transaction[]` |
| GET | `/api/transactions/:id` | Get transaction | - | `Transaction` |
| GET | `/api/transactions/summary` | Get summary | `?startDate=&endDate=` | `Summary` |
| POST | `/api/transactions/sync/:shopId` | Sync transactions | - | `SyncResult` |

### Billing Endpoints

| Method | Endpoint | Purpose | Body | Response |
|--------|----------|---------|------|----------|
| GET | `/api/billings` | Billing history | `?userId=` | `Billing[]` |
| POST | `/api/billings` | Process payment | `{ user, plan, amount, stripeToken }` | `PaymentResult` |
| GET | `/api/billings/:id/invoice` | Download invoice | - | `Blob` (PDF) |

### User Endpoints

| Method | Endpoint | Purpose | Body | Response |
|--------|----------|---------|------|----------|
| GET | `/api/users` | List users | - | `User[]` |
| GET | `/api/users/:id` | Get user | - | `User` |
| POST | `/api/users` | Create user | `{ name, email, role }` | `User` |
| PUT | `/api/users/:id` | Update user | `{ name, role }` | `User` |
| DELETE | `/api/users/:id` | Delete user | - | `void` |
| PUT | `/api/users/:id/permissions` | Update permissions | `{ permissions }` | `User` |

### Dashboard Endpoints

| Method | Endpoint | Purpose | Params | Response |
|--------|----------|---------|--------|----------|
| GET | `/api/dashboards/stats` | Get stats | `?startDate=&endDate=` | `DashboardStats` |

---

## Real-time Updates

### Polling Strategy

For near-real-time updates, the application uses polling:

```typescript
@Component({...})
export class DashboardComponent implements OnInit, OnDestroy {
  private refreshInterval = 300000; // 5 minutes
  private intervalId: any;
  
  ngOnInit() {
    this.loadData();
    this.startAutoRefresh();
  }
  
  startAutoRefresh() {
    this.intervalId = setInterval(() => {
      this.loadData();
    }, this.refreshInterval);
  }
  
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
  loadData() {
    this.dashboardService.getStats().subscribe(
      stats => this.stats = stats
    );
  }
}
```

### Manual Refresh

```typescript
refreshData() {
  this.loadingService.show();
  
  forkJoin({
    orders: this.ordersService.getOrders(),
    stats: this.statsService.getStats(),
    transactions: this.transactionsService.getTransactions()
  }).pipe(
    finalize(() => this.loadingService.hide())
  ).subscribe(
    result => {
      this.orders = result.orders;
      this.stats = result.stats;
      this.transactions = result.transactions;
    }
  );
}
```

---

## Request Optimization

### Caching with shareReplay

```typescript
private ordersCache$: Observable<Order[]>;

getOrders(): Observable<Order[]> {
  if (!this.ordersCache$) {
    this.ordersCache$ = this.http.get<Order[]>(`${this.baseUrl}orders`).pipe(
      shareReplay(1)  // Cache last result
    );
  }
  return this.ordersCache$;
}

// Clear cache when data changes
clearCache() {
  this.ordersCache$ = null;
}
```

### Debouncing Search Requests

```typescript
searchControl = new FormControl();

ngOnInit() {
  this.searchControl.valueChanges.pipe(
    debounceTime(300),        // Wait 300ms after last keystroke
    distinctUntilChanged(),   // Only if value changed
    switchMap(term => this.ordersService.search(term))
  ).subscribe(results => this.searchResults = results);
}
```

### Parallel Requests with forkJoin

```typescript
loadDashboardData() {
  forkJoin({
    orders: this.ordersService.getOrders(),
    revenue: this.statsService.getRevenue(),
    topProducts: this.productsService.getTopProducts()
  }).subscribe(data => {
    this.orders = data.orders;
    this.revenue = data.revenue;
    this.topProducts = data.topProducts;
  });
}
```

---

## Best Practices

### 1. Use Type-Safe Interfaces

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

getOrders(): Observable<ApiResponse<Order[]>> {
  return this.http.get<ApiResponse<Order[]>>(`${this.baseUrl}orders`);
}
```

### 2. Handle Loading States

```typescript
isLoading = false;

loadData() {
  this.isLoading = true;
  
  this.service.getData().pipe(
    finalize(() => this.isLoading = false)
  ).subscribe(
    data => this.data = data,
    error => this.handleError(error)
  );
}
```

### 3. Unsubscribe from Observables

```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.getData().pipe(
    takeUntil(this.destroy$)
  ).subscribe(data => this.data = data);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### 4. Use Async Pipe (Preferred)

```html
<!-- Automatically subscribes and unsubscribes -->
<div *ngIf="orders$ | async as orders">
  <order-table [orders]="orders"></order-table>
</div>
```

---

## Summary

The API integration layer provides:

- **Consistent Communication** - DataService base class
- **Authentication** - Automatic JWT injection
- **Error Handling** - Centralized error management
- **Type Safety** - TypeScript interfaces for all APIs
- **Performance** - Caching, debouncing, parallel requests
- **50+ API Endpoints** - Complete backend integration

All communication follows RESTful conventions and includes proper error handling and authentication.
