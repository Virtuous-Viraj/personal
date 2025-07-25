const mongoose = require('mongoose');

const loanBidSchema = new mongoose.Schema({
  bid_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid', required: true },
  loan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('LoanBid', loanBidSchema);
