const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const Booking = require("../models/Booking");
const Activity = require("../models/Activity");

// POST /api/bookings - Book an activity
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { activityId } = req.body;

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const newBooking = new Booking({
      user: req.user.id,
      activity: activityId,
    });

    await newBooking.save();
    res.status(201).json({ message: "Activity booked successfully", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// GET /api/bookings/my - Get all bookings for the logged-in user
router.get("/my", authenticateToken, async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.user.id }).populate("activity");
  
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

module.exports = router;
