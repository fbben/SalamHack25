const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const authRoutes = require("../routes/authRoutes")
const usersRoutes = require("../routes/users")

const storyReadingRoutes = require('../routes/storyReadingRoutes');

const libraryRoutes = require("../routes/libraryRoutes");
const generationRoutes = require("../routes/generationRoutes");

const generateStoryRoutes = require ("../routes/createStoryRoutes");
const removeStoryRoutes = require ("../routes/removeStoryRoutes");



dotenv.config();
const app = express();




// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// Routes
app.use("/api/v1/generation", generationRoutes);// to remove and integrate it with generateStoryRoutes
app.use("/api/v1/library",libraryRoutes)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/story-reading", storyReadingRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/story_create",generateStoryRoutes);
app.use("/api/v1/story_delete",removeStoryRoutes);


app.get('/', (req, res) => {
  res.send('Express Server Running');
});

module.exports = app;