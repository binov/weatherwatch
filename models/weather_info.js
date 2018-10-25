const mongoose = require("mongoose");
const { Schema } = mongoose;

const weatherSchema = new Schema({
  cityName: String,
  minTemp: { type: Number, default: 0 },
  maxTemp: { type: Number, default: 0 }
});

mongoose.model("weatherinfo", weatherSchema);
