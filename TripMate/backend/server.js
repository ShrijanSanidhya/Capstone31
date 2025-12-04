const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173", 
        "https://capstone31.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Database Connection

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tripmate')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.get('/', (req, res) => {
    res.send('TripMate API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
