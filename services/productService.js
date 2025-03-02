const Product = require('../models/product');

class ProductService {
  async createProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async getProducts({ page = 1, limit = 10, sort, category, minPrice, maxPrice }) {
    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Build sort object
    const sortObj = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortObj[field] = order === 'desc' ? -1 : 1;
    }

    // Execute query with pagination
    const products = await Product.find(filter)
      .sort(sortObj)
      .limit(limit)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    return {
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalProducts: total
    };
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async updateProduct(id, updateData) {
    return await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }

  validateProduct(productData) {
    const requiredFields = ['name', 'price', 'category', 'stock'];
    const missingFields = requiredFields.filter(field => !productData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  }
}

module.exports = ProductService;
