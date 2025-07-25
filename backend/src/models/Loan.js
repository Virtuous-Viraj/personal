const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  organization_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loan_name: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  years: { type: Number, required: true },
  my_given_interest_rate: { type: Number, required: true }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Loan', loanSchema);
