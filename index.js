const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const videoRoutes = require('./routes/videos');
const cors = require('cors');
require('dotenv').config()

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/videos', videoRoutes)

app.listen(PORT, () => {
    console.log("Running on port " + PORT)
})