const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');


const storyReadingRoutes = require('../routes/storyReadingRoutes');
const authRoutes = require("../routes/authRoutes");
const generateStoryRoutes = require ("../routes/createStoryRoutes");



dotenv.config();
const app = express();




// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/story-reading", storyReadingRoutes);
app.use("/api/v1/story_create",generateStoryRoutes);


app.get('/', (req, res) => {
  res.send('Express Server Running');
});

module.exports = app;