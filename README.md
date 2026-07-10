# RentNest Backend

RentNest is a RESTful backend API for a rental property marketplace. It enables landlords to manage rental properties, tenants to request and pay for rentals, and administrators to manage users, categories, and platform activities. The API follows a role-based access control system and includes secure authentication, validation, payment integration, and centralized error handling.

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT Authentication
* Zod Validation
* Stripe Payment Integration
* Render (Deployment)

## Live Server

https://last-hope-a4.onrender.com

## GitHub Repository

https://github.com/Yousuf7900/Last-Hope-A4.git

## API Documentation

https://documenter.getpostman.com/view/53430879/2sBY4LQMgh

## Features

* JWT-based authentication and authorization
* Role-based access control (Admin, Landlord, Tenant)
* User profile management
* Property listing and management
* Property search and filtering
* Rental request management
* Stripe payment integration
* Payment history and tracking
* Property review system
* Category management
* Tenant rental history for landlords
* Input validation using Zod
* Global error handling
* 404 route handling
* Seed script for default admin and categories

---

# API Endpoints

## Authentication

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`
* `GET /api/v1/auth/me`
* `PATCH /api/v1/auth/me`

---

## Categories

### Public

* `GET /api/categories`

---

## Properties

* `GET /api/properties`
* `GET /api/properties/:id`

---

## Landlord

### Property Management

* `POST /api/v1/landlord/properties`
* `PATCH /api/v1/landlord/properties/:id`
* `DELETE /api/v1/landlord/properties/:id`

### Rental Requests

* `GET /api/v1/landlord/requests`
* `PATCH /api/v1/landlord/requests/:id`

### Tenant History

* `GET /api/v1/landlord/tenants/:tenantId/history`

---

## Rentals

* `POST /api/v1/rentals`
* `GET /api/v1/rentals`
* `GET /api/v1/rentals/:id`

---

## Payments

* `POST /api/v1/payments/create`
* `POST /api/v1/payments/confirm` *(Stripe Webhook)*
* `GET /api/v1/payments`
* `GET /api/v1/payments/:id`

---

## Reviews

* `POST /api/v1/reviews`

---

## Admin

### User Management

* `GET /api/v1/admin/users`
* `PATCH /api/v1/admin/users/:id`

### Platform Monitoring

* `GET /api/v1/admin/properties`
* `GET /api/v1/admin/rentals`

### Category Management

* `POST /api/v1/admin/categories`
* `PATCH /api/v1/admin/categories/:id`
* `DELETE /api/v1/admin/categories/:id`

---

## Admin Credentials

**Email:** [admin@rentnest.com](mailto:admin@rentnest.com)

**Password:** admin123

---

## To play with this project try below instructions politely...!

### Clone the Repository

```bash
git clone https://github.com/Yousuf7900/Last-Hope-A4.git
cd Last-Hope-A4
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file and configure the required environment variables.

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Database Migrations

```bash
npx prisma migrate deploy
```

### Seed the Database

```bash
npm run seed
```

### Start the Server

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```
