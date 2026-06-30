const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('entrepreneurId', ['name', 'skillType']);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create product (mock auth just takes entrepreneurId from body for now)
router.post('/', async (req, res) => {
  const { entrepreneurId, name, description, price, category } = req.body;
  try {
    const newProduct = new Product({ entrepreneurId, name, description, price, category });
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
