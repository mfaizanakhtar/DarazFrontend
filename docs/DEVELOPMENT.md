# Development Guide

> **Development workflow, coding standards, and guidelines for the Edashlytic frontend**

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Standards](#project-standards)
- [Adding New Features](#adding-new-features)
- [Testing](#testing)
- [Debugging](#debugging)
- [Code Review Guidelines](#code-review-guidelines)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

- Node.js 12.x or higher
- npm 6.x or higher
- Angular CLI 9.1.10
- Git
- VS Code (recommended) or your preferred IDE

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd DarazFrontend

# Install dependencies
npm install

# Start development server
npm start

# Open browser
# http://localhost:4200
```

### IDE Setup (VS Code)

**Recommended Extensions:**
- Angular Language Service
- Angular Snippets
- TSLint
- Prettier - Code formatter
- GitLens
- Auto Import

**VS Code Settings:**

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

---

## Development Workflow

### Daily Workflow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and test locally
npm start

# 4. Commit changes
git add .
git commit -m "feat: add new feature"

# 5. Push to remote
git push origin feature/your-feature-name

# 6. Create pull request
# (via GitHub/GitLab interface)
```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation changes
- `test/` - Test additions/changes

**Examples:**
- `feature/order-export`
- `fix/login-validation`
- `refactor/service-layer`

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructuring
- `test:` - Tests
- `chore:` - Maintenance

**Examples:**
```
feat(orders): add bulk status update functionality

fix(auth): resolve token expiration issue

docs(readme): update installation instructions
```

---

## Project Standards

### TypeScript Style Guide

#### 1. **Naming Conventions**

```typescript
// Classes: PascalCase
export class OrderService { }

// Interfaces: PascalCase with 'I' prefix (optional)
export interface IOrder { }
// or
export interface Order { }

// Variables/Functions: camelCase
let orderCount = 0;
function calculateTotal() { }

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;

// Private members: prefix with underscore
private _internalState: any;
```

#### 2. **File Naming**

```
// Components
order-list.component.ts
order-list.component.html
order-list.component.scss
order-list.component.spec.ts

// Services
orders.service.ts
orders.service.spec.ts

// Models
order.model.ts
order-item.model.ts

// Guards
login.guard.ts

// Directives
highlight.directive.ts

// Pipes
currency-format.pipe.ts
```

#### 3. **Component Structure**

```typescript
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
  // 1. Public Inputs/Outputs
  @Input() filters: OrderFilter;
  @Output() orderSelected = new EventEmitter<Order>();
  
  // 2. Public properties
  orders: Order[] = [];
  isLoading = false;
  
  // 3. Private properties
  private destroy$ = new Subject<void>();
  
  // 4. Constructor (inject dependencies)
  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) {}
  
  // 5. Lifecycle hooks
  ngOnInit() {
    this.loadOrders();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // 6. Public methods
  loadOrders() {
    this.isLoading = true;
    this.ordersService.getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        orders => {
          this.orders = orders;
          this.isLoading = false;
        },
        error => this.handleError(error)
      );
  }
  
  // 7. Private methods
  private handleError(error: any) {
    console.error(error);
    this.isLoading = false;
  }
}
```

#### 4. **Service Structure**

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrdersService extends DataService {
  
  constructor(protected http: HttpClient) {
    super(http);
  }
  
  getOrders(filters?: OrderFilter): Observable<Order[]> {
    const params = this.buildParams(filters);
    return this.get<Order[]>('orders', params).pipe(
      map(orders => this.transformOrders(orders)),
      catchError(this.handleError)
    );
  }
  
  private transformOrders(orders: any[]): Order[] {
    return orders.map(o => ({
      ...o,
      createdAt: new Date(o.createdAt)
    }));
  }
  
  private handleError(error: any): Observable<never> {
    console.error('OrdersService error:', error);
    return throwError(() => new Error('Order operation failed'));
  }
}
```

### HTML Template Guidelines

#### 1. **Use Angular Best Practices**

```html
<!-- Use structural directives -->
<div *ngIf="isLoading">Loading...</div>
<div *ngIf="orders.length > 0; else noOrders">
  <div *ngFor="let order of orders; trackBy: trackById">
    {{ order.orderId }}
  </div>
</div>
<ng-template #noOrders>
  <p>No orders found</p>
</ng-template>

<!-- Use async pipe for observables -->
<div *ngIf="orders$ | async as orders">
  <order-list [orders]="orders"></order-list>
</div>

<!-- Event binding -->
<button (click)="onSave()">Save</button>

<!-- Two-way binding -->
<input [(ngModel)]="searchTerm" />

<!-- Property binding -->
<img [src]="imagePath" [alt]="imageAlt" />
```

#### 2. **Accessibility**

```html
<!-- Always include alt text -->
<img src="logo.png" alt="Company Logo" />

<!-- Use semantic HTML -->
<nav>...</nav>
<main>...</main>
<aside>...</aside>

<!-- ARIA labels -->
<button aria-label="Close dialog" (click)="close()">×</button>

<!-- Form labels -->
<label for="email">Email:</label>
<input id="email" type="email" />
```

### SCSS Style Guidelines

#### 1. **Component Styles**

```scss
// Use :host for component root
:host {
  display: block;
  padding: 20px;
}

// Use BEM naming
.order-list {
  &__header {
    display: flex;
    justify-content: space-between;
  }
  
  &__item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    
    &--selected {
      background-color: #e3f2fd;
    }
  }
}

// Variables
$primary-color: #1976d2;
$spacing-unit: 8px;

// Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

---

## Adding New Features

### 1. Create a New Component

```bash
# Generate component
ng generate component orders/order-detail

# Or using shorthand
ng g c orders/order-detail

# Generate with options
ng g c orders/order-detail --skip-tests
```

**Generated files:**
- `order-detail.component.ts`
- `order-detail.component.html`
- `order-detail.component.scss`
- `order-detail.component.spec.ts`

### 2. Create a New Service

```bash
# Generate service
ng generate service services/notifications

# Or using shorthand
ng g s services/notifications
```

### 3. Create a New Module

```bash
# Generate module with routing
ng generate module reports --routing

# Add component to module
ng g c reports/sales-report --module=reports
```

### 4. Add a Route

**File:** `app-routing.module.ts` or feature routing module

```typescript
const routes: Routes = [
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
    canActivate: [LoginGuard]
  }
];
```

### 5. Add a Guard

```bash
# Generate guard
ng generate guard guards/admin

# Or
ng g g guards/admin
```

```typescript
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (this.authService.hasRole('admin')) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
```

---

## Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
ng test

# Run tests with code coverage
ng test --code-coverage
```

### Component Test Example

```typescript
describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let ordersService: jasmine.SpyObj<OrdersService>;

  beforeEach(async(() => {
    const ordersServiceSpy = jasmine.createSpyObj('OrdersService', ['getOrders']);
    
    TestBed.configureTestingModule({
      declarations: [ OrderListComponent ],
      providers: [
        { provide: OrdersService, useValue: ordersServiceSpy }
      ]
    }).compileComponents();
    
    ordersService = TestBed.inject(OrdersService) as jasmine.SpyObj<OrdersService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on init', () => {
    const mockOrders = [{ id: '1', orderId: 'ORD-001' }];
    ordersService.getOrders.and.returnValue(of(mockOrders));
    
    component.ngOnInit();
    
    expect(ordersService.getOrders).toHaveBeenCalled();
    expect(component.orders).toEqual(mockOrders);
  });
});
```

### Service Test Example

```typescript
describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService]
    });
    
    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch orders', () => {
    const mockOrders = [{ id: '1' }, { id: '2' }];
    
    service.getOrders().subscribe(orders => {
      expect(orders.length).toBe(2);
      expect(orders).toEqual(mockOrders);
    });
    
    const req = httpMock.expectOne(req => req.url.includes('orders'));
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });
});
```

---

## Debugging

### Browser DevTools

```typescript
// Add breakpoints
debugger;

