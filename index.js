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

if (process.env.NODE_ENV === "production") {
  // Express will serve the production assets
  app.use(express.static("client/build"));
  // Express will serve up the index.html file,
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
