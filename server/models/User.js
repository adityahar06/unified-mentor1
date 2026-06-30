const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'entrepreneur'], default: 'customer' },
  // Entrepreneur fields (simplified)
  skillType: { type: String }, // Cobbler, Potter, etc.
  servicesOffered: [{ type: String }],
});

module.exports = mongoose.model('User', UserSchema);
