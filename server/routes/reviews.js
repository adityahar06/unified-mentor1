const express = require('express');
const router = express.Router();
const { createReview, getReviews, getFlaggedReviews } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(protect, createReview);
router.route('/flagged').get(protect, admin, getFlaggedReviews);
router.route('/:targetId').get(getReviews);

module.exports = router;
