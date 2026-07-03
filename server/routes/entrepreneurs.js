const express = require('express');
const router = express.Router();
const { getEntrepreneurs, getEntrepreneurById } = require('../controllers/entrepreneurController');

router.route('/').get(getEntrepreneurs);
router.route('/:id').get(getEntrepreneurById);

module.exports = router;
