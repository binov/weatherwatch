import { FETCH_WEATHER, FETCH_WEATHER_ALL } from "../actions/index.js";
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return action.payload.data
        ? [...action.payload.data.city_list, ...state]
        : state;
    case FETCH_WEATHER_ALL:
      return action.payload.data ? [...action.payload.data.city_list] : [];
    default:
      break;
  }
  return state;
}
