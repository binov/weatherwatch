import { FETCH_WEATHER_ALL, FETCH_WEATHER } from "../actions/action_types";
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_WEATHER:
      return action.payload && action.payload.data
        ? [...action.payload.data.city_list, ...state]
        : state;
    case FETCH_WEATHER_ALL:
      return action.payload && action.payload.data
        ? [...action.payload.data.city_list]
        : [];
    default:
      break;
  }
  return state;
}
