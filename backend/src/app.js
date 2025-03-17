const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const storyReadingRoutes = require('../routes/storyReadingRoutes');



dotenv.config();
const app = express();




// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));



// Routes
app.use("/story-reading", storyReadingRoutes);

app.get('/', (req, res) => {
  res.send('Express Server Running');
});

module.exports = app;