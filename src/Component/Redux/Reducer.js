import { FETCH_DATA, LOADING_SPINNER } from "./Type";

//Initial State
const initialState = {
  userData: [],
  totalPage: null,
  currentPage: 1,
  isLoadingSpinner: false,
};

//Reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        userData: action.payload.data,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
      };
    case LOADING_SPINNER:
      return {
        userData: state.userData,
        totalPage: state.totalPage,
        currentPage: state.currentPage,
        isLoadingSpinner: action.payload,
      };
    default:
      return {
        userData: state.userData,
        totalPage: state.totalPage,
        currentPage: state.currentPage,
        isLoadingSpinner: state.payload,
      };
  }
};
export default userReducer;
