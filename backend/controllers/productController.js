const Product = require('../models/Product');
const mongoose = require('mongoose');

const rawProducts = require('../data/products');

const productsList = rawProducts.map((p, index) => ({
  ...p,
  _id: (index + 1).toString()
}));

const getProducts = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const products = await Product.find({});
      if (products.length > 0) {
        return res.json({ products, page: 1, pages: 1 });
      }
    } catch (error) {
      console.log('DB Fetch Error, falling back to mock.');
    }
  }
  res.json({ products: productsList, page: 1, pages: 1 });
};

const getProductById = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        return res.json(product);
      }
    } catch (error) {
      console.log('DB Fetch Error, falling back to mock.');
    }
  }
  
  const mockProduct = productsList.find(p => p._id === req.params.id);
  if (mockProduct) res.json(mockProduct);
  else res.status(404).json({ message: 'Product not found' });
};

module.exports = { getProducts, getProductById };
