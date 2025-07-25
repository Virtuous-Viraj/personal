const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  raised_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  interest_rate: { type: Number, required: true }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Bid', bidSchema);
