const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    type: { type: String, enum: ['Business', 'Leisure', 'Family', 'Adventure'], default: 'Leisure' },
    tags: [{ type: String }],
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);
