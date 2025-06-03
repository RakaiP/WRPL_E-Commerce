# Merchandise E-Commerce Website

This project is developed as part of the **WRPL** course for the **CSB class**. It is a merchandise-focused e-commerce platform built by a group of 5 people, consisting of two main applications:

---

## 🔹 Project Structure

### `ecommerce-store/` – Customer Interface
This is the customer-facing front-end application, where users can:
- Browse and search merchandise
- View product details
- Add items to the cart and checkout
- Manage their profile and orders

### `ecommerce/` – Admin Dashboard
This is the admin interface (for store management, internal name: **mnmmin**) that allows staff to:
- Manage merchandise inventory
- View and manage customer orders
- Handle promotions and discounts
- View analytics and sales data

---

## 🛠️ Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- ShadCN UI
- Prisma + PostgreSQL
- Clerk/Auth.js (authentication)
- Uploadthing (for image uploads)
- Stripe (payment integration)

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

### 1. Install dependencies
```bash
npm install
