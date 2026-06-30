const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');

// Get requests for a specific entrepreneur
router.get('/entrepreneur/:id', async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ entrepreneurId: req.params.id }).populate('customerId', ['name']);
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new service request
router.post('/', async (req, res) => {
  const { customerId, entrepreneurId, serviceDetails } = req.body;
  try {
    const newRequest = new ServiceRequest({ customerId, entrepreneurId, serviceDetails });
    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update request status
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    let request = await ServiceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });

    request.status = status;
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
