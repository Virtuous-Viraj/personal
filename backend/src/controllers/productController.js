const Product = require('../models/Product');

// Create Product
const createProduct = async (req, res) => {
  try {
    const { name, price, cost_price, quantityLeftInStock} = req.body;
    const product = new Product({  
      name,
      price,
      cost_price,
      user: req.user._id,
      quantityLeftInStock
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id })
      .populate('user');
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Single Product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.user._id })
      .populate('user');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get Product Names and Quantities
const getProductNamesAndQuantities = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id })
      .populate('user');

      const result = products.map(p => ({
      name: p.name,
      quantityLeftInStock: p.quantityLeftInStock
    }));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductNamesAndQuantities
};