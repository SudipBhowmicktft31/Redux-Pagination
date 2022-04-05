import { FETCH_DATA, LOADING_SPINNER } from "./Type";

//Action Creator Function

//Fetch data
export const FetchData = (payload) => {
  return {
    type: FETCH_DATA,
    payload: payload,
  };
};

//Loading Spinner
export const loadingSpinner = (payload) => {
  return {
    type: LOADING_SPINNER,
    payload: payload,
  };
};
