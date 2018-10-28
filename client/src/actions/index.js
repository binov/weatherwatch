import axios from "axios";
import {
  FETCH_WEATHER_ALL,
  FETCH_WEATHER,
  RESET_ERROR_MESSAGE
} from "./action_types";

export const fetchWeatherAll = () => async dispatch => {
  const url = "/api/weatherinfo";
  let response;
  let error = null;
  try {
    response = await axios.get(url);
  } catch (err) {
    error = err;
  }
  if (response && response.status === 204) {
    error = { response: { data: "", status: 204, statusText: "No Content" } };
  }
  dispatch({ type: FETCH_WEATHER_ALL, payload: response, error });
};

export const fetchWeather = cityInfo => async dispatch => {
  const url = "/api/weatherinfo";
  let error = null;
  let cityWeatherRecord;
  try {
    cityWeatherRecord = await axios.post(url, cityInfo);
  } catch (err) {
    error = err;
  }

  dispatch({ type: FETCH_WEATHER, payload: cityWeatherRecord, error });
};

export const clearErrors = () => {
  return { type: RESET_ERROR_MESSAGE };
};
