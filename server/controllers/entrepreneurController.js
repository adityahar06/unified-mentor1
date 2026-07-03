const Entrepreneur = require('../models/Entrepreneur');

// @desc    Get all entrepreneurs
// @route   GET /api/entrepreneurs
// @access  Public
const getEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find({}).populate('userId', 'name location');
    res.json(entrepreneurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get entrepreneur by ID
// @route   GET /api/entrepreneurs/:id
// @access  Public
const getEntrepreneurById = async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id).populate('userId', 'name location email');
    if (entrepreneur) {
      res.json(entrepreneur);
    } else {
      res.status(404).json({ message: 'Entrepreneur not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEntrepreneurs, getEntrepreneurById };
