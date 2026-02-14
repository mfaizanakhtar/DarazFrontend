# Frontend Architecture

> **Design patterns, structure, and architectural decisions for the Edashlytic Angular application**

---

## Table of Contents

- [Overview](#overview)
- [Architecture Pattern](#architecture-pattern)
- [Project Structure](#project-structure)
- [Routing Strategy](#routing-strategy)
- [State Management](#state-management)
- [Module Organization](#module-organization)
- [Component Architecture](#component-architecture)
- [Service Layer](#service-layer)
- [Security Architecture](#security-architecture)
- [Performance Optimizations](#performance-optimizations)
- [Design Patterns](#design-patterns)

---

## Overview

The Edashlytic frontend follows Angular's recommended architectural patterns with a **modular, component-based architecture**. The application is structured around feature modules that are lazy-loaded for optimal performance.

### Key Architectural Principles

1. **Separation of Concerns** - Clear separation between presentation, business logic, and data layers
2. **Modularity** - Feature modules are self-contained and independently deployable
3. **Lazy Loading** - Modules loaded on-demand to reduce initial bundle size
4. **Reactive Programming** - RxJS observables for asynchronous operations
5. **Dependency Injection** - Angular's DI for loose coupling and testability
6. **Single Responsibility** - Each component/service has one clear purpose

---

## Architecture Pattern

### Three-Layer Architecture

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│  (Components, Templates, Directives)    │
│  • Display data                         │
│  • Handle user interactions             │
│  • Delegate to services                 │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         SERVICE LAYER                   │
│  (Services, Guards, Interceptors)       │
│  • Business logic                       │
│  • HTTP communication                   │
│  • State management                     │
│  • Authentication/Authorization         │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         DATA LAYER                      │
│  (Models, Interfaces, DTOs)             │
│  • Data structures                      │
│  • Type definitions                     │
│  • API contracts                        │
└─────────────────────────────────────────┘
```

### Request Flow

```
User Action → Component → Service → HTTP Request → Backend API
                ↓                        ↓
            Update UI ← Transform Data ← Response
```

---

## Project Structure

### Directory Organization

```
src/
├── app/
│   ├── app-routing.module.ts          # Root routing configuration
│   ├── app.component.ts               # Root component
│   ├── app.module.ts                  # Root module
│   │
│   ├── core/                          # Core module (singleton services)
│   │   ├── auth/                      # Authentication components
│   │   ├── guards/                    # Route guards (moved from root)
│   │   └── core.module.ts
│   │
│   ├── shared/                        # Shared module (reusable components)
│   │   ├── components/                # Shared UI components
│   │   ├── directives/                # Custom directives
│   │   ├── pipes/                     # Custom pipes
│   │   └── shared.module.ts
│   │
│   ├── services/                      # Global services
│   │   ├── data.service.ts            # Base HTTP service
│   │   ├── auth.service.ts            # Authentication service
│   │   └── [feature].service.ts       # Feature services
│   │
│   ├── guards/                        # Route guards
│   │   ├── login.guard.ts
│   │   ├── admin.guard.ts
│   │   ├── permission.guard.ts
│   │   └── subscription.guard.ts
│   │
│   └── [feature-modules]/             # Feature modules (lazy loaded)
│       ├── analytics/
│       ├── orders/
│       ├── product/
│       ├── finance/
│       ├── billing/
│       ├── users/
│       └── pricing/
│
├── assets/                            # Static assets
│   ├── images/
│   ├── css/
│   ├── i18n/                          # Internationalization files
│   └── fonts/
│
└── environments/                      # Environment configurations
    ├── environment.ts                 # Development
    └── environment.prod.ts            # Production
```

### Module Types

1. **Root Module** (`AppModule`) - Bootstrap module, imports all necessary modules
2. **Core Module** - Singleton services, authentication, global utilities (imported once)
3. **Shared Module** - Reusable components, directives, pipes (imported by features)
4. **Feature Modules** - Business features with their own routing (lazy loaded)

---

## Routing Strategy

### Root Routes Configuration

**File:** `app-routing.module.ts`

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'login', 
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule),
    canActivate: [LoginGuard, SubscriptionGuard]
  },
  { 
    path: 'orders', 
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
    canActivate: [LoginGuard, PermissionGuard]
  },
  // ... more routes
];
```

### Lazy Loading Strategy

All feature modules use **lazy loading** to reduce initial bundle size:

```typescript
// Instead of direct import:
// import { OrdersModule } from './orders/orders.module';

// Use dynamic import:
loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
```

**Benefits:**
- Faster initial load time
- Smaller initial bundle size
- Load features on-demand
- Better code splitting

### Route Guards

Applied in hierarchical order:

1. **LoginGuard** - Check if user is authenticated
2. **SubscriptionGuard** - Verify active subscription
3. **PermissionGuard** - Check feature-level permissions
4. **AdminGuard** - Verify admin role

```typescript
{
  path: 'users',
  canActivate: [LoginGuard, AdminGuard],  // Must be logged in AND admin
  loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
}
```

---

## State Management

### Approach: Service-Based State

The application uses **service-based state management** with RxJS BehaviorSubjects instead of NgRx or Akita.

### State Pattern

```typescript
// Example: AuthService with state
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Update state
  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  // Get current state
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
```

### State Locations

| State Type | Storage | Access |
|------------|---------|--------|
| **Authentication** | `AuthService` + `localStorage` | `AuthService.currentUser$` |
| **User Profile** | `AuthService` | `AuthService.currentUser$` |
| **Shop Info** | `ShopService` | `ShopService.currentShop$` |
| **Permissions** | `AuthService` | `AuthService.permissions$` |
| **UI State** | Component-local | Component properties |
| **Form State** | Reactive Forms | FormGroup instances |

### Data Flow Pattern

```
Component subscribes to Observable
        ↓
Service exposes BehaviorSubject as Observable
        ↓
Service methods update BehaviorSubject
        ↓
All subscribers receive new value
        ↓
Components auto-update via async pipe
```

---

## Module Organization

### Feature Module Structure

Each feature module follows consistent structure:

```
orders/
├── orders-routing.module.ts           # Module routes
├── orders.module.ts                   # Module definition
├── components/
│   ├── order-list/                    # Smart component (container)
│   │   ├── order-list.component.ts
│   │   ├── order-list.component.html
│   │   └── order-list.component.scss
│   ├── order-detail/                  # Smart component
│   ├── order-filter/                  # Presentational component
│   └── order-table/                   # Presentational component
└── services/
    └── orders.service.ts              # Feature service
```

### Smart vs Presentational Components

**Smart Components (Containers):**
- Interact with services
- Manage component state
- Handle business logic
- Pass data to child components

```typescript
// order-list.component.ts (Smart)
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;
  
  constructor(private ordersService: OrdersService) {}
  
  ngOnInit() {
    this.orders$ = this.ordersService.getOrders();
  }
  
  onDelete(id: string) {
    this.ordersService.deleteOrder(id).subscribe();
  }
}
```

**Presentational Components (Dumb):**
- Receive data via @Input
- Emit events via @Output
- No service dependencies
- Purely display logic

```typescript
// order-table.component.ts (Presentational)
export class OrderTableComponent {
  @Input() orders: Order[];
  @Output() delete = new EventEmitter<string>();
  
  handleDelete(id: string) {
    this.delete.emit(id);
  }
}
```

---

## Component Architecture

### Component Lifecycle

```
Constructor
    ↓
ngOnChanges (if inputs change)
    ↓
ngOnInit (initialize component)
    ↓
ngDoCheck (change detection)
    ↓
ngAfterContentInit
    ↓
ngAfterContentChecked
    ↓
ngAfterViewInit
    ↓
ngAfterViewChecked
    ↓
ngOnDestroy (cleanup)
```

### Best Practices

1. **Use OnInit for initialization:**
```typescript
ngOnInit() {
  this.loadData();
  this.setupSubscriptions();
}
```

2. **Unsubscribe in OnDestroy:**
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.data$
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.data = data);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

3. **Use async pipe to avoid manual subscription:**
```html
<div *ngIf="orders$ | async as orders">
  <order-table [orders]="orders"></order-table>
</div>
```

---

## Service Layer

### Base Service Pattern

All API services extend `DataService`:

```typescript
export class DataService {
  protected baseUrl = isDevMode() ? 'http://localhost:3000/api/' : 'api/';
  
  constructor(protected http: HttpClient) {}
  
  // Generic CRUD methods
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }
  
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data);
  }
  
  // ... put, delete methods
}
```

### Feature Service Example

```typescript
@Injectable({ providedIn: 'root' })
export class OrdersService extends DataService {
  
  getOrders(filters?: OrderFilter): Observable<Order[]> {
    const params = this.buildParams(filters);
    return this.get<Order[]>('orders', params).pipe(
      map(orders => orders.map(o => this.transformOrder(o))),
      catchError(this.handleError)
    );
  }
  
  private transformOrder(order: any): Order {
    // Transform API response to internal model
    return { ...order, date: new Date(order.date) };
  }
  
  private handleError(error: HttpErrorResponse) {
    // Centralized error handling
    console.error('Order service error:', error);
    return throwError(() => new Error('Order operation failed'));
  }
}
```

---

## Security Architecture

### JWT Authentication Flow

```
1. User logs in → POST /api/auth/login
2. Backend validates credentials
3. Backend returns JWT token
4. Frontend stores token in localStorage
5. AuthService sets current user
6. All HTTP requests include token in header
7. Route guards protect routes
```

### HTTP Interceptor

**JWT Injection:**

```typescript
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth-token');
    
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    
    return next.handle(req);
  }
}
```

### Route Guards Implementation

**LoginGuard:**
```typescript
@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```

**PermissionGuard:**
```typescript
canActivate(route: ActivatedRouteSnapshot): boolean {
  const requiredPermission = route.data['permission'];
  const hasPermission = this.authService.hasPermission(requiredPermission);
  
  if (!hasPermission) {
    this.router.navigate(['/unauthorized']);
  }
  
  return hasPermission;
}
```

---

## Performance Optimizations

### 1. Lazy Loading Modules

All feature modules are lazy-loaded, reducing initial bundle size by ~60%.

### 2. OnPush Change Detection

Used in presentational components:

```typescript
@Component({
  selector: 'app-order-table',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTableComponent {
  @Input() orders: Order[];
}
```

**Benefits:**
- Skip change detection unless @Input changes
- Improves rendering performance
- Reduces unnecessary checks

### 3. Virtual Scrolling

For large data tables:

```html
<cdk-virtual-scroll-viewport itemSize="50" class="viewport">
  <div *cdkVirtualFor="let order of orders" class="order-row">
    {{ order.orderId }}
  </div>
</cdk-virtual-scroll-viewport>
```

### 4. TrackBy Functions

Optimize *ngFor rendering:

```typescript
trackByOrderId(index: number, order: Order): string {
  return order.id;
}
```

```html
<div *ngFor="let order of orders; trackBy: trackByOrderId">
  {{ order.orderId }}
</div>
```

### 5. Debouncing User Input

```typescript
searchControl = new FormControl();

ngOnInit() {
  this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(value => this.search(value));
}
```

---

## Design Patterns

### 1. Singleton Pattern

Services with `providedIn: 'root'` are singletons:

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Single instance across the app
}
```

### 2. Observer Pattern

RxJS observables for reactive data flow:

```typescript
private dataSubject = new BehaviorSubject<Data[]>([]);
public data$ = this.dataSubject.asObservable();
```

### 3. Facade Pattern

Services act as facades to complex operations:

```typescript
// OrderFacadeService hides complexity
export class OrderFacadeService {
  constructor(
    private ordersService: OrdersService,
    private orderItemsService: OrderItemsService,
    private skuService: SkuService
  ) {}
  
  getFullOrderDetails(orderId: string): Observable<FullOrder> {
    return combineLatest([
      this.ordersService.getOrder(orderId),
      this.orderItemsService.getItems(orderId),
      this.skuService.getSkusForOrder(orderId)
    ]).pipe(
      map(([order, items, skus]) => this.mergeOrderData(order, items, skus))
    );
  }
}
```

### 4. Dependency Injection

Constructor injection for loose coupling:

```typescript
export class OrderListComponent {
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
```

### 5. Reactive Forms

Model-driven forms with validation:

```typescript
orderForm = this.fb.group({
  orderId: ['', Validators.required],
  customer: ['', [Validators.required, Validators.minLength(3)]],
  items: this.fb.array([])
});
```

---

## Build Configuration

### Angular CLI Configuration

**File:** `angular.json`

```json
{
  "projects": {
    "darazapi": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "buildOptimizer": true
            }
          }
        }
      }
    }
  }
}
```

### Bundle Optimization

- **AOT Compilation** - Ahead-of-time compilation in production
- **Tree Shaking** - Remove unused code
- **Minification** - Compress JavaScript
- **Lazy Loading** - Split code by routes
- **Differential Loading** - Separate bundles for modern/legacy browsers

---

## Summary

The Edashlytic frontend architecture prioritizes:

1. **Modularity** - Independent, reusable feature modules
2. **Performance** - Lazy loading, OnPush, virtual scrolling
3. **Maintainability** - Clear patterns, separation of concerns
4. **Security** - JWT auth, route guards, interceptors
5. **Scalability** - Service-based state, reactive patterns

This architecture supports the complex requirements of an e-commerce analytics platform while maintaining code quality and developer productivity.
