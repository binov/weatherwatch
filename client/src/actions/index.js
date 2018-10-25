import axios from "axios";

export const FETCH_WEATHER_ALL = "FETCH_WEATHER_ALL";
export const FETCH_WEATHER = "FETCH_WEATHER";

export const fetchWeatherAll = () => {
  const url = "/api/weatherinfo";
  const request = axios.get(url);
  return {
    type: FETCH_WEATHER_ALL,
    payload: request
  };
};

export const fetchWeather = cityInfo => {
  const url = "/api/weatherinfo";
  const cityWeatherRecord = axios.post(url, cityInfo);
  return { type: FETCH_WEATHER, payload: cityWeatherRecord };
};