// Console logging
console.log('Orders:', this.orders);
console.table(this.orders);
console.error('Error:', error);

// Performance timing
console.time('loadOrders');
this.loadOrders();
console.timeEnd('loadOrders');
```

### Angular DevTools

Install Angular DevTools extension for Chrome/Edge:
- Component explorer
- Change detection profiler
- Dependency injection tree
- Router tree

### VS Code Debugging

**File:** `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

---

## Code Review Guidelines

### Before Submitting PR

- [ ] Code follows project style guide
- [ ] All tests pass
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Components have proper OnDestroy cleanup
- [ ] Observables properly unsubscribed
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Accessibility considered

### Review Checklist

- [ ] Code is readable and well-structured
- [ ] Changes align with requirements
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Documentation updated if needed

---

## Common Tasks

### Update Node Packages

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update @angular/core

# Update all packages (be careful)
npm update
```

### Clear Cache

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build for Specific Environment

```bash
# Development build
ng build

# Production build
ng build --prod

# Staging build (if configured)
ng build --configuration=staging
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 4200
lsof -i :4200

# Kill process
kill -9 <PID>

# Or use different port
ng serve --port 4201
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Angular CLI Version Mismatch

```bash
# Check versions
ng version

# Update Angular CLI globally
npm install -g @angular/cli@9.1.10

# Update local CLI
npm install @angular/cli@9.1.10
```

### TypeScript Compilation Errors

```bash
# Check TypeScript version
tsc --version

# Reinstall TypeScript
npm install typescript@3.8.3

# Clean build
rm -rf dist
ng build
```

### Memory Issues

```bash
# Increase Node memory limit
NODE_OPTIONS=--max_old_space_size=4096 ng serve
```

### CORS Issues in Development

**File:** `proxy.conf.json`

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

**Update** `package.json`:

```json
{
  "scripts": {
    "start": "ng serve --proxy-config proxy.conf.json"
  }
}
```

---

## Performance Tips

1. **Use OnPush change detection** for presentational components
2. **Lazy load modules** for route-based code splitting
3. **Use trackBy** with *ngFor
4. **Debounce user input** for search/filter operations
5. **Use virtual scrolling** for large lists
6. **Unsubscribe from observables** to prevent memory leaks
7. **Use async pipe** instead of manual subscriptions

---

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [RxJS Documentation](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Angular CLI Reference](https://angular.io/cli)

---

## Summary

This development guide covers:
- ✅ Development workflow
- ✅ Coding standards
- ✅ Feature development
- ✅ Testing strategies
- ✅ Debugging techniques
- ✅ Common tasks
- ✅ Troubleshooting solutions

Follow these guidelines to maintain code quality and consistency across the project.
