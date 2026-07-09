# RentNest Backend

RentNest is a RESTful backend API for a rental property marketplace. It allows landlords to manage properties, tenants to request and pay for rentals, and admins to manage users and monitor the platform.

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT Authentication
* Zod Validation
* Stripe Payment
* Render (Deployment)

## Live Server

https://last-hope-a4.onrender.com

## GitHub Repository

https://github.com/Yousuf7900/Last-Hope-A4.git

## API Documentation

https://documenter.getpostman.com/view/53430879/2sBY4LQMgh

## Features

* User authentication with JWT
* Role-based authorization (Admin, Landlord, Tenant)
* Property listing and management
* Rental request management
* Stripe payment integration
* Review system
* Category management
* Input validation using Zod
* Global error handling
* Seed script for admin and categories

## API Endpoints

### Authentication

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`
* `GET /api/v1/auth/me`

### Categories

* `GET /api/categories`

### Properties

* `GET /api/properties`
* `GET /api/properties/:id`

### Landlord

* `POST /api/v1/landlord/properties`
* `PATCH /api/v1/landlord/properties/:id`
* `DELETE /api/v1/landlord/properties/:id`
* `GET /api/v1/landlord/requests`
* `PATCH /api/v1/landlord/requests/:id`

### Rentals

* `POST /api/v1/rentals`
* `GET /api/v1/rentals`
* `GET /api/v1/rentals/:id`

### Payments

* `POST /api/v1/payments/create`
* `POST /api/v1/payments/confirm`
* `GET /api/v1/payments`
* `GET /api/v1/payments/:id`

### Reviews

* `POST /api/v1/reviews`

### Admin

* `GET /api/v1/admin/users`
* `PATCH /api/v1/admin/users/:id`
* `GET /api/v1/admin/properties`
* `GET /api/v1/admin/rentals`

## Admin Credentials

**Email:** [admin@rentnest.com](mailto:admin@rentnest.com)

**Password:** admin123
