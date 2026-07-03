const mongoose = require('mongoose');

const entrepreneurSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    skillType: {
      type: String,
      enum: ['cobbler', 'potter', 'tailor', 'artisan', 'vendor'],
      required: true,
    },
    bio: { type: String },
    experience: { type: Number, default: 0 }, // in years
    gallery: [{ type: String }], // array of image URLs
    verified: { type: Boolean, default: false },
    starRating: { type: Number, default: 0 },
    trustRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Entrepreneur', entrepreneurSchema);
