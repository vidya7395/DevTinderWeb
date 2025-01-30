import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import feedReducer from "./slice/feedSlice";
import connectionReducer from "./slice/connectionSlice";
import receivedRequestReducer from "./slice/requestReceivedSlice";
import { logout } from './action';

const appReducer = combineReducers({
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    receivedRequest: receivedRequestReducer,
});
const rootReducer = (state, action) => {
    if (action.type === logout.type) {
      state = undefined; // Completely reset Redux store
    }
    return appReducer(state, action);
  };
const appStore = configureStore({
    reducer: rootReducer
});
export default appStore;