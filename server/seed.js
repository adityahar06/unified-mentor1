const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Entrepreneur = require('./models/Entrepreneur');
const Review = require('./models/Review');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Entrepreneur.deleteMany();
    await Review.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Users
    const users = [
      { name: 'Admin User', email: 'admin@example.com', password: hashedPassword, role: 'admin' },
      { name: 'Customer John', email: 'john@example.com', password: hashedPassword, role: 'customer' },
      { name: 'Cobbler Sam', email: 'sam@example.com', password: hashedPassword, role: 'entrepreneur', location: 'Downtown' },
      { name: 'Potter Mia', email: 'mia@example.com', password: hashedPassword, role: 'entrepreneur', location: 'Uptown' },
    ];

    const createdUsers = await User.insertMany(users);

    const samId = createdUsers[2]._id;
    const miaId = createdUsers[3]._id;
    const johnId = createdUsers[1]._id;

    // Entrepreneurs
    const entrepreneurs = [
      { userId: samId, skillType: 'cobbler', bio: 'Expert cobbler with 10 years experience.', experience: 10, verified: true, starRating: 5, trustRating: 5 },
      { userId: miaId, skillType: 'potter', bio: 'Creating beautiful clay pots.', experience: 5, verified: true, starRating: 0, trustRating: 0 },
    ];

    const createdEntrepreneurs = await Entrepreneur.insertMany(entrepreneurs);

    // Reviews (one normal, one flagged example)
    const reviews = [
      {
        targetId: createdEntrepreneurs[0]._id,
        targetModel: 'Entrepreneur',
        userId: johnId,
        rating: 5,
        comment: 'Great service, highly recommended!',
        sentimentLabel: 'POSITIVE',
        sentimentScore: 0.99,
        flagged: false,
      },
      {
        targetId: createdEntrepreneurs[0]._id,
        targetModel: 'Entrepreneur',
        userId: johnId,
        rating: 5,
        comment: 'Terrible job, ruined my shoes and overcharged me.', // This will trigger a flag due to contradiction
        sentimentLabel: 'NEGATIVE',
        sentimentScore: 0.95,
        flagged: true,
      }
    ];

    await Review.insertMany(reviews);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
