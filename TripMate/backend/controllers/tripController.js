const Trip = require('../models/Trip');

exports.createTrip = async (req, res) => {
    try {
        const trip = await Trip.create({ ...req.body, userId: req.user._id });
        res.status(201).json(trip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTrips = async (req, res) => {
    try {
        const { search, type, sort, page = 1, limit = 10, minBudget, maxBudget, tags, minDuration, maxDuration } = req.query;
        const query = { userId: req.user._id };

        if (search) {
            query.destination = { $regex: search, $options: 'i' };
        }
        if (type) {
            query.type = type;
        }
        if (minBudget || maxBudget) {
            query.budget = {};
            if (minBudget) query.budget.$gte = Number(minBudget);
            if (maxBudget) query.budget.$lte = Number(maxBudget);
        }
        if (tags) {
            const tagsArray = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagsArray };
        }

        // Duration Filter using $expr
        if (minDuration || maxDuration) {
            const durationExpr = {
                $divide: [{ $subtract: ["$endDate", "$startDate"] }, 1000 * 60 * 60 * 24]
            };
            query.$expr = { $and: [] };
            if (minDuration) {
                query.$expr.$and.push({ $gte: [durationExpr, Number(minDuration)] });
            }
            if (maxDuration) {
                query.$expr.$and.push({ $lte: [durationExpr, Number(maxDuration)] });
            }
        }

        let tripsQuery = Trip.find(query);

        if (sort) {
            const sortFields = sort.split(',').join(' ');
            tripsQuery = tripsQuery.sort(sortFields);
        } else {
            tripsQuery = tripsQuery.sort('-createdAt');
        }

        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        tripsQuery = tripsQuery.skip(skip).limit(limitNum);

        const trips = await tripsQuery;
        const total = await Trip.countDocuments(query);

        res.json({
            trips,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTrip = async (req, res) => {
    try {
        let trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        if (trip.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await trip.deleteOne();
        res.json({ message: 'Trip removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
