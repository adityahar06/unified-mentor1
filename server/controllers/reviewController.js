const Review = require('../models/Review');
const Entrepreneur = require('../models/Entrepreneur');
const { analyzeSentiment } = require('../services/sentiment');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { targetId, targetModel, rating, comment } = req.body;
    const userId = req.user._id;

    // Check if the user is trying to review themselves
    if (targetModel === 'Entrepreneur') {
      const entrepreneur = await Entrepreneur.findById(targetId);
      if (!entrepreneur) {
        return res.status(404).json({ message: 'Entrepreneur not found' });
      }
      if (entrepreneur.userId.toString() === userId.toString()) {
        return res.status(403).json({ message: 'You cannot review your own profile' });
      }
    }

    // Call Groq/Hugging Face API (or local simulation fallback) for sentiment analysis
    const sentimentResult = await analyzeSentiment(comment);
    
    let sentimentLabel = sentimentResult.label;
    let sentimentScore = sentimentResult.score;
    let flagged = false;

    // Logic to flag contradictory reviews
    if (
      (rating >= 4 && sentimentLabel === 'NEGATIVE' && sentimentScore > 0.8) ||
      (rating <= 2 && sentimentLabel === 'POSITIVE' && sentimentScore > 0.8)
    ) {
      flagged = true;
    }

    const review = await Review.create({
      targetId,
      targetModel,
      userId,
      rating,
      comment,
      sentimentLabel,
      sentimentScore,
      flagged,
    });

    // Update target (Entrepreneur) average starRating and trustRating
    if (targetModel === 'Entrepreneur') {
      await updateEntrepreneurRatings(targetId);
    }

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to update entrepreneur ratings
const updateEntrepreneurRatings = async (entrepreneurId) => {
  const reviews = await Review.find({ targetId: entrepreneurId, targetModel: 'Entrepreneur' });
  
  if (reviews.length === 0) return;

  let totalStar = 0;
  let totalTrustWeight = 0;
  let validReviewsCount = 0;

  reviews.forEach((rev) => {
    totalStar += rev.rating;
    
    // Calculate trust weight based on sentiment
    // If flagged, it contributes less or negatively to trust rating.
    let weight = rev.rating;
    if (rev.sentimentLabel === 'NEGATIVE') {
       weight -= (rev.sentimentScore * 2); // Penalize negative sentiment heavily
    } else if (rev.sentimentLabel === 'POSITIVE') {
       weight += (rev.sentimentScore * 1);
    }
    
    // Ensure weight is within reasonable bounds (0 to 5)
    weight = Math.max(0, Math.min(5, weight));
    
    totalTrustWeight += weight;
    validReviewsCount++;
  });

  const avgStar = totalStar / reviews.length;
  const avgTrust = totalTrustWeight / validReviewsCount;

  await Entrepreneur.findByIdAndUpdate(entrepreneurId, {
    starRating: avgStar.toFixed(1),
    trustRating: avgTrust.toFixed(1),
  });
};

// @desc    Get reviews for a target
// @route   GET /api/reviews/:targetId
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ targetId: req.params.targetId }).populate('userId', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get flagged reviews (Admin)
// @route   GET /api/reviews/flagged
// @access  Private/Admin
const getFlaggedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ flagged: true }).populate('userId', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getReviews, updateEntrepreneurRatings, getFlaggedReviews };
