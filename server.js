const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Import database connection
const connectDB = require("./config/database");

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Product Inventory Management API",
    documentation: {
      auth: {
        register: { method: "POST", path: "/api/auth/register" },
        login: { method: "POST", path: "/api/auth/login" },
        logout: { method: "POST", path: "/api/auth/logout" },
      },
      products: {
        list: { method: "GET", path: "/api/products" },
        single: { method: "GET", path: "/api/products/:id" },
        create: { method: "POST", path: "/api/products" },
        update: { method: "PUT", path: "/api/products/:id" },
        delete: { method: "DELETE", path: "/api/products/:id" },
      },
      features: [
        "JWT Authentication",
        "Pagination",
        "Sorting",
        "Filtering",
        "Input Validation",
      ],
    },
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || "Something went wrong!",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  // Close server & exit process
  server.close(() => process.exit(1));
});
