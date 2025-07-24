const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    user_id: { type: String, unique: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);