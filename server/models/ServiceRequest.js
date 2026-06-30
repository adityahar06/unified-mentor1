const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  entrepreneurId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceDetails: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' },
  requestDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);
