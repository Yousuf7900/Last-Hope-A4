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

https://yousufislam7900-7137304.postman.co/workspace/06bb298f-4ae3-4600-8e8e-0ffeee0b8e84/collection/53430879-a20b76b3-6f2a-484c-9e01-06910af8e41f?action=share&source=copy-link&creator=53430879

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
