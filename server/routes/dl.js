const express = require('express');
const router = express.Router();
const brain = require('brain.js');

// Initialize and train a basic Deep Learning Network for Sentiment Analysis using brain.js
const net = new brain.recurrent.LSTM();
const trainingData = [
  { input: 'amazing service, loved it', output: 'positive' },
  { input: 'great handmade quality', output: 'positive' },
  { input: 'highly recommend this cobbler', output: 'positive' },
  { input: 'terrible, broke instantly', output: 'negative' },
  { input: 'very bad experience, rude', output: 'negative' },
  { input: 'waste of money', output: 'negative' },
  { input: 'it was okay, nothing special', output: 'neutral' },
  { input: 'average product', output: 'neutral' }
];

console.log('Training basic DL Sentiment Model... (this may take a moment)');
net.train(trainingData, { iterations: 100, log: true, logPeriod: 10 });
console.log('DL Model trained successfully!');

// Basic DL Route to analyze review sentiment
router.post('/analyze-review', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ msg: 'Please provide review text to analyze' });
  }

  // Use the trained neural network to predict sentiment
  const output = net.run(text.toLowerCase());
  
  res.json({
    review: text,
    sentiment_prediction: output || 'neutral',
    message: 'Processed using basic Deep Learning (brain.js)'
  });
});

module.exports = router;
