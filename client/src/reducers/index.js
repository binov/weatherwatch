import { combineReducers } from "redux";
import WeatherReducer from "./reducer_weather";
import ErrorReducer from "./reducer_error";

const rootReducer = combineReducers({
  weather: WeatherReducer,
  error: ErrorReducer
});

export default rootReducer;
