const express = require('express');
const router = express.Router();
const  authenticateToken = require('../middleware/authMiddleware');

const {
  generateBill,
  getUserBills,
  getSingleBill
} = require('../controllers/billController');


router.post('/generate', authenticateToken, generateBill);
router.get('/bills/:user_id', authenticateToken, getUserBills);
router.get('/bill/:bill_id', authenticateToken, getSingleBill);

module.exports = router;