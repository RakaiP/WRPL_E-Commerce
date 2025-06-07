# Merchandise E-Commerce Website

This project is developed as part of the **WRPL** course for the **CSB class**. It is a merchandise-focused e-commerce platform built by a group of 5 people, consisting of two main applications:

---

## 🔹 Project Structure

### `my-ecommerce-admin/` – Admin Dashboard & API Server
This is the admin interface and API provider that:
- **Admin Interface**: Allows staff to manage merchandise inventory, orders, promotions, and analytics
- **API Server**: Provides REST/GraphQL APIs for the customer application
- **Database**: Contains Prisma schema and handles all database operations
- **Authentication**: Manages admin authentication and authorization

### `my-ecommerce-customer/` – Customer Store Frontend
This is the customer-facing application that:
- Consumes APIs from the admin application
- Provides customer interface for browsing, cart, and checkout
- Handles customer authentication separately
- No direct database access (all data comes through admin APIs)

---

## 🛠️ Tech Stack

### Admin Application
- Next.js (API Routes + Admin UI)
- TypeScript
- Tailwind CSS + ShadCN UI
- **Prisma + PostgreSQL** (Database layer)
- Clerk/Auth.js (Admin authentication)
- Uploadthing (Image uploads)

### Customer Application
- Next.js (Frontend only)
- TypeScript
- Tailwind CSS + ShadCN UI
- **API Consumption** (No direct database)
- Stripe (Payment integration)
- Customer authentication (separate from admin)

---

## 🏗️ Architecture
```
┌─────────────────┐    HTTP/API     ┌──────────────────┐
│   Customer      │ ──────────────> │   Admin          │
│   Frontend      │                 │   Backend + UI   │
│   (Port 3001)   │                 │   (Port 3000)    │
└─────────────────┘                 └──────────────────┘
                                            │
                                            ▼
                                    ┌──────────────────┐
                                    │   PostgreSQL     │
                                    │   Database       │
                                    │   (Port 5432)    │
                                    └──────────────────┘
```

---

## 📽️ Base Tutorial & Adaptation Notes

We followed the [10-hour eCommerce tutorial](https://www.youtube.com/watch?v=5miHyP6lExg) by [@codewithantonio](https://www.youtube.com/@codewithantonio), published in 2023, as the foundation for this project.

However, since many libraries and frameworks (e.g., Next.js, Prisma, Clerk, ShadCN UI) have evolved significantly since then, **we had to research and adapt to modern best practices** to ensure our implementation remains up-to-date, secure, and scalable. This includes:

- Updating deprecated APIs or syntax in Next.js and ShadCN UI
- Refactoring components for improved performance and readability
- Modifying authentication and database flows to match the latest Clerk/Auth.js and Prisma standards
- Fixing TypeScript type errors due to newer library versions
- Revising project structure to support cleaner separation of concerns

This process was valuable not only for building a solid foundation but also for understanding **how to maintain and modernize legacy codebases** in real-world development.

---

## 👥 Team Members
- Rakai Andaru Priandra – 23/511442/PA/21796
- Muhammad Naufal Zahir – 23/511471/PA/21804
- 
- 
- 
- 

---

## 📁 How to Run the Project

### Option 1: Using Docker Compose (Recommended)
```bash
# Build and run all services (database + admin + customer)
docker-compose up --build

# Or run in background
docker-compose up -d --build

# Access the applications:
# Admin Dashboard: http://localhost:3000
# Customer Store: http://localhost:3001
# Database: localhost:5432 (for external connections)
```

### Option 2: Using Single Docker Container
```bash
# Build and run both apps in one container
docker build -t ecommerce-fullstack .
docker run -p 3000:3000 -p 3001:3001 ecommerce-fullstack

# Both applications will be available:
# Admin Dashboard: http://localhost:3000
# Customer Store: http://localhost:3001
```

### Option 3: Manual Setup
```bash
# Install dependencies for both apps
cd my-ecommerce-admin
npm install
cd ../my-ecommerce-customer
npm install

# Run admin dashboard (port 3000)
cd my-ecommerce-admin
npm run dev

# Run customer store (port 3001) - in a new terminal
cd my-ecommerce-customer
npm run dev
```

### Database Credentials
- **Host**: localhost (or `database` from within containers)
- **Port**: 5432
- **Database**: ecommerce_db
- **Username**: ecommerce_user
- **Password**: ecommerce_password

### 🐳 Docker Commands
```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (⚠️ This will delete database data)
docker-compose down -v

# Rebuild containers
docker-compose up --build --force-recreate

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f database
docker-compose logs -f admin
docker-compose logs -f customer

# Access database directly
docker-compose exec database psql -U ecommerce_user -d ecommerce_db

# Clean up unused Docker resources
docker system prune -a
```

### 🔧 Development vs Production
- **Development**: Uses `docker-compose up` with hot reloading and volume mounts
- **Production**: Uses optimized builds with standalone Next.js output
- Each Dockerfile has multi-stage builds for both development and production
