import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import feedReducer from "./slice/feedSlice";
import connectionReducer from"./slice/connectionSlice";
import receivedRequestReducer from "./slice/requestReceivedSlice";
const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connection:connectionReducer,
        receivedRequest:receivedRequestReducer,
        // Add your reducers here
    }
});
export default appStore;