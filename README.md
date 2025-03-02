# Product Inventory Management API

A comprehensive RESTful API for managing product inventory with authentication, built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Product Operations](#product-operations)
- [Error Handling](#error-handling)
- [Deployment Guide](#deployment-guide)

## Features

- User authentication with JWT
- Token-based logout mechanism
- CRUD operations for products
- Pagination, sorting, and filtering
- Input validation
- Error handling
- MongoDB integration
- Clean architecture (MVC pattern)
- Environment variable configuration
- CORS enabled

## Project Structure

```
project/
├── config/
│   └── database.js         # Database configuration
├── controllers/
│   ├── authController.js   # Authentication controller
│   └── productController.js # Product controller
├── middleware/
│   ├── auth.js            # JWT authentication middleware
│   └── validation.js      # Request validation middleware
├── models/
│   ├── user.js            # User model
│   ├── product.js         # Product model
│   └── blacklistedToken.js # Token blacklist model
├── routes/
│   ├── auth.js            # Authentication routes
│   └── products.js        # Product routes
├── services/
│   ├── authService.js     # Authentication business logic
│   └── productService.js  # Product business logic
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── README.md             # Project documentation
└── server.js             # Application entry point
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- express-validator
- cors
- dotenv

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd product-inventory-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (create .env file):
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT token generation

## API Documentation

### Base URL
```
http://localhost:3000
```

### API Endpoints Overview

| Endpoint | Method | Auth Required | Description | Request Body | Query Parameters |
|----------|--------|--------------|-------------|--------------|------------------|
| `/` | GET | No | Welcome page & API documentation | - | - |
| `/api/auth/register` | POST | No | Register new user | ```json { "email": "user@example.com", "password": "password123" }``` | - |
| `/api/auth/login` | POST | No | Login user | ```json { "email": "user@example.com", "password": "password123" }``` | - |
| `/api/auth/logout` | POST | Yes | Logout user | - | - |
| `/api/products` | GET | No | Get all products | - | `page`: Page number (default: 1)  `limit`: Items per page (default: 10) `sort`: Sort field and order (e.g., price:desc)  `category`: Filter by category  `minPrice`: Minimum price filter  `maxPrice`: Maximum price filter |
| `/api/products/:id` | GET | No | Get single product | - | - |
| `/api/products` | POST | Yes | Create new product | ```json { "name": "Product Name", "price": 49.99, "category": "Category", "stock": 100, "description": "Product description" }``` | - |
| `/api/products/:id` | PUT | Yes | Update product | ```json { "name": "Updated Name", "price": 59.99, "category": "Category", "stock": 150, "description": "Updated description" }``` | - |
| `/api/products/:id` | DELETE | Yes | Delete product | - | - |

### Authentication Details

All authenticated endpoints require the following header:
```
Authorization: Bearer <your_jwt_token>
```

### Response Formats

#### Success Response
```json
{
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

#### Error Response
```json
{
  "error": "Error message",
  "details": {
    // Additional error details if available
  }
}
```

### Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

## Error Handling

The API includes comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- Not found errors
- Server errors

## Deployment Guide

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

3. Deploy:
   ```bash
   vercel
   ```

### Railway Deployment

1. Create a Railway account
2. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

3. Login and deploy:
   ```bash
   railway login
   railway init
   railway up
   ```

### Render Deployment

1. Create a Render account
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables
6. Deploy

Remember to:
- Update MongoDB URI to production database
- Set appropriate environment variables
- Enable CORS for your frontend domain
- Implement rate limiting for production
- Set up proper logging
- Configure error reporting
