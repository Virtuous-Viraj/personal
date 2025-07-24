const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    organization: { type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);