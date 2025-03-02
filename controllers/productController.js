const ProductService = require("../services/productService");

class ProductController {
  static async createProduct(req, res) {
    try {
      const productService = new ProductService();
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({
        error: "Product validation failed",
        message: error.message,
        details: error.errors || {},
      });
    }
  }

  static async getProducts(req, res) {
    try {
      const { page, limit, sort, category, minPrice, maxPrice } = req.query;
      const productService = new ProductService();

      const result = await productService.getProducts({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sort,
        category,
        minPrice,
        maxPrice,
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const productService = new ProductService();
      const product = await productService.getProductById(req.params.id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const productService = new ProductService();
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productService = new ProductService();
      const product = await productService.deleteProduct(req.params.id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
