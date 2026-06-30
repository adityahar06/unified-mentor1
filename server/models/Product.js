const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  entrepreneurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  inStock: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', ProductSchema);
