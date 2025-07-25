const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductNamesAndQuantities
} = require('../controllers/productController');


// Product Routes
router.post('/inventory', authenticateToken, createProduct);
router.get('/inventory', authenticateToken, getAllProducts);
router.get('/inventory/:id', authenticateToken, getProduct);
router.put('/inventory/:id', authenticateToken, updateProduct);
router.delete('/inventory/:id', authenticateToken, deleteProduct);
router.get('/inventorylist', authenticateToken, getProductNamesAndQuantities);



module.exports = router;