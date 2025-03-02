const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

// Protected routes (require authentication)
router.post('/', auth, ProductController.createProduct);
router.put('/:id', auth, ProductController.updateProduct);
router.delete('/:id', auth, ProductController.deleteProduct);

module.exports = router;
