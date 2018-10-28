const mongoose = require("mongoose");
const axios = require("axios");
const _ = require("lodash");
const WeatherInfo = mongoose.model("weatherinfo");
const keys = require("../config/keys");
const moment = require("moment");

module.exports = app => {
  app.post("/api/weatherinfo", async (req, res) => {
    const { countryCode, cityName, minTemp, maxTemp } = req.body;
    const weatherInfo = new WeatherInfo({
      countryCode,
      cityName,
      minTemp,
      maxTemp
    });
    const cityUrl = `${keys.ROOT_URL}&q=${cityName},${countryCode}`;
    let weather;
    try {
      weather = await axios.get(cityUrl);
    } catch (error) {
      return res.status(400).send("Invalid Input");
    }
    // if valid, save to db
    if (weather) {
      try {
        await weatherInfo.save();
      } catch (error) {
        return res.status(422).send("Unable to process/save");
      }
      let fullResponse = {
        city_list: [],
        totalCount: undefined
      };
      constructResponse(weather, fullResponse, minTemp, maxTemp);
      res.send(fullResponse);
    }
  });

  app.get("/api/weatherinfo", async (req, res) => {
    let cityData, weather;
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);

    if (pageNo < 0 || pageNo === 0) {
      return res.status(400).send("Page number not valid");
    }

    try {
      totalCount = await WeatherInfo.countDocuments();
    } catch (error) {
      return res.status(400).send("Invalid Input/DB Issue");
    }
    try {
      cityData = await WeatherInfo.find()
        .sort("-_id")
        .skip(size * (pageNo - 1))
        .limit(size)
        .exec();
    } catch (error) {
      return res.status(400).send("Invalid Input/DB Issue");
    }

    if (cityData.length > 0) {
      let fullResponse = {
        city_list: [],
        totalCount
      };
      const cityUrls = cityData.map(cityRecord => {
        return axios(
          `${keys.ROOT_URL}&q=${cityRecord.cityName},${cityRecord.countryCode}`
        );
      });
      try {
        weather = await Promise.all(cityUrls);
      } catch (error) {
        return res.status(500).send("Data Access Issue");
      }
      if (weather) {
        weather.forEach((location, cityIndex) => {
          constructResponse(
            location,
            fullResponse,
            cityData[cityIndex].minTemp,
            cityData[cityIndex].maxTemp
          );
        });
        res.send(fullResponse);
      }
    } else {
      // No Content
      res.status(204).send("No Content");
    }
  });
};

function constructResponse(weather, fullResponse, minTemp, maxTemp) {
  let cityObj = {
    cityName: weather.data.city.name,
    lat: weather.data.city.coord.lat,
    lon: weather.data.city.coord.lon,
    num_days: keys.NUM_FORCAST_DAYS,
    minRef: minTemp,
    maxRef: maxTemp
  };
  let dateArr = [];
  let tempData = weather.data.list.map(weatherRecord => {
    let temp = weatherRecord.main.temp;
    let outlier = false;
    if (temp < minTemp || temp > maxTemp) {
      outlier = true;
    }
    dateArr.push(weatherRecord.dt_txt);
    return { temp, date_time: weatherRecord.dt_txt, outlier };
  });
  // filter to the number of days required
  let formattedRequiredDates = _.uniqBy(dateArr, value =>
    moment(value).format("MMM Do")
  )
    .slice(0, keys.NUM_FORCAST_DAYS)
    .map(record => moment(record).format("MMM Do"));

  let requiredTempData = tempData.filter(tempRecord =>
    formattedRequiredDates.includes(
      moment(tempRecord.date_time).format("MMM Do")
    )
  );
  cityObj.tempData = requiredTempData;
  fullResponse.city_list.push(cityObj);
}
