const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');
const retrieveRoutes = require('./routes/retrieveRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Use Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/retrieve', retrieveRoutes);

app.use('/api/upload', (req, res, next) => {
    console.log('Upload route hit');
    next();
}, uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));