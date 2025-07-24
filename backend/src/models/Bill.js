const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  bill_id: { type: String, required: true, unique: true },
  contents: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  created_at: { type: Date, default: Date.now },
  total_price: { type: Number, required: true },
  total_cost_price: { type: Number, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer_phone_number: { type: String, required: true }
});

module.exports = mongoose.model('Bill', billSchema);