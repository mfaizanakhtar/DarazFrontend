# Frontend Setup Guide

Complete installation and configuration guide for the Edashlytic Angular frontend.

---

## Prerequisites

- **Node.js** 12.x or higher
- **npm** 6.x or higher
- **Angular CLI** 9.1.10

---

## Installation

### 1. Install Angular CLI

```bash
npm install -g @angular/cli@9.1.10
```

### 2. Install Dependencies

```bash
cd DarazFrontend
npm install
```

This will install all dependencies including:
- Angular 9.1.9
- TypeScript 3.8.3
- Bootstrap 4.5.0
- Angular Material 11.1.1
- ApexCharts 3.19.2
- And 60+ other packages

---

## Configuration

### Environment Files

#### Development (`src/environments/environment.ts`)

```typescript
export const environment = {
  production: false
};
```

The API URL is configured in services using `isDevMode()`:
```typescript
private baseUrl = isDevMode() 
  ? "http://localhost:3000/api/"  // Development
  : "api/";                        // Production
```

#### Production (`src/environments/environment.prod.ts`)

```typescript
export const environment = {
  production: true
};
```

### Update API URL

If your backend runs on a different port or host:

1. Open `src/app/services/data.service.ts`
2. Update the `baseUrl`:
   ```typescript
   private baseUrl = isDevMode() 
     ? "http://your-backend-host:port/api/" 
     : "api/";
   ```

3. Also update in `src/app/services/auth.service.ts`:
   ```typescript
   private baseURL = isDevMode() 
     ? "http://your-backend-host:port/api/" 
     : "api/";
   ```

---

## Running the Application

### Development Server

```bash
npm start
# or
ng serve
```

The application will run on `http://localhost:4200`

Access the dashboard at: `http://localhost:4200`

**Auto-reload:** Changes will automatically reload the browser.

### Custom Port

```bash
ng serve --port 4201
```

### Open Browser Automatically

```bash
ng serve --open
```

---

## Verification

### 1. Check if Server is Running

You should see:
```
** Angular Live Development Server is listening on localhost:4200 **
✔ Compiled successfully.
```

### 2. Open Browser

Navigate to `http://localhost:4200`

You should see the login page.

### 3. Test API Connection

Open browser console (F12) and check for any network errors.

If you see API connection errors:
- Ensure backend is running on `http://localhost:3000`
- Check CORS configuration on backend
- Verify API URL in services

---

## Default Credentials

If backend has seed data, default admin account:
```
Username: admin
Password: (check with backend team)
```

---

## Common Issues

### Port Already in Use

```
Port 4200 is already in use
```

**Solution:**
```bash
ng serve --port 4201
```

### Module Not Found

```
Cannot find module '@angular/core'
```

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### API Connection Failed

```
Http failure response for http://localhost:3000/api/...
```

**Solutions:**
- Ensure backend is running: `cd ../DarazBackend && npm start`
- Check backend CORS configuration
- Verify API URL in `data.service.ts` and `auth.service.ts`

### Compilation Errors

```
ERROR in ./src/app/...
```

**Solution:**
```bash
npm install
ng serve --aot=false
```

### Angular CLI Version Mismatch

```
Your global Angular CLI version is greater than your local version
```

**Solution:**
```bash
npm install --save-dev @angular/cli@9.1.10
```

---

## Building for Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for production build instructions.

---

## Next Steps

- ✅ Application is running
- 📖 Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the structure
- 🧩 Explore [MODULES.md](MODULES.md) for module documentation
- 🔧 Check [DEVELOPMENT.md](DEVELOPMENT.md) for development workflow

---

**Last Updated:** February 14, 2026
