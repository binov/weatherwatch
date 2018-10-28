import { RESET_ERROR_MESSAGE } from "../actions/action_types";
export default function(state = null, action) {
  const { type, error } = action;
  if (type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    const { data, status, statusText } = error.response;
    return { data, status, statusText };
  }
  return state;
}
