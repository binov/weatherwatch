const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
require("./models/weather_info");

const weatherRoutes = require("./routes/weather_routes");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
const app = express();
app.use(bodyParser.json());

weatherRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
