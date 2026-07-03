const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be Entrepreneur or Product ID
    targetModel: { type: String, enum: ['Entrepreneur', 'Product'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    sentimentLabel: { type: String, enum: ['POSITIVE', 'NEGATIVE', 'NEUTRAL'], default: 'NEUTRAL' },
    sentimentScore: { type: Number, default: 0 },
    flagged: { type: Boolean, default: false }, // Flagged if rating and sentiment contradict
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
