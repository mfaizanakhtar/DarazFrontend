# Deployment Guide

> **Build, deployment, and production setup for the Edashlytic Angular frontend**

---

## Table of Contents

- [Production Build](#production-build)
- [Build Optimization](#build-optimization)
- [Environment Configuration](#environment-configuration)
- [Docker Deployment](#docker-deployment)
- [Nginx Configuration](#nginx-configuration)
- [Cloud Deployment](#cloud-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Analytics](#monitoring--analytics)
- [Troubleshooting](#troubleshooting)

---

## Production Build

### Build Commands

```bash
# Standard production build
npm run build

# Or using Angular CLI directly
ng build --prod

# Build with specific configuration
ng build --configuration=production

# Build with optimization disabled (debugging)
ng build --prod --optimization=false

# Build with source maps
ng build --prod --source-map
```

### Build Output

```
dist/
└── darazapi/              # Output directory
    ├── index.html         # Entry HTML file
    ├── main.[hash].js     # Main bundle
    ├── polyfills.[hash].js # Polyfills
    ├── runtime.[hash].js  # Runtime
    ├── styles.[hash].css  # Compiled styles
    ├── assets/            # Static assets
    └── [lazy-chunks].js   # Lazy-loaded modules
```

### Build Statistics

```bash
# Generate build report
ng build --prod --stats-json

# Analyze bundle size (requires webpack-bundle-analyzer)
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/darazapi/stats.json
```

---

## Build Optimization

### Angular CLI Optimizations

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
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

### Optimization Techniques

#### 1. **Ahead-of-Time (AOT) Compilation**

AOT compiles templates during build (enabled by default in production):

```bash
ng build --prod --aot
```

**Benefits:**
- Faster rendering
- Smaller bundle size
- Early error detection
- Better security

#### 2. **Tree Shaking**

Automatically removes unused code:

```typescript
// Import only what you need
import { map } from 'rxjs/operators';  // Good
import * as rxjsOperators from 'rxjs/operators';  // Bad
```

#### 3. **Lazy Loading**

Load modules on-demand:

```typescript
const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  }
];
```

#### 4. **Bundle Size Reduction**

```typescript
// Use smaller alternatives
// Instead of Moment.js (288KB), use date-fns or native Date
import { format } from 'date-fns';

// Import only needed Material components
import { MatButtonModule } from '@angular/material/button';
// Not entire Material library
```

#### 5. **Image Optimization**

```bash
# Compress images before deployment
# Use tools like imagemin, TinyPNG

# Or use CDN for images
<img src="https://cdn.example.com/optimized-image.webp" />
```

---

## Environment Configuration

### Environment Files

**Development:** `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/',
  stripePublicKey: 'pk_test_...',
  googleAnalyticsId: '',
  enableDebug: true
};
```

**Production:** `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.edashlytic.com/api/',
  stripePublicKey: 'pk_live_...',
  googleAnalyticsId: 'UA-XXXXXXXX-X',
  enableDebug: false
};
```

**Staging:** `src/environments/environment.staging.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://staging-api.edashlytic.com/api/',
  stripePublicKey: 'pk_test_...',
  googleAnalyticsId: 'UA-XXXXXXXX-X',
  enableDebug: true
};
```

### Build with Environment

```bash
# Production
ng build --configuration=production

# Staging
ng build --configuration=staging

# Add staging to angular.json
{
  "configurations": {
    "staging": {
      "fileReplacements": [{
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.staging.ts"
      }]
    }
  }
}
```

---

## Docker Deployment

### Dockerfile

**File:** `Dockerfile`

```dockerfile
# Stage 1: Build Angular app
FROM node:12-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build for production
RUN npm run build -- --prod

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app to nginx
COPY --from=build /app/dist/darazapi /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Commands

```bash
# Build Docker image
docker build -t edashlytic-frontend:latest .

# Run container
docker run -d -p 80:80 --name edashlytic-frontend edashlytic-frontend:latest

# Stop container
docker stop edashlytic-frontend

# Remove container
docker rm edashlytic-frontend

# View logs
docker logs -f edashlytic-frontend
```

### Docker Compose

**File:** `docker-compose.yml`

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    networks:
      - edashlytic-network

networks:
  edashlytic-network:
    driver: bridge
```

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f frontend
```

---

## Nginx Configuration

### nginx.conf

**File:** `nginx.conf`

```nginx
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  
  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';
  
  access_log /var/log/nginx/access.log main;
  
  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;
  
  # Gzip compression
  gzip on;
  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_types text/plain text/css text/xml text/javascript
             application/json application/javascript application/xml+rss
             application/rss+xml font/truetype font/opentype
             application/vnd.ms-fontobject image/svg+xml;
  
  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
      expires 1y;
      add_header Cache-Control "public, immutable";
    }
    
    # Angular routing - redirect all requests to index.html
    location / {
      try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to backend
    location /api/ {
      proxy_pass http://backend:3000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Health check endpoint
    location /health {
      access_log off;
      return 200 "healthy\n";
      add_header Content-Type text/plain;
    }
  }
}
```

### SSL Configuration (HTTPS)

```nginx
server {
  listen 443 ssl http2;
  server_name edashlytic.com;
  
  ssl_certificate /etc/ssl/certs/cert.pem;
  ssl_certificate_key /etc/ssl/private/key.pem;
  
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;
  ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
  
  # ... rest of configuration
}

# Redirect HTTP to HTTPS
server {
  listen 80;
  server_name edashlytic.com;
  return 301 https://$server_name$request_uri;
}
```

---

## Cloud Deployment

### AWS S3 + CloudFront

#### 1. **Build and Upload to S3**

```bash
# Build
ng build --prod

# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Sync to S3 bucket
aws s3 sync dist/darazapi/ s3://edashlytic-frontend/ --delete

# Set public read access
aws s3 website s3://edashlytic-frontend/ --index-document index.html --error-document index.html
```

#### 2. **CloudFront Setup**

- Create CloudFront distribution
- Set S3 bucket as origin
- Configure custom error responses: 404 → /index.html (for SPA routing)
- Add custom domain (optional)
- Enable HTTPS

### Azure Static Web Apps

```bash
# Install Azure CLI
brew install azure-cli  # macOS
# or
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash  # Linux

# Login
az login

# Deploy
az staticwebapp create \
  --name edashlytic-frontend \
  --resource-group edashlytic-rg \
  --source dist/darazapi \
  --location "eastus" \
  --branch main \
  --app-location "/" \
  --output-location "dist/darazapi"
```

### Google Cloud Platform (Firebase Hosting)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy --only hosting
```

**firebase.json:**

```json
{
  "hosting": {
    "public": "dist/darazapi",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|js|css|woff|woff2|ttf|eot)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**vercel.json:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/darazapi",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## CI/CD Pipeline

### GitHub Actions

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '12'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --watch=false --browsers=ChromeHeadless
      
      - name: Build
        run: npm run build -- --prod
      
      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: 'us-east-1'
          SOURCE_DIR: 'dist/darazapi'
```

### GitLab CI/CD

**File:** `.gitlab-ci.yml`

```yaml
image: node:12

stages:
  - build
  - test
  - deploy

cache:
  paths:
    - node_modules/

build:
  stage: build
  script:
    - npm ci
    - npm run build -- --prod
  artifacts:
    paths:
      - dist/

test:
  stage: test
  script:
    - npm ci
    - npm test -- --watch=false --browsers=ChromeHeadless

deploy:
  stage: deploy
  only:
    - main
  script:
    - npm install -g firebase-tools
    - firebase deploy --token $FIREBASE_TOKEN --only hosting
  environment:
    name: production
    url: https://edashlytic.com
```

---

## Monitoring & Analytics

### Google Analytics

**File:** `src/index.html`

```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-XXXXXXXX-X');
  </script>
</head>
```

### Error Tracking (Sentry)

```bash
npm install @sentry/angular @sentry/tracing
```

**File:** `src/main.ts`

```typescript
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

if (environment.production) {
  Sentry.init({
    dsn: 'https://xxxxx@sentry.io/xxxxx',
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ['localhost', 'https://edashlytic.com'],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    tracesSampleRate: 1.0,
  });
}
```

### Performance Monitoring

```typescript
// Measure performance
performance.mark('orders-load-start');
this.loadOrders();
performance.mark('orders-load-end');
performance.measure('orders-load', 'orders-load-start', 'orders-load-end');
```

---

## Troubleshooting

### Build Errors

**"JavaScript heap out of memory"**

```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 ng build --prod
```

**"Module not found"**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist
npm install
ng build --prod
```

### Deployment Issues

**404 on page refresh (SPA routing)**

Ensure server redirects all requests to `index.html`:

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^ /index.html [L]
```

**CORS errors in production**

Configure backend to allow frontend origin:

```javascript
// Backend (Express)
app.use(cors({
  origin: 'https://edashlytic.com',
  credentials: true
}));
```

---

## Checklist

### Pre-Deployment

- [ ] All tests pass
- [ ] Build succeeds without errors
- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Assets optimized (images, fonts)
- [ ] Analytics/monitoring configured
- [ ] Error tracking enabled
- [ ] Security headers configured
- [ ] SSL certificate installed
- [ ] Domain configured

### Post-Deployment

- [ ] Application loads successfully
- [ ] All pages accessible
- [ ] API integration working
- [ ] Authentication functional
- [ ] Analytics tracking
- [ ] Error tracking working
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Cross-browser compatible

---

## Summary

This deployment guide covers:
- ✅ Production build process
- ✅ Build optimizations
- ✅ Docker containerization
- ✅ Nginx configuration
- ✅ Cloud deployment (AWS, Azure, GCP)
- ✅ CI/CD pipelines
- ✅ Monitoring & analytics
- ✅ Troubleshooting

The frontend is now ready for production deployment!
