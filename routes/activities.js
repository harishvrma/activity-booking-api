const express = require('express');
const Activity = require('../models/Activity');
const router = express.Router();

// Seed some activities (optional endpoint for setup)
// router.post('/seed', async (req, res) => {
//   await Activity.insertMany([...]);
//   res.send("Seeded");
// });

// Public - list all activities
router.get('/', async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

module.exports = router;
