const express = require('express');
const router = express.Router();
const  authenticateToken = require('../middleware/authMiddleware');

const {
  generateLoan,
  getUserLoans,
  getSingleLoan,
} = require('../controllers/loanController');


router.post('/generate', authenticateToken, generateLoan);
router.get('/:user_id', authenticateToken, getUserLoans);
router.get('/getloan/:loan_id', authenticateToken, getSingleLoan);

module.exports = router;