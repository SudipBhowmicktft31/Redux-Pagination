import { combineReducers, createStore } from "redux";
import userReducer from "./Reducer";
const rootReducer = combineReducers({ Reducer: userReducer });
const store = createStore(rootReducer);
export default store;
