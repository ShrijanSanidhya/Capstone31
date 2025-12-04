const express = require('express');
const { createTrip, getTrips, getTripById, updateTrip, deleteTrip } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getTrips)
    .post(protect, createTrip);

router.route('/:id')
    .get(protect, getTripById)
    .put(protect, updateTrip)
    .delete(protect, deleteTrip);

module.exports = router;
