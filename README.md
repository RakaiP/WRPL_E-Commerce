# Merchy: A Modern Full-Stack E-Commerce Platform

A merchandise-focused e-commerce platform built for the **WRPL (Rekayasa Perangkat Lunak Lanjut)** course at Universitas Gadjah Mada.

## 🚀 Live Demo

Check out the live deployed applications on Vercel:

* **Customer Storefront:** [**https://merchy-customer.vercel.app/**](https://merchy-customer.vercel.app/)

* **Admin Dashboard:** [**https://merchy-admin.vercel.app/**](https://merchy-admin.vercel.app/)

## 📋 Table of Contents

* [Key Features](#-key-features)
* [Architecture](#-architecture)
* [Tech Stack](#️-tech-stack)
* [Getting Started (Local Development)](#-getting-started-local-development)
* [Learning & Adaptation Journey](#-learning--adaptation-journey)
* [Team Members](#-team-members)
* [Docker Instructions (Legacy)](#-docker-instructions-legacy)

## ✨ Key Features

This project is a monorepo containing two separate Next.js applications:

### `my-ecommerce-admin/` (Admin Dashboard & API Server)

* **Multi-Store Management:** Create and manage multiple unique stores from a single admin panel.
* **Inventory Management:** Full CRUD operations for products, categories, sizes, and colors per store.
* **Order Tracking:** View and manage customer orders for each store.
* **Promotions:** Create and manage billboards for each storefront.
* **Analytics:** A central dashboard with revenue, sales, and inventory insights per store.
* **API Server:** Serves RESTful APIs for each store, identified by a unique `storeId`.
* **Secure Authentication:** Protected routes for admin users, managed via Clerk.

### `my-ecommerce-customer/` (Customer Storefront)

* **Dynamic Storefront:** Consumes data from a specific store's API endpoint.
* **Shopping Cart:** A fully persistent shopping cart.
* **Secure Checkout:** Seamless payment integration using Stripe.
* **Order History:** View past orders (feature to be implemented).
* **API-Driven:** All data is fetched dynamically from the Admin API.

## 🏗️ Architecture

The project follows a decoupled architecture where the customer-facing application is completely separate from the admin and backend services. This allows for independent scaling and development.

```
                                          ┌───────────────────────┐
                                          │   Cloud PostgreSQL DB │
                                          └───────────┬───────────┘
                                                      │ (Prisma ORM)
                                                      │
                                          ┌───────────────────────┐
                                          │      Admin Backend    │
                                          │  (Next.js API Routes) │
                                          └─┬───────────────────┬─┘
                                            │                   │ (Serves UI)
(Consumes REST API: /api/{storeId})         │                   │
                                            │                   │
┌───────────────────────────┐               │            ┌────────────────────┐
│     Customer Frontend     │<--------------+            │   Admin Dashboard  │
│      (Vercel/Port 3001)   │                            │ (Vercel/Port 3000) │
└─────────────┬─────────────┘                            └──────────┬─────────┘
              │                                                     │
              │ (Browsing, Cart, Checkout)                          │ (Store/Product Mgmt)
              │                                                     │
┌─────────────┴─────────────┐                            ┌──────────┴──────────┐
│         Customer          │                            │        Admin        │
└───────────────────────────┘                            └─────────────────────┘
```

## 🛠️ Tech Stack

### Core Technologies

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + ShadCN UI
* **Database ORM:** Prisma

### Admin & Backend (`my-ecommerce-admin`)

* **Authentication:** Clerk
* **Database:** PostgreSQL (hosted on a cloud provider)
* **Image Uploads:** Uploadthing
* **API:** Next.js API Routes

### Customer Frontend (`my-ecommerce-customer`)

* **Payment Gateway:** Stripe
* **State Management:** Zustand
* **API Consumption:** `axios` for fetching data from the admin backend.

## 🏁 Getting Started (Local Development)

This project is configured to run with a cloud-hosted PostgreSQL database. The recommended way to run it locally is to set up your own environment variables.

### Prerequisites

* Node.js (v18 or later)
* `npm` (or `yarn`, `pnpm`)
* A free PostgreSQL database instance (e.g., from Vercel, Neon, or Supabase).

### Step-by-Step Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/RakaiP/WRPL_E-Commerce.git](https://github.com/RakaiP/WRPL_E-Commerce.git)
   cd WRPL_E-Commerce
   ```

2. **Set up Environment Variables:**
   This is the most important step. You need to create a `.env` file in **both** the `my-ecommerce-admin` and `my-ecommerce-customer` directories.

   * In `my-ecommerce-admin/`, copy the example file:
     ```bash
     cp my-ecommerce-admin/.env.example my-ecommerce-admin/.env
     ```

   * In `my-ecommerce-customer/`, copy the example file:
     ```bash
     cp my-ecommerce-customer/.env.example my-ecommerce-customer/.env
     ```

   Now, **edit both `.env` files** and fill in the values with your own keys and URLs. Pay close attention to the variable in the customer app.

   **In `my-ecommerce-admin/.env`:**
   * `DATABASE_URL`: Your cloud PostgreSQL connection string.
   * `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`
   * `UPLOADTHING_SECRET` & `UPLOADTHING_APP_ID`
   * ... and other variables as specified in the example file.

   **In `my-ecommerce-customer/.env`:**
   * **`NEXT_PUBLIC_API_URL`**: This is crucial. It's the API endpoint of the store you want to connect to. After creating a store in the admin dashboard, get its ID from the URL (e.g., in `.../settings/4d5b...`). Your local URL will be `http://localhost:3000/api/{storeId}`.
   * `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   * ... and other variables.

3. **Install Dependencies:**
   Run the installation command in each application's directory.
   ```bash
   # Install dependencies for the admin app
   cd my-ecommerce-admin
   npm install
   
   # Install dependencies for the customer app
   cd ../my-ecommerce-customer
   npm install
   ```

4. **Push Database Schema:**
   From the `my-ecommerce-admin` directory, push the Prisma schema to your cloud database. This will create all the necessary tables.
   ```bash
   # Navigate to the admin directory if you aren't already there
   cd my-ecommerce-admin
   npx prisma db push
   ```

5. **Run the Applications:**
   You'll need two separate terminal windows to run both the admin and customer apps simultaneously.

   * **Terminal 1 (Admin App):**
     ```bash
     cd my-ecommerce-admin
     npm run dev
     ```
     The admin dashboard will be available at `http://localhost:3000`. Log in, create your first store, and get its `storeId`.

   * **Terminal 2 (Customer App):**
     ```bash
     cd my-ecommerce-customer
     npm run dev
     ```
     The customer storefront will be available at `http://localhost:3001`.

## 💡 Learning & Adaptation Journey

This project was initially based on the excellent [10-hour eCommerce tutorial by @codewithantonio (2023)](https://www.youtube.com/watch?v=5miHyP6lq6o).

However, the web development ecosystem moves incredibly fast. A significant part of our learning process involved **modernizing the legacy codebase** to align with current best practices. This required independent research and problem-solving to:

* **Update Deprecated Code:** Refactored syntax for newer versions of Next.js and ShadCN UI.
* **Modernize Authentication:** Adapted the authentication flow to match the latest standards from Clerk.
* **Type Safety:** Resolved numerous TypeScript errors that arose from updated library versions.
* **Improve Project Structure:** Re-organized components and files for better maintainability and separation of concerns.

This adaptation was invaluable, providing real-world experience in maintaining and evolving a codebase over time.

## 👥 Team Members

* **Rakai Andaru Priandra** – 23/511442/PA/21796
* **Muhammad Naufal Zahir** – 23/511471/PA/21804
* *(and 3 other team members)*

## 🐳 Docker Instructions (Legacy)
<details>
  <summary><strong>Click to expand for original Docker setup</strong></summary>

  > **Note:** The following instructions are for the original project setup which used a local PostgreSQL database via Docker. For the current cloud database setup, the **[Getting Started](#-getting-started-local-development)** method above is recommended.

  ### Option 1: Using Docker Compose
  This will build and run all services (database, admin, customer).
  ```bash
  # Build and run all services
  docker-compose up --build

  # Or run in the background
  docker-compose up -d --build
  ```
  * Admin Dashboard: `http://localhost:3000`
  * Customer Store: `http://localhost:3001`

  ### Useful Docker Commands
  ```bash
  # Stop all containers
  docker-compose down

  # Stop and remove volumes (⚠️ This will delete all database data)
  docker-compose down -v

  # View logs for all services
  docker-compose logs -f

  # Access the database directly
  docker-compose exec database psql -U ecommerce_user -d ecommerce_db
  ```
</details>
